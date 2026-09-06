# EVAL — Iteración 1

**Registro de la iteración**

| Campo | Valor |
| :--- | :--- |
| Versión de requerimientos evaluada | v1 (borrador inicial: RF-01 a RF-15, RNF-01 a RNF-08) |
| Fecha | 2026-09-06 |
| Modelo usado | Claude (Fable 5.1) en Claude Code: tres subagentes-persona independientes en paralelo + un subagente juez, siguiendo los prompts de [Agents/README.md](../Agents/README.md) |
| Resultado | **FAILED — Calidad 61 %** (promedio 6.1/10; umbral 8.0 y ninguna persona < 7.0) |

**Contenido de la v1 evaluada:** inicio de sesión (RF-01); generación con IA desde plantillas, biblioteca, reutilización, caché, medición y presupuesto de tokens (RF-02 a RF-08); publicación del paquete semanal con manifiesto, distribución reanudable, verificación de integridad, acceso por la red de la escuela, modo sin conexión del alumno, estado por escuela y estado local (RF-09 a RF-15). No existían: responder ejercicios sin conexión ni envío automático de respuestas, estado de la semana en la tablet, plazo "antes del lunes", adaptación de materiales con IA para el docente rural, perfil de grados por escuela, presupuesto definido por alguien, ni el paso "borrador → paquete".

---

## Paso 1 — Evaluaciones por persona (tal como salieron)

### Yesenia Quispe — alumna de 2.º de secundaria, I.E. de Huayllabamba, Ocongate (Cusco)

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-13, RF-09, RF-10, RF-11, RF-12, RNF-02, RNF-04 | 2 | RF-13 sí dice lo que pedí: bajo en la escuela el paquete de la semana de mis cursos y lo abro en mi casa en modo avión (y se verifica así); pero ningún requerimiento dice que tenga que estar listo **el lunes** ni qué dispara la bajada a mi tablet o cómo me entero de que ya hay paquete nuevo; si llega el jueves, igual "se cumple". |
| N2 | RF-15, RF-11, RF-09 | 2 | RF-15 muestra semana, cursos, archivos recibidos/esperados y si está completo o qué falta, pero se lo muestra al **profesor en la compu de la escuela**, no a mí en mi tablet; en mi casa sigo sin saber qué tengo sin abrir archivo por archivo. |
| N3 | — | 0 | Ningún requerimiento habla de responder ejercicios o cuestionarios en la tablet sin señal, ni de guardar respuestas, ni de que se envíen solas cuando vuelva la señal; RF-13 solo dice "consultar". |
| P1 | RF-10, RF-11, RF-12, RNF-02, RNF-03, RNF-04 | 3 | Mi tablet ya no baja de internet sino de la red de la escuela (RF-12, cero tráfico a la central); la escuela baja por bloques y no reinicia tras un corte (RF-10, RNF-02); ningún archivo a medias se me muestra porque se verifica el checksum SHA-256 (RF-11, RNF-03); videos en 360p y paquete ≤ 300 MB (RNF-04). La ruedita y el PDF a la mitad se van. |
| P2 | RF-15, RF-14, RF-11 | 1 | El profesor puede ver qué semana llegó a la escuela y si está completa (RF-15) y en Lima lo ven por escuela (RF-14), así que baja el riesgo de bajar lo viejo; pero mi tablet no me dice "Semana 12" ni me avisa si tengo la anterior: sigo enterándome cuando el profesor pregunta. |
| P3 | RF-12, RF-10, RF-13, RNF-04 | 1 | Lo de "todos bajamos lo mismo a la vez" sí se arregla (RF-12: cada tablet toma del nodo por red local, RF-10: la escuela baja una sola vez); pero "en mi casa no hay internet para hacer la tarea" solo a medias: RF-13 me deja leer los ejercicios sin internet, no responderlos ni mandarlos. |

Criterio 1: 4/15 · Criterio 2: 5/9 · Criterio 3: 3/6 (flujo leído: entro con mi usuario (RF-01) → en Lima publican el paquete de la semana (RF-09) → la escuela lo baja por partes en sus horas de señal (RF-10) y lo verifica (RF-11) → en la escuela lo paso a mi tablet por la red local (RF-12, RF-13) → en mi casa lo abro en modo avión (RF-13). De ahí en adelante no hay pasos: no dice cómo me entero de que ya está el paquete ni qué semana es, ni cómo respondo los ejercicios ni cómo se envían mis respuestas.)
Puntaje bruto: 12/30 → **Score: 4.0/10**

Brechas detectadas:
1. **N3 / P3 — Responder sin conexión (falta todo).** Crear **RF-16 "Responder ejercicios y cuestionarios sin conexión"**: la alumna abre un ejercicio o cuestionario del paquete en la tablet sin internet, responde y las respuestas se guardan en la tablet. Verificación: en modo avión se completa y guarda un cuestionario y al reabrir la tablet las respuestas siguen ahí.
2. **N3 — Envío automático (falta todo).** Crear **RF-17 "Envío automático de respuestas"**: cuando la tablet se conecta a la red de la escuela, las respuestas guardadas se envían solas al nodo escolar (y de ahí a la central) sin que yo haga nada, y la tablet marca cada respuesta como "enviada". Verificación: tras reconectar, el profesor ve las respuestas y la tablet no muestra pendientes.
3. **N2 / P2 — Estado en mi tablet (falta).** Crear **RF-18 "Estado del paquete en la tablet"** (lo mismo que RF-15 pero para la alumna en su tablet): la pantalla de inicio muestra semana, grado, cursos, archivos recibidos/esperados y estado *completo* / *incompleto (falta X)*, sin abrir archivos. Verificación: en modo avión la tablet muestra "Semana 12 — Matemática, Comunicación… — completo". Además, avisar si tengo una semana anterior a la que ya está en el nodo ("tienes Semana 11, en la escuela ya está la 12").
4. **N1 — "Desde el lunes" (falta).** Crear **RNF-09 "Puntualidad del paquete semanal"**: el paquete de la semana N debe estar *completo y verificado* (RF-11) en el nodo escolar antes del lunes a las 08:00, y modificar **RF-09** para exigir que la publicación en Lima se haga con una fecha límite (por ejemplo, jueves de la semana anterior) que deje tiempo a las ventanas de conexión de RF-10.
5. **N1 / Flujo — Qué dispara la bajada a mi tablet (ambiguo).** Modificar **RF-13** para decir qué lo dispara: al conectarse la tablet a la red de la escuela, se baja sola el paquete nuevo de mis cursos (o me sale un aviso "hay paquete de la Semana 12"), y que la copia en la tablet también se verifique contra el checksum del manifiesto (extender **RF-11** a la tablet). Verificación: al conectarme, sin tocar nada, la tablet queda con la semana nueva completa y verificada.

Veredicto en primera persona: Me sirve a medias. Lo de bajar el paquete en la escuela y abrirlo en mi casa sin internet sí está (RF-13) y ya no voy a quedarme mirando la ruedita ni a abrir PDFs a la mitad (RF-10, RF-11, RF-12). Pero mi tablet no me dice qué semana tengo ni si está completa, nadie promete que esté el lunes, y de responder los ejercicios sin señal y que se manden solos no hay ni un requerimiento: la tarea la sigo haciendo en el cuaderno.

### Julián Huamán — Docente de escuela rural (San Juan de Yanayacu, Loreto)

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-09, RF-10, RNF-02, RNF-04 | 2 | RF-10 y RNF-02 sí dicen que el paquete llega solo al nodo, en bloques reanudables, durante las ventanas de conectividad y con verificación medible ("los bytes ya recibidos no se vuelven a descargar"); pero ningún requerimiento fija el plazo "antes del lunes" ni dice cómo el nodo sabe cuándo hay señal (mi antena no tiene horario: se cae con la lluvia), así que solo lo cumple en parte. |
| N2 | RF-15, RF-11, RF-12, RNF-03 | 5 | RF-15 me da la pantalla única (semana, grados, cursos, archivos recibidos/esperados, estado, qué falta), RF-11 y RNF-03 garantizan que nada sin checksum SHA-256 válido se muestra y que lo dañado se vuelve a pedir, y RF-12 dice que alumnos y docentes toman el material de la red local sin tráfico a la central; los cuatro dicen quién, cuándo, qué producen y cómo se verifican. |
| N3 | — | 0 | Toda la generación y adaptación con IA (RF-02 a RF-08, RNF-06) es exclusiva del docente creador en Lima; no existe ningún requerimiento que me permita a mí, docente rural, adaptar un ejercicio (cambiar contexto, simplificar, generar más) desde la escuela con conexión lenta; la columna Traza no menciona Julián N3 en ningún lado. |
| P1 | RF-10, RNF-02, RNF-04 | 3 | Ataca la causa exacta: la descarga la hace el nodo sin que yo baje nada el domingo, continúa desde el último bloque tras un corte (verificación: bytes recibidos no se repiten), RNF-02 prohíbe reiniciar desde cero y RNF-04 acota el paquete a 300 MB por grado con video en 360p. |
| P2 | RF-11, RNF-03, RF-15 | 3 | Ataca la causa: el 100 % de los archivos se verifica con checksum antes de quedar disponible, el que no coincide se vuelve a pedir, y ningún archivo se muestra sin checksum válido; con RF-15 veo el estado antes de entrar al aula, así que el PDF dañado ya no me sorprende el lunes. |
| P3 | RF-15, RF-09, RF-12, RF-13 | 3 | Las dos causas desaparecen: RF-09 crea el manifiesto de lo esperado y RF-15 me muestra recibidos/esperados y qué falta; RF-12 y RF-13 hacen que los 28 alumnos tomen el material del nodo por la red local (verificación: cero tráfico a la central). |

Criterio 1: 7/15 · Criterio 2: 9/9 · Criterio 3: 3/6 (flujo leído: RF-01 inicio sesión → la central publica el paquete con manifiesto (RF-09) → el nodo lo baja solo en bloques reanudables en las ventanas de señal (RF-10, RNF-02) → verifica checksums y marca completo (RF-11, RNF-03) → yo miro la pantalla del nodo el lunes (RF-15) → mis alumnos lo toman de la red de la escuela (RF-12, RF-13). Ese camino se entiende, pero le faltan pasos: nada dice cuándo debe estar listo, qué hago yo si el lunes RF-15 marca "falta un archivo", ni existe el paso de adaptar un material con IA desde la escuela.)
Puntaje bruto: 19/30 → **Score: 6.3/10**

Brechas detectadas:
1. Falta el plazo de entrega (N1): crear un RNF-09 "Plazo del paquete semanal" que diga que un paquete publicado hasta el viernes a una hora X debe estar completo y verificado en el nodo antes del lunes 7:00 a. m., y que si a una hora del domingo no se proyecta completarlo, el nodo o la central emitan una alerta al docente rural y al creador. Además modificar RF-10 para decir cómo se determinan las "ventanas de conectividad" (detección automática de señal por el nodo y reanudación sola al volver la señal, no un horario fijo configurado a mano).
2. No existe adaptación con IA para el docente rural (N3): crear un RF-16 "Adaptar material desde la escuela": el docente rural elige un material ya cargado en el nodo, selecciona el tipo de adaptación (cambiar contexto del ejercicio, simplificar lectura, generar más ejercicios del mismo tipo) usando las plantillas de RF-03 con campo de contexto local; el sistema envía a la central solo la solicitud liviana (no el archivo completo), aprovecha la caché de RF-06, devuelve el resultado en la misma sesión y lo guarda en el nodo. Verificación: con enlace de 1 Mbps el resultado llega en menos de N minutos; si se corta, la solicitud queda en cola y el resultado aparece en el nodo sin que yo la repita. Complementar con un RNF de tiempo de respuesta para el docente rural (RNF-06 solo cubre al creador).
3. RF-15 no distingue "no llegó" de "llegó dañado y se está volviendo a pedir": modificar RF-15 para que la pantalla muestre por archivo el estado (pendiente / dañado-reintentando / verificado) y la palabra "verificado" explícita, que es lo que necesito ver el lunes a las 7.
4. Falta qué hago cuando algo no llegó (flujo): crear un RF "Reintento y aviso desde el nodo" o ampliar RF-11 para que el docente rural pueda forzar la nueva petición de los archivos faltantes y avisar a la central desde la misma pantalla de RF-15.
5. RF-10 no dice cómo el nodo sabe qué grados y cursos tiene mi escuela para bajar solo lo que corresponde (con 300 MB por grado, bajar todos los grados del país es inviable por satélite): modificar RF-10 o crear un RF de "perfil de escuela" (grados y cursos configurados en la central) que filtre el paquete que se entrega a cada nodo.

Veredicto en primera persona: En lo de recibir y revisar sí me sirve: el paquete llega solo, continúa donde quedó, nada dañado pasa el checksum y en una sola pantalla veo qué tengo; mis alumnos lo toman de la red de la escuela sin volver a bajar nada. Lo que me falta es que alguien me prometa que estará antes del lunes y, sobre todo, poder adaptar un ejercicio con la IA desde mi escuela: hoy los requerimientos me dejan seguir haciéndolo a mano.

### Rocío Paredes — docente creadora de contenido (Matemática), central de Lima

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-02, RF-03, RF-04, RNF-06 | 5 | Genero desde plantilla con tipo, grado, competencia, tema y contexto regional, sin prompt libre ni pegar documentos (verificable: el campo no existe), guardado como borrador editable y, en modo inmediato, en menos de 60 s; el "adaptar" de RF-04 está menos detallado, pero la necesidad queda cubierta. |
| N2 | RF-04, RF-05, RF-07, RF-08 | 5 | Busco por grado, curso, competencia y tema; antes de generar el sistema me pone delante los equivalentes y si elijo uno gasta 0 tokens; cada material tiene costo consultable y veo consumo propio y del equipo frente al presupuesto semanal, con porcentaje. |
| N3 | RF-09, RF-10, RF-11, RF-14 | 5 | Publico el paquete por grado y curso con manifiesto (archivos, tamaños, checksums) y veo por escuela y semana pendiente / en curso (%) / completo y verificado, y "completo" solo se marca cuando el nodo verificó los checksums de RF-11. |
| P1 | RF-03, RF-06, RF-07, RF-08, RNF-01 | 3 | Desaparece el pegar el programa (no hay prompt libre), lo equivalente no vuelve al proveedor (0 tokens), cada material y cada semana tienen número, y la meta de −40 % se mide con los registros de RF-07 contra las cuatro semanas previas: atacan las causas que describo, no un síntoma vecino. |
| P2 | RF-04, RF-05 | 3 | Ya hay dónde buscar los ejercicios de fracciones de mi colega (mismo grado, competencia y tema) y el sistema me los muestra antes de que yo genere; si los tomo, la solicitud registra 0 tokens. |
| P3 | RF-09, RF-11, RF-14 | 3 | El estado por escuela y semana (pendiente, en curso con %, completo y verificado, atado a la verificación real del nodo) me dice el sábado si Loreto recibió el paquete sin esperar el WhatsApp del lunes; alertas y filtro por región serían mejoras, no la causa. |

Criterio 1: 15/15 · Criterio 2: 9/9 · Criterio 3: 3/6 (flujo leído: RF-01 entro → RF-05 el sistema me muestra equivalentes / RF-04 busco en la biblioteca → RF-03 lleno la plantilla → RF-02 recibo el borrador en <60 s (RNF-06) → RF-07/RF-08 veo el costo del material y el consumo frente al presupuesto → [paso sin requerimiento: cómo mi borrador queda marcado como final y entra al paquete de la semana] → RF-09 publico → RF-10/RF-11 llega y se verifica en la escuela → RF-14 veo el estado por escuela. El camino se entiende, pero ese paso no tiene requerimiento y quedan ambiguos quién elige el modo inmediato/lotes de RNF-06 y quién fija el presupuesto de RF-08.)
Puntaje bruto: 27/30 → **Score: 9.0/10**

Brechas detectadas:
1. Falta el paso entre "borrador editable" (RF-02) y "paquete de la semana" (RF-09): ningún requerimiento dice quién marca un material como final ni cómo se arma el paquete por grado y curso. Crear un RF "Armar paquete semanal" (el docente creador marca materiales como listos y los agrega al paquete de una semana/grado/curso; verificación: el manifiesto de RF-09 contiene exactamente los materiales marcados) o modificar RF-09 para incluirlo.
2. RNF-06 define modo inmediato y modo por lotes, pero ningún RF dice quién elige el modo ni cuál es el predeterminado. Modificar RF-02 para que la solicitud incluya el modo (inmediato por defecto) y su verificación.
3. RF-08 muestra consumo frente a presupuesto, pero no dice quién fija el presupuesto semanal ni muestra la reducción frente al promedio de las cuatro semanas previas que exige RNF-01. Crear un RF "Definir presupuesto semanal de tokens" (coordinador) y modificar RF-08 para mostrar el % de reducción frente a la línea base de RNF-01.
4. RF-04 dice "adaptarlos" sin decir cómo: si abre la plantilla de RF-03 prellenada, si llama a la IA y si ese consumo se registra en RF-07 sobre el material nuevo. Modificar RF-04 con ese detalle y su verificación, y explicitar que la biblioteca incluye materiales de todos los docentes creadores y muestra autor y costo (RF-07) de cada uno.
5. RF-02/RF-06 no dicen qué pasa cuando pido "otra versión" con los mismos campos (¿me devuelve la caché o llama a la IA?) ni muestran el costo de la solicitud en el momento de generar. Modificar RF-02 para mostrar tokens/costo de cada versión al entregar el borrador y RF-06 para definir el comportamiento de "nueva versión".
6. RF-14 no indica la fecha/hora del último reporte del nodo ni permite filtrar por región; con 5 000 escuelas (RNF-08) necesito ver Loreto de un vistazo. Modificar RF-14 para agregar último reporte y filtro/agrupación por región.

Veredicto: Sí me sirve: genero con plantillas sin pegar el programa, encuentro lo que ya hizo mi colega antes de gastar, veo números por material y por semana, y el sábado sé por escuela si el paquete llegó. Lo que me falta es que me digan cómo mi borrador termina dentro del paquete del viernes y quién fija el presupuesto contra el que me van a medir.

---

## Paso 2 — Reporte del juez Eval-Spec

# Reporte Eval-Spec — Requerimientos RemoteSchooly v1

## 0. Validación previa (paso 1 del procedimiento)

- Todos los puntajes están en los valores permitidos: Criterio 1 en {0, 2, 5}, Criterio 2 en {0, 1, 3}, Criterio 3 en {0, 3, 6}.
- Todos los IDs citados existen en la versión evaluada (RF-01 a RF-15, RNF-01 a RNF-08). Ningún ítem se anula por ID inexistente.
- La aritmética de las tres personas es correcta (12/30, 19/30, 27/30).

## 1. Auditoría de cada justificación contra el texto real del requerimiento (paso 2)

### Yesenia

| Ítem | Persona | Juez | Auditoría contra el texto citado |
| :--- | :--- | :--- | :--- |
| N1 | 2 | 2 | RF-13 dice quién (el alumno), qué produce (paquete de la semana de sus cursos en la tablet) y cómo se verifica (modo avión), pero no dice qué dispara la bajada; ningún RF/RNF fija "desde el lunes". Parcial se sostiene. |
| N2 | 2 | 2 | RF-15 muestra exactamente la información pedida (semana, cursos, archivos recibidos/esperados, estado), pero al docente rural en el nodo; RF-11 garantiza que lo del nodo está verificado. La información existe en el sistema y no llega a la tablet: parcial se sostiene (aceptado en el límite; no hay base en el procedimiento para bajarlo a 0 porque RF-15 sí dice lo que la persona afirma). |
| N3 | 0 | 0 | Confirmado: RF-13 dice "consulta"; no existe RF para responder, guardar ni enviar respuestas. |
| P1 | 3 | 3 | RF-12 (verificación: cero tráfico a la central) elimina la descarga satelital directa a la tablet, que es la causa de "la ruedita"; RF-11/RNF-03 (ningún archivo se muestra sin checksum) y RF-10/RNF-02 eliminan el "PDF a la mitad". La causa descrita desaparece. La copia nodo→tablet no tiene verificación propia: es brecha, no la causa descrita. |
| P2 | 1 | 1 | RF-15 y RF-14 informan al docente y a Lima, no a la tablet; la causa (la tablet no dice qué semana tiene) sigue. Aliviado. |
| P3 | 1 | 1 | Primera causa eliminada (RF-12 red local, RF-10 la escuela baja una sola vez); la segunda ("hacer la tarea sin internet") solo a medias: RF-13 permite consultar, no responder. Aliviado. |
| C3 | 3 | 3 | El flujo se lee hasta "abrir en casa en modo avión"; faltan el disparo de la bajada a la tablet, el aviso de semana nueva, responder y enviar. |

### Julián

| Ítem | Persona | Juez | Auditoría contra el texto citado |
| :--- | :--- | :--- | :--- |
| N1 | 2 | 2 | RF-10 cumple quién/cuándo/produce/verifica para la reanudación ("los bytes ya recibidos no se vuelven a descargar"), pero "ventanas de conectividad de la escuela" no dice cómo se detectan, no hay plazo "antes del lunes" y nada dice cómo el nodo sabe qué grados/cursos bajar. Parcial se sostiene. |
| N2 | 5 | 5 | RF-15 (docente rural; pantalla con semana, grados, cursos, recibidos/esperados y estado), RF-11 + RNF-03 (100 % SHA-256, nada se muestra sin checksum válido, lo dañado se vuelve a pedir) y RF-12 (verificación: cero tráfico a la central) cubren cada elemento de la necesidad con los cuatro componentes. Que la pantalla no etiquete "dañado-reintentando" es un refinamiento (brecha), no un elemento ausente. Total se sostiene. |
| N3 | 0 | 0 | Confirmado: RF-02 a RF-08 y RNF-06 nombran solo al docente creador; la columna Traza nunca cita "Julián N3". |
| P1 | 3 | 3 | RF-10 + RNF-02 eliminan exactamente "empezar desde cero" y el nodo baja sin intervención del docente; RNF-04 acota el tamaño. Resuelto. |
| P2 | 3 | 3 | RF-11 ("ningún archivo se muestra sin checksum válido") + RF-15 (estado antes de entrar al aula). Resuelto. |
| P3 | 3 | 3 | RF-09 manifiesto + RF-15 recibidos/esperados; RF-12 y RF-13 hacen que los alumnos tomen del nodo por red local. Resuelto. |
| C3 | 3 | 3 | Flujo legible de RF-01 a RF-13; faltan plazo, acción ante "falta un archivo" y el paso de adaptación. |

### Rocío

| Ítem | Persona | Juez | Auditoría contra el texto citado |
| :--- | :--- | :--- | :--- |
| N1 | 5 | **2** | RF-02 + RF-03 + RNF-06 cubren "generar desde plantillas sin pegar documentos" con verificación. Pero la necesidad dice "generar **y adaptar** materiales con la IA desde plantillas": "adaptar" aparece solo como la palabra "adaptarlos" en RF-04, sin cuándo se activa, sin qué produce y sin verificación (la de RF-04 solo cubre la búsqueda) y sin mencionar IA ni plantillas. Además "en la misma sesión de trabajo" depende del modo inmediato de RNF-06, que ningún RF asigna a la solicitud de RF-02. Falta un elemento de la necesidad con quién/cuándo/qué/verifica → parcial (regla 1 de la rúbrica; regla 4 ante la duda). La propia persona lo reconoce ("menos detallado") y lo lista como brechas 2 y 4. |
| N2 | 5 | 5 | RF-04 (búsqueda por grado, curso, competencia y tema; verificación), RF-05 (equivalentes antes de generar; 0 tokens), RF-07 (costo por material consultable), RF-08 (propio y del equipo frente al presupuesto, con %). Cada uno con los cuatro componentes. Total. |
| N3 | 5 | 5 | RF-09 (publica por grado y curso; manifiesto verificable) + RF-14 (pendiente / en curso % / completo y verificado, atado a RF-11). Total. |
| P1 | 3 | 3 | RF-03 elimina el pegado (verificación: no existe prompt libre); RF-07/RF-08 eliminan "no veo ningún número". Las "cinco versiones" quedan medidas por material; el comportamiento de "otra versión" (RF-06) queda como refinamiento (brecha). Se acepta. |
| P2 | 3 | 3 | RF-04 + RF-05 atacan la causa exacta (no hay dónde buscar). Resuelto. |
| P3 | 3 | 3 | RF-14 da estado por escuela y semana atado a la verificación real del nodo. Resuelto. |
| C3 | 3 | 3 | Flujo legible; falta el paso borrador → paquete y quedan ambiguos quién elige el modo (RNF-06) y quién fija el presupuesto (RF-08). |

## 2. Tabla de resultados (formato Eval-Spec)

| Persona | Criterio 1 (/15) | Criterio 2 (/9) | Criterio 3 (/6) | Bruto (/30) | Score (/10) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Yesenia | 4 | 5 | 3 | 12 | 4.0 |
| Julián | 7 | 9 | 3 | 19 | 6.3 |
| Rocío | 12 | 9 | 3 | 24 | 8.0 |
| **PROMEDIO** | 7.7 | 7.7 | 3.0 | 18.3 | **6.1** |

**Ajustes del juez:**

1. Rocío, N1, 5 → 2. "Adaptar con la IA desde plantillas" no tiene requerimiento con cuándo / qué produce / cómo se verifica (RF-04 solo dice "adaptarlos" y su verificación cubre la búsqueda); "en la misma sesión" depende de un modo inmediato (RNF-06) que ningún RF asigna a la solicitud. Cobertura parcial por regla 1 y regla 4 de la rúbrica. Efecto: Rocío 27 → 24, score 9.0 → 8.0.
2. Sin cambio — Yesenia N2 (2): aceptado en el límite; RF-15 sí dice lo que la persona afirma, por lo que el procedimiento no autoriza bajarlo a 0.
3. Sin cambio — Julián N2 (5): los cuatro componentes están en RF-15, RF-11, RNF-03 y RF-12; la etiqueta "dañado-reintentando" es refinamiento.
4. Sin cambio — Rocío P1 (3): las causas descritas (pegar el programa, no ver números) se eliminan con verificación en RF-03, RF-07 y RF-08.

**Cálculo del promedio (paso 3):**

- Yesenia: 4 + 5 + 3 = 12 → 12 / 3 = 4.0
- Julián: 7 + 9 + 3 = 19 → 19 / 3 = 6.33… → 6.3 (sin redondear hacia arriba)
- Rocío: 12 + 9 + 3 = 24 → 24 / 3 = 8.0
- Promedio = (4.0 + 6.3 + 8.0) / 3 = 18.3 / 3 = 6.1 (comprobación sobre brutos: 55 / 3 = 18.33 → 18.33 / 3 = 6.11 → 6.1)

**Calidad = 6.1 × 10 = 61 %**

**Umbral (paso 4):** promedio 6.1 < 8.0; además Yesenia 4.0 < 7.0 y Julián 6.3 < 7.0 (Rocío 8.0 cumple).

**Estado: FAILED**

## 3. Brechas priorizadas (paso 5)

Consolidación: se fusionaron Yesenia b4 + Yesenia b5 + Julián b1 (plazo y disparo de extremo a extremo); se renumeraron los "RF-16" que Yesenia y Julián propusieron por separado para evitar colisión de IDs. Puntos: cuánto recuperaría cada brecha en el puntaje bruto. Para aprobar se necesita sumar al menos +17 brutos entre las tres (55 → 72) y que Yesenia suba +9 y Julián +2.

| Prioridad | Qué falta | A quién afecta | Qué RF/RNF crear o modificar | Puntos |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Nada fija que el paquete esté listo "antes del lunes", cómo el nodo detecta las horas con señal ni qué dispara la bajada del paquete a la tablet; la copia en la tablet no se verifica. | Yesenia N1 y C3; Julián N1 y C3 (2 personas) | **Crear RNF-09 "Plazo del paquete semanal"**: paquete publicado hasta el viernes a hora X debe estar completo y verificado (RF-11) en el nodo antes del lunes 07:00; si el domingo a hora Y no se proyecta completar, alerta al docente rural y al docente creador. **Modificar RF-10**: el nodo detecta automáticamente la señal y reanuda solo (no horario configurado a mano). **Modificar RF-09**: fecha/hora límite de publicación. **Modificar RF-13**: al conectarse la tablet a la red escolar se baja sola el paquete nuevo de sus cursos (o aparece aviso "hay Semana N") y la copia se verifica contra el checksum del manifiesto (extender RF-11 a la tablet). | ≈ +6 (Y N1 +3, J N1 +3 junto con prioridad 7) más aporte a C3 de ambos |
| 2 | Ningún requerimiento permite responder ejercicios/cuestionarios sin conexión ni enviar las respuestas solas al volver la señal. | Yesenia N3, P3, C3 | **Crear RF-16 "Responder ejercicios y cuestionarios sin conexión"**: la alumna abre un ejercicio del paquete en modo avión, responde y las respuestas se guardan en la tablet; verificación: al reabrir la tablet las respuestas siguen. **Crear RF-17 "Envío automático de respuestas"**: al conectarse a la red escolar se envían al nodo y de ahí a la central sin intervención, con marca "enviada"; verificación: el docente ve las respuestas y la tablet no muestra pendientes. | +7 (N3 +5, P3 +2) más aporte a C3. Única vía para que Yesenia alcance 7.0 |
| 3 | La tablet no muestra qué semana, grado y cursos tiene ni si está completa; no avisa si hay una semana más nueva en el nodo. | Yesenia N2, P2, C3 | **Crear RF-18 "Estado del paquete en la tablet"** (equivalente de RF-15 para la alumna): pantalla inicial con semana, grado, cursos, archivos recibidos/esperados y estado completo / incompleto (falta X), sin abrir archivos; aviso "tienes Semana 11, en la escuela ya está la 12"; verificación en modo avión. | +5 (N2 +3, P2 +2) |
| 4 | No existe adaptación de materiales con IA para el docente rural desde la escuela con conexión lenta. | Julián N3, C3 | **Crear RF-19 "Adaptar material desde la escuela"**: el docente rural elige un material del nodo y un tipo de adaptación (cambiar contexto, simplificar lectura, generar más ejercicios) con las plantillas de RF-03 y campo de contexto local; se envía solo la solicitud liviana (no el archivo), aprovecha la caché de RF-06, el resultado se guarda en el nodo; si se corta, la solicitud queda en cola y el resultado aparece sin repetirla. **Crear RNF-10** (o extender RNF-06): tiempo de respuesta sobre enlace de 1 Mbps y comportamiento en cola para el docente rural. | +5 (N3) más aporte a C3 |
| 5 | "Adaptar" en RF-04 no dice cómo se hace, si llama a la IA, qué produce ni cómo se verifica; ningún RF dice quién elige el modo inmediato/lotes de RNF-06 ni cuál es el predeterminado. | Rocío N1 (ajustada), C3 | **Modificar RF-04**: adaptar = abrir la plantilla de RF-03 prellenada con el material, llamar a la IA, producir un nuevo borrador y registrar su costo en RF-07; verificación explícita; la biblioteca incluye materiales de todos los creadores y muestra autor y costo. **Modificar RF-02**: la solicitud incluye el modo (inmediato por defecto) y su verificación. Compartir mecanismo con la prioridad 4. | +3 (N1) más aporte a C3 |
| 6 | Falta el paso entre "borrador editable" (RF-02) y "paquete semanal" (RF-09): quién marca un material como final y cómo entra al paquete por grado y curso. | Rocío C3 | **Crear RF-20 "Armar paquete semanal"**: el docente creador marca materiales como listos y los agrega al paquete semana/grado/curso; verificación: el manifiesto de RF-09 contiene exactamente los materiales marcados. (O modificar RF-09 para incluirlo.) | +3 (C3, junto con prioridades 5 y 9) |
| 7 | RF-10 no dice cómo el nodo sabe qué grados y cursos tiene la escuela para bajar solo lo que corresponde (300 MB por grado hace inviable bajar todo). | Julián N1, C3 | **Crear RF-21 "Perfil de escuela"**: grados y cursos por escuela configurados en la central; RF-10 filtra el paquete entregado a cada nodo (o modificar RF-10). | Necesario, con la prioridad 1, para J N1 +3 |
| 8 | No hay paso para el lunes en que RF-15 marca "falta un archivo": no se distingue "no llegó" de "dañado-reintentando" ni hay acción del docente rural. | Julián C3 (refina N2/P2) | **Modificar RF-15**: estado por archivo (pendiente / dañado-reintentando / verificado) con la palabra "verificado". **Modificar RF-11** o **crear RF-22 "Reintento y aviso desde el nodo"**: el docente rural fuerza la nueva petición de faltantes y avisa a la central desde la pantalla de RF-15. | +3 (C3, junto con prioridades 1, 4 y 7) |
| 9 | RF-08 no dice quién fija el presupuesto semanal ni muestra la reducción frente al promedio de las cuatro semanas previas que exige RNF-01. | Rocío C3 | **Crear RF-23 "Definir presupuesto semanal de tokens"** (coordinador). **Modificar RF-08**: mostrar % de reducción frente a la línea base de RNF-01. | Aporte a C3 de Rocío |
| 10 | RF-02/RF-06 no dicen qué pasa al pedir "otra versión" con los mismos campos (¿caché o IA?) ni muestran el costo en el momento de generar. | Rocío P1 (refinamiento) | **Modificar RF-02**: mostrar tokens/costo de cada versión al entregar el borrador. **Modificar RF-06**: definir el comportamiento de "nueva versión". | 0 directos; consolida P1 y RNF-01 |
| 11 | RF-14 no indica fecha/hora del último reporte del nodo ni permite filtrar por región (5 000 escuelas, RNF-08). | Rocío P3 (refinamiento) | **Modificar RF-14**: agregar último reporte y filtro/agrupación por región. | 0 directos |

## 4. Lectura del juez

Los requerimientos v1 resuelven bien la cadena central-nodo (publicar, distribuir reanudable, verificar, estado por escuela) y la generación con plantillas del docente creador: por eso Julián obtiene 9/9 en pain points y Rocío queda en 8.0. Fallan en los extremos: la alumna no tiene ningún requerimiento propio más allá de RF-13 (no puede saber qué tiene ni responder nada sin conexión) y el docente rural no tiene acceso a la IA. Con las prioridades 1 a 3 Yesenia sube de 12 a 30 brutos; con las prioridades 1, 4, 7 y 8 Julián sube de 19 a 30; con las prioridades 5, 6 y 9 Rocío sube de 24 a 30. La siguiente iteración debe atacar las prioridades 1 a 5 como mínimo para tener opción de PASSED.


---

## Qué se corrige en la iteración 2

Las brechas priorizadas del juez se convierten en los cambios de la v2 de los requerimientos (ver [EVAL/iteracion-2.md](iteracion-2.md) y el historial al final de [Requerimientos/Funcionales.md](../Requerimientos/Funcionales.md)).
