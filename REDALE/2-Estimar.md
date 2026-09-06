# E — Estimar

Segundo paso del framework: calcular qué necesita el sistema para funcionar sin degradarse, en los tres cálculos del curso (servidores, almacenamiento, ancho de banda), más un cuarto propio de este caso: el gasto de tokens de IA y cómo se llega a la reducción del 40 %.

## Entradas (supuestos del piloto, RNF-10)

| Entrada | Valor | De dónde sale |
| :--- | :--- | :--- |
| Escuelas remotas | 5 000 | alcance del piloto del gobierno |
| Alumnos | 150 000 (≈ 30 por escuela) | escuelas rurales multigrado pequeñas |
| Docentes rurales | 12 000 | ≈ 2,4 por escuela |
| Docentes creadores en Lima | 60 | equipo de la central de contenidos |
| Grados con paquete semanal | 11 (6 de primaria + 5 de secundaria); una escuela típica atiende 6 | currículo nacional |
| Cursos por grado con material semanal | 6 | supuesto |
| Enlace de una escuela remota | 1–4 Mbps satelital, ≈ 6 h útiles al día, intermitente | personas Julián y Yesenia |
| Semanas lectivas al año | 40 | calendario escolar |

## 1. Estimar servidores requeridos

**Paso 1 — ¿Cuánto maneja un core?** Siguiendo el ejemplo del curso, 5 requests/segundo por core para requests de API (sesiones, búsquedas, manifiestos, progreso, acuses). Las descargas de archivos no pasan por los servidores de aplicación: se sirven desde el Repositorio de Materiales (object storage), que se dimensiona por ancho de banda, no por cores.

**Paso 2 — ¿Cuántos requests llegan a la central?**

| Fuente | Cálculo | RPS |
| :--- | :--- | :--- |
| Docentes creadores (búsquedas, generaciones, publicación) | 60 usuarios × 1 request cada 30 s en horario laboral | ≈ 2 |
| Nodos escolares (comprobar conexión, sincronizar, reportar progreso) | 5 000 nodos × 1 request cada 5 min mientras tienen señal | ≈ 16,7 |
| Sincronización de respuestas de alumnos | 150 000 × 6 respuestas/semana ÷ 604 800 s | ≈ 1,5 |
| Pico (jueves 20:00 de publicación: los nodos con señal consultan a la vez) | 2 000 nodos en 10 min | ≈ 3 |
| **Total pico** | | **≈ 24 RPS** |

**Paso 3 — ¿Cuántos servidores?** 24 RPS ÷ 5 RPS por core = 4,8 cores. **Un servidor de 8 cores** deja margen en este escenario; se aceptan pausas de mantenimiento, sin segundo servidor ni balanceador. Conclusión: la central es pequeña; el problema de este sistema no es CPU sino **ancho de banda hacia las escuelas** y **costo de IA**.

**Nodo escolar:** atiende hasta 50 dispositivos a la vez en la red local. Se requiere un nodo y una LAN que sostengan al menos 70 Mbps útiles agregados: 50 × 100 MB ÷ 600 s = 8,33 MB/s = 66,7 Mbps. Se dimensiona con margen por encima de 70 Mbps y se verifica con 50 descargas simultáneas; no se infiere la capacidad solo por el número de cores.

## 2. Estimar almacenamiento requerido

**Paso 1 — Tipos de datos:** (a) materiales en variante ligera (PDF, imágenes, audio, video corto), (b) originales subidos por los creadores, (c) respuestas de alumnos, (d) metadatos (usuarios, escuelas, cursos, paquetes, entregas, generaciones, tokens), (e) índice semántico y caché de IA.

**Paso 2 — Espacio por tipo (variantes ligeras, RNF-04):**

| Dato | Tamaño unitario | Cálculo semanal |
| :--- | :--- | :--- |
| Video corto (≤ 5 min, 360p, ≈ 220 kbps) | ≈ 8 MB | 1 por curso |
| Lectura o ficha en PDF optimizado | ≈ 2,5 MB | 2 por curso |
| Audio (≤ 32 kbps) | ≈ 2 MB | 1 por curso |
| Cuestionario / ejercicios | ≈ 100 KB | 1 por curso |
| **Paquete semanal por grado** | | 6 cursos × (8 + 5 + 2 + 0,1) MB ≈ **91 MB** (cumple RNF-04 ≤ 100 MB) |
| Material nuevo publicado por semana (11 grados) | | ≈ **1 GB** |
| Originales de los creadores (≈ 2× la variante ligera) | | ≈ 2 GB |
| Respuestas de alumnos | ≈ 2 KB | 150 000 × 6 × 2 KB ≈ 1,8 GB |
| Metadatos | ≈ 1 KB por fila | < 1 GB en total (despreciable) |
| Índice semántico (embeddings) | ≈ 6 KB | 50 000 materiales y fragmentos ≈ 0,3 GB |
| Caché de respuestas de IA | ≈ 5 KB | 50 000 respuestas ≈ 0,25 GB |

**Paso 3 — Total:**

| Almacenamiento | Año 1 |
| :--- | :--- |
| Repositorio de Materiales (ligeros + originales) | 3 GB × 40 semanas ≈ **120 GB** |
| Respuestas de alumnos | 1,8 GB × 40 ≈ **72 GB** |
| BD Central + DB IA + índice + caché | ≈ **2 GB** |
| **Total central** | **≈ 200 GB/año** (SQL + object storage) |
| Nodo escolar (6 grados × 91 MB × 40 semanas) | ≈ **22 GB/año** → disco de 128 GB; retención del año lectivo y espacio reservado para sistema/temporales |
| Tablet del alumno (su grado: semana actual + anterior) | 2 × 91 MB ≈ **180 MB** (RNF-10: ≤ 1 GB) |

## 3. Estimar ancho de banda requerido

**Paso 1 — Entrada a la central por día:** subida de originales por los creadores (≈ 2 GB/semana ≈ 0,3 GB/día) + respuestas de alumnos (≈ 0,26 GB/día) ≈ **0,6 GB/día → 7 KB/s**. Despreciable.

**Paso 2 — Salida de la central por día (lo que sí importa):** cada escuela baja el paquete de sus grados **una sola vez**; los alumnos lo toman de la red local (RF-18). Una escuela típica de 6 grados: 6 × 91 MB ≈ **550 MB por semana**. Para 5 000 escuelas: **2,7 TB por semana**.

- Promedio: 2,7 TB ÷ 604 800 s ≈ **4,5 MB/s (≈ 36 Mbps)**.
- Pico realista: las escuelas sincronizan entre el jueves de publicación y el domingo (72 h) → 2,7 TB ÷ 259 200 s ≈ **10,4 MB/s (≈ 85 Mbps)**; si la mitad lo hace en las primeras 24 h, ≈ 16 MB/s (130 Mbps). Por esto los archivos se sirven desde object storage (con CDN si el proveedor lo ofrece) y no desde los servidores de aplicación.

**Paso 3 — ¿Le alcanza a la escuela?** Con un enlace de 2 Mbps útil durante 6 h al día: 2 Mbps × 3 600 s × 6 h ÷ 8 ≈ **5,4 GB/día**. El paquete semanal de 550 MB se completa en **≈ 37 minutos de una sola ventana**; con 1 Mbps, en 73 minutos. Si la ventana se corta, la descarga continúa por rangos desde donde quedó (RF-15). Sin el nodo escolar, en cambio, 30 alumnos bajando 91 MB cada uno serían 2,7 GB por escuela compitiendo por el mismo enlace: más de 3 horas de señal continua y reintentos desde cero. Esta es la justificación numérica del nodo escolar y de la descarga única por escuela.

## 4. Estimar el gasto de tokens y la reducción del 40 %

**Línea base (hoy).** 60 docentes creadores × 40 solicitudes al día × 5 días = **12 000 solicitudes por semana**. Según la persona Rocío, cada solicitud pega el programa curricular completo como contexto (≈ 12 000 tokens de entrada) y produce un material (≈ 1 500 tokens de salida). Con precios de referencia de un modelo de gama media (US$ 3 por millón de tokens de entrada, US$ 15 por millón de salida):

| Concepto | Tokens/semana | Costo/semana |
| :--- | :--- | :--- |
| Entrada: 12 000 × 12 000 | 144 M | US$ 432 |
| Salida: 12 000 × 1 500 | 18 M | US$ 270 |
| **Total línea base** | 162 M | **US$ 702/semana** (≈ US$ 28 080 por 40 semanas lectivas) |
| **Meta (−40 %)** | | **≤ US$ 421/semana** |

**Mecanismos y su efecto (aplicados en cascada, no sumados linealmente):**

| # | Mecanismo | Service del diagrama | Supuesto | Costo resultante |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Plantillas + contexto curricular recuperado (RAG)**: el prompt lleva solo los fragmentos del currículo del grado y la competencia, no el documento completo (RF-04, RF-05) | Plantillas · Contexto Curricular | entrada baja de 12 000 a 2 500 tokens; salida igual | 12 000 × (2 500 × 3 + 1 500 × 15) / 1 M = **US$ 360** (−48,7 %) |
| 2 | **Reutilizar antes de generar + caché de respuestas**: solicitudes equivalentes a material ya existente no llegan al proveedor (RF-06, RF-07) | Biblioteca · Caché de Respuestas | 20 % de las solicitudes se resuelven sin IA | 360 × 0,80 = **US$ 288** (−59 %) |
| 3 | **Modo por lotes** para material no urgente: la semana siguiente se produce con días de anticipación y el proveedor cobra 50 % menos en lote (RF-08) | Enrutador de Modelos · Lotes | 50 % del volumen restante va por lotes | 288 × (0,5 + 0,5 × 0,5) = **US$ 216** (−69 %) |
| 4 | **Modelo económico** para tareas simples: más ejercicios del mismo tipo, cambiar contexto, resumir (RF-08) | Enrutador de Modelos | 30 % del volumen restante, modelo 5× más barato | 216 × (0,7 + 0,3 × 0,2) = **US$ 164** (−77 %) |

**Conclusión:** el mecanismo 1 por sí solo ya cumple la meta (−48,7 %); los mecanismos 2 a 4 son margen de seguridad frente a supuestos optimistas. Aunque el ahorro real del mecanismo 1 fuera la mitad (entrada a 6 000 tokens en vez de 2 500: US$ 486, −31 %), sumando la reutilización (× 0,8 → US$ 389, −45 %) se sigue superando el 40 %. El Medidor de Tokens (RF-10) registra la **línea base real** antes de activar los mecanismos y reemplaza estos supuestos por cifras desde la primera semana; el presupuesto semanal (RF-11) obliga a mantenerse dentro de la meta, y RNF-01 exige medir también el **costo por material publicado** para que el ahorro no venga de producir menos.

## Resumen: lo que estas cifras deciden en el diseño

| Cifra | Decisión que provoca |
| :--- | :--- |
| ≈ 24 RPS pico en la central | Monolito modular con 1 servidor de 8 cores; sin microservicios ni escalado |
| 2,7 TB/semana de salida, ≈ 100 Mbps de pico | Archivos servidos desde object storage (Repositorio de Materiales), no desde la aplicación |
| 550 MB por escuela/semana vs. 5,4 GB/día de enlace | Nodo escolar que descarga **una sola vez**, por rangos reanudables, y sirve por LAN |
| 91 MB por grado en variante ligera | Empaquetado produce variantes ligeras y rechaza paquetes > 100 MB (RNF-04) |
| 12 000 tokens de entrada por solicitud | Plantillas + RAG como primer mecanismo: es el que más ahorra |
| 20 % de solicitudes repetidas entre 60 creadores | Biblioteca con búsqueda semántica + caché de respuestas |
| Sin línea base no hay evidencia del −40 % | Medidor de Tokens registra cuatro semanas antes de activar el AI Gateway |


## Comprobaciones de cierre

- **Tráfico de control:** la consulta cada 5 minutos aporta 5 000 / 300 = 16,7 RPS. Sumando 2 de creadores, 1,5 de respuestas y 3,3 de publicación resulta ≈ 24 RPS. Es un escenario de carga distribuida, no un límite medido: el nodo agrupa respuestas/progreso y añade desfase aleatorio para evitar que todos consulten simultáneamente. Las URLs firmadas se emiten por archivo, no por checkpoint de 32 KiB. Una prueba de carga debe medir los picos de URL, búsquedas e IA antes de implementar.
- **Transferencia directa:** Descarga autoriza y devuelve una URL firmada. El nodo recibe los bytes directamente del Repositorio por HTTP Range; los checkpoints son escrituras locales dentro de un flujo, no una petición HTTP por bloque. Si vence la URL, pide otra para el mismo hash y continúa desde su offset persistido.
- **Tolerancia por corte:** a 1 Mbps útil, 50 MB requieren unos 400 s. Con 13 interrupciones instantáneas se repiten como máximo 13 × 32 768 = 425 984 bytes (0,852 %). Incluso reservando 14 cortes, son 458 752 bytes (0,918 %). La prueba excluye cabeceras, tiempo sin señal y corrupción; en operación general la cota es número de cortes × 32 KiB.
- **Adaptación escolar:** detección ≤ 5 min + generación < 60 s + consulta de resultado ≤ 30 s + transferencia de 1 MB ≈ 8 s deja margen bajo 10 min, condicionado al enlace y al proveedor. La aprobación humana se mide aparte.
- **Tokens frente a dólares:** la línea base tiene 162 M tokens/semana. Plantillas + RAG bajan a 48 M (−70,4 % de tokens) y reutilización/caché a 38,4 M (−76,3 %). Lotes y modelos baratos reducen dólares; no reducen por sí mismos el número de tokens. El ahorro combinado de US$ 702 a US$ 164 es una proyección, no un resultado observado. Se presupone igual volumen y calidad de materiales publicados; las adaptaciones rurales llevan una partida separada que también se reporta.
- **Persistencia:** los ≈ 200 GB/año centrales incluyen originales, material ligero y respuestas, repartidos entre SQL y object storage. Los 128 GB del nodo deben reservar espacio para sistema, temporales y respuestas: no se garantiza retener cinco años; se propone conservar el año lectivo y depurar solo paquetes antiguos sin respuestas pendientes.
