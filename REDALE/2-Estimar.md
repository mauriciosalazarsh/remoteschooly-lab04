# E – Estimar

## Supuestos

- 5 000 escuelas, 150 000 alumnos, 60 docentes creadores, 11 grados (6 por escuela).
- Paquete de un grado ≤ 100 MB. Enlace de la escuela: 2 Mbps.
- Modelo estándar: US$ 3 por millón de tokens de entrada y US$ 15 por millón de salida.

## Tokens (meta -40 %)

Hoy: 720 materiales por semana × 5 intentos = 3 600 llamadas de 20 000 tokens de entrada y 2 000 de salida.

- Por llamada: 20 000 × 3/10⁶ + 2 000 × 15/10⁶ = US$ 0,09
- Por semana: 3 600 × 0,09 = **US$ 324**

Mandando solo los párrafos del currículo (2 500 tokens de entrada):

- Por llamada: 2 500 × 3/10⁶ + 2 000 × 15/10⁶ = US$ 0,0375
- Por semana: 3 600 × 0,0375 = **US$ 135 → -58 %**

La biblioteca, el caché, el tope de "otra versión", el modelo barato y los lotes bajan más el gasto, pero sus porcentajes son supuestos. La meta se cumple aunque no los contemos.

## Servidores

| Origen | RPS |
|---|---|
| Nodos: 5 000 × 2 requests cada 5 min | 33 |
| Docentes creadores | 6 |
| Descarga de partes (pico del jueves) | 50 |
| **Total** | **≈ 90** |

Con 50 RPS por core son 2 cores, así que alcanza un servidor de 4 cores. No ponemos réplicas porque el enunciado no las pide.

## Almacenamiento

| Dato | Por año |
|---|---|
| Paquetes livianos (1,1 GB/semana × 40) | 44 GB |
| Originales | 88 GB |
| Respuestas de alumnos | 120 GB |
| **Central** | **≈ 250 GB** |

En el nodo van unos 1,5 GB (semana actual y anterior) y en la tablet unos 200 MB.

## Ancho de banda

- Por escuela: 600 MB por semana. A 2 Mbps son 600 × 8 / 2 = 2 400 s ≈ **40 min**.
- Sin nodo: 30 alumnos × 100 MB = 3 GB, más de 3 h a 2 Mbps. Por eso existe el nodo.
- Salida de la central: 3 TB por semana. Repartida en 83 h da ≈ 80 Mbps.
