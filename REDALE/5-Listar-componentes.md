# L — Listar los componentes

Diagramación de la arquitectura base a partir de todo lo mapeado en los pasos R, E, D y A. Diseño **lógico** top-down, como en el curso: el usuario inicia los flujos, cada *Service* hace una única cosa, las bases de datos aparecen solo como persistencia y las APIs externas quedan claramente fuera de nuestra aplicación.

## Diagramas entregados

| Archivo | Qué muestra |
| :--- | :--- |
| [arquitectura.pdf](../Diagramas/arquitectura.pdf) · [arquitectura.png](../Diagramas/arquitectura.png) · [arquitectura.html](../Diagramas/arquitectura.html) (interactivo) | **Diagrama de arquitectura completo**: 3 actores (creador/coordinador, docente rural y alumno), 2 clientes, 21 services, 6 almacenes dibujados (más la persistencia interna de la App) y 2 APIs externas, agrupados en tres zonas: *Central de Lima — Generación con IA*, *Central de Lima — Publicación y distribución* y *Escuela remota — Nodo escolar*. |
| [arquitectura-hp1.pdf](../Diagramas/arquitectura-hp1.pdf) · [arquitectura-hp1.png](../Diagramas/arquitectura-hp1.png) | El mismo diagrama con el **Happy Path 1 (distribución semanal)** resaltado: los componentes que participan quedan iluminados y el resto atenuado (equivalente a "pintar de verde" el camino feliz). |
| [arquitectura-hp2.pdf](../Diagramas/arquitectura-hp2.pdf) · [arquitectura-hp2.png](../Diagramas/arquitectura-hp2.png) | El mismo diagrama con el **Happy Path 2 (material con IA, −40 % tokens)** resaltado. |
| [happy-path-1-distribucion.pdf](../Diagramas/happy-path-1-distribucion.pdf) · [.html](../Diagramas/happy-path-1-distribucion.html) | Diagrama de secuencia del Happy Path 1, paso a paso, con los mismos nombres de componentes. |
| [happy-path-2-generacion-ia.pdf](../Diagramas/happy-path-2-generacion-ia.pdf) · [.html](../Diagramas/happy-path-2-generacion-ia.html) | Diagrama de secuencia del Happy Path 2. |
| `*.architecture.json`, `*.sequence.json` | Fuente de cada diagrama (herramienta: [archify](https://github.com/tt-a1i/archify); los HTML permiten explorar, buscar y seguir cada happy path con las *guided views*). |

![Arquitectura lógica de RemoteSchooly](../Diagramas/arquitectura.png)

## Cómo se leyó el diagrama desde los requerimientos (top-down)

Se partió de *Usuario → Aplicación* y se descompuso requerimiento por requerimiento hasta que cada componente tuvo una sola responsabilidad:

| Requerimiento(s) | Componente que apareció | Responsabilidad única |
| :--- | :--- | :--- |
| RF-01 | **Login Service** | autenticar al docente creador y emitir su sesión |
| RF-02 | **Registro Service** | registrar escuelas, grados/cursos que atienden, roster y token de nodo |
| RF-04 · RF-09 · RF-19 | **AI Gateway Service** | único punto de acceso a la IA: orquesta cuota → reutilizar → caché → prompt → modelo → proveedor → registro |
| RF-04 | **Plantillas Service** | armar el prompt compacto desde plantillas versionadas (prefijo cacheable + campos cerrados) |
| RF-05 | **Contexto Curricular Service** | recuperar del Índice Semántico solo los fragmentos del currículo pertinentes (RAG) |
| RF-06 | **Biblioteca Service** | buscar materiales ya listos (de todos los creadores) para reutilizarlos antes de generar; el Portal la consulta a través del AI Gateway, único punto de entrada a la zona de IA |
| RF-07 | **Caché de Respuestas Service** | buscar y guardar respuestas por clave exacta y por similitud semántica |
| RF-08 | **Enrutador de Modelos Service** | decidir por regla el modelo (económico / estándar) y el modo (inmediato / lote) |
| RF-08 | **Lotes Service \<cron\>** | agrupar solicitudes no urgentes y enviarlas a la Batch API cada 2 horas |
| RF-10 · RF-11 · RNF-01 | **Medidor de Tokens Service** | registrar tokens y costo por llamada, aplicar cuotas y presupuesto, calcular la reducción frente a la línea base |
| RF-12 | **Materiales Service** | cursos, semanas y materiales; variante ligera y hash de cada archivo; marcar "listo" |
| RF-12 · RNF-04 | **Empaquetado Service** | armar el paquete por grado y su manifiesto versionado con SHA-256 por archivo |
| RF-13 | **Publicación Service \<cron\>** | jueves 20:00: publicar los paquetes armados y crear una entrega pendiente por escuela-grado |
| RF-14 · RF-24 | **Sincronización Service** | responder al nodo qué le falta (compara lo verificado con los manifiestos vigentes), entregar roster y recibir respuestas de alumnos |
| RF-15 | **Descarga Service** | autorizar URLs firmadas; el nodo descarga por rangos directamente del Repositorio |
| RF-16 | **Entregas Service** | recibir progreso y acuse de cada nodo y llevar el estado de cada entrega |
| RF-25 · RF-26 | **Monitoreo de Entregas Service** | panel por escuela y semana, filtros por región y alerta del domingo |
| RF-14 · RF-15 · RF-19 · RF-24 | **Sincronizador Escolar Service** (nodo) | detectar señal, pedir lo que falta, descargar por rangos, subir respuestas y solicitudes de adaptación |
| RF-16 | **Verificación Service** (nodo) | SHA-256 de cada archivo contra el manifiesto; marcar verificado o dañado |
| RF-03 | **Acceso Local Service** (nodo) | inicio de sesión sin internet contra el roster local |
| RF-17 · RF-18 · RF-19 · RF-20 · RF-24 | **Aula Local Service** (nodo) | catálogo y archivos verificados por LAN, pantalla de estado del docente, recepción de respuestas |
| RF-20 a RF-24 | **App Escuela** (cliente) | descarga automática a la tablet, estado de la semana, lectura y respuestas sin conexión |
| RF-01, RF-02, RF-04 a RF-13, RF-25, RF-26 | **Portal Central** (cliente) | interfaz web del docente creador y del coordinador |

**Bases de datos (solo persistencia; paso A):** BD Central · Repositorio de Materiales · DB IA · Caché IA · Índice Semántico · Almacén Local (nodo) · almacenamiento local de la App Escuela.

**API externa (funcionalidad que da un ente externo, no nuestra aplicación):** Proveedor de IA (LLM API: generación inmediata, Batch API, prompt caching). Se añade la API externa de correo para RF-26.

**Regla de parada del curso ("hasta que cada servicio/componente/BD tenga una responsabilidad única")**: se verificó en la tabla anterior; las acciones se agrupan por responsabilidad: gestión de materiales, control de consumo, seguimiento de entregas y sincronización del nodo. Tener varios métodos no implica varios servicios desplegables; son módulos de un monolito.

## Building blocks del curso: cuáles se usan y cuáles no

| Building block | ¿Se usa? | Dónde / por qué no |
| :--- | :--- | :--- |
| Load Balancer | No | 24 RPS de pico (paso E) y un solo servidor de aplicación; no hay más de un servidor que balancear |
| CDN | Opcional | El Repositorio de Materiales (object storage) puede servirse por CDN si el pico de 100 Mbps lo exige; no cambia el diseño lógico |
| Cache | Sí | **Caché IA** (respuestas del proveedor): datos leídos con frecuencia, costosos de producir |
| Message Queue | No | Hay cuatro jobs con cron (Empaquetado/cierre, Publicación, Monitoreo/alerta y Lotes); una cola sería sobre-diseño para dificultad Medium |
| API Gateway | Parcial | El **AI Gateway** cumple ese rol solo para la IA (punto único, cuota, registro); no hay API pública ni microservicios |
| Primary/Replica DB | No | El enunciado no exige disponibilidad; lecturas y escrituras caben en una sola BD |
| Search Engine | Parcial | El **Índice Semántico** (vectorial) cubre la búsqueda por similitud de materiales y fragmentos del currículo |

## Happy Path 1 — Distribución semanal de materiales (se cumple en el diagrama)

Camino más común y sin errores, del jueves de publicación al lunes de clase. Componentes en el orden en que aparecen ([arquitectura-hp1.pdf](../Diagramas/arquitectura-hp1.pdf)):

1. **Docente creador → Portal Central → Login Service**: inicia sesión (RF-01).
2. **Portal Central → Materiales Service → Repositorio de Materiales / BD Central**: sube los materiales de la semana 12, el sistema guarda la variante ligera y su SHA-256, y los marca "listo" para 2.º de secundaria (RF-12).
3. **Materiales Service → Empaquetado Service → BD Central**: al cerrar la semana se arma el paquete por grado y su manifiesto v12 (RF-12).
4. **Publicación Service \<cron\> → BD Central**: jueves 20:00 publica v12 y crea una entrega pendiente por cada escuela-grado registrado (RF-13, RF-02).
5. **Sincronizador Escolar Service → Sincronización Service**: el nodo de la escuela de Julián detecta señal el viernes de madrugada, se identifica con su token y envía lo que ya tiene verificado; recibe manifiestos, roster y la lista de 3 archivos faltantes (RF-14).
6. **Sincronizador Escolar Service → Descarga Service** obtiene URLs firmadas; **Sincronizador → Repositorio de Materiales** descarga solo esos archivos por rangos; recibe el contenido completo sin cortes en este happy path (RF-15 define la recuperación como flujo alternativo) (RF-15).
7. **Sincronizador Escolar Service → Verificación Service → Almacén Local**: cada archivo se verifica con SHA-256 contra el manifiesto y se marca "verificado" (RF-16).
8. **Sincronizador Escolar Service → Entregas Service → BD Central**: acuse "semana 12 completa y verificada"; **Monitoreo de Entregas Service** muestra la escuela en verde al creador (RF-16, RF-25).
9. **Docente rural → App Escuela → Aula Local Service**: el lunes a las 7:00 la pantalla muestra la semana 12 completa y verificada para cada grado, con sus archivos recibidos y esperados (RF-17).
10. **Alumno → App Escuela → Acceso Local Service / Aula Local Service → Almacén Local**: Yesenia conecta la tablet al WiFi de la escuela, inicia sesión con el roster local y la app descarga sola el paquete de su grado (RF-03, RF-18, RF-20).
11. **Alumno → App Escuela**: en su casa, sin internet, ve "Semana 12 — completa", lee y responde los ejercicios; al volver a la escuela las respuestas suben solas al nodo y de ahí a la central (RF-21 a RF-24).

## Happy Path 2 — Material con IA gastando ≥ 40 % menos tokens (se cumple en el diagrama)

Componentes en orden ([arquitectura-hp2.pdf](../Diagramas/arquitectura-hp2.pdf)):

1. **Docente creador → Portal Central**: Rocío pide una "ficha de ejercicios nueva y completa" para 2.º de secundaria, tema *fracciones* del catálogo, urgencia "para la próxima semana" (RF-04).
2. **Portal Central → AI Gateway Service**: la solicitud entra por el único punto de acceso a la IA.
3. **AI Gateway → Medidor de Tokens Service → DB IA**: verifica cuota y presupuesto (RF-11).
4. **AI Gateway → Biblioteca Service → Índice Semántico**: busca material listo equivalente para reutilizar (RF-06); no hay.
5. **AI Gateway → Caché de Respuestas Service → Caché IA**: busca respuesta exacta o semántica (RF-07); no hay.
6. **AI Gateway → Plantillas Service** y **→ Contexto Curricular Service → Índice Semántico**: arma el prompt compacto con los fragmentos del currículo pertinentes: 2 500 tokens en vez de 12 000 (RF-04, RF-05).
7. **AI Gateway → Enrutador de Modelos Service → Lotes Service \<cron\> → Proveedor de IA**: tarea estándar y no urgente → modelo estándar en modo lote, 50 % más barato (RF-08).
8. **AI Gateway → Caché de Respuestas / Medidor de Tokens**: guarda la respuesta y registra tokens, costo y origen (RF-07, RF-10).
9. **AI Gateway → Portal Central → Docente creador**: el borrador aparece con su costo y el porcentaje de reducción del equipo frente a la línea base (RF-04, RF-11).
10. **Portal Central → Materiales Service**: Rocío lo edita y lo marca "listo": entra al paquete semanal (Happy Path 1) y a la Biblioteca para que nadie lo vuelva a generar (RF-12, RF-06).

## Escalar (E)

Según las diapositivas del curso, este paso **no se usa aún**. La arquitectura base cubre la carga estimada en el paso E (24 RPS, 2,7 TB/semana) con un servidor de aplicación, object storage y un nodo por escuela; los puntos únicos de falla quedan declarados y aceptados porque el enunciado no exige disponibilidad ni reliability en esta etapa.


## Recorridos complementarios verificados en v3.2

- **RF-19:** App Escuela → Aula Local → Sincronizador Escolar → AI Gateway → Materiales → Repositorio. El nodo consulta el resultado y obtiene URL firmada desde Descarga, baja desde Repositorio, verifica y guarda el borrador. Aula Local publica el suplemento al grado solo tras revisión del docente.
- **RF-17:** App Escuela → Aula Local → Sincronizador permite forzar sincronización; el estado persistido se lee desde Almacén Local.
- **RF-26:** Monitoreo ejecuta el job del domingo → API externa de correo y persiste el estado de envío en BD Central. Sincronización lleva las alertas al nodo.
- **RF-06/07:** Materiales → Biblioteca → Índice actualiza los materiales listos; Caché consulta Índice y Caché IA. La biblioteca se explora a través del Gateway sin generar ni consumir tokens del proveedor.
- **RF-04/08:** AI Gateway y Plantillas → DB IA; Lotes → DB IA conserva resultados y estados. El Gateway recupera resultados terminados, registra costo y devuelve el borrador al Portal.

Las flechas de la arquitectura representan dependencias de llamada; las secuencias incluyen sus retornos. Los PDF conservan texto vectorial seleccionable, título y nombre del happy path. Las vistas resaltadas distinguen el camino principal de los recorridos complementarios.
