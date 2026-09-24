# D – Diseñar el servicio

## Patrón

Services con una responsabilidad cada uno en la central de Lima, más un nodo en cada escuela que funciona sin internet (offline-first).

- **Descartado, todo en la nube:** las casas no tienen internet, y 30 tablets bajando lo mismo por el satélite no terminan.
- **Descartado, event-driven:** el volumen es bajo (≈ 90 RPS), así que solo usamos jobs con hora fija.
- **Descartado, enviar USB:** tarda días y no hay forma de verificar lo que llega.

## SPOF y cuello de botella

| Pieza | Riesgo | Qué hicimos |
|---|---|---|
| Enlace Satelital | SPOF y CUELLO DE BOTELLA de la escuela | Se baja una vez, por partes. BD Nodo funciona como CACHE de la escuela. |
| Proveedor IA | CUELLO DE BOTELLA de costo | CACHE de respuestas. CIRCUIT BREAKER: después de 3 fallas no llama por 1 min, para no gastar tokens en reintentos. |

## Persistencia

- SQL: usuarios, escuelas, materiales, currículo, tokens y entregas.
- Objetos: archivos de los materiales, que se leen por partes.
- Clave-valor: el CACHE de respuestas de la IA.
- Nodo y tablet: base local.

## API

| Endpoint | Respuestas |
|---|---|
| `POST /sesiones` | 201, 401 |
| `POST /escuelas` (coordinador) | 201, 400, 403, 409 |
| `GET /biblioteca?grado=&tema=&tipo=` | 200 |
| `POST /pedidos-ia` | 200 ya existía (0 tokens), 201 generado, 202 por lotes, 400, 429 cuota agotada |
| `PUT /materiales/{id}` (marcar listo) | 200, 422 el archivo no abre |
| `GET /escuelas/{id}/faltantes` (nodo) | 200, 401 |
| `GET /archivos/{hash}` con `Range` | 206, 416 |
| `POST /entregas/{escuela}/{semana}/acuses` | 201, 409 hash distinto |
| `GET /entregas?region=&estado=` | 200 |
| `POST /escuelas/{id}/respuestas` | 201 (un `uuid` repetido no se duplica) |

Todos los endpoints piden token Bearer, salvo `POST /sesiones`. El nodo usa el token de su escuela.
