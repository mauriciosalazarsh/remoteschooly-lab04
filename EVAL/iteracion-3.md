# EVAL — Iteración 3

**Registro de la iteración**

| Campo | Valor |
| :--- | :--- |
| Versión de requerimientos evaluada | v3 (RF-01 a RF-26, RNF-01 a RNF-11): la v2 aprobada más los 11 refinamientos que dejó el juez en la iteración 2 (cierre de semana, formato respondible de cuestionarios, urgencia y cuota de la adaptación escolar, biblioteca explorable, tiempos en la red local, alerta activa del domingo) |
| Fecha | 2026-09-06 |
| Modelo usado | Claude (Fable 5.1) en Claude Code: tres subagentes-persona independientes en paralelo + un subagente juez, siguiendo los prompts de [Agents/README.md](../Agents/README.md); ningún agente vio las iteraciones anteriores |
| Resultado | **PASSED — Calidad 100 %** (promedio 10,0/10; Yesenia 10,0 · Julián 10,0 · Rocío 10,0; umbral 8,0 y ninguna persona < 7,0) |

**Propósito de esta corrida:** confirmar que los refinamientos de la v3 no rompieron nada (la v2 ya aprobaba con 9,3/10) y dejar la lista de mejoras restantes para una fase posterior.

---

## Paso 1 — Evaluaciones por persona (tal como salieron)

### Yesenia Quispe — alumna de 2.º de secundaria, escuela rural de Huayllabamba (Ocongate, Cusco)

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-13, RF-14, RF-15, RF-16, RF-18, RF-20, RF-22, RF-03, RNF-09, RNF-05, RNF-10 | 5 | El paquete de mi grado se publica el jueves 20:00 (RF-13), el nodo lo baja solo y lo verifica (RF-14, RF-15, RF-16) antes del lunes 07:00 (RNF-09), mi tablet lo copia sola al conectarse a la red de la escuela en menos de 10 min (RF-20, RF-18) y en mi casa en modo avión abro lecturas, videos cortos y ejercicios (RF-22) sin volver a entrar con mi PIN (RF-03); cada uno dice quién, cuándo, qué produce y cómo se prueba. |
| N2 | RF-21, RF-20, RF-16 | 5 | La pantalla de inicio me muestra "Semana 12 — Matemática, Comunicación… — completa" o "incompleta (falta X)" sin abrir archivo por archivo, y se prueba en modo avión (RF-21); "completa" quiere decir que cada archivo pasó el hash (RF-20, RF-16). |
| N3 | RF-12, RF-23, RF-24, RNF-05 | 5 | Las fichas y cuestionarios vienen en formato respondible (RF-12), respondo en modo avión y las respuestas siguen ahí al reabrir la app (RF-23), y al volver a la red de la escuela se envían solas al nodo, se marcan "entregadas" y el nodo las sube a la central cuando hay señal (RF-24). |
| P1 | RF-12, RF-15, RF-16, RF-18, RF-20, RNF-02, RNF-04 | 3 | Ya no bajo nada de internet en la tablet: el nodo baja por rangos y reanuda sin empezar de cero (RF-15, RNF-02), nada se me muestra si el hash no coincide y lo dañado se vuelve a copiar (RF-16, RF-20), el archivo se comprueba que abre antes de marcarse listo (RF-12) y los videos son cortos y livianos (RNF-04); la ruedita y el PDF a la mitad se eliminan de raíz. |
| P2 | RF-21, RF-13, RF-20 | 3 | La tablet me dice qué semana tengo, me avisa si en el nodo hay una más nueva y me dice "la escuela todavía no recibió la Semana N" cuando no es culpa de mi tablet (RF-21); cada paquete lleva versión y no se mezclan semanas (RF-13) y la tablet se actualiza sola cada 10 min en la escuela (RF-20). |
| P3 | RF-14, RF-18, RNF-05, RF-22, RF-23, RF-24 | 3 | La escuela baja de internet una sola vez por semana (RF-14, RNF-05) y las 40 tablets copiamos del nodo por la red local en menos de 10 min sin tocar el satélite (RF-18); en mi casa leo y respondo sin internet (RF-22, RF-23) y las respuestas se envían solas después (RF-24). |

Criterio 1: 15/15 · Criterio 2: 9/9 · Criterio 3: 6/6
Flujo leído: la central me registra en el roster con mi PIN (RF-02) → entro a la App Escuela en la red de la escuela y la sesión se queda en mi tablet (RF-03) → el jueves 20:00 se publica el paquete de mi grado (RF-13) → el nodo lo detecta, lo baja por partes, reanuda y verifica cada hash (RF-14, RF-15, RF-16) antes del lunes 07:00 (RNF-09) → cuando llego a la escuela mi tablet lo copia sola por la red local (RF-20, RF-18) → la pantalla de inicio dice "Semana 12 — completa" (RF-21) → en mi casa sin internet leo y respondo (RF-22, RF-23) → al volver a la escuela mis respuestas se envían solas al nodo y de ahí a la central (RF-24); si la escuela no recibió la semana, me lo dice la misma pantalla (RF-26, RF-21). Cada paso tiene su requerimiento.
Puntaje bruto: 30/30 → **Score: 10.0/10**

Brechas detectadas: ninguna que baje puntos; sí veo tres cosas que mejorarían mi día y que pediría cambiar:
1. RF-21 dice "incompleta (falta X)" pero no dice si X es un número o el nombre de lo que falta; para el profe RF-17 sí muestra "la lista exacta de lo que falta". Modificar RF-21 para que me diga qué archivo o qué curso falta (por ejemplo "falta: video de Comunicación"), no solo cuántos.
2. RF-03 dice que la sesión "queda guardada en el dispositivo para seguir usándola en casa" pero no dice cuánto dura; si se vence un miércoles en mi casa sin internet, no puedo entrar hasta volver a la escuela. Modificar RF-03 para fijar que la sesión no vence mientras la tablet esté sin conexión (o dura al menos toda la semana).
3. RNF-09 fija el plazo del nodo el lunes 07:00, así que la semana nueva me llega el lunes en la escuela y la tengo en casa el lunes en la tarde; si se quiere que ya esté en mi tablet el fin de semana, RNF-09 debería apuntar al viernes en horario de clases. No lo castigo porque mi necesidad dice "desde el lunes" y eso sí se cumple.

Veredicto: Sí me sirve. El lunes voy a la escuela, la tablet se llena sola por la red local, veo "Semana 12 — completa", y en mi casa sin internet leo, veo los videos cortos y respondo los cuestionarios; cuando vuelvo a la escuela se envían solos. Lo único que pediría es que la pantalla me diga exactamente qué falta cuando algo falta, y que la sesión no se me venza en casa.

### Julián Huamán — Docente de escuela rural (San Juan de Yanayacu, Loreto)

## Evaluación de Julián Huamán — Docente de aula multigrado, San Juan de Yanayacu (Loreto) — Requerimientos v3

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-02, RF-12, RF-13, RF-14, RF-15, RF-16, RNF-02, RNF-04, RNF-07, RNF-09 | 5 | RF-13 publica el jueves 20:00 un paquete por cada grado registrado en RF-02; RF-14 revisa señal cada 10 min y sincroniza sin que yo toque nada; RF-15/RNF-02 reanudan desde el último byte; RF-16 verifica y acusa; RNF-09 fija lunes 07:00 con verificación en el panel: quién, cuándo, qué produce y cómo se verifica están todos. |
| N2 | RF-17, RF-16, RF-18, RF-20, RF-03, RNF-05 | 5 | RF-17 me da una sola pantalla (celular o laptop) con semana, grados, cursos, archivos recibidos/esperados y estado por archivo, y su verificación es literalmente "Semana N: completa y verificada, G grados, A archivos"; RF-18 y RF-20 hacen que las tablets copien del nodo por la red local sin tráfico a la central (RNF-05: una sola descarga por escuela y semana). |
| N3 | RF-19, RF-09, RF-08, RF-11, RNF-06 | 5 | RF-19 me deja elegir material, tipo de adaptación (RF-09: cambiar contexto, simplificar, más ejercicios) y contexto con nota corta; entra siempre "ahora" con modelo económico (RF-08), pesa < 5 KB, se encola si se corta y llega al nodo en < 10 min con 1 Mbps (RNF-06), con verificación medible; cubre lo que pido, aunque le faltan detalles prácticos que anoto en brechas. |
| P1 | RF-15, RF-14, RF-13, RNF-02, RNF-04 | 3 | La causa era empezar de cero en cada corte y hacerlo yo a mano el domingo: RF-15 continúa desde el último byte (≤ 1 % de bytes repetidos en la prueba con cortes cada 30 s), RNF-02 dice que nunca reinicia, RF-14 lo hace el nodo solo desde el jueves 20:00 (RF-13) y RNF-04 acorta los videos a ≤ 5 min a 360p; el domingo ya no lo pierdo yo. |
| P2 | RF-16, RF-12, RF-17, RNF-03 | 3 | RF-12 no deja marcar listo un archivo que no abre y le calcula SHA-256; RF-16 compara el hash en el nodo sin internet, vuelve a pedir solo el dañado y no muestra nada sin verificar; RF-17 me marca "dañado-reintentando" por archivo; RNF-03 exige 100 % de coincidencia: el PDF roto ya no llega al lunes. |
| P3 | RF-17, RF-16, RF-18, RF-20, RNF-05 | 3 | RF-16 marca la semana completa solo cuando todos los archivos verifican y RF-17 me lo muestra con la lista exacta de lo que falta; RF-18 y RF-20 hacen que los 28 alumnos tomen el material del nodo por la red de la escuela (verificación: la descarga a la tablet no genera tráfico a la central) y RNF-05 fija una sola descarga por escuela y semana. |

**Criterio 1: 15/15 · Criterio 2: 9/9 · Criterio 3: 6/6**

Flujo leído: La central registra mi escuela con sus 3 grados y su roster (RF-02); el creador marca los materiales listos y la semana se cierra sola el jueves 19:00 (RF-12); a las 20:00 se publica y se crea la entrega pendiente de cada uno de mis grados (RF-13); el nodo de la escuela revisa cada 10 minutos y, cuando entra señal de madrugada, sincroniza solo (RF-14, RNF-07), baja por rangos de bytes solo lo que falta (RF-15, RNF-02, RNF-04), verifica el hash de cada archivo sin internet y marca la semana "completa y verificada" con acuse a la central (RF-16), todo antes del lunes 07:00 (RNF-09; si no llega, alerta del domingo RF-26); el lunes abro la laptop o el celular y veo "Semana 12: completa y verificada, 3 grados, 24 archivos" (RF-17); los alumnos entran sin internet (RF-03), las tablets copian solas del nodo por la red local (RF-20, RF-18), ven su estado (RF-21) y leen (RF-22); yo adapto el problema del supermercado a la cosecha de yuca desde la App (RF-19, RF-09, RF-08, RF-11) y en menos de 10 minutos con señal (RNF-06) entra al catálogo local y a las tablets; los chicos responden (RF-23) y sus respuestas me llegan al nodo (RF-24). Cada paso tiene su requerimiento y no me quedó ninguno ambiguo en el camino semanal.

**Puntaje bruto: 30/30 → Score: 10.0/10**

**Brechas detectadas** (ninguna me quita cobertura, pero son cosas que en mi escuela sí se sienten):

1. **RF-19 / RF-17 / RF-11 — estado de mi pedido y cuota de la escuela.** RF-19 no me muestra en qué quedó mi solicitud de adaptación (en cola / enviada / recibida / rechazada) ni cuánta cuota de la escuela me queda. Si la cuota de RF-11 llega al 100 %, mi solicitud "ahora" se rechaza "con el aviso correspondiente", pero ese aviso vive en el Portal de Lima, no en mi App: yo mandaría el pedido, se cortaría la señal, se encolaría y nunca sabría por qué no llegó nada. Modificar RF-19 (o RF-17) para mostrar estado de la solicitud y cuota restante en el nodo, y permitir pedir la adaptación también desde el navegador de la laptop, no solo desde la App del celular.
2. **RF-19 / RF-12 / RF-20 — revisar antes de que llegue a los chicos.** RF-19 mete el material adaptado directo al catálogo del grado y RF-20 lo copia a las tablets sin que yo lo vea. En el Portal el creador recibe un "borrador editable" (RF-09); yo no. Si la IA se equivoca en el problema de la yuca, lo descubro frente a los alumnos, que es justo lo que quiero evitar. Modificar RF-19 para que el adaptado llegue primero como borrador que yo apruebo ("publicar al grado") y decir explícitamente que pasa por la validación de RF-12 (abre correctamente, variante ligera, formato respondible si es ficha o cuestionario para que sirva con RF-23).
3. **RNF-02 vs RF-15 — los números no cuadran.** RNF-02 dice que en un corte pierdo "como máximo el último bloque de 1 MB"; RF-15 verifica con ≤ 1 % de bytes extra en 50 MB con cortes cada 30 s. Con mi señal que se cae con cada lluvia, 7 cortes × 1 MB son ≈ 14 %, no 1 %. Alinear RNF-02 con RF-15 (bloque parcial pequeño o una tolerancia consistente).
4. **RF-17 / RF-13 — aula multigrado con semanas distintas.** RF-13 dice que un grado sin paquete armado conserva la versión anterior, pero RF-17 habla de "la semana cargada" en singular. En mi aula puedo quedar con Semana 12 en dos grados y Semana 11 en el tercero. Modificar RF-17 para mostrar semana y estado por grado cuando difieren.
5. **Puesta en marcha del nodo (RF-02, RNF-10).** Ningún requerimiento dice cómo se instala el nodo en la laptop de la escuela, cómo se le carga el token que emite RF-02, ni que la laptop deba quedar prendida y el nodo arrancar solo tras un corte de luz para aprovechar la señal de madrugada. Crear un RF de puesta en marcha del nodo (instalación, ingreso del token, autoarranque y reanudación tras corte de energía) o ampliar RF-02 y RNF-10.

**Veredicto:** Sí me sirve: si esto se cumple como está escrito, el lunes a las 7 a. m. la laptop me dice "Semana 12: completa y verificada, 3 grados, 24 archivos", mis alumnos toman todo de la red de la escuela y yo dejo de perder el domingo bajando el mismo video. Lo que me falta son detalles prácticos: saber en qué quedó mi pedido de adaptación y poder revisarlo antes de que llegue a las tablets, y que alguien diga quién instala el nodo y cómo se queda prendido de noche.

### Rocío Paredes — docente creadora de contenido (Matemática), central de Lima

## Evaluación de Rocío Paredes — Requerimientos v3

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-04, RF-05, RF-08, RF-09, RNF-06 | 5 | RF-04 me hace trabajar desde plantilla con campos cerrados (tipo, grado, curso, competencia, tema, contexto regional de lista, idioma, urgencia) y prohíbe prompt libre y adjuntos; RF-05 mete solo fragmentos del currículo (≤ 1 000 tokens, entrada ≤ 3 000 verificable en RF-10); con urgencia "ahora" RF-08 va en modo inmediato y RNF-06 fija < 60 s, así que el borrador lo tengo en la misma sesión; RF-09 define la adaptación con borrador enlazado y registro propio. |
| N2 | RF-06, RF-07, RF-10, RF-11, RNF-11 | 5 | RF-06 me deja explorar la biblioteca de todos los creadores por grado, curso, competencia, tema y tipo sin gastar tokens y, antes de llamar a la IA, me muestra los equivalentes con autor, fecha y costo; si elijo uno queda origen "reutilizado" y 0 tokens (verificable); RF-10 da el costo consultable por material y RF-11 me muestra consumo propio, del equipo, % del presupuesto semanal y % de reducción frente a la línea base. |
| N3 | RF-12, RF-13, RF-25, RF-26, RNF-07, RNF-09 | 5 | RF-12 fija el cierre (jueves 19:00 o botón del coordinador) y RF-13 la publicación (jueves 20:00) con una entrega pendiente por escuela-grado verificable a las 20:05; RF-25 me da por escuela exactamente mis tres estados (pendiente / en curso con % de bytes / completa y verificada con fecha de acuse) más "sin contacto", con filtro por región y UGEL y último contacto con ≤ 10 min de retraso (RNF-07); "completa" solo con acuse de RF-16. |
| P1 | RF-04, RF-05, RF-07, RF-10, RF-11 | 3 | Ya no puedo pegar el programa curricular (RF-04 rechaza prompt libre y adjuntos; RF-05 lo sustituye por fragmentos), "otra versión" cuesta menos de la mitad y lo equivalente sale de caché a 0 tokens del proveedor (RF-07), y por fin veo el número: tokens y costo junto a cada borrador (RF-04), registro por solicitud que cuadra con la factura (RF-10) y mi consumo frente a la cuota con aviso al 80 % (RF-11). |
| P2 | RF-06, RF-07, RF-09 | 3 | Ahora sí hay dónde buscar: la biblioteca de RF-06 tiene lo marcado listo por cualquier creador, por metadatos y similitud semántica, y el sistema me lo ofrece solo antes de generar; si tomo lo del colega la solicitud registra 0 tokens y puedo adaptarlo con RF-09; si alguien ya pidió algo equivalente en 90 días, RF-07 lo devuelve de caché sin llamar al proveedor. |
| P3 | RF-25, RF-26, RF-16, RNF-07, RNF-09 | 3 | Ya no me entero por WhatsApp el lunes: RF-25 me muestra Loreto con filtro por región, su estado y último contacto actualizado en ≤ 10 min (RNF-07), "completa" solo con el acuse verificado de RF-16; RF-26 me manda el domingo antes de las 18:10 la lista de escuelas incompletas, y RNF-09 fija la meta del lunes 07:00 (≥ 95 % de escuelas con conexión en "completa"). |

**Criterio 1: 15/15 · Criterio 2: 9/9 · Criterio 3: 6/6**

Flujo leído: entro al Portal Central (RF-01) → reviso la biblioteca sin gastar tokens (RF-06) → pido el material desde plantilla con grado, competencia, tema, contexto y urgencia (RF-04); el sistema me ofrece los equivalentes ya listos (RF-06), si no hay revisa la caché (RF-07), arma el prompt con fragmentos del currículo (RF-05), elige modelo y modo por regla (RF-08) y me devuelve el borrador con tokens, costo y origen (RF-04, RF-10) en < 60 s si pedí "ahora" o < 24 h si fue en lote (RNF-06) → pido "otra versión" o adapto un existente (RF-07, RF-09) → veo mi consumo y el del equipo frente al presupuesto y el % de reducción (RF-11, RNF-01) → marco listo y asigno semana/grado/curso (RF-12) → jueves 19:00 cierre y 20:00 publicación con entregas pendientes por escuela-grado (RF-13) → los nodos sincronizan, descargan, verifican y acusan (RF-14, RF-15, RF-16) → yo veo por escuela pendiente / en curso / completa / sin contacto (RF-25) → domingo 18:00 me llega la lista de incompletas (RF-26) → lunes 07:00 meta ≥ 95 % (RNF-09). Cada paso tiene un requerimiento con actor, disparador, producto y verificación.

**Puntaje bruto: 30/30 → Score: 10.0/10**

**Brechas detectadas** (menores; ninguna baja de banda en la rúbrica, pero las pediría antes de dar por cerrado el diseño):

1. **RF-06 solo indexa lo marcado "listo".** Los borradores míos o de un colega que se generaron pero no se publicaron no se pueden buscar; solo los rescata la caché de RF-07 si la similitud es ≥ 0,92, y la caché no me dice autor ni fecha. *Modificar RF-06:* añadir la vista "mis borradores" y permitir compartir/indexar borradores con la marca "borrador" (distinguible de "listo").
2. **RF-13 crea entregas por escuela-grado, pero RF-25 muestra el estado "por escuela"** sin decir cómo agrega los grados ni ofrece filtro por grado o curso; yo produzco Matemática para 5 grados y quiero saber si el paquete de 3.º llegó a cada escuela, no solo un estado global. *Modificar RF-25:* estado por escuela-grado con agregado por escuela ("completa" solo si todos sus grados tienen acuse) y filtro por grado y curso.
3. **RF-04 entrega un "borrador editable" pero nadie dice cómo se guarda la edición** ni cómo se versiona antes de marcarlo listo en RF-12 (RNF-11 solo pide conservar plantilla y versión). *Añadir a RF-04 o RF-12:* "el Portal guarda cada edición del borrador con versión, autor y hora; la versión que se marca listo es la que entra al paquete".
4. **RF-04 fija por defecto la urgencia "para la próxima semana"** (lote, hasta 24 h): si quiero el material en la misma sesión debo cambiar el campo en cada solicitud. *Añadir a RF-04:* que el docente pueda fijar su urgencia predeterminada o que el Portal recuerde la última elegida, sin tocar la regla de RF-08 ni el rechazo de "ahora" al 100 % de cuota (RF-11).
5. **Mi "mapa de escuelas en verde" del sábado no existe como tal:** RF-25 es un panel con filtros. *Añadir a RF-25:* una vista resumen por región/UGEL con conteo de completas / en curso / pendientes / sin contacto (una vista de mapa es opcional, el conteo por región es lo que necesito).

**Veredicto:** Sí me sirve: genero con plantillas sin pegar el currículo, veo el costo de cada borrador y el gasto del equipo frente al presupuesto con su % de reducción, encuentro lo que ya hicieron mis colegas antes de gastar un token, y el domingo sé qué escuelas no recibieron el paquete sin esperar el WhatsApp del lunes. Lo que me falta es fino, no de fondo: buscar borradores no publicados y ver el estado por escuela desglosado por grado.

---

## Paso 2 — Reporte del juez Eval-Spec

# Reporte Eval-Spec — Requerimientos v3 (iteración 3)

**Entradas auditadas:** `Requerimientos/Funcionales.md` (RF-01 a RF-26) y `Requerimientos/NoFuncionales.md` (RNF-01 a RNF-11), versión v3; `Personas/yesenia.md`, `Personas/julian.md`, `Personas/rocio.md`; `Agents/Spec/rubric.md`; las tres evaluaciones tal como salieron.

---

## 1. Validez formal de los puntajes

| Persona | N1 · N2 · N3 (0/2/5) | P1 · P2 · P3 (0/1/3) | Flujo (0/3/6) | Formato de la rúbrica |
| :--- | :--- | :--- | :--- | :--- |
| Yesenia | 5 · 5 · 5 | 3 · 3 · 3 | 6 | Cumple (tabla, subtotales, flujo, bruto, score, brechas, veredicto) |
| Julián | 5 · 5 · 5 | 3 · 3 · 3 | 6 | Cumple |
| Rocío | 5 · 5 · 5 | 3 · 3 · 3 | 6 | Cumple |

Todos los valores están en las bandas permitidas. Todos los IDs citados por las tres personas existen en v3 (RF-01…RF-26, RNF-01…RNF-11); ningún ítem cita un ID inexistente.

---

## 2. Auditoría de cada justificación contra el texto real del requerimiento

Criterio aplicado (rúbrica, regla 1): un 5 o un 3 solo se sostiene si el texto citado dice **quién**, **cuándo**, **qué produce** y **cómo se verifica**, con valores medibles; si la justificación atribuye al RF algo que no dice, baja a 0; ante la duda, el menor.

### 2.1 Yesenia Quispe (alumna)

| Ítem | Lo que afirma | Contraste con el texto | Resultado |
| :--- | :--- | :--- | :--- |
| N1 (5) | Publicación jueves 20:00; el nodo baja, reanuda y verifica antes del lunes 07:00; la tablet copia sola en < 10 min; abre en modo avión sin volver a entrar con el PIN. | RF-13 ("jueves a las 20:00… entrega en estado pendiente"), RF-14 ("cada 10 minutos… Nada de esto requiere intervención"), RF-15 (rangos de bytes, ≤ 1 %), RF-16 (SHA-256 sin internet, "ningún archivo se muestra… antes de estar verificado"), RNF-09 ("antes del lunes a las 07:00… ≥ 95 %"), RF-20 ("Cuando la tablet… se conecta a la red de la escuela… descarga sola"), RF-18 ("≤ 100 MB… en menos de 10 minutos"), RF-22 ("modo avión se abren todos los materiales"), RF-03 ("abre la app en su casa sin volver a autenticarse"). Todo lo afirmado está escrito, con actor, disparador, producto y verificación medible. "Desde el lunes" se cumple: la tablet la recibe el lunes en la escuela (RF-20) y la alumna la tiene en casa ese mismo día. | **5 confirmado** |
| N2 (5) | La pantalla de inicio muestra semana, cursos y completa / incompleta (falta X) sin abrir archivos; se prueba en modo avión. | RF-21 dice literalmente eso y su verificación es "Semana 12 — Matemática, Comunicación… — completa". "Completa" = cada archivo verificado contra el manifiesto (RF-20). | **5 confirmado** |
| N3 (5) | Formato respondible; responde sin conexión y persiste; envío automático al nodo y de ahí a la central. | RF-12 ("formato estructurado respondible… captura las respuestas (RF-23)"), RF-23 ("se guardan… con fecha y hora y siguen ahí al reabrir"), RF-24 ("envía sola… 'entregadas'; el nodo las sube… en la siguiente sincronización"). | **5 confirmado** |
| P1 (3) | Causa (bajar del satélite sin verificación) eliminada: nodo reanuda, hash, nada sin verificar, archivo comprobado en origen, videos cortos. | RF-15, RNF-02, RF-16, RF-20 ("un archivo dañado en la tablet se marca y se vuelve a copiar"), RF-12 ("un archivo inválido no puede marcarse listo"), RNF-04 (≤ 5 min a 360p). Ataca la causa, no un síntoma. | **3 confirmado** |
| P2 (3) | Sabe qué semana tiene, aviso de semana más nueva, mensaje "la escuela todavía no recibió"; versión por paquete; actualización cada 10 min. | RF-21 (los tres mensajes están en el texto y en la verificación), RF-13 ("nunca se mezclan semanas porque cada paquete lleva versión"), RF-20 ("cada 10 minutos mientras siga conectada"). | **3 confirmado** |
| P3 (3) | Una sola bajada de internet por escuela; 40 tablets copian del nodo sin tocar el satélite; en casa lee y responde y se envía después. | RNF-05 ("una sola descarga desde internet por escuela y semana"), RF-18 ("la descarga a una tablet no genera tráfico hacia la central; con 50 dispositivos… < 10 minutos"), RF-22, RF-23, RF-24. | **3 confirmado** |
| Flujo (6) | RF-02 → RF-03 → RF-13 → RF-14/15/16 → RNF-09 → RF-20/18 → RF-21 → RF-22/23 → RF-24 (+ RF-26/21). | Cada paso citado existe y dice lo que ella afirma (RF-02 incluye "alumnos con su grado y una contraseña o PIN inicial"). No hay pasos sin requerimiento en su camino semanal. | **6 confirmado** |

Puntos revisados con lupa y mantenidos: la duración de la sesión de RF-03 no está fijada, pero el texto afirma y verifica que la sesión sirve en casa sin reautenticar; la necesidad queda cubierta y el vacío va a brechas (n.º 6).

### 2.2 Julián Huamán (docente rural)

| Ítem | Lo que afirma | Contraste con el texto | Resultado |
| :--- | :--- | :--- | :--- |
| N1 (5) | Paquete por grado registrado; nodo revisa cada 10 min sin intervención; reanuda desde el último byte; verifica y acusa; lunes 07:00 verificable en el panel. | RF-13 + RF-02 ("para cada escuela… y cada grado que atiende"), RF-14, RF-15/RNF-02, RF-16 ("acuse con el hash del manifiesto"), RNF-09, RNF-07. Quién/cuándo/qué produce/cómo se verifica presentes en cada uno. | **5 confirmado** |
| N2 (5) | Una sola pantalla (celular o laptop) con semana, grados, cursos, recibidos/esperados y estado por archivo; verificación literal "Semana N: completa y verificada, G grados, A archivos"; tablets copian del nodo sin tráfico a la central. | RF-17 reproduce exactamente esa frase de verificación y lista todos los campos; RF-18 ("no genera tráfico hacia la central"); RF-20; RNF-05. | **5 confirmado** |
| N3 (5) | Elige material, tipo de adaptación y contexto; siempre "ahora" con modelo económico; < 5 KB; cola; < 10 min a 1 Mbps. | RF-19 ("entra siempre con urgencia 'ahora'… pesa menos de 5 KB… la deja en cola y la reenvía solo… en menos de 10 minutos desde que hay señal"), RF-09 (tipos de adaptación), RF-08, RF-11 (cuota por escuela), RNF-06. La necesidad tal como está escrita ("obteniendo el resultado en la misma sesión aunque la conexión sea lenta") se cubre con valor medible. La falta de revisión previa y de estado de la solicitud no quita cobertura; va a brechas (n.º 2 y 5). | **5 confirmado** |
| P1 (3) | Ya no reinicia desde cero ni lo hace él el domingo. | RF-15 (verificación ≤ 1 % en 50 MB con cortes cada 30 s), RNF-02 ("nunca reinicia desde cero"), RF-14 (automático), RF-13 (jueves 20:00), RNF-04. Causa eliminada. La contradicción numérica RNF-02 ↔ RF-15 es real (ver brecha n.º 3) pero ambos textos eliminan la causa del dolor. | **3 confirmado** |
| P2 (3) | Archivo que no abre no se marca listo; hash sin internet; solo se repide el dañado; estado "dañado-reintentando"; 100 % de coincidencia. | RF-12, RF-16, RF-17, RNF-03: todo textual. | **3 confirmado** |
| P3 (3) | Semana completa solo con todos los archivos verificados; lista exacta de lo que falta; 28 alumnos toman del nodo. | RF-16, RF-17 ("o la lista exacta de lo que falta"), RF-18, RF-20, RNF-05. | **3 confirmado** |
| Flujo (6) | RF-02 → RF-12 → RF-13 → RF-14/RNF-07 → RF-15/RNF-02/RNF-04 → RF-16 → RNF-09/RF-26 → RF-17 → RF-03 → RF-20/18 → RF-21 → RF-22 → RF-19/09/08/11 → RNF-06 → RF-23 → RF-24. | Cada paso citado existe y dice lo afirmado. La puesta en marcha del nodo (instalación, carga del token) no está escrita, pero es una instalación única, no un paso del camino semanal del docente; el ciclo jueves → lunes tiene requerimiento en cada paso. Va a brechas como n.º 1. | **6 confirmado** |

### 2.3 Rocío Paredes (docente creadora)

| Ítem | Lo que afirma | Contraste con el texto | Resultado |
| :--- | :--- | :--- | :--- |
| N1 (5) | Plantilla con campos cerrados, sin prompt libre ni adjuntos; fragmentos ≤ 1 000 tokens y entrada ≤ 3 000; con "ahora" modo inmediato < 60 s; adaptación con borrador enlazado. | RF-04 ("No existe campo de texto libre… ni carga de documentos"; verificación: rechaza prompt libre, adjuntos y notas > 80 caracteres), RF-05 ("máximo 1 000 tokens… ≤ 3 000 por solicitud"), RF-08 ("inmediato si la urgencia es 'ahora'"), RNF-06 ("modo inmediato < 60 s"), RF-09. La urgencia por defecto es lote, pero la capacidad "misma sesión" está garantizada al elegir "ahora"; el vacío de usabilidad va a brechas (n.º 11). | **5 confirmado** |
| N2 (5) | Biblioteca de todos los creadores por grado/curso/competencia/tema/tipo sin tokens; equivalentes con autor, fecha y costo antes de llamar a la IA; 0 tokens si reutiliza; costo por material; consumo propio, del equipo, % de presupuesto y % de reducción. | RF-06 (todo textual, incluida verificación "origen 'reutilizado' y tokens = 0"), RF-10, RF-11, RNF-11. Que la biblioteca indexe solo material "listo" no quita cobertura: lo que llega a las escuelas pasa por "listo" (RF-12) y RF-07 evita la llamada al proveedor para el resto; va a brechas (n.º 7). | **5 confirmado** |
| N3 (5) | Cierre jueves 19:00 o botón; publicación 20:00 con entrega pendiente por escuela-grado a las 20:05; estados pendiente / en curso (% bytes) / completa y verificada (fecha de acuse) / sin contacto; filtro región/UGEL; ≤ 10 min de retraso. | RF-12, RF-13 (verificación "20:05"), RF-25 (los cuatro estados y el filtro son textuales), RNF-07 ("retraso máximo de 10 minutos"), RF-16 (acuse). | **5 confirmado** |
| P1 (3) | No puede pegar el currículo; "otra versión" < mitad; caché 0 tokens; ve tokens y costo por borrador, registro que cuadra con la factura, aviso al 80 %. | RF-04, RF-05, RF-07 ("menos de la mitad de los tokens"), RF-10 ("todo lo facturado… coincide con la suma"), RF-11 ("Al 80 % de una cuota avisa"). Causa eliminada. | **3 confirmado** |
| P2 (3) | Biblioteca buscable por metadatos y similitud semántica; el sistema ofrece equivalentes antes de generar; caché 90 días ≥ 0,92. | RF-06, RF-07 ("similitud ≥ 0,92… últimos 90 días"), RF-09. Causa ("no hay dónde buscarlos") eliminada. | **3 confirmado** |
| P3 (3) | Estado por escuela con filtro por región y último contacto; "completa" solo con acuse; alerta del domingo antes de 18:10; meta lunes 07:00 ≥ 95 %. | RF-25, RF-16, RF-26 ("el aviso llega al creador antes de las 18:10"), RNF-07, RNF-09. Causa (enterarse por WhatsApp el lunes) eliminada. | **3 confirmado** |
| Flujo (6) | RF-01 → RF-06 → RF-04 (→ RF-06/07/05/08) → RF-04/10 → RNF-06 → RF-07/09 → RF-11/RNF-01 → RF-12 → RF-13 → RF-14/15/16 → RF-25 → RF-26 → RNF-09. | Cada paso citado existe y dice lo afirmado. El paso "editar el borrador" está implícito en "borrador editable" (RF-04) y RNF-11 conserva versión; falta el detalle de guardado/versionado, no el paso (brecha n.º 8). | **6 confirmado** |

**Conclusión de la auditoría:** ninguna justificación atribuye a un requerimiento algo que no dice; todos los puntajes totales (5 y 3) se apoyan en textos con actor, disparador, producto y verificación medible; ningún ítem cita un ID inexistente. No procede bajar ni subir puntaje alguno.

---

## 3. Resultados

| Persona | Criterio 1 (/15) | Criterio 2 (/9) | Criterio 3 (/6) | Bruto (/30) | Score (/10) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Yesenia | 15 | 9 | 6 | 30 | 10.0 |
| Julián | 15 | 9 | 6 | 30 | 10.0 |
| Rocío | 15 | 9 | 6 | 30 | 10.0 |
| **PROMEDIO** | **15.0** | **9.0** | **6.0** | **30.0** | **10.0** |

**Cálculo (bruto / 3 por persona, un decimal, sin redondear hacia arriba):**

- Yesenia: 30 / 3 = 10.0
- Julián: 30 / 3 = 10.0
- Rocío: 30 / 3 = 10.0
- Promedio: (10.0 + 10.0 + 10.0) / 3 = 30.0 / 3 = **10.0**

**Ajustes del juez:** ninguno. Se revisaron los 21 ítems (7 por persona) contra el texto de cada RF/RNF citado; los ocho puntos que se consideraron borderline (Yesenia N1 "desde el lunes" y RF-03 sin duración; Julián N3 sin revisión del adaptado, P1 con RNF-02 ↔ RF-15 contradictorios, flujo sin puesta en marcha del nodo; Rocío N1 urgencia por defecto en lote, N2/P2 biblioteca solo "listo", flujo sin versionado del borrador) se mantienen porque el texto citado cubre la necesidad o elimina la causa tal como la persona la describe; en todos ellos lo que falta es un refinamiento, no un elemento de quién / cuándo / qué produce / cómo se verifica, y se traslada a las brechas.

**Calidad = promedio × 10 = 100 %**

**Umbral:** promedio 10.0 ≥ 8.0 ✓ · persona más baja 10.0 ≥ 7.0 ✓

**Estado: PASSED**

---

## 4. Brechas priorizadas (consolidadas, sin duplicados, ordenadas por impacto)

Ninguna brecha resta puntos en esta iteración (0 puntos a recuperar); el orden refleja cuántas personas afecta y cuánto compromete el flujo si no se corrige. Se fusionaron la brecha 4 de Julián (RF-17 semana en singular) y la brecha 2 de Rocío (RF-25 por escuela sin grados) porque comparten causa: RF-13 crea entregas por escuela-grado, pero las pantallas de estado no lo desglosan.

| Prioridad | Qué falta | A quién afecta | Qué RF/RNF crear o modificar |
| :--- | :--- | :--- | :--- |
| 1 | **Puesta en marcha del nodo escolar.** Ningún requerimiento dice quién instala el nodo en la laptop de la escuela, cómo se le carga el token que emite RF-02, ni que la laptop debe quedar prendida y el nodo arrancar solo y reanudar tras un corte de luz para aprovechar la señal de madrugada. Toda la sección D (RF-14 a RF-19) depende de este paso no escrito. | Julián (directo), Yesenia (indirecto: sin nodo no hay paquete) | Crear **RF-27 "Puesta en marcha del nodo escolar"** (instalación, ingreso del token, autoarranque, reanudación tras corte de energía, verificación) o ampliar RF-02 y RNF-10. |
| 2 | **El material adaptado desde la escuela llega a las tablets sin revisión ni validación.** RF-19 mete el adaptado directo al catálogo del grado y RF-20 lo copia a las tablets; el creador sí recibe un "borrador editable" (RF-09), el docente rural no. Tampoco se dice que pase por la validación de RF-12 (abre correctamente, variante ligera, formato respondible para RF-23). Un error de la IA se descubre frente a los alumnos. | Julián (directo), Yesenia (indirecto: recibe el material) | Modificar **RF-19**: el adaptado llega al nodo como borrador que el docente aprueba ("publicar al grado") y pasa por la validación de RF-12 antes de entrar al catálogo local. |
| 3 | **Contradicción numérica RNF-02 ↔ RF-15.** RNF-02 tolera perder "el último bloque de 1 MB" por corte; RF-15 exige ≤ 1 % de bytes extra en 50 MB con cortes cada 30 s, es decir 0,5 MB en total. Un solo corte ya puede violar RF-15; a 1–4 Mbps habría 4–14 cortes (8–28 % de bytes repetidos). Las dos pruebas no pueden pasar a la vez. | Julián, Yesenia (ambos citan RF-15 y RNF-02 en P1) | Modificar **RNF-02**: bloque parcial pequeño (p. ej. ≤ 64 KB) o tolerancia expresada como porcentaje coherente con RF-15, y remitir a la misma prueba. |
| 4 | **El estado de entrega no se desglosa por grado** aunque RF-13 crea entregas por escuela-grado. RF-17 habla de "la semana cargada" en singular (un aula multigrado puede tener Semana 12 en dos grados y 11 en el tercero, porque RF-13 conserva la versión anterior del grado sin paquete); RF-25 muestra estado "por escuela" sin decir cómo agrega los grados ni ofrece filtro por grado o curso. | Julián (RF-17), Rocío (RF-25) | Modificar **RF-17**: semana y estado por grado cuando difieren. Modificar **RF-25**: estado por escuela-grado con agregado por escuela ("completa" solo si todos sus grados tienen acuse) y filtro por grado y curso. |
| 5 | **Estado de la solicitud de adaptación y cuota de la escuela invisibles para el docente rural.** RF-19 no muestra en qué quedó su pedido (en cola / enviada / recibida / rechazada) ni la cuota restante; el rechazo al 100 % de cuota (RF-11) se avisa en el Portal, no en la App; y la solicitud solo puede hacerse desde la App del celular, no desde el navegador de la laptop (RF-17 sí permite ambos). | Julián | Modificar **RF-19** (o **RF-17**): estado de cada solicitud y cuota restante visibles en el nodo, aviso de rechazo en la App, y solicitud también desde el navegador de la laptop. |
| 6 | **RF-03 no fija la duración de la sesión guardada en la tablet.** Si vence un miércoles en casa sin internet, la alumna no puede entrar hasta volver a la escuela. | Yesenia | Modificar **RF-03**: la sesión no vence mientras el dispositivo esté sin conexión al nodo (o dura al menos 7 días) y se renueva al reconectar a la red de la escuela. |
| 7 | **RF-06 solo indexa material "listo".** Los borradores propios o de colegas que se generaron pero no se publicaron no se pueden buscar; la caché (RF-07) solo los rescata con similitud ≥ 0,92 y sin mostrar autor ni fecha. | Rocío | Modificar **RF-06**: vista "mis borradores" y opción de compartir/indexar borradores con la marca "borrador", distinguible de "listo". |
| 8 | **Edición y versionado del borrador sin requerimiento.** RF-04 entrega un "borrador editable", pero nadie dice cómo se guarda la edición ni cómo se versiona antes de marcarlo listo en RF-12 (RNF-11 solo pide conservar plantilla y versión). | Rocío | Añadir a **RF-04** o **RF-12**: "el Portal guarda cada edición del borrador con versión, autor y hora; la versión que se marca listo es la que entra al paquete". |
| 9 | **RF-21 "incompleta (falta X)" es ambiguo:** no aclara si X es un conteo o el nombre de lo que falta; RF-17 sí da al docente "la lista exacta de lo que falta". | Yesenia | Modificar **RF-21**: mostrar la lista de archivos o cursos faltantes (p. ej. "falta: video de Comunicación"), no solo cuántos. |
| 10 | **Sin vista resumen por región/UGEL en RF-25.** El panel tiene filtros pero no un conteo de completas / en curso / pendientes / sin contacto por región (el "mapa en verde" del sábado). | Rocío | Añadir a **RF-25**: vista resumen por región y UGEL con conteos por estado (mapa opcional). |
| 11 | **RF-04 fija por defecto "para la próxima semana" (lote, hasta 24 h).** Para obtener el material en la misma sesión hay que cambiar el campo en cada solicitud. | Rocío | Añadir a **RF-04**: urgencia predeterminada configurable por docente o recordar la última elegida, sin tocar la regla de RF-08 ni el rechazo de "ahora" al 100 % de cuota (RF-11). |
| 12 | **RNF-09 fija el plazo del nodo el lunes 07:00**, así que la tablet recibe la semana el lunes en la escuela y la alumna la tiene en casa el lunes por la tarde, no el fin de semana. La necesidad "desde el lunes" ya se cumple; es una decisión de diseño. | Yesenia (opcional) | Solo si se quiere el material en casa antes del lunes: modificar **RNF-09** al viernes en horario de clases y ajustar RF-26 en consecuencia. |

---

## 5. Veredicto del juez

Los requerimientos v3 aprueban con **100 %** (promedio 10.0/10; ninguna persona por debajo de 10.0). Las tres evaluaciones se sostienen frente al texto: cada 5 y cada 3 cita requerimientos que dicen quién, cuándo, qué producen y cómo se verifican, con valores medibles, y cada flujo se lee de inicio a fin con un requerimiento por paso. Las doce brechas consolidadas son refinamientos que no cambian de banda en la rúbrica; las tres primeras (puesta en marcha del nodo, revisión del material adaptado, contradicción RNF-02 ↔ RF-15) conviene corregirlas antes de dar por cerrado el diseño porque afectan a dos personas y, en el caso de la tercera, hacen que dos pruebas de verificación no puedan pasar a la vez.


---

## Cierre

La especificación v3 queda como versión final del lab: cumple el umbral del enunciado (Eval 8/10 PASSED) con margen y sin ajustes del juez. Las brechas que quedan listadas arriba son refinamientos para la siguiente fase (por ejemplo, la duración de la sesión sin conexión o el detalle "qué archivo falta" en la tablet) y no cambian la arquitectura.
