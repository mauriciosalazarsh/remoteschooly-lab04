# Rúbrica de evaluación de requerimientos

Cada persona modelo evalúa los requerimientos **solo contra sus propias necesidades y pain points**. La rúbrica tiene tres criterios.

## Criterio 1 — Cobertura de necesidades (N1, N2, N3)

Se aplica una vez por cada necesidad de la persona.

| Resultado | Puntos |
| :--- | :--- |
| Existe uno o más requerimientos que cumplen totalmente la necesidad | 5 |
| Existe un requerimiento que la cumple solo en parte | 2 |
| No hay requerimiento que la cubra | 0 |

Máximo: 3 × 5 = **15 puntos**.

## Criterio 2 — Resolución de pain points (P1, P2, P3)

Se aplica una vez por cada pain point de la persona. Un pain point cuenta como **resuelto** solo si el requerimiento ataca la causa que la persona describe, no un síntoma vecino.

| Resultado | Puntos |
| :--- | :--- |
| Resuelto: el requerimiento elimina la causa del dolor | 3 |
| Aliviado: lo reduce pero la causa sigue ahí | 1 |
| No resuelto | 0 |

Máximo: 3 × 3 = **9 puntos**.

## Criterio 3 — Flujo claro para la persona

Se aplica una vez por persona: ¿se puede leer, a partir de los requerimientos, el camino completo de la persona de inicio a fin (su happy path)?

| Resultado | Puntos |
| :--- | :--- |
| El flujo completo se entiende y cada paso tiene un requerimiento | 6 |
| El flujo existe pero hay pasos sin requerimiento o ambiguos | 3 |
| No se entiende un flujo a partir de los requerimientos | 0 |

Máximo: **6 puntos**.

## Cálculo

- Puntaje bruto = Criterio 1 + Criterio 2 + Criterio 3 (máximo 30).
- **Score = puntaje bruto / 3** (sobre 10), con un decimal, sin redondear hacia arriba.

## Umbral de aprobación (enunciado del Lab 4: "Eval 8/10 Passed")

- El **promedio** de las tres personas debe ser **≥ 8.0/10**.
- Ninguna persona puede quedar **por debajo de 7.0/10**.
- Si no se cumple, el resultado es **FAILED** y los requerimientos se corrigen en una nueva iteración.

## Reglas de puntuación

1. Un requerimiento solo puede dar cobertura **total** (5 o 3) si dice **quién** lo usa, **cuándo** se activa (qué lo dispara), **qué produce** y **cómo se verifica** que se cumplió. Si falta alguno de esos elementos, el máximo es parcial (2 o 1).
2. Promesas vagas ("rápido", "óptimo", "amigable", "eficiente") sin un valor medible solo pueden dar cobertura parcial.
3. Se citan **IDs exactos** (RF-xx, RNF-xx). Si el ID citado no existe, el ítem vale 0.
4. Ante la duda entre dos puntajes, se asigna el **menor**.
5. Las brechas deben decir **qué falta** y **qué requerimiento habría que crear o modificar**.

## Formato de respuesta de cada persona

| Ítem | Requerimientos evaluados | Puntos | Justificación (una línea) |
| :--- | :--- | :--- | :--- |
| N1 | RF-xx, RNF-yy | 5 | … |
| N2 | … | 2 | … |
| N3 | — | 0 | … |
| P1 | … | 3 | … |
| P2 | … | 1 | … |
| P3 | … | 0 | … |

Criterio 1: X/15 · Criterio 2: X/9 · Criterio 3: X/6 (con una línea que describa el flujo leído)
Puntaje bruto: X/30 → **Score: X.X/10**

Brechas detectadas: lista concreta (qué falta, qué RF/RNF crear o modificar).

Veredicto en primera persona: una o dos líneas ("¿Me sirve? ¿Qué me falta?").
