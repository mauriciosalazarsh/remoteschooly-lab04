# A – Armar el modelo de datos

## Central (SQL)

**BD Usuarios y Escuelas**

- `usuario` (id, nombre, rol [creador, coordinador, docente_rural, alumno], escuela_id, grado, hash_contrasena)
- `escuela` (id, nombre, region, ugel, hash_token_nodo, ultimo_contacto)
- `escuela_grado` (escuela_id, grado)

**BD Materiales** (la biblioteca)

- `material` (id, autor_id, tipo, grado, curso, competencia, tema, contexto, estado [borrador, listo], semana, hash, tamano, ruta_archivo, material_origen_id, creado)

**BD Currículo**

- `parrafo_curriculo` (id, grado, competencia, texto, tokens, version)

**BD Tokens**

- `pedido_ia` (id, docente_id, escuela_id, material_id, modelo, modo [ahora, lote], tokens_entrada, tokens_salida, costo_usd, origen [biblioteca, cache, generado, version], fecha)
- `presupuesto` (semana, tokens_equipo, cuota_docente, cuota_escuela, linea_base_usd)

**BD Entregas**

- `paquete` (id, grado, semana, hash_manifiesto, publicado)
- `paquete_archivo` (paquete_id, material_id, hash, tamano)
- `entrega` (escuela_id, paquete_id, estado [pendiente, en_curso, completa, sin_contacto], bytes_confirmados, fecha_acuse)
- `respuesta` (uuid, alumno_id, material_id, hash_material, contenido, escrita, recibida)

## Otros almacenamientos

- **BD Archivos** (objetos): un archivo por material en versión liviana, nombrado por su hash. Se lee por partes.
- **CACHE Respuestas IA** (clave-valor): clave = hash de (plantilla, grado, curso, competencia, tema, contexto, nota, versión del currículo); valor = texto generado, modelo, fecha. Se borra a los 90 días.

## Nodo escolar

- **BD Nodo**: `roster` (id, nombre, rol, grado, hash_pin), `archivo_local` (hash, estado [pendiente, parcial, verificado, danado], bytes_recibidos), `semana_local` (grado, semana, estado), `respuesta` (igual que en la central, más `subida`), `tablet` (id, alumno_id, semana_copiada). Los archivos van en disco, por hash. Se guardan la semana actual y la anterior.

## Tablet

- **BD Tablet**: archivos de la semana del grado, `respuesta` (uuid, material, contenido, escrita, enviada_al_nodo), sesión local de 7 días.
