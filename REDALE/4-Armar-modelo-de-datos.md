# A — Armar el modelo de datos

Tablas, campos y opciones de almacenamiento según lo decidido en el paso D. Las claves foráneas se indican con →.

## BD Central (SQL)

**tabla: usuarios**
campos: id (PK) · nombre · rol (creador | coordinador | docente_rural | alumno) · escuela_id → escuelas (nulo para la central) · grado (solo alumnos) · credencial_hash (contraseña o PIN) · creado_en

**tabla: escuelas**
campos: id (PK) · nombre · region · ugel · token_nodo_hash · ultimo_contacto · creado_en

**tabla: escuela_grados** *(matrícula: define qué paquetes recibe cada escuela — RF-02, RF-13)*
campos: escuela_id → escuelas · grado · cursos (lista) · anio

**tabla: cursos**
campos: id (PK) · nombre · grado · area · competencias (lista)

**tabla: temas** *(catálogo cerrado que usan las plantillas, la biblioteca y la clave de caché — RF-04, RF-07)*
campos: id (PK) · curso_id → cursos · competencia · nombre

**tabla: semanas**
campos: id (PK) · numero · fecha_inicio · fecha_fin · cerrada_en · cerrada_por → usuarios (nulo para cron) · publicada_en

**tabla: materiales**
campos: id (PK) · titulo · tipo (lectura | ficha | cuestionario | guion_video | audio | video_corto | guia_docente) · grado · curso_id → cursos · competencia · tema_id → temas · idioma (es | qu | ay) · autor_id → usuarios · origen (manual | ia_generado | ia_cache | reutilizado | adaptacion) · material_origen_id → materiales (adaptaciones, RF-09) · generacion_id → DB IA.generaciones · estado (borrador | listo | publicado) · semana_id → semanas · validado_abre (bool) · formato (binario / respondible_json) · contenido_estructurado (JSON para ficha/cuestionario) · archivo_hash (SHA-256 de la variante ligera; referencia al Repositorio) · tamano_bytes · version · creado_en

**tabla: paquetes** *(uno por grado y semana — RF-12)*
campos: id (PK) · semana_id → semanas · grado · version · estado (armado | publicado) · tamano_total · manifiesto_hash · publicado_en

**tabla: manifiesto_archivos**
campos: paquete_id → paquetes · material_id → materiales · material_version · formato · ruta · tamano_bytes · sha256 · visible_para (alumno | docente)

**tabla: entregas** *(una por escuela y paquete — RF-13, RF-16, RF-25)*
campos: id (PK) · paquete_id → paquetes · escuela_id → escuelas · estado (pendiente | en_curso | completa) · sin_contacto (derivado de ultimo_contacto) · bytes_confirmados · bytes_total · archivos_verificados · acuse_hash · acuse_en · ultimo_contacto

**tabla: respuestas_alumno** *(RF-23, RF-24)*
campos: id (PK, UUID generado en tablet) · revision · material_version · material_hash · alumno_id → usuarios · material_id → materiales · escuela_id → escuelas · contenido (JSON) · respondida_en (hora de la tablet) · recibida_en_nodo · recibida_en_central

**tabla: adaptaciones_escuela (DB IA)** *(solicitudes del docente rural — RF-19)*
campos: id (PK, UUID idempotente) · escuela_id · docente_id · material_id · material_hash · tipo_adaptacion · contexto_id · nota (≤ 80 caracteres) · estado (en_cola | enviada | borrador | publicada | rechazada) · generacion_id → generaciones · material_resultado_id · motivo_rechazo · respondida_en. Escuela, docente y material son referencias lógicas a BD Central; el monolito valida pertenencia.

## Repositorio de Materiales (object storage)

- `/ligeros/{sha256}` — variante ligera de cada material, direccionada por su hash: dos semanas o dos grados que comparten un archivo lo guardan (y lo descargan) una sola vez. Lectura por rangos de bytes.
- `/originales/{material_id}/{version}` — archivo original subido por el creador (no se distribuye).
- `/manifiestos/{paquete_id}.json` — copia del manifiesto para descarga directa por el nodo.

## DB IA (SQL)

**tabla: plantillas**
campos: id (PK) · tipo_material · version · prefijo_estable (texto marcado como cacheable en el proveedor) · campos (JSON: grado, competencia, tema, contexto, idioma) · modelo_por_defecto · max_tokens_salida · vigente

**tabla: generaciones** *(una por solicitud — RF-04, RF-08, RF-10)*
campos: id (PK) · docente_id · tipo_material · grado · curso_id · competencia · tema_id · contexto_id · nota (≤ 80 caracteres) · version_curriculo · escuela_id (nulo en creación central) · idioma · urgencia (ahora | proxima_semana) · plantilla_id → plantillas · plantilla_version · clave_cache · origen (reutilizado | cache | generado) · modelo (economico | estandar) · modo (inmediato | lote) · lote_id · material_id → BD Central.materiales · generacion_origen_id (variaciones, RF-07) · estado (pendiente | en_lote | lista | rechazada | error) · creada_en · respondida_en

**tabla: consumo_tokens** *(una fila por llamada al proveedor — RF-10)*
campos: id (PK) · generacion_id → generaciones · docente_id · modelo · modo · tokens_entrada · tokens_salida · tokens_cache_leidos · tokens_cache_escritos · costo_usd · fecha

**tabla: presupuestos** *(RF-11)*
campos: semana · presupuesto_tokens_equipo · presupuesto_usd · linea_base_usd (promedio de las 4 semanas previas) · linea_base_costo_por_material · definido_por → usuarios

**tabla: cuotas**
campos: id (PK) · docente_id (nulo si es escolar) · escuela_id (nulo si es docente) · semana · limite_tokens · consumidos · reservados_tokens · limite_usd · consumido_usd · reservado_usd · aviso_80_enviado (bool) · bloqueada (bool). Exactamente uno de docente_id / escuela_id debe existir; UNIQUE por titular y semana. Toda llamada, incluido lote, reserva saldo antes de enviarse.

**tabla: fragmentos_curriculo** *(fuente del Índice Semántico para RAG — RF-05)*
campos: id (PK) · grado · area · competencia · texto (≤ 300 tokens) · fuente (documento, página) · version_curriculo

## Caché IA (clave-valor)

clave = `tipo | grado | curso | competencia | tema_id | idioma | contexto_id | nota_normalizada | plantilla_version | version_curriculo | material_origen_hash | tipo_adaptacion` → valor = { respuesta, modelo, generacion_id, creado_en, aciertos } · caducidad 90 días. La búsqueda semántica (similitud ≥ 0,92 y todos los filtros de RF-07) usa el Índice Semántico y devuelve la clave exacta a leer.

## Índice Semántico (índice vectorial)

- colección **materiales**: embedding del título + descripción + tema de cada material listo → material_id (para RF-06 y RF-07).
- colección **curriculo**: embedding de cada fragmento del currículo → fragmento_id (para RF-05).

## Almacén Local del nodo escolar (SQLite + disco)

**tabla: manifiestos_locales** — paquete_id · grado · semana · version · manifiesto_hash · estado (parcial | completo_verificado) · recibido_en
**tabla: archivos_locales** — sha256 (PK) · ruta_local · tamano · bytes_recibidos · estado (faltante | recibido | dañado_reintentando | verificado) · verificado_en
**tabla: roster_local** — usuario_id · nombre · rol · grado · credencial_hash · actualizado_en
**tabla: sesiones_locales** — usuario_id · dispositivo · creada_en · renovada_en · vence_en (≥ 7 días)
**tabla: respuestas_pendientes** — respuesta (JSON de RF-23) · recibida_en_nodo · subida_en_central
**tabla: adaptaciones_pendientes** — solicitud (JSON de RF-19) · id UUID · estado (en_cola | enviada | borrador | publicada | rechazada) · material_local · hash · grado · aprobada_por · aprobada_en
Disco: `/paquetes/{sha256}` archivos verificados que sirve Aula Local Service.

## Almacenamiento local de la App Escuela

Semana actual y anterior del grado del alumno (archivos + manifiesto), sesión local, respuestas con estado (guardada | entregada_al_nodo | recibida_en_central), estado de la semana para la pantalla de inicio (RF-21). Tope ≈ 1 GB (RNF-10).

---

**v1 → v2:** el modelo pasó de "materiales por curso" a **paquetes por grado** con manifiesto por archivo; se añadieron `escuela_grados` (RF-02), `respuestas_alumno` y `respuestas_pendientes` (RF-23/24), `adaptaciones_escuela` (RF-19), `presupuestos` con línea base (RF-11) y el estado por archivo `dañado_reintentando` en el nodo (RF-17).


## Complementos v3.2 y restricciones

- **contextos (BD Central):** id PK, nombre, tipo regional/comunitario, vigente. Generaciones y adaptaciones referencian este catálogo y conservan la nota de hasta 80 caracteres.
- **material_versiones (BD Central):** material_id, version, autor_id, editada_en, archivo_hash, contenido_estructurado; PK (material_id, version). Los manifiestos apuntan a una versión inmutable.
- **alertas (BD Central):** id, semana, escuela_id, grados_incompletos, responsable_id, destinatario, canal, creada_en, enviada_en, estado_envio, proveedor_id. El estado "sin paquete" se deriva de grados esperados sin publicación de la semana objetivo.
- **usuarios:** añadir correo para creadores/coordinadores; **escuelas:** responsable_id → usuarios para las alertas.
- **lotes (DB IA):** id PK, proveedor_id, enviada_en, ultima_consulta, estado, completada_en; relación 1:N con generaciones. El Gateway recupera los resultados terminados desde DB IA.
- **paquete_archivos_locales (SQLite):** paquete_id, sha256; PK compuesta y FK a archivos_locales. Un archivo puede pertenecer a varias semanas sin duplicar bytes ni perder pertenencia.
- **estado_nodo (SQLite):** escuela_id, ultimo_contacto, cuota_actualizada_en, saldo_tokens, semana_objetivo_por_grado. La cuota mostrada sin señal indica su fecha; el Gateway aplica el saldo real.
- UNIQUE (escuela_id, paquete_id) en entregas; UNIQUE (semana_id, grado, version) en paquetes. Se conserva el paquete anterior hasta activar atómicamente el nuevo.
- Respuestas: UUID/revisión y hash del material se preservan tablet → nodo → central. El nodo elimina el estado pendiente solo tras acuse central. La aceptación del acuse de paquete comprueba pertenencia a escuela, lista completa y hash del manifiesto esperado.

Esta versión completa cuota escolar, contextos, cierre, cuestionarios respondibles, edición, alertas e idempotencia. Las relaciones entre BD Central y DB IA son referencias lógicas validadas por el monolito, no claves foráneas entre motores distintos.
