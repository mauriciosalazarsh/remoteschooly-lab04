# D — Diseñar el servicio

Qué debemos construir y cómo: arquitectura de alto nivel, tipo de persistencia y diseño de la API. Aquí se fija el alcance y las expectativas de la arquitectura antes de diagramarla en el paso L.

## 1. Arquitectura de alto nivel

Aplicando la tabla de patrones del curso (*monolito* = MVP y equipo pequeño; *3-tier* = separación UI / lógica / datos; *microservicios* = equipos grandes; *event-driven* = workflows asíncronos):

| Parte del sistema | Patrón elegido | Por qué |
| :--- | :--- | :--- |
| **Central de Lima** (publicación, distribución y generación con IA) | **Monolito modular 3-tier**: Portal Central (UI) → una aplicación con módulos de responsabilidad única (los "Services" del diagrama) → persistencia | Equipo pequeño, MVP, ≈ 24 RPS de pico (paso E). Los microservicios traerían overhead operacional sin beneficio; el monolito modular permite extraer un módulo después si hace falta. Cada módulo se dibuja como un Service separado porque el diseño lógico exige una responsabilidad por componente. |
| **Nodo escolar** (una laptop o mini-PC por escuela) | **Componente de borde (edge) offline-first**: cuatro services locales + almacén local | Es la única forma de que 30 alumnos usen el material con un enlace de 1–4 Mbps intermitente y sin internet en casa: la escuela descarga **una sola vez** y sirve por LAN. |
| **App Escuela** (tablet / laptop) | Cliente offline-first con almacenamiento local | El alumno estudia en casa sin internet; la app guarda paquete, sesión y respuestas y sincroniza cuando vuelve a la red de la escuela. |
| Tareas programadas (Empaquetado, Publicación, Monitoreo, Lotes) | Jobs con **cron** dentro del monolito (como el *Feed Service <cron>* del curso) | Los trabajos programados son cerrar la semana el jueves 19:00, publicar el jueves 20:00, alertar el domingo 18:00 y enviar lotes cada 2 horas; una cola de mensajes sería sobre-diseño para dificultad Medium. |

**Lo que NO se diseña en esta etapa (según el enunciado):** alta disponibilidad, réplicas, failover, reintentos sofisticados del servidor. La reanudación la hace el cliente (rangos de bytes) y la corrección la garantiza el manifiesto con SHA-256: eso es *integridad*, no *reliability*. Un nodo por escuela y una instancia por service son puntos únicos de falla **aceptados y declarados**.

## 2. Persistencia: ¿SQL o NoSQL?

Las bases de datos se mapean solo como fuentes de persistencia; la tecnología concreta queda para la implementación. Se indica la opción más natural por tipo de dato:

| Almacenamiento | Qué guarda | Tipo | Por qué |
| :--- | :--- | :--- | :--- |
| **BD Central** | usuarios, escuelas, grados por escuela, roster, cursos, semanas, metadatos de materiales, paquetes, manifiestos, entregas, respuestas de alumnos | **SQL (relacional)** | Datos muy relacionados (escuela ↔ grados ↔ entregas ↔ paquetes ↔ archivos) y consultas con joins para el panel por escuela; volumen pequeño (< 1 GB/año). |
| **Repositorio de Materiales** | archivos ligeros de los materiales (PDF, imagen, audio, video corto), direccionados por su hash | **Object storage** | Binarios grandes servidos por rangos de bytes (descarga reanudable); 3 TB/semana de salida en pico se sirven mejor desde object storage (con CDN si hace falta) que desde la aplicación. |
| **DB IA** | solicitudes de generación, tokens por llamada, cuotas, presupuesto, línea base, plantillas versionadas | **SQL** | Reportes agregados por semana, docente y material (sumas, porcentajes de ahorro). |
| **Caché IA** | clave estructurada de solicitud → respuesta generada, con caducidad de 90 días | **Clave-valor** | Búsqueda exacta por clave y expiración por tiempo. |
| **Índice Semántico** | embeddings de materiales listos y de fragmentos del currículo nacional | **Índice vectorial** | Búsqueda por similitud para reutilizar materiales (RF-06), caché semántica (RF-07) y contexto por fragmentos (RF-05). |
| **Almacén Local** (nodo escolar) | manifiestos vigentes, estado por archivo (faltante / recibido / verificado), archivos verificados, roster, respuestas pendientes de subir | **SQLite + disco local** | Un solo archivo de base de datos, sin servidor, apto para una laptop escolar sin técnico. |
| **Tablet del alumno** | semana actual y anterior, sesión, respuestas | Almacenamiento local de la app | Lectura y respuesta sin conexión. |

## 3. Diseño de la API

REST con JSON (tabla del curso: CRUD estándar y backends para móviles). Sustantivos en los endpoints, verbos HTTP para la acción, códigos de estado documentados. Todos los endpoints de la central exigen sesión (RF-01) o token de escuela (RF-02); las llamadas del nodo que registran progreso o acuses son **idempotentes** (repetir la llamada tras un corte no duplica nada).

### Central de Lima

| Endpoint | Service | Qué hace | Respuestas |
| :--- | :--- | :--- | :--- |
| `POST /sesiones` | Login | usuario + contraseña → sesión con rol | 201 sesión · 401 credenciales inválidas |
| `POST /escuelas` · `PUT /escuelas/{id}/grados` · `PUT /escuelas/{id}/roster` | Registro | escuela, grados y cursos que atiende, roster; devuelve el token de escuela | 201 / 200 · 400 datos incompletos |
| `GET /materiales?grado=&curso=&competencia=&tema=` · `POST /materiales` · `PUT /materiales/{id}` | Materiales | buscar, crear y marcar **listo** (con semana, grado y curso); guarda la variante ligera y su SHA-256 | 200 / 201 · 413 archivo supera el tamaño permitido · 422 formato inválido |
| `POST /paquetes?semana=&grado=` · `GET /paquetes/{id}/manifiesto` | Empaquetado | arma el paquete por grado y devuelve el manifiesto versionado | 201 · 409 la semana tiene materiales sin variante ligera · 413 paquete > 100 MB |
| `POST /generaciones` · `GET /generaciones/{id}` | AI Gateway | solicitud con plantilla (tipo, grado, curso, competencia, tema, contexto, idioma, urgencia) → borrador con tokens, costo y origen | 201 inmediato · 202 en lote (llega en < 24 h) · 429 cuota agotada |
| `POST /generaciones/{id}/variaciones` · `POST /materiales/{id}/adaptaciones` | AI Gateway | "otra versión" (RF-07) y adaptación de un material existente (RF-09) | 201 / 202 · 429 |
| `GET /biblioteca?grado=&competencia=&tema=&tipo=` | Biblioteca | explorar la biblioteca de materiales listos y encontrar equivalentes para reutilizar (0 tokens) | 200 |
| `GET /consumo?semana=` · `PUT /presupuestos/{semana}` · `PUT /cuotas/docentes/{docenteId}` · `PUT /cuotas/escuelas/{escuelaId}` | Medidor de Tokens | consumo, % del presupuesto, % de reducción vs. línea base; el coordinador fija presupuesto y cuotas | 200 · 403 solo coordinador |
| `POST /sincronizaciones` | Sincronización | el nodo envía su lista de archivos verificados y sus respuestas pendientes; recibe manifiestos de la semana objetivo, roster, alertas y lista de faltantes con tamaño; conserva manifiestos anteriores hasta activar el nuevo | 200 · 401 token inválido |
| `GET /archivos/{hash}/url` | Descarga | autoriza el archivo para la escuela y devuelve URL firmada del Repositorio; el nodo solicita allí `Range: bytes=…` | 200 URL · 403 fuera de alcance; Repositorio: 206 parcial / 416 rango inválido |
| `PUT /entregas/{id}/progreso` · `PUT /entregas/{id}/acuse` | Entregas | bytes confirmados por el nodo; acuse con hash del manifiesto → "completa" (idempotentes) | 200 · 409 hash no coincide |
| `GET /entregas?semana=&region=&ugel=&estado=` · `GET /alertas?semana=` | Monitoreo de Entregas | estado por escuela con último contacto; lista de escuelas incompletas del domingo | 200 |

### Nodo escolar (red local de la escuela, sin internet)

| Endpoint | Service | Qué hace |
| :--- | :--- | :--- |
| `POST /sesiones-locales` | Acceso Local | usuario + PIN contra el roster local → sesión local |
| `GET /semanas/actual?grado=` · `GET /archivos/{hash}` | Aula Local | catálogo verificado de la semana y archivos por LAN (hasta 50 dispositivos) |
| `GET /estado` · `POST /sincronizar-ahora` · `POST /faltantes/reintentar` | Aula Local → Sincronizador | pantalla del docente rural (RF-17), forzar sincronización, pedir faltantes |
| `POST /respuestas` | Aula Local | persiste respuestas con UUID y versión, confirma recepción y las conserva hasta el acuse de la central; reenvío idempotente |
| `POST /adaptaciones` | Aula Local → Sincronizador | solicitud liviana de adaptación (RF-19), en cola hasta que haya señal |

## 4. Cómo se resuelven los dos problemas (decisiones de diseño)

### 4.1 Que los cursos lleguen correctamente con internet limitado

1. **Paquete por grado, ligero y versionado** (RF-12): variante ligera de cada archivo, ≤ 100 MB por grado, un manifiesto con SHA-256 por archivo. Un paquete nuevo nunca reemplaza al anterior hasta estar verificado: no se mezclan semanas.
2. **Publicación con margen** (RF-13): jueves 20:00, para que el nodo tenga viernes, sábado y domingo de ventanas de señal antes del lunes 07:00 (RNF-09).
3. **Pull diferencial desde la escuela** (RF-14): el nodo, no la central, decide cuándo bajar (cada vez que detecta señal); manda lo que ya tiene verificado y recibe solo lo que falta. Dos semanas que comparten un archivo no lo transfieren dos veces.
4. **Descarga por rangos de bytes** (RF-15): checkpoints locales de 32 KiB; un corte pierde como máximo el último bloque parcial y la siguiente ventana continúa donde quedó.
5. **Verificación local y acuse** (RF-16): SHA-256 por archivo contra el manifiesto, sin internet; lo dañado se vuelve a pedir; el acuse a la central es la única forma de marcar una entrega como completa.
6. **Una descarga por escuela** (RF-18, RF-20): los 30 alumnos toman el paquete del nodo por la red local; el enlace satelital se usa una sola vez.

### 4.2 Reducir el gasto de tokens en al menos 40 %

Toda llamada a la IA pasa por el **AI Gateway**, que ejecuta los mecanismos **en orden de menor a mayor costo**; los primeros que aciertan evitan los siguientes:

| Orden | Mecanismo | Service | RF | Ahorro estimado (paso E) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Verificar cuota y presupuesto | Medidor de Tokens | RF-11 | control (hace visible el costo y frena "5 versiones") |
| 2 | Reutilizar un material ya listo equivalente, de cualquier creador (0 tokens) | Biblioteca | RF-06 | 20 % de solicitudes evitadas (junto con 3) |
| 3 | Caché exacta y semántica (0 tokens) | Caché de Respuestas | RF-07 | (incluido en el 20 %) |
| 4 | Plantilla compacta + fragmentos del currículo (RAG) en vez del documento completo | Plantillas · Contexto Curricular | RF-04, RF-05 | **−48,7 % del costo por solicitud** (12 000 → 2 500 tokens de entrada) |
| 5 | Modelo económico para tareas simples; modo por lotes (−50 %) para lo no urgente | Enrutador de Modelos · Lotes | RF-08 | ×0,75 lotes · ×0,76 modelo |
| 6 | Llamar al proveedor (inmediato o lote) con el prefijo de la plantilla marcado como cacheable | Proveedor de IA (API externa) | — | margen adicional (prompt caching) |
| 7 | Registrar tokens, costo y origen; comparar con la línea base | Medidor de Tokens | RF-10, RNF-01 | medición: sin línea base no hay evidencia del −40 % |

Combinados en cascada (no se suman): 0,513 × 0,80 × 0,75 × 0,76 ≈ 0,23 → **≈ 77 % de ahorro** en el escenario estimado; **el mecanismo 4 solo ya cumple el 40 %**, los demás son margen frente a supuestos optimistas (detalle numérico en [2-Estimar.md](2-Estimar.md)).

## 5. Seguridad básica (RNF-08)

Sesión con rol para el Portal; token de escuela revocable para el nodo; contraseñas y PIN con hash; TLS entre clientes, nodos y central; el roster que viaja al nodo lleva solo identificador, nombre, rol, grado y hash; los prompts a la IA no llevan datos personales de alumnos. No se diseñan mecanismos adicionales (MFA, WAF) en esta etapa.

## 6. Alcance y expectativas

Con esto queda definido: monolito modular 3-tier en Lima + nodo escolar offline-first + App Escuela; SQL para metadatos, object storage para archivos, clave-valor e índice vectorial para la IA, SQLite en la escuela; API REST idempotente con descargas por rangos; dos cadenas de diseño (paquete verificado y AI Gateway) que responden a los dos problemas del enunciado. El paso A detalla el modelo de datos y el paso L lista los componentes y traza los happy paths sobre el diagrama.


## Contratos complementarios de cierre v3.2

| Operación | Componente y recorrido | Resultado |
| :--- | :--- | :--- |
| `POST /semanas/{id}/cerrar` | Portal → Materiales → Empaquetado; el mismo cierre corre el jueves 19:00 | 200 cierre idempotente · 403 solo coordinador · 409/422 validación |
| `POST /materiales/{id}/adaptaciones` y `GET /generaciones/{id}` con token escolar e ID idempotente | Nodo → AI Gateway → Materiales → Repositorio; AI Gateway persiste solicitud y cuota por escuela en DB IA | 202 pedido, resultado con hash y URL autorizable; 429 cuota agotada |
| `GET /adaptaciones` y `POST /adaptaciones/{id}/publicacion` en LAN | App/navegador → Aula Local → Almacén Local | borrador solo para docente; publicación al grado tras validación y revisión |
| `GET /estado` en LAN | Aula Local → Almacén Local; `POST /sincronizar-ahora` → Sincronizador | estado por grado, cuota y estado del pedido, último contacto |
| Domingo 18:00 | Monitoreo → API externa de correo; Monitoreo → BD Central | envío al creador responsable/coordinador, registro de estado; aviso al nodo en la siguiente sincronización |
| Publicar material listo | Materiales → Biblioteca → Índice Semántico | indexación en < 5 min; consultas con codificador local |

AI Gateway accede a DB IA para persistir estados de generación/lote y consulta Materiales para resolver referencias. Plantillas y Contexto Curricular se consultan desde el Gateway; este compone el prompt final. Lotes guarda el ID externo y consulta resultados del proveedor; el Gateway recupera por DB IA las generaciones terminadas, guarda el borrador, actualiza caché y registra el consumo. La meta < 24 h requiere que procesamiento externo más espera local cumplan ese plazo; es un supuesto contractual, no una garantía demostrada por el diagrama.

Los cuatro jobs usan cron dentro del monolito. La cola local de adaptaciones/respuestas y los estados de lote son registros persistidos, sin añadir un broker de mensajes. Descarga solo autoriza URLs, por lo que los bytes no pasan por el servidor de aplicación. El nodo usa el Repositorio directamente para descargar.
