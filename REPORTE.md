# Reporte del Eval — Lab 04 RemoteSchooly

Tres agentes-persona (`Agents/`) evalúan los requerimientos en paralelo y un juez (`Agents/Spec/Eval-Spec.md`) audita y calcula el puntaje. Umbral: promedio ≥ 8/10 y ninguna persona < 7.

| Iteración | Yesenia | Julián | Rocío | Promedio | Resultado |
|---|---|---|---|---|---|
| #1 | 6,3 | 10,0 | 7,6 | 7,9 | FAILED |
| #2 | 10,0 | 10,0 | 10,0 | 10,0 | PASSED |
| #3 | 9,4 | 10,0 | 10,0 | 9,8 | PASSED |

---

## Iteración #1 — Requerimientos v1 (2026-09-23)

### Evaluaciones de las personas (tal como salieron)

#### Yesenia (alumna)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RF16, RF18, RF20, RF03, RNF03, RNF05 | 1 | El paquete se publica el jueves y el nodo lo baja solo, pero ningún requerimiento dice cuándo pasa la semana a mi tablet ni si la copia es automática. Nada asegura que la tenga antes de llevarme la tablet a mi casa el fin de semana, así que "desde el lunes" no está garantizado. |
| N2 | RF19, RNF04 | 5 | En la pantalla de inicio veo qué semana tengo y si está completa o qué me falta, sin abrir archivo por archivo. |
| N3 | RF20, RF21, RNF05 | 1 | Resuelvo sin internet y mis respuestas se van solas al nodo y a la central, pero ningún requerimiento dice que el profesor las ve ni dónde las revisa. Llegan al sistema, no al profe. |
| P1 | RF12, RF15, RF16, RNF03, RNF04 | 5 | Se revisa que el archivo abra, la descarga sigue desde donde se cortó, lo que no coincide con el hash no se muestra y los videos son livianos (5 min, 360p). Eso ataca la causa de los archivos a medias. |
| P2 | RF13, RF19, RNF04 | 5 | Cada paquete es de una sola semana, la tablet me dice cuál tengo y ninguna escuela mezcla semanas. |
| P3 | RF14, RF18, RNF05 | 5 | El nodo baja el paquete una sola vez por escuela y las tablets lo copian por la red de la escuela. Ya no bajamos todos lo mismo al mismo tiempo. |
| P4 | RF20, RF21 | 5 | La tarea la hago en la tablet, se guarda ahí y se manda sola cuando vuelvo a la escuela. Ya no depende del cuaderno. |

**Flujo:** con vacíos. Jueves se publica, el nodo baja y verifica, las tablets copian (no se dice cuándo), abro en mi casa, veo "Semana N completa", resuelvo sin internet, vuelvo a la escuela, las respuestas suben solas (no se dice que el profe las vea).

**Gaps:**
- Modificar RF18: la tablet debe copiar sola la semana verificada apenas se conecta a la red de la escuela, y el docente rural debe ver qué tablets ya la tienen completa antes del viernes, cuando los alumnos se las llevan a su casa.
- Crear un RF (o ampliar RF17): cuando la semana verificada llegue al nodo después del viernes, avisar al docente rural para que las tablets se copien antes del lunes.
- Crear un RF: el docente (rural o creador) debe ver las respuestas de cada alumno por semana y curso después de la sincronización (RF21 solo dice que suben a la central).
- Opcional, ampliar RF21: que la App Escuela le muestre al alumno si sus respuestas ya se enviaron o todavía están pendientes en la tablet.

**Veredicto: "¿RemoteSchooly me sirve en mi semana? ¿Qué me falta?"**
Casi. Me gusta que la tablet me diga qué semana tengo y si está completa, que los archivos ya no lleguen a medias y que pueda hacer la tarea sin internet sin perderla en el cuaderno. Pero me faltan dos cosas. Nadie me asegura que la semana pase a mi tablet antes de que me la lleve a mi casa, y ese es justo mi "funciona si" del lunes. Tampoco sé si el profe de verdad ve mis respuestas o si solo se quedan guardadas en la central.

#### Julián (docente rural)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RNF02, RNF03 | 5 | El paquete sale el jueves a las 20:00 y el nodo lo pide solo cada 5 minutos cuando hay señal. Mis 3 grados son como máximo 300 MB, así que alcanza de sobra antes del lunes. |
| N2 | RF16, RF17, RF18, RNF04, RNF05 | 5 | Una sola pantalla me dice qué llegó, qué falta y qué está dañado. Solo veo lo verificado por hash, y los alumnos copian desde el nodo sin salir a internet. |
| N3 | RF11, RF04, RF08, RNF07 | 5 | Adapto desde la App Escuela: cambio el contexto, simplifico o agrego ejercicios. La solicitud sale cuando hay señal y el resultado vuelve con la sincronización. No necesito una conexión buena en ese momento. |
| P1 | RF15, RNF02 | 5 | La descarga va por partes y sigue desde la última parte recibida. Ataca justo la causa: ya no empiezo de cero cuando se corta la señal. |
| P2 | RF12, RF16, RNF04 | 5 | En la central revisan que el archivo abra antes de publicarlo. En la escuela se compara el hash, si no coincide se vuelve a pedir, y nadie lo ve hasta que está verificado. |
| P3 | RF13, RF17, RF19 | 5 | El manifiesto trae la lista completa y la pantalla me muestra la semana, los grados, lo que llegó y lo que falta. Ya no tengo que revisar archivo por archivo. |
| P4 | RF18, RNF05 | 5 | La escuela baja el paquete de internet una sola vez por semana y las tablets copian del nodo por la red local. Así los 28 alumnos no se comen la antena. |

**Flujo:** claro. El jueves se publica el paquete (RF13), el nodo lo pide solo cuando hay señal (RF14), lo baja por partes (RF15) y verifica los hashes (RF16). Yo veo la semana completa en la pantalla (RF17), los alumnos la copian desde el nodo (RF18) y estudian sin internet (RF19, RF20).

**Gaps:**
- RF11 no da un plazo para que vuelva mi material adaptado ni me deja ver en qué estado está mi pedido (enviado / en proceso / llegó). Habría que agregar a RF11 un estado visible en la App Escuela y extender RNF06 con un tiempo máximo para el resultado, por ejemplo "llega en la siguiente sincronización después de generado".
- RF11 no dice si puedo describir mi propio contexto ("cosecha de yuca") o si solo elijo de la lista de RF04 ("cosecha"). Habría que aclarar en RF11 si hay un campo corto para el detalle local, aunque sea con un límite.
- RF23 avisa el domingo al creador y al coordinador, pero no a mí. Si el domingo la semana sigue incompleta, yo me entero recién mirando la pantalla. Habría que agregar a RF17 o RF19 un aviso visible de "semana incompleta al domingo".
- Ningún requerimiento dice qué pasa si mi semana nunca termina de llegar, por ejemplo con lluvia todo el fin de semana. Falta saber si el lunes se puede seguir usando la semana anterior completa (RNF04 dice que no se mezclan semanas, pero no dice cuál queda en uso).

**Veredicto:** "¿RemoteSchooly me sirve en mi semana? Sí. Mis cuatro dolores se atacan en la causa: la descarga sigue donde se quedó, el hash evita el PDF dañado, la pantalla me dice si tengo todo y los alumnos copian de la red de la escuela. Me falta saber cuándo vuelve lo que adapto con la IA y qué uso el lunes si la semana no llegó completa. Puntaje: 5,0/5."

#### Rocío (docente creadora)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF04, RF07, RF08, RNF06 | 5 | Pido desde una plantilla sin pegar el currículo; la IA solo recibe los párrafos de mi grado y competencia (máx. 1 000 tokens), y el borrador inmediato llega en menos de 60 s, dentro de mi misma sesión. |
| N2 | RF05, RF06, RF09, RF10 | 1 | Reutilizar sí está cubierto (RF05 me muestra el material listo con su autor antes de gastar). Pero RF09 solo me da mi gasto por material, y RF10 no dice que yo vea el gasto del equipo frente al presupuesto: parece una pantalla del coordinador. Tampoco veo mi total semanal. |
| N3 | RF12, RF13, RF16, RF22 | 5 | Marco el material como listo y el paquete se publica el jueves a las 20:00. Luego veo por escuela y grado si está pendiente, en curso, completo y verificado o sin contacto. |
| P1 | RF04, RF07, RF06, RF09, RNF01 | 5 | Ataca la causa: ya no pego el currículo entero, la solicitud repetida sale del caché, cada llamada muestra tokens y costo, y el 40 % de ahorro se mide cada semana en dólares. |
| P2 | RF05 | 5 | Antes de llamar a la IA el sistema busca en la biblioteca lo mismo por grado, competencia, tema y tipo, y me muestra las fracciones de mi colega con su nombre. Si las reutilizo, cuestan 0 tokens. |
| P3 | RF16, RF22, RF23 | 5 | El nodo avisa cuando toda la semana está verificada. Veo "sin contacto" cuando pasan más de 48 h, y el domingo a las 18:00 me llega un correo con las escuelas incompletas, antes del lunes. |

Flujo: con vacíos. Entro con mi usuario (RF02), pido el material por plantilla (RF04), primero me ofrece lo de la biblioteca (RF05) o el caché (RF06), si no, la IA genera con el currículo recortado (RF07/RF08), veo el costo (RF09), marco listo (RF12), se publica el jueves (RF13) y sigo mis escuelas hasta el domingo (RF22/RF23). El vacío está en ver el ahorro del equipo desde mi propia pantalla.

Gaps:
- Modificar RF10 para que el panel de gasto del equipo, presupuesto y porcentaje de ahorro frente a la línea base también lo vea el docente creador, no solo el coordinador.
- Modificar RF09 (o crear RF nuevo) para que me muestre mi total semanal de tokens y dólares frente a mi parte del presupuesto, no solo el gasto por material.
- Crear un RF de búsqueda manual en la biblioteca (por tema, grado, autor o palabra), aparte de la coincidencia automática de RF05. Así encuentro material parecido aunque no coincida el campo exacto.
- Definir en RF10 qué pasa cuando el equipo llega al presupuesto semanal (aviso, bloqueo o solo lotes), porque hoy no está escrito.

Veredicto: "Sí, RemoteSchooly me sirve en mi semana. Hago el material con plantillas, ya no pego el currículo, reutilizo las fracciones de mi colega y el domingo sé qué escuelas no están en verde sin esperar el WhatsApp del lunes. Lo que me falta es ver yo misma, en mi pantalla, que el equipo gasta 40 % menos que antes y cuánto llevo gastado en la semana frente al presupuesto. Hoy eso parece ser solo para el coordinador. También me faltaría poder buscar en la biblioteca cuando el tema no coincide exacto."

### Reporte del juez (Eval-Spec)

### Yesenia Quispe (alumna rural)
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RF16, RF18, RF20, RF03, RNF03, RNF05 | 1 | Se mantiene. RF18 dice que las tablets copian desde el nodo, pero no dice cuándo ni si la copia es automática. No hay nada que asegure que la semana esté en la tablet antes de que se la lleve a su casa. |
| N2 | RF19, RNF04 | 5 | Se mantiene. RF19 muestra en la pantalla de inicio la semana y si está completa o qué falta. |
| N3 | RF20, RF21, RNF05 | 1 | Se mantiene. RF21 lleva las respuestas al nodo y a la central, pero ningún RF dice que el profesor las vea ni dónde. La necesidad dice "le lleguen al profesor". |
| P1 | RF12, RF15, RF16, RNF03, RNF04 | 5 | Se mantiene. La revisión de apertura, la descarga por partes, el hash antes de mostrar y los videos livianos atacan la causa. |
| P2 | RF13, RF19, RNF04 | 5 | Se mantiene. Hay un paquete por semana, la semana se ve en la pantalla de inicio y no se mezclan semanas. |
| P3 | RF14, RF18, RNF05 | 5 | Se mantiene. La escuela baja el paquete una sola vez y las tablets copian por la red local. |
| P4 | RF20, RF21 | 5 | Se mantiene. Las respuestas se guardan en la tablet y se envían solas. |
| Flujo | RF13 → RF16 → RF18 → RF19/RF20 → RF21 | 1 | Se mantiene "con vacíos". Falta cuándo llega la semana a la tablet y falta el final del camino (el profesor ve la tarea). |

Sub-scores: Necesidades (1+5+1)/3 = 2,33/5 · Pain points (5+5+5+5)/4 = 5 → 3/3 · Flujo 1/2 → **Total 6.3/10**

### Julián Huamán (docente rural)
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RNF02, RNF03 | 5 | Se mantiene. Publica el jueves a las 20:00, el nodo pide solo cada 5 min cuando hay señal, y 3 grados son 300 MB o menos (unos 20 min a 2 Mbps según RNF03). |
| N2 | RF16, RF17, RF18, RNF04, RNF05 | 5 | Se mantiene. Una pantalla muestra lo que llegó, lo que falta y lo dañado. Solo se muestra lo verificado, y las tablets copian por la red local. |
| N3 | RF11, RF04, RF08, RNF07 | 5 | Se mantiene. RF11 dice quién (docente rural), qué (cambiar contexto, simplificar, más ejercicios), cuándo sale (cuando hay señal) y cómo vuelve (por la sincronización del paquete). La lista de contextos de RF04 incluye "cosecha". Falta un plazo de retorno, pero la necesidad pide que funcione con conexión lenta y el camino asíncrono lo cumple. |
| P1 | RF15, RNF02 | 5 | Se mantiene. La descarga sigue desde la última parte recibida. |
| P2 | RF12, RF16, RNF04 | 5 | Se mantiene. El archivo se revisa en la central y se verifica por hash en la escuela. Si no coincide se vuelve a pedir y no se muestra. |
| P3 | RF13, RF17, RF19 | 5 | Se mantiene. El manifiesto y la pantalla de RF17 muestran lo que llegó y lo que falta. |
| P4 | RF18, RNF05 | 5 | Se mantiene. La escuela baja una vez por semana y las tablets copian del nodo. |
| Flujo | RF13 → RF14 → RF15 → RF16 → RF17 → RF18 → RF20 | 2 | Se mantiene "claro". |

Sub-scores: Necesidades (5+5+5)/3 = 5/5 · Pain points 5 → 3/3 · Flujo 2/2 → **Total 10.0/10**

### Rocío Paredes (docente creadora)
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF04, RF07, RF08, RNF06 | 5 | Se mantiene. Trabaja con plantilla, el currículo va recortado a 1 000 tokens como máximo y la generación inmediata tarda menos de 60 s. |
| N2 | RF05, RF06, RF09, RF10 | 1 | Se mantiene. La reutilización está cubierta (RF05). RF10 no dice a quién se le muestra el gasto del equipo frente al presupuesto, y RF09 solo da el gasto por material, no el total semanal. Como falta "quién", queda parcial. |
| N3 | RF12, RF13, RF16, RF22 | 5 | Se mantiene. RF22 muestra por escuela y grado los estados pendiente, en curso, completo y verificado, o sin contacto. |
| P1 | RF04, RF07, RF06, RF09, RNF01 | 5 | Se mantiene. La causa (pegar el currículo entero) se elimina con RF04 y RF07, y el número que decía no ver aparece por material en RF09. El número del equipo ya se descuenta en N2. |
| P2 | RF05 | 5 | Se mantiene. RF05 busca de forma automática por grado, competencia, tema y tipo antes de llamar a la IA y muestra el autor. Para "los mismos ejercicios de fracciones" esa coincidencia exacta alcanza. La búsqueda manual va como gap. |
| P3 | RF16, RF22, RF23 | 5 | Se mantiene. Ve el estado por escuela y el domingo a las 18:00 le llega un correo con las escuelas incompletas. |
| Flujo | RF02 → RF04 → RF05/RF06 → RF07/RF08 → RF09 → RF12 → RF13 → RF22/RF23 | 1 | Se mantiene "con vacíos". El camino para ver el ahorro del equipo desde su propia pantalla no existe en el texto de RF10. |

Sub-scores: Necesidades (5+1+5)/3 = 3,67/5 · Pain points 5 → 3/3 · Flujo 1/2 → **Total 7.6/10**

### Resumen
| Persona | Score |
|---|---|
| Yesenia Quispe | 6.3/10 |
| Julián Huamán | 10.0/10 |
| Rocío Paredes | 7.6/10 |
| **PROMEDIO** | **7.9/10 (79 %): FAILED** |

Cálculo: (6,3 + 10,0 + 7,6) / 3 = 23,9 / 3 = 7,96, que queda en **7,9** (sin redondear hacia arriba). Con los valores sin truncar, (6,33 + 10,0 + 7,67) / 3 = 8,0 también, pero el veredicto sigue siendo FAILED porque Yesenia está por debajo de 7/10 y el umbral exige que ninguna persona quede bajo 7.

### Ajustes del juez
- No hubo cambios de puntaje. Las tres evaluaciones usan solo 5/1/0 y todos los IDs que citan existen (RF01–RF23, RNF01–RNF09).
- Julián, N3: se revisó si correspondía bajar a parcial porque no hay plazo de retorno. Se mantiene en 5 porque RF11 dice quién, qué, cuándo sale y por dónde vuelve. La falta de plazo queda como gap.
- Rocío, P2: se revisó si correspondía bajar porque no hay búsqueda manual. Se mantiene en 5 porque RF05 resuelve el caso que describe el pain point (el mismo tema y el mismo tipo). La búsqueda manual queda como gap.
- Rocío, flujo: se mantiene en 1 porque el vacío existe en el texto (RF10 no dice quién ve el panel), no es una lectura dura de la persona.

### Gaps priorizados
- **(1) Copia automática y a tiempo a la tablet.** Afecta a Yesenia en N1 y en el flujo, y recupera hasta 3,3 puntos. Modificar RF18: la tablet copia sola la semana verificada apenas se conecta a la red de la escuela, y el docente rural ve en RF17 qué tablets ya la tienen completa antes del viernes. Agregar un aviso al docente rural si la semana llega al nodo después del viernes.
- **(2) El profesor ve las respuestas.** Afecta a Yesenia en N3 y en el flujo (y le da a Julián el final del camino). Recupera hasta 1,3 puntos más el flujo. Crear un RF: el docente rural ve en la App Escuela, desde el nodo y sin internet, las respuestas de cada alumno por semana y curso. Ampliar RF21 para que la tablet muestre al alumno si sus respuestas están enviadas o pendientes.
- **(3) Gasto del equipo visible para la creadora.** Afecta a Rocío en N2 y en el flujo, y recupera hasta 2,3 puntos. Modificar RF10: el panel con gasto del equipo, presupuesto y porcentaje de ahorro frente a la línea base lo ve también el docente creador. Modificar RF09 para que muestre su total semanal de tokens y dólares, no solo el gasto por material.
- **(4) Estado y plazo de la adaptación rural.** Afecta a Julián, sin impacto en el puntaje actual. Ampliar RF11 con un estado visible (enviado / en proceso / llegó) y agregar a RNF06 que el resultado llega en la siguiente sincronización después de generado.
- **(5) Semana incompleta el lunes.** Afecta a Julián y a Yesenia, sin impacto en el puntaje actual. Definir qué semana queda en uso si la nueva no terminó de llegar (por ejemplo, la anterior completa sigue visible), y avisar también al docente rural en RF17 cuando el domingo la semana sigue incompleta.
- **(6) Biblioteca y presupuesto.** Afecta a Rocío, sin impacto en el puntaje actual. Crear un RF de búsqueda manual en la biblioteca (por tema, grado, autor o palabra) y definir en RF10 qué pasa cuando el equipo llega al presupuesto (aviso, bloqueo o solo lotes).

### Cambios para la iteración #2

- RF18: la tablet copia sola la semana al conectarse.
- RF21 y RF24: el alumno ve qué respuestas envió y el docente las ve en el nodo.
- RF09 y RF10: el creador ve su gasto semanal y el del equipo.
- RF11: nota corta y estado del pedido de adaptación.
- RF25 (buscar en la biblioteca) y RF26 (si no llega la semana, sigue la anterior).

---

## Iteración #2 — Requerimientos v2 (2026-09-23)

### Evaluaciones de las personas (tal como salieron)

#### Yesenia (alumna)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RF16, RF18, RF20, RNF03, RNF05, RF26 | 5 | El paquete se publica el jueves 20:00, el nodo lo baja solo y mi tablet lo copia el mismo día que llega, así que el fin de semana y el lunes ya lo tengo en mi casa y lo abro sin internet. |
| N2 | RF19, RF16, RNF04 | 5 | Apenas prendo la tablet, en la pantalla de inicio veo qué semana tengo y si está completa o qué me falta, sin abrir archivo por archivo. |
| N3 | RF20, RF21, RF24 | 5 | Resuelvo los ejercicios sin señal, se guardan en la tablet y se mandan solos cuando vuelvo a la escuela; además veo cuáles ya se enviaron y cuáles no, y el profe las ve en el nodo. |
| P1 | RF12, RF15, RF16, RNF03, RNF04 | 5 | El nodo baja por partes y sigue donde se cortó, revisa el hash y no me muestra nada que no esté verificado. Los videos ya vienen a 360p y se abren desde la tablet, no se quedan cargando de internet. |
| P2 | RF19, RF16, RF26, RNF04 | 5 | La tablet me dice qué semana es, no se mezclan semanas, y si la nueva no llegó completa sigo viendo la anterior completa. |
| P3 | RF14, RF18, RNF05 | 5 | Ya no bajamos todos a la vez de la antena: el nodo baja una sola vez por semana y nosotros copiamos de la red de la escuela. |
| P4 | RF20, RF21 | 5 | La tarea la hago en la tablet y se guarda ahí; ya no depende de un cuaderno que se pierde. |

Flujo: claro. El jueves se publica la semana, el nodo la baja sola cuando hay señal y la verifica, mi tablet la copia en la escuela, en mi casa veo "Semana 12, completa", estudio y respondo sin internet, y al volver a la escuela mis respuestas se van solas al profe.

Gaps:
- Ningún requerimiento pone una hora límite para que el nodo tenga la semana verificada (por ejemplo, "antes del viernes a las 12:00") para que yo me la lleve el viernes. Se podría agregar a RF14/RF16 o como RNF, con la cifra de RNF03 (unos 40 minutos a 2 Mbps).
- RF18 no dice que la tablet también revise el hash de lo que copia del nodo. Solo lo cubre en general RNF04. Se podría agregar a RF18: "si la copia a la tablet se corta, sigue desde donde quedó y no muestra el archivo hasta verificarlo".
- RF20/RF21 no dicen qué pasa con mis respuestas guardadas si la tablet se apaga o se queda sin batería antes de enviarlas. Se podría agregar a RF20 que la respuesta queda guardada apenas la escribo.

Veredicto: **"¿RemoteSchooly me sirve en mi semana? ¿Qué me falta?"** Sí, me sirve. Con esto el lunes abro la tablet en mi casa, sin internet, veo que tengo la "Semana 12" completa, estudio, hago la tarea ahí y se le manda sola al profe. Lo que me falta es chiquito: que alguien me asegure a qué hora el nodo ya tiene la semana, para llevármela el viernes, y que lo que copio a mi tablet también se revise para que no se abra a la mitad.

#### Julián (docente rural)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RNF02, RNF03 | 5 | El paquete se publica el jueves a las 20:00. El nodo revisa la señal cada 5 minutos y baja solo lo que le falta, sin que yo lo toque, y 600 MB son unos 40 minutos a 2 Mbps, así que llega antes del lunes. |
| N2 | RF16, RF17, RF18, RNF04, RNF05 | 5 | La pantalla del nodo me dice qué llegó y qué falta o está dañado, y las tablets copian la semana verificada desde el nodo sin salir a internet. |
| N3 | RF11, RNF06, RF04 | 5 | Adapto desde la App Escuela con el contexto de la lista y la nota "cosecha de yuca". El pedido sale cuando hay señal, veo si está en cola, enviado o ya llegó, y el resultado vuelve en la sincronización. |
| P1 | RF15, RNF02 | 5 | La descarga es por partes y sigue desde la última parte recibida. Se ataca la causa, que era empezar de cero. |
| P2 | RF12, RF16, RNF04, RF26 | 5 | El archivo se revisa al publicarlo, el hash se compara en el nodo, lo dañado se vuelve a pedir y nadie ve un archivo sin verificar. Si algo falla sigo con la semana anterior completa. |
| P3 | RF17, RF16, RF26 | 5 | La pantalla muestra lo que falta contra el manifiesto, y el domingo a las 18:00 el nodo me avisa si la semana sigue incompleta. |
| P4 | RF18, RNF05 | 5 | La escuela baja el paquete de internet una sola vez por semana y los 28 alumnos lo copian desde el nodo por la red de la escuela. |

Flujo: claro. El jueves la central publica el paquete (RF13), el nodo lo baja solo y por partes cuando hay señal (RF14, RF15), verifica el hash (RF16) y yo veo el estado en la pantalla (RF17). Las tablets copian del nodo (RF18), los alumnos estudian sin internet (RF20) y el domingo me avisan si falta algo (RF26).

Gaps:
- RF17 debe mostrar una línea de resumen, por ejemplo "Semana 12: completa, 3 grados, 24 de 24 archivos verificados", para que yo no tenga que leer la lista archivo por archivo. Hoy se puede deducir de la lista, pero no está dicho.
- RF11 no dice si mis adaptaciones cuentan contra la cuota del equipo (RF10) ni qué pasa si la cuota está agotada. Hay que aclararlo en RF10 o RF11.
- RF11 no dice si el material adaptado pasa también por la verificación de hash (RF16) y si lo puedo mandar a las tablets de mis alumnos (RF18). Hay que agregarlo a RF11.

Veredicto: "Sí, RemoteSchooly me sirve en mi semana. El material llega solo, no se baja de cero cuando se corta la señal, no veo archivos dañados y mis alumnos lo copian de la escuela sin gastar la antena. Me falta ver en una sola línea que la semana está completa, y saber si la adaptación que pido con la IA llega verificada a las tablets de mis alumnos y si me la pueden bloquear por la cuota."

#### Rocío (docente creadora)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF04, RF07, RF08, RNF06 | 5 | Pido el material con una plantilla (tipo, grado, competencia, tema, contexto). El sistema manda solo los párrafos del currículo que tocan, hasta 1 000 tokens, y el borrador llega en menos de 60 s, en la misma sesión. |
| N2 | RF05, RF25, RF09, RF10 | 5 | Antes de generar me muestran el material de un colega con su autor. Puedo buscar en la biblioteca sin gastar tokens. Veo mi gasto por material y por semana, y el del equipo contra el presupuesto. |
| N3 | RF12, RF13, RF16, RF22 | 5 | Marco el material como listo, el paquete se publica el jueves a las 20:00 y veo por escuela y grado si está pendiente, en curso, completo y verificado o sin contacto. |
| P1 | RF04, RF07, RF09, RF10, RNF01 | 5 | Se ataca la causa: ya no puedo pegar el currículo entero y veo en el Portal los tokens, los dólares y el % de ahorro contra la línea base, con una meta de 40 % medida cada semana. |
| P2 | RF05, RF25 | 5 | Las fracciones de mi colega aparecen antes de llamar a la IA, con su autor. Si las reutilizo cuestan 0 tokens, y además las puedo buscar por tema o por autor. |
| P3 | RF16, RF22, RF23 | 5 | El nodo avisa a la central cuando tiene la semana verificada. Veo el estado de Loreto en el Portal, y el domingo a las 18:00 me llega un correo con las escuelas que siguen incompletas, antes del lunes. |

Flujo: claro. Pido con plantilla, el sistema busca primero en la biblioteca o el caché (RF05, RF25, RF06), y solo si no hay nada genera con currículo recortado y modelo según la tarea (RF07, RF08). Veo mi gasto (RF09, RF10), marco listo (RF12), se publica el jueves (RF13) y sigo escuela por escuela (RF22) hasta el correo del domingo (RF23).

Gaps:
- Pedir otra versión cuando el borrador no me gusta: RF06 me devuelve la misma respuesta guardada si repito los campos, y ningún requerimiento dice cómo pido una versión distinta ni cuánto cuesta. Habría que modificar RF06 o RF04 para agregar un botón "otra versión" que salte el caché, con un tope por material y el gasto registrado en RF09.
- RF22 no dice cada cuánto se actualiza el estado en el Portal. Convendría agregar a RF22 (o a un RNF) que el estado cambia en minutos después de que el nodo avisa (RF16).
- RF22 muestra todas las escuelas, pero no dice si puedo filtrar por mis grados o mi curso, o solo por región. Convendría agregar a RF22 un filtro por grado, curso y región para que con 5 000 escuelas encuentre Loreto rápido. Es un detalle menor.

Veredicto: "¿RemoteSchooly me sirve en mi semana? Sí. Hago mi material con plantillas y sin pegar el currículo, veo primero lo que ya hizo mi colega, veo en pantalla cuánto gasto y cuánto ahorra el equipo contra la meta de 40 %, y el domingo sé qué escuelas no tienen la semana, sin esperar el WhatsApp del lunes. Lo que me falta es poco: saber cómo pido otra versión cuando el primer borrador no me convence sin que el caché me devuelva lo mismo, y que el estado de las escuelas diga cada cuánto se actualiza y se pueda filtrar por mis grados."

### Reporte del juez (Eval-Spec)

### Yesenia Quispe (alumna rural)
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RF16, RF18, RF20, RF26, RNF03, RNF05 (+RF03 sesión de 7 días, no citado) | 5 | Sin ajuste. RF13 fija cuándo se publica, RF14 dice quién baja el paquete (el nodo, solo), RF18 dice que la tablet lo copia el mismo día, RF20 permite abrirlo sin conexión y RF03 mantiene la sesión en casa. Observación: ningún RF fija una hora límite para que el nodo tenga la semana verificada. No se baja el puntaje porque la llegada depende de la señal y RF26 cubre el caso en que no llega. |
| N2 | RF19, RF16, RNF04 | 5 | Sin ajuste. RF19 dice dónde lo ve (pantalla de inicio) y qué muestra (semana, completa o qué falta). |
| N3 | RF20, RF21, RF24 | 5 | Sin ajuste. RF21 dice cuándo se envía, qué ve la alumna y quién recibe; RF24 cierra el camino hasta el profesor. |
| P1 | RF12, RF15, RF16, RNF03, RNF04 | 5 | Sin ajuste. RF15 ataca la causa (descarga por partes), RF16 no muestra nada sin verificar y RNF04 exige el 100 % de coincidencia con el hash en lo que ve el alumno, lo que incluye la tablet. |
| P2 | RF19, RF16, RF26, RNF04 | 5 | Sin ajuste. RNF04 dice "ninguna escuela mezcla semanas" y RF26 mantiene la semana anterior completa. |
| P3 | RF14, RF18, RNF05 | 5 | Sin ajuste. RNF05: "cada escuela baja el paquete de internet una sola vez por semana". |
| P4 | RF20, RF21 | 5 | Sin ajuste. |

Sub-scores: Necesidades 5,0/5 · Pain points 3,0/3 · Flujo 2/2 → **Total 10.0/10**

### Julián Huamán (docente rural)
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RNF02, RNF03 | 5 | Sin ajuste. RF14 dice "sin que nadie lo toque" y RNF03 da la cifra (600 MB, unos 40 minutos a 2 Mbps). Aquí vale la misma observación que en N1 de Yesenia sobre la hora límite. |
| N2 | RF16, RF17, RF18, RNF04, RNF05 | 5 | Sin ajuste. RF17 muestra los archivos que llegaron, los que faltan y los dañados, y RF18 hace la copia sin salir a internet. |
| N3 | RF11, RF04, RNF06 | 5 | Sin ajuste. RF11 dice quién pide, desde dónde, qué campos llena (lista más nota de 80 caracteres), cuándo sale el pedido y cómo ve el estado (en cola, enviado o ya llegó). |
| P1 | RF15, RNF02 | 5 | Sin ajuste. "Una descarga cortada nunca empieza de cero". |
| P2 | RF12, RF16, RNF04, RF26 | 5 | Sin ajuste. El archivo se revisa en el origen (RF12) y en el destino (RF16). |
| P3 | RF17, RF16, RF26 | 5 | Sin ajuste. RF26 agrega el aviso del domingo a las 18:00 en el nodo. |
| P4 | RF18, RNF05 | 5 | Sin ajuste. |

Sub-scores: Necesidades 5,0/5 · Pain points 3,0/3 · Flujo 2/2 → **Total 10.0/10**

### Rocío Paredes (docente creadora)
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF04, RF07, RF08, RNF06 | 5 | Sin ajuste. RF07 pone un tope de 1 000 tokens de currículo y RNF06 fija menos de 60 s para la generación inmediata, lo que cumple "en la misma sesión". |
| N2 | RF05, RF25, RF09, RF10 | 5 | Sin ajuste. RF10 dice quién lo ve (coordinador y cada creador) y qué ve (gasto, presupuesto usado y % de ahorro). |
| N3 | RF12, RF13, RF16, RF22 | 5 | Sin ajuste. RF22 da los 4 estados por escuela y grado, con un criterio medible para "sin contacto" (48 horas). |
| P1 | RF04, RF07, RF09, RF10, RNF01 | 5 | Sin ajuste, con una observación. La parte de "pido cinco versiones" no está tratada en forma explícita. La cuota (RF10) y el modelo barato (RF08) la limitan, pero ningún RF dice cómo se pide otra versión. No se baja el puntaje porque la causa del costo (pegar el currículo y no ver números) sí está atacada con cifras. |
| P2 | RF05, RF25 | 5 | Sin ajuste. |
| P3 | RF16, RF22, RF23 | 5 | Sin ajuste. RF23 dice cuándo (domingo a las 18:00), a quién le llega y qué contiene. |

Sub-scores: Necesidades 5,0/5 · Pain points 3,0/3 · Flujo 2/2 → **Total 10.0/10**

### Resumen
| Persona | Score |
|---|---|
| Yesenia Quispe | 10.0/10 |
| Julián Huamán | 10.0/10 |
| Rocío Paredes | 10.0/10 |
| **PROMEDIO** | **10.0/10 (100 %): PASSED** |

Promedio = (10,0 + 10,0 + 10,0) / 3 = 10,0. Es 10,0 ≥ 8,0 y ninguna persona está bajo 7, así que el resultado es **PASSED**.

### Ajustes del juez
- No hay cambios de puntaje. Las tres evaluaciones usan solo 5/1/0 y todos los IDs citados existen (RF01–RF26, RNF01–RNF09).
- Dos observaciones que no cambian el puntaje: no hay hora límite para que el nodo tenga la semana verificada (Yesenia N1, Julián N1); no está tratada la parte de "cinco versiones" (Rocío P1).

### Gaps priorizados
Ninguno recupera puntos, porque todos los ítems ya están en 5.
- (1) Falta una hora objetivo para que el nodo tenga la semana verificada, por ejemplo "antes del viernes a las 12:00 si hubo señal". Afecta a Yesenia y Julián.
- (2) La copia a la tablet no dice que revise el hash ni que siga desde donde quedó si se corta. Afecta a Yesenia. Modificar RF18.
- (3) No se dice cómo pedir "otra versión" de un borrador, porque RF06 devuelve la respuesta guardada si los campos son iguales. Falta un tope por material y que ese gasto quede registrado. Afecta a Rocío.
- (4) No queda claro si las adaptaciones de RF11 cuentan contra la cuota de RF10 ni qué pasa si la cuota está agotada; tampoco si el material adaptado pasa por RF16 y llega a las tablets por RF18. Afecta a Julián.
- (5) Falta una línea de resumen en la pantalla del nodo ("Semana 12: completa, 3 grados, 24 de 24 archivos verificados"). Afecta a Julián. Modificar RF17.
- (6) RF22 no dice cada cuánto se actualiza el estado ni tiene filtro por grado, curso o región. Afecta a Rocío.
- (7) RF20 no dice que la respuesta queda guardada apenas se escribe (tablet sin batería). Afecta a Yesenia.

### Cambios para la iteración #3

Observaciones del juez: tope de "otra versión" (RF06), hora límite en el nodo (RNF03), hash en la tablet (RF18), cuota por escuela (RF11), resumen en el nodo (RF17), guardar la respuesta al escribirla (RF20) y filtros (RF22).

---

## Iteración #3 — Requerimientos v3 (2026-09-23)

### Evaluaciones de las personas (tal como salieron)

#### Yesenia (alumna)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RF16, RF18, RF20, RNF03, RNF05 | 5 | El paquete sale el jueves 20:00, el nodo lo tiene verificado antes del viernes 12:00 y mi tablet lo copia sola ese mismo día. El lunes ya lo tengo y lo abro en mi casa sin internet, con videos de 5 minutos. |
| N2 | RF19 | 5 | En la pantalla de inicio veo qué semana tengo y si está completa o qué le falta, sin abrir archivo por archivo. |
| N3 | RF20, RF21, RF24 | 5 | Respondo sin conexión. Cuando vuelvo a la escuela mis respuestas se mandan solas, veo cuáles ya se enviaron y el profe las ve en el nodo. |
| P1 | RF12, RF15, RF16, RF18, RNF04 | 5 | Nada se reproduce desde internet. El archivo se revisa al publicarlo, se baja por partes, se compara con su hash en el nodo y otra vez en mi tablet. Así no me llega un PDF a la mitad ni un video que se queda cargando. |
| P2 | RF19, RNF04, RF26 | 1 | RF19 me dice qué semana tengo, pero con RF26, si la semana nueva no llega, la tablet sigue mostrando la anterior y solo le avisan al profe. A mí nadie me dice "esta no es la semana actual" y puedo terminar haciendo otra tarea. |
| P3 | RF14, RF18, RNF05 | 5 | El nodo baja el paquete una sola vez por semana y las tablets lo copian desde el nodo por la red de la escuela, así que ya no competimos todos por la antena. |
| P4 | RF20, RF21 | 5 | Cada respuesta se guarda en la tablet apenas la escribo, aunque se apague, y luego se envía sola. Ya no dependo del cuaderno. |

Suma: 31/35 (promedio 4,43/5, o sea 8,86/10).

Flujo: claro. El jueves se publica, el nodo baja y verifica, mi tablet copia sola antes de irme a casa, en casa veo "Semana 12: completa" y estudio y respondo sin internet, y al volver a la escuela mis respuestas se mandan solas y el profe las ve en el nodo. El único vacío es cuando la semana nueva no llega: la tablet me muestra la anterior sin avisarme.

Gaps:
- Modificar RF19 o RF26: cuando la tablet muestra la semana anterior porque la nueva no llegó, la pantalla de inicio del alumno debe avisarlo con un mensaje claro, por ejemplo "La Semana 12 todavía no llega. Tienes la Semana 11". Hoy el aviso de RF26 solo le llega al docente rural.
- Detalle menor en RF03: la sesión dura 7 días y no dice qué pasa si no vuelvo a la escuela en ese tiempo (por ejemplo, feriados o lluvias). Debería decir si puedo seguir abriendo el material y las respuestas guardadas aunque la sesión venza.

Veredicto: **"¿RemoteSchooly me sirve en mi semana? ¿Qué me falta?"** Sí, me sirve. El lunes abro la tablet en mi casa sin internet, tengo toda la semana completa y verificada, hago la tarea en la tablet sin perderla y mis respuestas le llegan solas al profe. Solo me falta una cosa: si la semana nueva no llega, que la tablet me lo diga a mí y no solo al profe. Si no, puedo terminar haciendo la tarea de la semana pasada, como me pasa ahora.

#### Julián (docente rural)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RNF02, RNF03 | 5 | El paquete sale el jueves a las 20:00. El nodo revisa la señal cada 5 minutos y lo baja solo. Con 1 hora de señal lo tengo verificado antes del viernes a las 12:00, mucho antes del lunes. |
| N2 | RF16, RF17, RF18, RNF04, RNF05 | 5 | Veo la línea "Semana 12: completa, 3 grados, 24 de 24 archivos verificados". Mis alumnos copian de la red de la escuela sin salir a internet, y la escuela baja el paquete una sola vez por semana. |
| N3 | RF11, RF04, RNF06 | 5 | Adapto desde la App Escuela con un contexto de la lista y una nota de 80 caracteres ("cosecha de yuca"). Veo si mi pedido está en cola, enviado o ya llegó, y vuelve con la misma sincronización, aunque la señal sea lenta. |
| P1 | RF15, RNF02 | 5 | La descarga va por partes y sigue desde la última que recibió. Ataca justo la causa: ya no empieza de cero. |
| P2 | RF12, RF16, RNF04, RF26 | 5 | Se revisa que el archivo abra al publicarlo y el hash al recibirlo. Si llega dañado se vuelve a pedir y nadie lo ve hasta que está verificado. Ya no me entero el lunes delante de los alumnos. |
| P3 | RF17, RF19, RF26 | 5 | La pantalla dice qué llegó, qué falta y qué está dañado. El domingo a las 18:00 el nodo me avisa si la semana sigue incompleta. |
| P4 | RF18, RNF05 | 5 | Las tablets copian del nodo, revisan el hash y siguen desde donde quedaron. Los 28 alumnos ya no compiten por la antena. |

Flujo: claro. El jueves se publica el paquete (RF13), el nodo lo baja solo y por partes (RF14 y RF15) y lo verifica (RF16). Yo veo el resumen en la pantalla (RF17), las tablets copian del nodo (RF18) y los alumnos estudian sin internet (RF20). Si algo falla, sigo con la semana anterior y me llega el aviso del domingo (RF26).

Gaps:
- RF11 y RNF06: no dicen cuánto tarda como máximo en volver mi adaptación si la señal se va varios días. Habría que agregar a RNF06 un plazo, por ejemplo "llega en la primera sincronización después de generarse, y a más tardar con el paquete de la semana siguiente".
- RF17: no dice dónde veo la pantalla del nodo (¿en la laptop de la escuela, en mi celular?) ni si puedo pedir "reintentar ahora" para un archivo dañado. Conviene aclarar en RF17 el dispositivo y agregar un botón para reintentar a mano.
- RF26: el aviso del domingo sale en el nodo, pero si no estoy en la escuela no lo veo. Se podría pedir en RF26 que el aviso se muestre también en la App Escuela de mi tablet o celular.

Veredicto: Sí, RemoteSchooly me sirve en mi semana. Ya no pierdo el domingo bajando el mismo video. Sé si llegó todo sin revisar archivo por archivo, y mis alumnos copian de la red de la escuela. Me falta poco: saber cuánto tarda como máximo en volver una adaptación que pido con la IA, y enterarme del aviso del domingo aunque no esté frente a la pantalla del nodo.

#### Rocío (docente creadora)

| Ítem | Requerimiento(s) que lo cubre(n) | Nivel (5/1/0) | Comentario (una línea) |
|---|---|---|---|
| N1 | RF04, RF07, RF06, RF08, RNF06 | 5 | Genero desde una plantilla sin pegar el currículo. El sistema manda solo los párrafos de mi grado y competencia (máx. 1 000 tokens) y tengo el borrador en menos de 60 s, en la misma sesión. |
| N2 | RF05, RF25, RF09, RF10 | 5 | Antes de generar me muestra lo que ya existe con su autor, y además puedo buscar sin gastar tokens. Veo mi gasto por material y por semana, y también el del equipo contra el presupuesto. |
| N3 | RF12, RF13, RF16, RF22, RF23 | 5 | Marco el material como listo y el jueves se publica. Veo por escuela y grado si el paquete está pendiente, en curso, completo y verificado o sin contacto, con filtro por región. |
| P1 | RF04, RF07, RF06, RF09, RF10, RNF01 | 5 | Ataca la causa: ya no puedo pegar el programa entero y "otra versión" tiene un tope de 2 y manda solo el borrador. Por fin veo números en tokens y dólares, y el % de ahorro frente a la línea base. |
| P2 | RF05, RF25 | 5 | Los ejercicios de fracciones del colega me aparecen antes de llamar a la IA y reutilizarlos cuesta 0 tokens. También los encuentro buscando por tema o por autor. |
| P3 | RF16, RF22, RF23 | 5 | Ya no me entero por WhatsApp. El estado de Loreto cambia a lo mucho 10 minutos después del aviso del nodo, y el domingo a las 18:00 me llega un correo con las escuelas incompletas. |

Flujo: claro. Lleno la plantilla y el sistema busca primero en la biblioteca. Si no hay nada, busca en el caché y recién después llama a la IA con el extracto del currículo. Veo lo que gasté, marco el material como listo, el jueves se arma y se publica el paquete, y sigo por escuela cuáles ya lo tienen completo y verificado. El domingo me llega el correo con las escuelas que faltan.

Gaps:
- RF10 / RNF01: la línea base son "las cuatro semanas antes de empezar", pero no dice de dónde salen esos datos si antes nadie veía números. Hay que aclarar en RF10 que la línea base se toma del registro de consumo que ya existe en la plataforma o del gasto facturado de esas semanas. Si no, mi 40 % no se puede comprobar.
- RF05: solo busca coincidencias exactas de grado, competencia, tema y tipo. Si el colega hizo fracciones con otro contexto (sierra y no selva), no se sabe si me lo ofrece para adaptarlo barato con el modelo simple de RF08. Hay que modificar RF05 para que muestre también los materiales parecidos que solo cambian de contexto.
- RF22: no dice que pueda ver el porqué de una escuela "sin contacto" o incompleta (qué archivos le faltan). Para mí es menor, pero se podría sumar a RF22 el detalle de archivos faltantes que ya tiene RF17.

Veredicto: "Sí, RemoteSchooly me sirve en mi semana. Hago mi material con plantillas, veo primero lo que ya hicieron mis colegas, sé cuánto gasto yo y cuánto el equipo, y el domingo veo en pantalla qué escuelas están completas sin esperar al WhatsApp del lunes. Solo me falta que quede claro cómo se calcula la línea base del 40 %, porque sin eso el ahorro no se puede comprobar. También me gustaría que me ofrezca material parecido para adaptarlo y no solo el idéntico."

### Reporte del juez (Eval-Spec)

### Yesenia
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RF16, RF18, RF20, RNF03, RNF05 | 5 | Se mantiene. RF13 dice que se publica el jueves a las 20:00. RNF03 dice que la semana está verificada antes del viernes a las 12:00. RF18 dice que la tablet copia sola el mismo día. RF20 dice que abre todo sin conexión. Queda claro quién, cuándo y qué produce. |
| N2 | RF19 | 5 | Se mantiene. RF19 dice que la pantalla de inicio muestra la semana y si está completa o qué le falta. |
| N3 | RF20, RF21, RF24 | 5 | Se mantiene. RF20 dice que la respuesta se guarda apenas se escribe. RF21 dice que se envía sola y muestra cuáles están enviadas y cuáles pendientes. RF24 dice que el docente las ve en el nodo. |
| P1 | RF12, RF15, RF16, RF18, RNF04 | 5 | Se mantiene. Ataca la causa: RF16 dice que un archivo no se muestra hasta estar verificado y RF18 dice que la tablet revisa el hash y retoma la copia. |
| P2 | RF19, RNF04, RF26 | 1 | Se mantiene. RF19 dice qué semana tiene la tablet. Pero con RF26 la tablet sigue mostrando la semana anterior como "completa", y el aviso de RF26 le llega solo al docente rural. El texto no dice que se le avise a la alumna que no es la semana actual. Solo alivia el problema. |
| P3 | RF14, RF18, RNF05 | 5 | Se mantiene. RNF05 dice que la escuela baja el paquete una vez por semana y RF18 dice que las tablets copian del nodo sin salir a internet. |
| P4 | RF20, RF21 | 5 | Se mantiene. RF20 dice que la respuesta se guarda al escribirla, aunque la tablet se apague. |
| Flujo | RF13 → RF18 → RF19 → RF20 → RF21 | 2 | Se mantiene "claro". El vacío que menciona la persona es un caso de falla, no parte del camino principal, y ya se castiga en P2. |

Sub-scores: Necesidades 15/15 → 5,0/5 · Pain points 16/20 → 2,4/3 · Flujo 2/2 → **Total 9,4/10**

### Julián
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF13, RF14, RF15, RNF02, RNF03 | 5 | Se mantiene. RF14 dice que el nodo revisa la señal cada 5 minutos y descarga solo. RNF03 dice que la semana está verificada antes del viernes a las 12:00. |
| N2 | RF16, RF17, RF18, RNF04, RNF05 | 5 | Se mantiene. RF17 muestra la línea de resumen con los archivos verificados, faltantes y dañados. RF18 dice que las tablets copian desde la red de la escuela. |
| N3 | RF11, RF04, RNF06 | 5 | Se mantiene. RF11 dice quién pide (el docente rural), cómo (contexto de una lista más una nota de 80 caracteres), cuándo sale (cuando hay señal) y cómo vuelve (en la sincronización), y muestra el estado del pedido. |
| P1 | RF15, RNF02 | 5 | Se mantiene. RF15 dice que la descarga va por partes y retoma desde la última parte. |
| P2 | RF12, RF16, RNF04, RF26 | 5 | Se mantiene. RF12 revisa al publicar y RF16 revisa el hash al llegar. Un archivo que no coincide se vuelve a pedir y no se muestra. |
| P3 | RF17, RF19, RF26 | 5 | Se mantiene. RF17 basta por sí solo. RF19 es la pantalla de la tablet y aquí aporta poco, pero eso no cambia el nivel. |
| P4 | RF18, RNF05 | 5 | Se mantiene. |
| Flujo | RF13 → RF14/RF15 → RF16 → RF17 → RF18 → RF20, RF26 | 2 | Se mantiene "claro". |

Sub-scores: Necesidades 15/15 → 5,0/5 · Pain points 20/20 → 3,0/3 · Flujo 2/2 → **Total 10,0/10**

### Rocío
| Ítem | Req que lo cubre | Nivel (5/1/0) | Ajuste del juez |
|---|---|---|---|
| N1 | RF04, RF07, RF06, RF08, RNF06 | 5 | Se mantiene. RF04 no tiene campo para pegar documentos y RF07 manda como máximo 1 000 tokens del currículo. RNF06 dice que una generación inmediata tarda menos de 60 segundos, así que el borrador sale en la misma sesión. |
| N2 | RF05, RF25, RF09, RF10 | 5 | Se mantiene. RF05 muestra lo que ya existe antes de llamar a la IA y RF25 permite buscar sin gastar tokens. RF09 muestra el gasto propio y RF10 el del equipo contra el presupuesto. |
| N3 | RF12, RF13, RF16, RF22, RF23 | 5 | Se mantiene. RF22 muestra el estado por escuela y grado y dice que se actualiza en 10 minutos como máximo. |
| P1 | RF04, RF07, RF06, RF09, RF10, RNF01 | 5 | Se mantiene. Ataca la causa: no se puede pegar el currículo, "otra versión" tiene tope de 2 y el gasto se ve en tokens y dólares. El origen de la línea base es una brecha para verificar RNF01, pero no quita que ella vea números (lo pedido en P1). Va a los gaps. |
| P2 | RF05, RF25 | 5 | Se mantiene. |
| P3 | RF16, RF22, RF23 | 5 | Se mantiene. RF23 manda un correo el domingo a las 18:00 y RF22 muestra el estado casi en tiempo real. |
| Flujo | RF04 → RF05 → RF06 → RF07/RF08 → RF09 → RF12 → RF13 → RF22 → RF23 | 2 | Se mantiene "claro". |

Sub-scores: Necesidades 15/15 → 5,0/5 · Pain points 15/15 → 3,0/3 · Flujo 2/2 → **Total 10,0/10**

### Resumen
| Persona | Score |
|---|---|
| Yesenia | 9,4/10 |
| Julián | 10,0/10 |
| Rocío | 10,0/10 |
| **PROMEDIO** | **9,8/10 (98 %) — PASSED** |

Cálculo: (9,4 + 10,0 + 10,0) / 3 = 29,4 / 3 = 9,8. El promedio es ≥ 8 y ninguna persona está por debajo de 7, así que pasa el umbral.

### Ajustes del juez
- Ningún nivel cambió. Todas las evaluaciones usan solo 5/1/0 y citan IDs que existen (RF01–RF26, RNF01–RNF09).
- Yesenia, total: la persona calculó 31/35 (8,86/10) con un promedio simple de todos sus ítems. Se recalcula con la rúbrica (necesidades sobre 5, pain points sobre 3, flujo sobre 2) y da 9,4/10.
- Yesenia, flujo: la persona lo marcó "claro" pero mencionó un vacío. Queda en 2 porque ese vacío es un caso de falla que ya se castiga en P2 y no corta el camino principal.
- Julián, P3: RF19 está mal citado (es la pantalla de la tablet, no la del nodo). El nivel no cambia porque RF17 cubre el pain point completo.

### Gaps priorizados
- (1, recupera 0,6 pts) Avisar a la alumna cuando la tablet sigue mostrando la semana anterior. Afecta a Yesenia (P2) y de rebote a Julián. Modificar RF19 o RF26 para que la pantalla de inicio de la tablet diga, por ejemplo, "La Semana 12 todavía no llega. Tienes la Semana 11".
- (2) Dónde se ve el aviso del domingo. Hoy RF26 lo muestra solo en el nodo. Afecta a Julián. Modificar RF26 para que el aviso también aparezca en la App Escuela del docente.
- (3) De dónde sale la línea base del 40 %. Afecta a Rocío. Aclarar en RF10 la fuente (el registro de consumo de la plataforma o el gasto facturado de esas semanas).
- (4) Qué pasa cuando vence la sesión fuera de la escuela (RF03). Afecta a Yesenia.
- (5) Plazo máximo de una adaptación cuando la señal se cae varios días. Afecta a Julián. Agregar un tope en RNF06.
- (6) Materiales parecidos: RF05 ofrece solo los que coinciden exactamente. Afecta a Rocío.
- (7, menor) RF17 no dice en qué dispositivo se ve la pantalla del nodo ni tiene "reintentar ahora"; RF22 no muestra qué archivos le faltan a una escuela incompleta.

---

## Cambios después de la iteración #3 (sin volver a correr el eval)

- Se aplicaron los gaps del juez: aviso en la tablet si la semana no llegó (RF19), fuente de la línea base (RF10), sesión vencida (RF03), plazo de las adaptaciones (RNF06) y materiales parecidos (RF05).
- Los requerimientos se reescribieron más cortos, sin cambiar su contenido.

Nota válida: iteración #3, 9,8/10 PASSED.
