# EVAL — Iteración 2

**Registro de la iteración**

| Campo | Valor |
| :--- | :--- |
| Versión de requerimientos evaluada | v2 (RF-01 a RF-26, RNF-01 a RNF-11), escrita a partir de las 11 brechas priorizadas del juez en la iteración 1 |
| Fecha | 2026-09-06 |
| Modelo usado | Claude (Fable 5.1) en Claude Code: tres subagentes-persona independientes en paralelo + un subagente juez, siguiendo los prompts de [Agents/README.md](../Agents/README.md); ningún agente vio la iteración anterior |
| Resultado | **PASSED — Calidad 93 %** (promedio 9.3/10; Yesenia 10,0 · Julián 9,0 · Rocío 9,0; umbral 8,0 y ninguna persona < 7,0) |

**Qué cambió respecto a la v1:** inicio de sesión sin internet contra el roster del nodo (RF-03); respuestas sin conexión y envío automático (RF-23, RF-24); estado de la semana en la tablet (RF-21); adaptación de materiales desde la escuela (RF-19); publicación el jueves y plazo lunes 07:00 (RF-13, RNF-09); registro de grados por escuela (RF-02); estado por archivo y acciones del docente rural (RF-17); presupuesto, cuota y línea base (RF-11); paso borrador → paquete (RF-12); último contacto, filtro por región y alerta del domingo (RF-25, RF-26). Detalle en el historial de [Requerimientos/Funcionales.md](../Requerimientos/Funcionales.md).

---

## Paso 1 — Evaluaciones por persona (tal como salieron)

### Yesenia Quispe — alumna de escuela rural (13 años, 2.º de secundaria, I.E. de Huayllabamba, Ocongate, Cusco)

## Evaluación de Yesenia (alumna de escuela rural) — Requerimientos v2

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-13, RF-14, RF-15, RF-16, RF-20, RF-22, RF-03, RNF-04, RNF-05, RNF-09 | 5 | El paquete de mi grado se publica el jueves a las 20:00 (RF-13), el nodo de la escuela lo baja solo cuando hay señal, reanuda y verifica cada archivo (RF-14, RF-15, RF-16) antes del lunes 07:00 (RNF-09), mi tablet lo copia sola al conectarse a la red de la escuela (RF-20) y en mi casa en modo avión abro lecturas, videos cortos y ejercicios (RF-22) con la sesión ya guardada (RF-03); cada paso dice quién, cuándo, qué produce y cómo se prueba. |
| N2 | RF-21, RF-20, RF-16, RF-12 | 5 | La pantalla de inicio me dice semana, grado, cursos, archivos recibidos/esperados y "completa / incompleta (falta X)" sin abrir archivo por archivo (RF-21), y ese "completa" sale de comparar el SHA-256 con el manifiesto versionado (RF-12, RF-16, RF-20); la verificación es literal: en modo avión sale "Semana 12 — Matemática, Comunicación… — completa". |
| N3 | RF-23, RF-24, RF-14, RNF-05 | 5 | Respondo ejercicios y cuestionarios sin conexión y se guardan con fecha y hora aunque cierre la app (RF-23); al volver a la red de la escuela se envían solas al nodo, se marcan "entregadas" y el nodo las sube a la central en su siguiente sincronización (RF-24, RF-14); verificado con modo avión y reconexión, y RNF-05 dice que funciona toda la semana sin internet. |
| P1 | RF-15, RF-16, RF-20, RF-18, RF-12, RNF-02, RNF-04 | 3 | Ya no bajo nada yo desde internet: el nodo baja por rangos de bytes y reanuda perdiendo como máximo 1 MB (RF-15, RNF-02), nada se muestra si no pasa el SHA-256 y lo dañado se vuelve a pedir solo (RF-16, RF-20), el video viene corto y ligero (RF-12, RNF-04) y yo lo tomo de la red local (RF-18); la ruedita eterna y el PDF a la mitad desaparecen de raíz. |
| P2 | RF-21, RF-13, RF-12, RF-20 | 3 | La tablet me dice qué semana tengo y me avisa si en el nodo hay una más nueva (RF-21), cada paquete lleva versión y nunca se mezclan semanas (RF-12, RF-13) y la semana nueva se baja sola al conectarme (RF-20); ya no me entero por el profe de que hice otra tarea. |
| P3 | RF-18, RNF-05, RF-14, RF-22, RF-23, RF-24, RF-03 | 3 | Internet se usa una sola vez por escuela y semana (RNF-05, RF-14) y los 40 tomamos del nodo por la red local sin tráfico a la central (RF-18), así que ya no bajamos todos lo mismo a la vez; en casa leo (RF-22), respondo (RF-23) y se envía solo después (RF-24) con la sesión guardada (RF-03). |

Criterio 1: 15/15 · Criterio 2: 9/9 · Criterio 3: 6/6

Flujo leído: me registran en el roster de mi escuela y grado (RF-02) → entro con mi PIN en la red de la escuela sin internet y la sesión se queda en la tablet (RF-03) → el jueves 20:00 se publica el paquete de mi grado (RF-13) → el nodo lo baja solo cuando hay señal, reanuda y verifica cada archivo antes del lunes 07:00 (RF-14, RF-15, RF-16, RNF-09) → mi tablet lo copia sola al conectarse a la red de la escuela (RF-20) → la pantalla de inicio dice "Semana 12 — completa" (RF-21) → en casa en modo avión leo y veo los videos (RF-22) y respondo los ejercicios (RF-23) → al volver a la escuela mis respuestas se envían solas al nodo y de ahí a la central (RF-24, RF-14); si algo faltó, el domingo el sistema avisa a los profes (RF-26). Cada paso tiene su requerimiento y no me quedan huecos en el camino.

Puntaje bruto: 30/30 → **Score: 10.0/10**

Brechas detectadas (menores: no me bajan puntos porque los requerimientos principales sí dicen quién, cuándo, qué y cómo se verifica, pero las arreglaría):
1. RF-18 / RF-20: dicen que el nodo atiende hasta 40 dispositivos y que la tablet baja sola, pero no cuánto demora bajar los 100 MB a mi tablet cuando los 40 estamos conectados en clase, ni cuentan los dispositivos de los profes. Modificar RF-18 o RF-20 con un tiempo medible (p. ej., "la semana completa llega a una tablet en menos de 10 minutos con 40 tablets conectadas") y una capacidad con margen (40 alumnos + docentes).
2. RF-12: las variantes ligeras son PDF, imágenes, audio y video, pero no dice en qué formato viajan los ejercicios y cuestionarios para que yo pueda marcar respuestas en la tablet como promete RF-23. Modificar RF-12 para que las fichas y cuestionarios se empaqueten en un formato respondible (no solo PDF).
3. RF-20: se activa "cuando la tablet se conecta"; si el nodo termina de verificar la semana mientras yo ya estoy conectada en clase, no dice si la tablet vuelve a revisar. Modificar RF-20 para que la tablet revise el nodo cada cierto tiempo mientras esté en la red de la escuela (como el nodo hace cada 10 minutos en RF-14).
4. RNF-09 / RF-26: aceptan que hasta 5 % de las escuelas no tengan la semana el lunes y el aviso del domingo va a los profes; a mí solo me queda "incompleta (falta X)" en RF-21. Modificar RF-21 para que, si mi escuela salió en la alerta de RF-26, la tablet me muestre ese aviso al conectarme y sepa que el problema es la antena y no mi tablet.

Veredicto: Sí me sirve. Si el lunes abro la tablet en mi casa sin internet, va a decir "Semana 12 — completa", voy a poder abrir todo y responder, y mis respuestas se van solas cuando vuelva a la escuela. Lo único que pediría es que digan cuánto demora bajar a la tablet en la escuela y en qué formato llegan los ejercicios para poder responderlos.

### Julián Huamán — Docente de aula multigrado, escuela rural de San Juan de Yanayacu (río Marañón, Loreto)

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-02, RF-12, RF-13, RF-14, RF-15, RF-16, RF-26, RNF-02, RNF-04, RNF-07, RNF-09 | 5 | El nodo de la escuela revisa la señal cada 10 minutos y baja solo lo que falta sin que yo toque nada (RF-14, RNF-07), reanuda por rangos de bytes con prueba medible de 50 MB y cortes cada 30 s (RF-15, RNF-02), hay un paquete por cada uno de mis 3 grados publicado el jueves 20:00 (RF-02, RF-12, RF-13), plazo lunes 07:00 y alerta del domingo si no llegó (RNF-09, RF-26); 3 × ≤100 MB caben en mis horas de madrugada (RNF-04). |
| N2 | RF-17, RF-16, RF-18, RF-20, RF-03, RNF-05 | 5 | RF-17 es la pantalla que pedí, casi con mi texto literal ("Semana N: completa y verificada, G grados, A archivos"), con estado por archivo y lo que falta; RF-16 garantiza que nada se muestra sin verificar; RF-18 y RF-20 hacen que las tablets tomen todo del nodo sin tráfico a la central y RF-03 nos deja entrar sin internet (RNF-05). |
| N3 | RF-19, RF-09, RF-08, RNF-06 | 5 | RF-19 dice quién (yo, desde la App Escuela), cuándo (elijo un material del nodo y un tipo de adaptación), qué produce (el nuevo material en la misma pantalla, guardado en el nodo) y cómo se verifica (< 10 min con 1 Mbps; si se corta, reenvía solo); RF-09 nombra justo mis tres adaptaciones y RNF-06 fija el tiempo. |
| P1 | RF-15, RF-14, RNF-02, RNF-04 | 3 | La causa era volver a empezar desde cero: RF-15 continúa desde el último byte (≤ 1 % de bytes repetidos) y RNF-02 dice que nunca reinicia; además ya no soy yo quien baja el domingo, lo hace el nodo solo (RF-14), y los videos van cortos (RNF-04). |
| P2 | RF-16, RF-17, RNF-03 | 3 | RF-16 compara el SHA-256 de cada archivo contra el manifiesto sin internet, vuelve a pedir solo ese archivo si falla y no lo muestra a nadie antes de verificarlo; RF-17 me marca "dañado-reintentando" antes del lunes; RNF-03 exige 100 % de archivos íntegros. |
| P3 | RF-17, RF-18, RF-20, RNF-05 | 3 | Las dos causas desaparecen: RF-17 me dice en una sola pantalla qué tengo y qué falta, y RF-18/RF-20 hacen que los 28 alumnos tomen el material del nodo por la red local, con verificación de que no hay tráfico hacia la central (RNF-05: una sola descarga por escuela y semana). |

Criterio 1: 15/15 · Criterio 2: 9/9 · Criterio 3: 3/6
Flujo leído: el coordinador registra mi escuela con sus 3 grados, el roster y el token (RF-02) → Lima marca materiales "listos" y arma un paquete por grado con manifiesto y hash (RF-12) → el jueves 20:00 se publica y nace una entrega pendiente por grado (RF-13) → el nodo revisa señal cada 10 min y, cuando hay, pide solo lo que falta (RF-14), baja por rangos y reanuda (RF-15), verifica SHA-256 y acusa recibo (RF-16), con plazo lunes 07:00 (RNF-09) y alerta del domingo (RF-26) → yo entro sin internet (RF-03) y veo "Semana N: completa y verificada, 3 grados, A archivos" (RF-17) → las tablets bajan solas del nodo sin tocar internet (RF-20, RF-18) y las respuestas vuelven al nodo (RF-24) → pido una adaptación desde la escuela (RF-19 → RF-09) y aparece en la misma pantalla en < 10 min con señal (RNF-06). Pasos ambiguos: en qué modo entra mi pedido a la IA (RF-08 decide por urgencia y RF-04 pone "para la próxima semana" por defecto, que "nunca se envía en modo inmediato"; nadie dice que lo mío va como "ahora"), cómo indico mi contexto local si RF-04 prohíbe texto libre, y cómo el material adaptado "local" llega a las tablets de mis alumnos (RF-18/RF-20 solo hablan de los materiales verificados del paquete).
Puntaje bruto: 27/30 → **Score: 9.0/10**

Brechas detectadas:
1. **RF-19 / RF-08 — modo de mi adaptación.** RF-19 y RNF-06 prometen < 10 min, pero RF-08 enruta por urgencia y RF-04 pone "para la próxima semana" por defecto (lote, < 24 h). Modificar RF-19 (o RF-08) para decir explícitamente que la adaptación pedida desde la escuela entra con urgencia "ahora" (modo inmediato, modelo económico), y qué veo si RF-11 tiene la cuota del equipo al 100 % (¿se rechaza, se encola, me avisa?) y contra qué cuota se carga mi pedido, ya que RF-11 solo define cuota por docente creador.
2. **RF-19 — cómo indico "su contexto local".** RF-04 prohíbe texto libre y solo tiene "contexto regional" como campo cerrado; RF-19 no dice si en la escuela hay una lista de contextos comunitarios o un campo corto. Sin eso no sé si puedo pedir "cosecha de yuca" o solo "Amazonía". Modificar RF-19 para definir el campo y su verificación.
3. **RF-18 / RF-20 (o RF-19) — el material adaptado a las tablets.** RF-19 lo guarda como "material local de la escuela", pero RF-18 sirve "materiales verificados" del manifiesto y RF-20 baja "el paquete de la semana de su grado". Falta decir que el material local queda en el catálogo del nodo para el grado que elija y que las tablets lo toman por la red local igual que el paquete, con su verificación.
4. **RF-12 — archivo dañado en origen (menor).** RF-16 garantiza que llegó idéntico a lo publicado, no que lo publicado abra. Modificar RF-12 para validar que la variante ligera abre correctamente (PDF válido) antes de calcular el hash y marcarlo listo.
5. **RF-17 / RNF-10 — dónde veo la pantalla (menor).** RNF-10 dice que la App Escuela corre en tablets Android y el nodo en la laptop; RF-17 dice que veo el estado "en la App Escuela". Aclarar que la pantalla de estado del nodo se puede ver en la laptop de la escuela (mi "pantalla de la escuela"), no solo en una tablet.

Veredicto: Sí me sirve, y mucho: por primera vez el paquete de mis tres grados llega solo aprovechando la madrugada, reanuda donde quedó, se verifica archivo por archivo y el lunes veo en una pantalla si está completo, mientras mis 28 alumnos lo toman de la red de la escuela sin volver a bajar nada. Lo que me falta es que cierren el camino de la adaptación: que digan que mi pedido va "ahora" y no al lote de la próxima semana, cómo le indico "cosecha de yuca" sin texto libre, y cómo ese ejercicio adaptado llega a las tablets de mis alumnos.

### Rocío Paredes — docente creadora de contenido (Matemática), central de Lima

## Evaluación de Rocío (docente creadora de contenido, central de Lima) — Requerimientos v2

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-04, RF-05, RF-08, RF-09, RNF-06 | 5 | Pido desde una plantilla con campos cerrados (tipo, grado, curso, competencia, tema del catálogo, contexto regional, idioma, urgencia) y el formulario no acepta texto libre ni adjuntos (RF-04); el currículo entra solo por fragmentos ≤ 1 000 tokens con tope verificable de 3 000 de entrada (RF-05); con urgencia "ahora" recibo el borrador editable en < 60 s (RF-08, RNF-06) y adapto un material mandando solo su referencia (RF-09): quién, cuándo, qué produce y cómo se verifica están escritos. |
| N2 | RF-06, RF-10, RF-11, RF-04, RNF-11 | 5 | Antes de llamar a la IA el sistema me muestra los materiales de todos los creadores que coinciden en grado, competencia, tema y tipo, con autor, fecha y costo, y si reutilizo la solicitud registra 0 tokens (RF-06); cada material tiene su costo consultable en el Portal (RF-04, RF-10, RNF-11) y veo mi consumo y el del equipo frente al presupuesto semanal, con % usado y % de reducción frente a la línea base (RF-11). |
| N3 | RF-12, RF-13, RF-25, RF-16, RNF-07 | 5 | Marco cada material como listo y lo asigno a semana, grado y curso (RF-12); el jueves 20:00 el sistema publica y crea una entrega pendiente por cada escuela-grado (RF-13); y veo por escuela, con filtro por región y UGEL, si está pendiente / en curso (% de bytes) / completa y verificada (fecha del acuse de RF-16) / sin contacto, con datos de ≤ 10 min de antigüedad (RF-25, RNF-07): son exactamente mis tres estados, y uno más. |
| P1 | RF-04, RF-05, RF-07, RF-10, RF-11 | 3 | Ya no puedo pegar el programa completo (RF-04) y el sistema añade solo los fragmentos que tocan, con un tope medible (RF-05); "otra versión" envía solo la instrucción de variación y debe costar menos de la mitad (RF-07); y el número que nunca vi aparece junto a cada borrador (RF-04, RF-10) y en mi pantalla de cuota, con aviso al 80 % y bloqueo del modo "ahora" al 100 % (RF-11): la causa desaparece. |
| P2 | RF-06, RF-07, RF-09 | 3 | Los ejercicios de fracciones de mi colega me aparecen solos antes de generar, filtrados por grado, competencia, tema y tipo, con autor, fecha y costo, y usarlos registra 0 tokens (RF-06); si alguien pidió algo equivalente en 90 días la caché lo devuelve sin llamar al proveedor (RF-07); y los adapto sin reenviar el archivo (RF-09): ya hay dónde buscarlos y no vuelvo a generar desde cero. |
| P3 | RF-25, RF-26, RF-16, RNF-07, RNF-09 | 3 | Dejo de enterarme por WhatsApp: en el Portal veo, escuela por escuela y filtrando Loreto, si la entrega está pendiente, en curso, completa (solo con el acuse de RF-16) o sin contacto tras 48 h (RF-25), con retraso máximo de 10 min (RNF-07); el domingo a las 18:00 tengo la lista de escuelas incompletas (RF-26) y la meta del lunes 07:00 (≥ 95 % completas) es verificable (RNF-09). |

**Criterio 1: 15/15 · Criterio 2: 9/9 · Criterio 3: 3/6**

Flujo leído: entro al Portal (RF-01) → pido un material desde plantilla con urgencia (RF-04) → el sistema me muestra lo reutilizable de la biblioteca (RF-06) o responde desde caché (RF-07) → si hay que generar, arma el prompt con fragmentos del currículo (RF-05), elige modelo y modo por regla (RF-08) y me entrega el borrador con sus tokens y costo (RF-04, RF-10) → pido "otra versión" o adapto (RF-07, RF-09) → veo mi gasto y el del equipo frente al presupuesto (RF-11) → marco el material como listo y lo asigno a semana/grado/curso (RF-12) → "al cerrar la semana" se arma el paquete por grado con manifiesto (RF-12) → jueves 20:00 se publica y nacen las entregas pendientes (RF-13) → veo por escuela pendiente / en curso / completa / sin contacto (RF-25) y la alerta del domingo (RF-26). El camino se entiende de punta a punta, pero tiene dos pasos ambiguos: nadie dice **quién cierra la semana ni cuándo** (RF-12 lo usa como disparador y RF-13 solo publica "los que estén armados"), y nadie define **cuándo un material queda "aprobado"** para entrar en la biblioteca de RF-06 (RF-12 habla de "listo", no de "aprobado"). Ante la duda entre 6 y 3, asigno 3.

**Puntaje bruto: 27/30 → Score: 9.0/10**

**Brechas detectadas:**

1. **RF-12 (modificar):** "Al cerrar la semana" no dice quién cierra la semana ni a qué hora. Hay que fijar el disparador (por ejemplo: el sistema cierra automáticamente el jueves a las 19:00, o el coordinador pulsa "cerrar semana" antes del jueves 20:00) y decir qué pasa con un material marcado "listo" después del cierre (¿entra al paquete siguiente?), con su verificación.
2. **RF-06 / RF-12 (modificar):** RF-06 busca en la "biblioteca de materiales aprobados", pero ningún requerimiento dice quién aprueba un material ni cuándo entra a la biblioteca; RF-12 usa "listo". Hay que escribir que un material marcado "listo" (o publicado por RF-13) pasa a la biblioteca de reutilización, y verificarlo: "todo material publicado aparece en la búsqueda de RF-06 a partir del jueves 20:05". Si el borrador de mi colega nunca fue "aprobado", hoy no lo encuentro.
3. **RF-08 / RF-12 (modificar):** una solicitud "para la próxima semana" puede tardar hasta 24 h (RF-08, RNF-06); si la pido el jueves por la tarde llega después de las 20:00 y queda fuera del paquete. Falta una **hora de corte** para pedir en lote y llegar al paquete de esa semana (por ejemplo, miércoles 20:00), y que el Portal me avise si pido después de esa hora.
4. **RF-06 (ampliar) o nuevo RF "Buscar en la biblioteca":** la búsqueda solo se activa cuando abro una solicitud de material. Necesito también buscar libremente por tema, grado y competencia sin iniciar una generación, para planificar la semana viendo lo que ya existe.
5. **RF-26 (modificar):** la lista de escuelas incompletas se me muestra "en su próxima conexión"; si no entro al Portal el domingo, me entero el lunes, como hoy. Hay que añadir una notificación al docente creador (correo o mensaje) el domingo a las 18:00, con verificación ("todo docente creador con escuelas incompletas recibe el aviso antes de las 18:10").

**Veredicto:** Sí me sirve: genero con plantillas sin pegar nada, el sistema me pone delante lo que ya existe antes de gastar un token, por fin veo el costo de cada material y lo que lleva el equipo frente al presupuesto, y el sábado puedo mirar escuela por escuela cómo va la entrega. Lo que me falta es que alguien escriba quién cierra la semana y cuándo un material entra a la biblioteca: en esos dos pasos mi flujo depende de una palabra que nadie define.

---

## Paso 2 — Reporte del juez Eval-Spec

# Eval-Spec — Reporte del juez · Requerimientos v2 (iteración 2)

## 1. Validez formal de las evaluaciones

| Persona | Criterio 1 (0/2/5 por ítem) | Criterio 2 (0/1/3 por ítem) | Criterio 3 (0/3/6) | IDs citados |
| :--- | :--- | :--- | :--- | :--- |
| Yesenia | N1=5, N2=5, N3=5 (válidos) | P1=3, P2=3, P3=3 (válidos) | 6 (válido) | Todos existen (RF-03, RF-12–RF-16, RF-18, RF-20–RF-24, RNF-02, RNF-04, RNF-05, RNF-09) |
| Julián | N1=5, N2=5, N3=5 (válidos) | P1=3, P2=3, P3=3 (válidos) | 3 (válido) | Todos existen (RF-02, RF-03, RF-08, RF-09, RF-12–RF-20, RF-26, RNF-02–RNF-07, RNF-09) |
| Rocío | N1=5, N2=5, N3=5 (válidos) | P1=3, P2=3, P3=3 (válidos) | 3 (válido) | Todos existen (RF-04–RF-13, RF-16, RF-25, RF-26, RNF-06, RNF-07, RNF-09, RNF-11) |

Las tres evaluaciones usan los valores permitidos por la rúbrica y ningún ítem cita un ID inexistente. Ningún ítem cae a 0 por la regla 3.

## 2. Auditoría de cada justificación contra el texto del requerimiento

Regla aplicada: un 5 o un 3 solo se sostiene si el requerimiento citado dice quién, cuándo se activa, qué produce y cómo se verifica (regla 1); las promesas sin valor medible bajan a parcial (regla 2); ante la duda, el menor (regla 4). Se evalúa el texto, no la intención.

### 2.1 Yesenia (alumna, Huayllabamba)

| Ítem | Puntaje | Verificación contra el texto citado | Decisión |
| :--- | :--- | :--- | :--- |
| N1 | 5 | RF-13: "El jueves a las 20:00 el sistema publica… crea una entrega en estado pendiente" (verif. jueves 20:05). RF-14: "comprueba cada 10 minutos… Nada de esto requiere intervención del docente" (verif. <10 min). RF-15: rangos de bytes, reanuda (verif. 50 MB, cortes cada 30 s, ≤1 %). RF-16: SHA-256 contra manifiesto, "ningún archivo se muestra… antes de estar verificado". RNF-09: "completo y verificado… antes del lunes a las 07:00" (verif. ≥95 %). RF-20: "cuando la tablet… se conecta a la red de la escuela… descarga sola… verifica cada archivo" (verif. "sin tocar nada… completa y verificada"). RF-22: verif. modo avión. RF-03: sesión guardada, verif. antena apagada. Los cuatro elementos están en cada RF citado. | Sostenido en 5 |
| N2 | 5 | RF-21: pantalla de inicio con semana, grado, cursos, recibidos/esperados, "completa / incompleta (falta X)", aviso de semana más nueva; verif. literal "Semana 12 — Matemática, Comunicación… — completa" en modo avión. RF-20 verifica contra el manifiesto de RF-12; RF-16 define el hash. | Sostenido en 5 |
| N3 | 5 | RF-23: alumno, sin conexión, respuestas con fecha y hora, verif. cerrar/reabrir en modo avión. RF-24: al reconectarse a la red de la escuela envía al nodo, marca "entregadas", nodo sube en la siguiente RF-14; verif. "no muestra respuestas pendientes y el docente rural las ve". Los cuatro elementos presentes. Nota del juez: RF-12 empaqueta solo en "PDF optimizado, imágenes comprimidas, audio; video" y no define un formato respondible para cuestionarios; es una inconsistencia entre RF-12 y RF-23 que va a brechas (#6), no un elemento faltante en RF-23. | Sostenido en 5 |
| P1 | 3 | Causa descrita: la tablet baja directo de internet y abre archivos incompletos. RF-15 + RNF-02 ("pierde como máximo el último bloque de 1 MB y nunca reinicia"); RF-16 nada se muestra sin verificar; RF-20 "un archivo dañado en la tablet se marca y se vuelve a copiar"; RF-18 "la descarga a una tablet no genera tráfico hacia la central"; RF-12/RNF-04 video ≤5 min a 360p. La causa desaparece: la tablet nunca descarga de internet. | Sostenido en 3 |
| P2 | 3 | Causa: no saber qué semana tiene. RF-21 muestra la semana y avisa si el nodo tiene una más nueva; RF-13: "nunca se mezclan semanas porque cada paquete lleva versión"; RF-20 baja la nueva sola. | Sostenido en 3 |
| P3 | 3 | Causa: 40 alumnos bajando lo mismo de internet + sin internet en casa. RNF-05: "una sola descarga desde internet por escuela y semana"; RF-18: hasta 40 dispositivos por red local sin tráfico a la central; RF-22/RF-23/RF-24 cubren la casa. | Sostenido en 3 |
| C3 | 6 | Flujo RF-02 → RF-03 → RF-13 → RF-14/15/16 (RNF-09) → RF-20 → RF-21 → RF-22 → RF-23 → RF-24 → RF-26: diez pasos, cada uno con requerimiento propio y disparador definido. El formato del cuestionario es una propiedad del material (brecha en RF-12), no un paso sin requerimiento. | Sostenido en 6 |

Resultado auditado: 15 + 9 + 6 = **30/30**.

### 2.2 Julián (docente multigrado, Yanayacu)

| Ítem | Puntaje | Verificación contra el texto citado | Decisión |
| :--- | :--- | :--- | :--- |
| N1 | 5 | RF-14 "cada 10 minutos… Nada de esto requiere intervención del docente"; RF-15 prueba medible 50 MB / cortes 30 s / ≤1 %; RF-02 registra grados y RF-13 crea "una entrega… para cada escuela… y cada grado"; RF-12 "un paquete por grado"; RNF-09 lunes 07:00; RF-26 domingo 18:00; RNF-04 100 MB por grado (3 grados = 300 MB, ≈20 min a 2 Mbps según la propia cifra de RNF-04). Quién/cuándo/qué/verificación presentes. | Sostenido en 5 |
| N2 | 5 | RF-17: texto de verificación literal "Semana N: completa y verificada, G grados, A archivos" con estado por archivo (pendiente / dañado-reintentando / verificado); RF-16 nada se muestra sin verificar; RF-18 y RF-20 red local sin tráfico a la central; RF-03 login offline; RNF-05. Nota: RNF-10 ubica la App Escuela en tablets Android y Julián usa laptop y celular; el requerimiento sigue diciendo quién/cuándo/qué/verificación, así que va a brechas (#12). | Sostenido en 5 |
| N3 | 5 | RF-19: quién (docente rural, App Escuela), cuándo (elige material y tipo de adaptación; el nodo envía cuando hay conexión, <5 KB, cola y reenvío), qué (aparece en la misma pantalla como material local), verificación (<10 min a 1 Mbps desde que hay señal; reaparece sin repetir). RF-09 lista "cambiar el contexto…, simplificar la lectura, traducir, generar más ejercicios" (sus tres). RNF-06 fija <10 min. **Deliberación del juez:** RF-08 enruta por urgencia y RF-04 pone "para la próxima semana" por defecto (lote, ≤24 h); RF-19 no fija urgencia, así que el texto permite que la adaptación caiga en lote y viole su propia verificación. Como RF-19 sí contiene los cuatro elementos y la persona ya descontó exactamente esta ambigüedad en Criterio 3 (6 → 3), no se descuenta dos veces. Se registra como brecha #2. | Sostenido en 5 |
| P1 | 3 | RF-15 "continúa desde el último byte recibido sin repetir"; RNF-02 "nunca reinicia desde cero"; RF-14 elimina la intervención del domingo. Causa eliminada. | Sostenido en 3 |
| P2 | 3 | RF-16 hash por archivo sin internet, "vuelve a faltante y se pide de nuevo solo ese archivo", nada visible sin verificar; RF-17 "dañado-reintentando"; RNF-03 100 % íntegro. La causa (daño en tránsito descubierto el lunes) desaparece. | Sostenido en 3 |
| P3 | 3 | RF-17 una sola pantalla con lo que falta; RF-18 + RF-20 los alumnos toman del nodo, "no genera tráfico hacia la central"; RNF-05 una sola descarga por escuela y semana. | Sostenido en 3 |
| C3 | 3 | Las tres ambigüedades se confirman en el texto: (a) RF-19 no dice con qué urgencia entra y RF-08 decide el modo por la urgencia de RF-04, cuyo valor por defecto "nunca se envía en modo inmediato"; además RF-11 define cuota solo "por docente creador" y rechaza "ahora" al 100 %, sin decir contra qué cuota se carga el pedido del docente rural. (b) RF-04: "No existe campo de texto libre"; el único campo de contexto es "contexto regional"; el "contexto local" de RF-19 no está definido como campo. (c) RF-18 sirve "materiales verificados" (los del manifiesto, RF-16) y RF-20 baja "el paquete de la semana de su grado"; el "material local de la escuela" de RF-19 no está en ninguno de los dos. Flujo legible pero con pasos ambiguos: 3 es correcto; no procede subir a 6. | Sostenido en 3 |

Resultado auditado: 15 + 9 + 3 = **27/30**.

### 2.3 Rocío (docente creadora, Lima)

| Ítem | Puntaje | Verificación contra el texto citado | Decisión |
| :--- | :--- | :--- | :--- |
| N1 | 5 | RF-04: plantilla, campos cerrados enumerados, "No existe campo de texto libre ni carga de documentos", borrador editable con tokens, costo y origen; verif. explícita. RF-05: fragmentos ≤1 000 tokens; verif. entrada ≤3 000. RF-08: inmediato si "ahora"; RNF-06: <60 s. RF-09: solo referencia y campos. Quién/cuándo/qué/verificación presentes. | Sostenido en 5 |
| N2 | 5 | RF-06: "Antes de llamar a la IA… busca en la biblioteca… de todos los docentes creadores… grado, competencia, tema y tipo… autor, fecha y costo original… registra 0 tokens"; verif. origen "reutilizado", tokens = 0. RF-10/RF-04 costo por material; RF-11 consumo propio y del equipo, % usado, % reducción; RNF-11. Nota: "materiales aprobados" no está definido en ningún RF; la persona lo descontó en C3, va a brecha #3. | Sostenido en 5 |
| N3 | 5 | RF-12: marca "listo" y asigna semana/grado/curso. RF-13: "jueves a las 20:00… entrega en estado pendiente" por escuela-grado, verif. 20:05. RF-25: pendiente / en curso (% bytes) / completa y verificada (fecha del acuse) / sin contacto (>48 h), filtro región y UGEL; verif. "completa solo con el acuse de RF-16". RNF-07 ≤10 min. Nota: "al cerrar la semana" en RF-12 no tiene actor ni hora; descontado por la persona en C3, va a brecha #1. | Sostenido en 5 |
| P1 | 3 | RF-04 sin texto libre ni adjuntos; RF-05 tope medible; RF-07 "otra versión… menos de la mitad de los tokens"; RF-04/RF-10 costo junto a cada borrador; RF-11 aviso al 80 %, "una solicitud 'ahora' es rechazada" al 100 %. Causa (pegar el programa completo y no ver ningún número) eliminada. | Sostenido en 3 |
| P2 | 3 | RF-06 le muestra los materiales de otros antes de generar; RF-07 caché 90 días, similitud ≥0,92; RF-09 adapta sin reenviar el archivo. La causa ("no hay dónde buscarlos") desaparece porque la búsqueda es automática y previa. | Sostenido en 3 |
| P3 | 3 | RF-25 le da el estado por escuela en cualquier momento con filtro Loreto; RF-26 lista el domingo 18:00; RNF-09 ≥95 % lunes 07:00. La causa (cero visibilidad hasta el WhatsApp del lunes) desaparece; que RF-26 se muestre "en su próxima conexión" es una brecha de canal (#7), no de causa. | Sostenido en 3 |
| C3 | 3 | Ambigüedades confirmadas en el texto: RF-12 dispara el armado "al cerrar la semana" sin decir quién ni cuándo, y RF-13 publica solo "los que estén armados"; RF-06 busca en "materiales aprobados" y ningún RF dice cuándo un material queda aprobado (RF-12 usa "listo"). Flujo legible con dos pasos ambiguos: 3 es correcto. | Sostenido en 3 |

Resultado auditado: 15 + 9 + 3 = **27/30**.

## 3. Tabla de resultados

| Persona | Criterio 1 (/15) | Criterio 2 (/9) | Criterio 3 (/6) | Bruto (/30) | Score (/10) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Yesenia | 15 | 9 | 6 | 30 | 10.0 |
| Julián | 15 | 9 | 3 | 27 | 9.0 |
| Rocío | 15 | 9 | 3 | 27 | 9.0 |
| **PROMEDIO** | 15.0 | 9.0 | 4.0 | 28.0 | **9.3** |

## 4. Ajustes del juez

**Ninguno.** Los 21 ítems (7 por persona) se cotejaron contra el texto de cada RF/RNF citado y todos se sostienen con el puntaje original. Deliberaciones registradas (puntaje sin cambio):

- Julián, N3, 5 → 5: RF-19 contiene los cuatro elementos exigidos; la contradicción con RF-08/RF-04 (urgencia por defecto en lote) ya está descontada por la persona en Criterio 3. No se penaliza dos veces el mismo defecto. Queda como brecha #2.
- Rocío, N2, 5 → 5 y N3, 5 → 5: "aprobados" (RF-06) y "al cerrar la semana" (RF-12) son términos sin definir; la persona ya los descontó en Criterio 3. Quedan como brechas #1 y #3.
- Yesenia, N3, 5 → 5 y C3, 6 → 6: la falta de formato respondible en RF-12 es una inconsistencia entre requerimientos, no un paso sin requerimiento ni un elemento faltante en RF-23. Queda como brecha #6.
- Julián, C3, 3 → 3 y Rocío, C3, 3 → 3: se consideró subir a 6 y se descartó; las ambigüedades que ambos describen se confirman literalmente en el texto.

## 5. Cálculo del promedio

- Yesenia: 15 + 9 + 6 = 30 → 30 / 3 = 10.0
- Julián: 15 + 9 + 3 = 27 → 27 / 3 = 9.0
- Rocío: 15 + 9 + 3 = 27 → 27 / 3 = 9.0
- Promedio = (10.0 + 9.0 + 9.0) / 3 = 28.0 / 3 = 9.333… → **9.3** (un decimal, sin redondear hacia arriba)

**Calidad = 9.3 × 10 = 93 %**

Umbral: promedio 9.3 ≥ 8.0 (cumple); persona mínima 9.0 ≥ 7.0 (cumple).

Estado: **PASSED**

Diferencia frente a v1: 6,1 → 9,3 (+3,2). Los 6 puntos perdidos en v2 están todos en Criterio 3 y se concentran en dos costuras: la adaptación desde la escuela (RF-19 frente a RF-08/RF-04/RF-11/RF-18/RF-20) y el cierre de la semana con la entrada a la biblioteca (RF-12 frente a RF-06/RF-13).

## 6. Brechas priorizadas

Criterio de orden: primero las que recuperan puntos perdidos (Criterio 3 de Rocío y Julián) y afectan a más personas; después las que protegen puntajes ya obtenidos frente a inconsistencias del texto; al final las de robustez. Duplicados consolidados: la hora de corte para lotes (Rocío #3) se funde con el cierre de la semana (Rocío #1) por compartir causa; los dos pedidos sobre RF-26 (Yesenia #4 y Rocío #5) se funden en uno de canal de alerta.

| Prioridad | Qué falta | A quién afecta | Qué RF/RNF crear o modificar |
| :--- | :--- | :--- | :--- |
| 1 | RF-12 arma el paquete "al cerrar la semana" sin decir quién cierra ni a qué hora; RF-13 publica solo "los que estén armados". Derivado: sin cierre definido no hay hora de corte para que una solicitud en lote (≤24 h, RF-08/RNF-06) entre al paquete de esa semana, ni se sabe qué pasa con un material marcado "listo" después del cierre. | Rocío (C3, N3; recupera hasta 3 puntos junto con #3). Indirectamente Julián y Yesenia: todo lo que reciben depende de este disparador. | Modificar RF-12: fijar actor y hora del cierre (p. ej. "el sistema cierra automáticamente el jueves 19:00" o "el coordinador pulsa 'cerrar semana' antes del jueves 20:00"), definir que lo marcado "listo" tras el cierre pasa al paquete siguiente, con verificación. Modificar RF-08 (o RF-04): hora de corte para pedidos "para la próxima semana" (p. ej. miércoles 20:00) y aviso en el Portal si se pide después. |
| 2 | RF-19 y RNF-06 prometen <10 min, pero RF-08 elige el modo por la urgencia de RF-04, cuyo valor por defecto "para la próxima semana" "nunca se envía en modo inmediato" (lote ≤24 h). RF-11 define cuota solo "por docente creador" y rechaza "ahora" al 100 %: no dice contra qué cuota se carga el pedido del docente rural ni qué ve él si está agotada. Contradicción interna del texto. | Julián (C3; recupera hasta 3 puntos junto con #4 y #5; protege los 5 de N3). | Modificar RF-19: la adaptación pedida desde la escuela entra siempre con urgencia "ahora" (modo inmediato, modelo económico por RF-08). Modificar RF-11: cuota a la que se imputa la adaptación escolar (p. ej. cuota de escuela o del creador del material original) y comportamiento al 100 % (rechazo con aviso / encolado), con verificación. |
| 3 | RF-06 busca en la "biblioteca de materiales aprobados", pero ningún RF define cuándo un material queda "aprobado" ni cómo entra a la biblioteca; RF-12 usa "listo". Si el borrador del colega nunca fue "aprobado", no aparece. | Rocío (C3, N2, P2; recupera hasta 3 puntos junto con #1). | Modificar RF-06 y RF-12: un material marcado "listo" (o publicado por RF-13) pasa a la biblioteca de reutilización; verificación: "todo material publicado aparece en la búsqueda de RF-06 desde el jueves 20:05". |
| 4 | RF-19 guarda el resultado como "material local de la escuela", pero RF-18 sirve solo "materiales verificados" (los del manifiesto, RF-16) y RF-20 baja "el paquete de la semana de su grado". No hay camino del material adaptado a las tablets de los alumnos. | Julián (C3; recupera hasta 3 puntos junto con #2 y #5). Yesenia (indirecta: recibe el material adaptado). | Modificar RF-19 (o RF-18/RF-20): el material local entra al catálogo del nodo asociado al grado que elija el docente, con su propio hash, y las tablets lo copian por la red local y lo verifican igual que el paquete; verificación: en modo avión la tablet abre el material adaptado. |
| 5 | RF-19 dice "con su contexto local", pero RF-04 prohíbe texto libre y su único campo de contexto es "contexto regional" (cerrado). No está definido cómo el docente rural indica "cosecha de yuca" en vez de "Amazonía". | Julián (C3; recupera hasta 3 puntos junto con #2 y #4). | Modificar RF-19 (y RF-04): definir el campo "contexto local" como lista cerrada de contextos comunitarios administrada por la central o campo corto acotado (p. ej. ≤ 80 caracteres, sin datos personales según RNF-08), con verificación. |
| 6 | RF-12 guarda todo en "PDF optimizado, imágenes comprimidas, audio; video", pero RF-23 exige que el alumno "responda los ejercicios y cuestionarios… en la tablet" y RF-24 envíe respuestas estructuradas. No existe formato respondible para fichas y cuestionarios. | Yesenia (N3, P3 y C3 en riesgo: 14 puntos protegidos). Rocío (RF-04 genera cuestionarios). Julián (recibe respuestas por RF-24). | Modificar RF-12 (o crear un RF "Formato de ficha/cuestionario respondible"): las plantillas "ficha de ejercicios" y "cuestionario" se empaquetan en un formato estructurado (preguntas, alternativas, respuesta abierta) que la App Escuela renderiza y captura; verificación: un cuestionario del paquete se responde en modo avión y su respuesta llega a RF-24 con identificador de pregunta. |
| 7 | RF-26 muestra la lista de escuelas incompletas "en su próxima conexión": si el docente creador no entra el domingo se entera el lunes, como hoy; y el alumno solo ve "incompleta (falta X)" sin saber que el problema es la antena de su escuela. | Rocío (P3), Yesenia (N1). | Modificar RF-26: notificación activa (correo o mensaje) al docente creador el domingo 18:00 con verificación ("todo creador con escuelas incompletas recibe el aviso antes de las 18:10"); y modificar RF-21 para que la tablet muestre el aviso de RF-26 al conectarse si su escuela está en la lista. |
| 8 | RF-18 dice "hasta 40 dispositivos a la vez" y RF-20 "descarga sola", pero ningún RF fija cuánto tarda en llegar la semana (≤100 MB) a una tablet con 40 conectadas, ni cuenta los dispositivos de los docentes. | Yesenia (N1, P3), Julián (P3). | Modificar RF-18 o RF-20: tiempo medible (p. ej. "la semana completa llega a cada tablet en <10 min con 40 tablets conectadas") y capacidad con margen (alumnos + docentes de la escuela), con verificación. |
| 9 | RF-06 solo se activa al abrir una solicitud de material; no hay forma de explorar la biblioteca por tema, grado y competencia para planificar la semana sin iniciar una generación. | Rocío (N2). | Ampliar RF-06 o crear RF "Buscar en la biblioteca": búsqueda libre por metadatos y similitud desde el Portal sin crear solicitud; verificación: la búsqueda no genera registro en RF-10. |
| 10 | RF-20 se dispara "cuando la tablet se conecta"; si el nodo termina de verificar la semana mientras la tablet ya está en la red, no dice si la tablet vuelve a revisar. | Yesenia (N1). | Modificar RF-20: la App Escuela consulta el nodo periódicamente mientras está en la red local (p. ej. cada 10 min, como RF-14) y baja lo nuevo; verificación con tablet conectada antes de que el nodo complete la semana. |
| 11 | RF-16 garantiza que el archivo llegó idéntico a lo publicado, no que lo publicado abra. Un PDF dañado en origen pasa la verificación. | Julián (P2), Yesenia (P1). | Modificar RF-12: validar que la variante ligera abre correctamente (PDF/imagen/audio/video válido) antes de calcular el hash y marcarlo listo; verificación: un archivo inválido no puede marcarse listo. |
| 12 | RF-17 dice que el docente rural ve el estado "en la App Escuela"; RNF-10 ubica la App Escuela en tablets Android y el nodo en la laptop; Julián usa laptop y celular. | Julián (N2). | Aclarar RF-17 / RNF-10: la pantalla de estado del nodo es accesible desde la laptop del nodo (navegador local) además de la App Escuela. |

## 7. Recomendación para v3

Atender las brechas 1 a 5 cerraría los dos únicos criterios con pérdida (Criterio 3 de Rocío y Julián) y llevaría el promedio potencial a 10.0. La brecha 6 no recupera puntos pero elimina la única inconsistencia que podría costarle a Yesenia hasta 14 puntos en una lectura más estricta de RF-12 frente a RF-23. Las brechas 7 a 12 son de robustez y no condicionan el PASSED.


---

## Qué se hace con las brechas restantes

El umbral se cumple (9,3/10 ≥ 8,0 y ninguna persona por debajo de 7,0), así que la especificación **aprueba**. Las brechas que el juez dejó ordenadas son refinamientos de consistencia entre requerimientos (cierre de semana, formato respondible de cuestionarios, urgencia de la adaptación escolar, tiempos en la red local); se incorporaron como **v3** de los requerimientos y se volvió a correr la evaluación para confirmar que no bajaba el puntaje: ver [EVAL/iteracion-3.md](iteracion-3.md).
