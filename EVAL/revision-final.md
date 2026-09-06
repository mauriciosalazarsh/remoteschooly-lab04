# Revisión final de RemoteSchooly v3.2

Fecha: 2026-09-06. Revisión y correcciones realizadas por Codex sobre el trabajo interrumpido de Claude. Esta es una revisión de coherencia de los entregables; no es una nueva corrida independiente de los agentes-persona ni una calificación del profesor. El resultado 10,0/10 de `iteracion-3.md` corresponde a requerimientos v3 y se conserva sin modificar.

## Resultado

Se cerraron las inconsistencias principales entre requerimientos, API, modelo y diagramas. Se conservan los cuatro entregables del enunciado. No se implementó una aplicación: el laboratorio pide diseño y evaluación.

La revisión de Claude había producido 61 candidatos mediante cuatro revisores y verificaciones posteriores; su registro indica 38 ejecuciones completadas y 27 fallidas por límite. No se cuentan los candidatos como defectos confirmados ni se atribuye a Claude esta revisión de cierre. Se consolidaron duplicados y se contrastó cada categoría relevante contra los archivos actuales.

| Hallazgo consolidado | Resolución v3.2 | Evidencia |
| :--- | :--- | :--- |
| RF-19 no tenía camino de ida y resultado | Nodo → AI Gateway → Materiales; descarga directa desde Repositorio; borrador local revisado antes de publicar | Arquitectura, RF-19, API y modelo |
| RF-26 carecía de proveedor externo | API de correo desde Monitoreo, cron del domingo y registro del envío | Arquitectura, REDALE/3 y REDALE/4 |
| Secuencias inventaban conexiones o responsabilidades | Login local a Acceso Local; publicación/acuse a BD; panel desde Monitoreo; contexto desde Gateway; lotes mediante Lotes y DB IA | Los 56 mensajes de las dos secuencias se cruzan con las dependencias reales |
| Faltaban dependencias de persistencia e indexación | Gateway/Plantillas/Lotes → DB IA, Materiales → Biblioteca, Caché → Índice | Arquitectura y REDALE/5 |
| Aula Local no podía iniciar sincronización | Arista a Sincronizador y contrato del nodo | RF-17/19, arquitectura y API |
| Usuarios y APIs tenían notación indistinguible | Usuarios grises; APIs externas amarillas con leyenda separada; actor central incluye Coordinador | PNG/PDF/HTML |
| Cifras y conteos inconsistentes | 21 servicios, 6 almacenes dibujados + persistencia interna de App, 2 APIs; 50 dispositivos LAN | README, REDALE/2, REDALE/3 y REDALE/5 |
| Sondeo y SLA de adaptación incompatibles | Sondeo cada 5 min y consulta de resultado cada 30 s; ≈ 24 RPS, 1 servidor de 8 cores | RF-14/19 y estimación |
| Descargas atravesaban aplicación aunque se dimensionó storage | Descarga entrega URL firmada; HTTP Range directo nodo → Repositorio | API, arquitectura y HP1 |
| Modelo seguía en v2 | Cuota por escuela, contextos/nota, JSON respondible, cierre, versiones, alertas, estado de lotes y pertenencia archivo-paquete | REDALE/4 |
| Lotes permitían superar cuota | Reservas y rechazo por falta de saldo para todo modo; solo copia/caché al 100 % | RF-11, modelo y HP2 |
| 64 KB no garantizaban ≤ 1 % de repetición | Checkpoint de 32 KiB, prueba de contenido útil con condiciones explícitas; cota conservadora 14 cortes = 0,918 % | RF-15, RNF-02 y estimación |
| Referencia interna no aporta contexto al proveedor | Gateway resuelve texto pertinente dentro de 3 000 tokens; no se promete ahorro fijo por variación | RF-07/09 |
| Caché semántica podía devolver otro idioma/contexto | Filtros pedagógicos/versiones y hash original; codificador local para no facturar búsquedas | RF-07 y modelo |
| Brechas operativas del Eval 3 | Alta inicial y autoarranque del nodo; sesión local ≥ 7 días; revisión de adaptación; estado por grado y faltantes identificados | Precisiones RF-02/03/16/19/20/21/25 |
| Respuestas y materiales sin versionado robusto | UUID, revisión y hash; acuse tras persistencia; activación atómica por grado | RF-12/16/20/24 y modelo |
| Costos mezclaban tokens con descuentos | Tokens y dólares separados; tarifas/descuentos declarados como supuestos; 40 semanas/año | REDALE/2 |
| Exports sin título y rasterizados | Cinco PDFs con texto seleccionable, títulos y versión; PNG/HTML actualizados | `tools/export-diagrams.mjs` |
| README desactualizado y difícil de localizar | Tabla de rúbrica al inicio y nota explícita de versión/evaluación | README |

## Verificación de cobertura de las personas

Revisión de trazabilidad, sin asignar una nueva nota:

| Persona | Necesidades cubiertas en v3.2 | Flujo verificado |
| :--- | :--- | :--- |
| Yesenia | N1: RF-03/13/14/16/18/20/22 y RNF-09; N2: RF-21; N3: RF-23/24 | Registro y sesión local → paquete verificado → estado con nombres de faltantes → lectura/respuesta en casa → acuse al nodo y subida central |
| Julián | N1: RF-02/13/14/15 y RNF-09; N2: RF-16/17/18; N3: RF-09/19 y RNF-06 | Nodo configurado y encendido → descarga única → pantalla por grado → alumnos por LAN → pedido de adaptación con cuota → revisión y publicación |
| Rocío | N1: RF-04/05/08/09; N2: RF-06/07/10/11; N3: RF-12/13/25/26 | Plantilla y urgencia → reutilizar/caché → generación con reserva → borrador versionado → listo → paquete → panel y correo |

## Validación y límites

- Los tres JSON se compilan con Archify en perfil standard. Se verifican IDs, mensajes de secuencia y enlaces locales mediante `tools/verify-deliverables.py`.
- Se revisan los cinco PNG y se renderizan los cinco PDF con Poppler; los PDF mantienen una página y texto seleccionable.
- Las cifras de rendimiento, porcentaje de aciertos de caché, latencia del proveedor y ahorro son hipótesis de diseño. No se han ejecutado pruebas sobre un sistema implementado.
- La notación conserva cajas de Archify para almacenes con icono y leyenda; no se afirma que sea una reproducción exacta de Excalidraw. Las secuencias amplias requieren zoom en pantalla. El perfil standard admite cruces de rutas: solo sus extremos con flecha definen dependencias; un cruce sin componente no es una conexión.
- Se mantiene el plazo del lunes; adelantarlo al viernes y compartir borradores entre docentes son ampliaciones opcionales del Eval 3, no bloqueos de este laboratorio.
- No se rehace ni se eleva la calificación de Claude. Si el curso exige una nueva corrida independiente para cualquier ajuste de especificación, esa corrida debe evaluar v3.2 con el pipeline de `Agents/README.md`.
