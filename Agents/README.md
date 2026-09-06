# Agentes de evaluación

La evaluación de requerimientos sigue el pipeline del lab: **REPO MD (requerimientos) → EVAL (score > 8) → diagrama de arquitectura**. Se hace en dos pasos: primero cada persona evalúa por separado y sin ver a las demás; después el juez Eval-Spec audita y consolida.

| Archivo | Qué es |
| :--- | :--- |
| [yesenia-agent.md](yesenia-agent.md) | Agente que encarna a la alumna rural ([Personas/yesenia.md](../Personas/yesenia.md)) |
| [julian-agent.md](julian-agent.md) | Agente que encarna al docente rural ([Personas/julian.md](../Personas/julian.md)) |
| [rocio-agent.md](rocio-agent.md) | Agente que encarna a la docente creadora de contenido en Lima ([Personas/rocio.md](../Personas/rocio.md)) |
| [Spec/rubric.md](Spec/rubric.md) | Rúbrica (necesidades, pain points, flujo; umbral 8/10) |
| [Spec/Eval-Spec.md](Spec/Eval-Spec.md) | Juez que audita las tres evaluaciones y emite PASSED / FAILED |

## Cómo se corre

### Paso 1 — Una corrida por persona (tres chats o tres agentes independientes, en paralelo)

```
Vas a actuar como una persona modelo para evaluar unos requerimientos de software.
No eres un asistente, eres esta persona.

=== TU DEFINICIÓN ===
(contenido de Personas/<persona>.md)

=== TUS INSTRUCCIONES ===
(contenido de Agents/<persona>-agent.md)

=== REQUERIMIENTOS FUNCIONALES ===
(contenido de Requerimientos/Funcionales.md)

=== REQUERIMIENTOS NO FUNCIONALES ===
(contenido de Requerimientos/NoFuncionales.md)

=== RÚBRICA ===
(contenido de Agents/Spec/rubric.md)

=== TAREA ===
Evalúa si estos requerimientos cubren tus tres necesidades y resuelven tus tres pain points,
aplicando la rúbrica. Evalúa solo contra tus propias necesidades. Si dudas entre dos puntajes,
asigna el menor. No inventes requerimientos. Cita el ID exacto de cada requerimiento que uses.
Responde solo en el formato de respuesta de la rúbrica.
```

### Paso 2 — Juez Eval-Spec (un cuarto chat o agente)

```
=== TU DEFINICIÓN ===
(contenido de Agents/Spec/Eval-Spec.md)

=== RÚBRICA ===
(contenido de Agents/Spec/rubric.md)

=== PERSONAS ===
(contenido de Personas/*.md)

=== REQUERIMIENTOS ===
(contenido de Requerimientos/Funcionales.md y NoFuncionales.md)

=== EVALUACIONES RECIBIDAS ===
(las tres respuestas del Paso 1, tal cual salieron)

=== TAREA ===
Ejecuta el procedimiento de tu definición y entrega el reporte en el formato indicado.
Audita cada justificación contra el texto real del requerimiento citado antes de aceptar el
puntaje. Muestra el cálculo del promedio. No redondees hacia arriba.
```

## Registro de corridas

Cada corrida se guarda en `EVAL/iteracion-N.md` con: versión de los requerimientos evaluada, fecha, modelo usado, las tres evaluaciones tal como salieron, el reporte del juez y las brechas que alimentaron la siguiente iteración. En este lab, las corridas se ejecutaron con agentes de Claude (Claude Code) lanzados como subagentes independientes en paralelo, cada uno leyendo únicamente los archivos indicados arriba.
