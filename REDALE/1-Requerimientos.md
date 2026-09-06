# R — Requerimientos

Primer paso del framework: preguntar todo lo necesario para entender qué estamos resolviendo antes de diseñar nada. Las tres preguntas del curso:

## ¿Tenemos claro el o los problemas?

Son **dos problemas distintos** que conviven en la misma plataforma:

1. **Los materiales no llegan bien a los pueblos remotos.** La central de Lima produce cada semana el material de todos los cursos y grados, pero en las escuelas remotas el internet es satelital, lento (1–4 Mbps), compartido y disponible solo algunas horas al día. Hoy cada docente y cada alumno intenta descargar por su cuenta: las descargas se cortan y vuelven a empezar de cero, los archivos llegan incompletos o dañados y nadie sabe si tiene la versión completa de la semana. El profesor no puede dar clase con seguridad y el alumno no puede estudiar en su casa, donde no hay internet.
2. **La IA cuesta demasiado.** Los docentes creadores de la central generan los materiales con la IA integrada en la plataforma. Cada uno pega documentos completos como contexto, pide varias versiones y vuelve a generar materiales que un colega ya generó, porque no hay forma de encontrarlos. El gasto en tokens se disparó y el gobierno exige reducirlo **al menos 40 %** sin dejar de producir el material semanal.

Lo que el enunciado **no** pide todavía: alta disponibilidad (100 %) ni mecanismos de reliability. Lo que **sí** exige: que los cursos lleguen **correctamente** (completos e íntegros).

## ¿Para quién estamos resolviendo el problema?

Tres personas que usan el sistema todos los días (definiciones completas en [/Personas](../Personas/)):

| Persona | Quién es | Lo que necesita en una frase |
| :--- | :--- | :--- |
| [Yesenia](../Personas/yesenia.md) | Alumna de 2.º de secundaria en Ocongate (Cusco); sin internet en casa; tablet prestada por la escuela | Abrir en su casa, sin internet, todo el material de la semana, saber que está completo y responder ejercicios sin conexión |
| [Julián](../Personas/julian.md) | Docente multigrado en el río Marañón (Loreto); único enlace satelital del pueblo | Que el paquete de la semana llegue solo, completo y verificado antes del lunes, y que sus alumnos lo tomen de la red de la escuela |
| [Rocío](../Personas/rocio.md) | Docente creadora de contenido en la central de Lima; genera materiales con IA y publica el paquete semanal | Generar con plantillas, reutilizar lo que ya existe, ver cuánto gasta en tokens y saber qué escuelas recibieron el paquete |

**Stakeholder (no usuario diario):** el gobierno del Perú, que financia la plataforma y fija la restricción del −40 % en tokens. Su interés entra al diseño como requerimiento no funcional (RNF-01), no como persona.

## ¿Cuáles son las limitaciones?

- **De conectividad:** enlaces satelitales de 1–4 Mbps, intermitentes, con ventanas de pocas horas; en los hogares no hay internet. Cualquier diseño que dependa de que el alumno descargue de internet falla.
- **De integridad:** un PDF a medias o un video cortado no sirve para dar clase. Todo lo que llega a una escuela debe poder verificarse como completo y correcto.
- **De costo:** el presupuesto de tokens debe bajar ≥ 40 % y debe poder demostrarse con números, no con promesas.
- **De alcance (enunciado):** no se exige alta disponibilidad ni reliability en esta etapa; dificultad *Medium*: no sobre-diseñar.
- **De dispositivos:** tablets y laptops modestas, energía limitada (paneles solares); los materiales deben ser livianos.

## Salida de este paso

La lista de requerimientos, con IDs y trazabilidad a las personas, está en:

- [Requerimientos/Funcionales.md](../Requerimientos/Funcionales.md)
- [Requerimientos/NoFuncionales.md](../Requerimientos/NoFuncionales.md)

Fue evaluada por los agentes-persona y el juez Eval-Spec siguiendo el pipeline del lab (umbral 8/10); el registro de cada iteración está en [/EVAL](../EVAL/).
