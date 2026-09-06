# Regenerar y verificar los diagramas

Los JSON de `Diagramas/` son las fuentes. Los HTML conservan el visor interactivo de Archify; el exportador produce cinco PNG y cinco PDF con título, texto seleccionable y foco por happy path.

Se requiere Node.js, una copia local de [Archify](https://github.com/tt-a1i/archify), Chrome y Python con `pypdf`. La edición se verificó con Archify `2.17.0-dev.1`. No se incluye el checkout temporal de Claude ni se depende de sus rutas en los archivos entregados.

Desde la raíz del repositorio, reemplazar `/ruta/archify` por el directorio local que contiene `bin/archify.mjs`:

```sh
node /ruta/archify/bin/archify.mjs render architecture Diagramas/arquitectura.architecture.json Diagramas/arquitectura.html --quality standard
node /ruta/archify/bin/archify.mjs render sequence Diagramas/happy-path-1-distribucion.sequence.json Diagramas/happy-path-1-distribucion.html --quality standard
node /ruta/archify/bin/archify.mjs render sequence Diagramas/happy-path-2-generacion-ia.sequence.json Diagramas/happy-path-2-generacion-ia.html --quality standard
node tools/export-diagrams.mjs /ruta/archify
python3 tools/verify-deliverables.py
```

El exportador ejecuta Chrome sin interfaz y trabaja solo con archivos locales. Conserva el foco al imprimir, anulando la regla de impresión del visor que restaura la opacidad de todos los componentes. Tras regenerar, revisar visualmente los PDF además de pasar el verificador.
