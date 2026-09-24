# Requerimientos Funcionales

## Usuarios y acceso

| ID | Requerimiento funcional |
|---|---|
| RF01 | **Alta de cuentas y escuelas.** El sistema debe permitir que el coordinador cree las cuentas de los docentes creadores y registre cada escuela con su región, sus grados y su roster. No hay registro público. |
| RF02 | **Login del Portal Central.** El sistema debe pedir usuario y contraseña para entrar al Portal Central, con rol creador o coordinador. |
| RF03 | **Login en la escuela sin internet.** El sistema debe permitir que alumnos y docentes rurales inicien sesión contra el roster del nodo, sin internet. La sesión dura 7 días; si vence fuera de la escuela, se puede seguir abriendo el material y las respuestas guardadas. |

## Generar materiales con menos tokens

| ID | Requerimiento funcional |
|---|---|
| RF04 | **Pedido solo con plantilla.** El sistema debe permitir pedir material a la IA solo con una plantilla (tipo, grado, curso, competencia, tema y contexto de una lista). No se aceptan documentos pegados ni prompt libre. |
| RF05 | **Biblioteca antes de gastar.** El sistema debe buscar en la biblioteca, antes de llamar a la IA, un material igual o que solo cambie de contexto, y mostrarlo con su autor. Reutilizarlo tal cual cuesta 0 tokens. |
| RF06 | **Caché de respuestas IA.** El sistema debe guardar las respuestas de la IA en caché y devolver la guardada si el pedido tiene los mismos campos. "Otra versión" se permite máximo 2 veces por material y manda solo el borrador y el cambio. |
| RF07 | **Solo los párrafos del currículo.** El sistema debe mandar a la IA solo los párrafos del currículo del grado y la competencia pedidos (máximo 1 000 tokens). |
| RF08 | **Modelo según la tarea.** El sistema debe usar un modelo barato para tareas simples y el estándar para material nuevo. Los pedidos "para la próxima semana" van por lotes, a mitad de precio. |
| RF09 | **Registro de tokens.** El sistema debe registrar tokens, modelo, costo y docente de cada llamada. Cada docente ve su gasto por material y por semana. |
| RF10 | **Presupuesto y ahorro.** El sistema debe permitir que el coordinador fije el presupuesto semanal del equipo y cuotas por docente y por escuela. Docentes y coordinador ven el gasto del equipo y el % de ahorro frente a la línea base (lo facturado en las 4 semanas previas). Al 80 % se avisa; al 100 % solo se permite reutilizar, usar caché o pedir por lotes. |
| RF11 | **Adaptar desde la escuela.** El sistema debe permitir que el docente rural adapte un material desde la App Escuela (contexto de la lista más una nota de hasta 80 caracteres). El pedido sale cuando hay señal, se cobra a la cuota de la escuela, vuelve con la sincronización y pasa por la verificación de hash. El docente ve si está en cola, enviado o si ya llegó. |

## Publicar y distribuir

| ID | Requerimiento funcional |
|---|---|
| RF12 | **Marcar material listo.** El sistema debe permitir marcar un material como listo (semana, grado, curso). Al hacerlo, revisa que el archivo abra, lo guarda en versión liviana y calcula su hash. |
| RF13 | **Paquete semanal.** El sistema debe armar el jueves a las 19:00 un paquete por grado con su manifiesto (archivos, tamaño, hash) y publicarlo a las 20:00. |
| RF14 | **Nodo pide lo que falta.** El nodo escolar debe revisar la señal cada 5 minutos y, cuando la hay, pedir a la central lo que le falta. |
| RF15 | **Descarga por partes.** El nodo escolar debe descargar por partes y, si se corta, seguir desde la última parte recibida. |
| RF16 | **Verificar hash y acuse.** El nodo escolar debe comparar el hash de cada archivo con el manifiesto y volver a pedir los que no coinciden. No muestra nada sin verificar. Al completar la semana, manda un acuse a la central. |
| RF17 | **Pantalla del nodo.** El sistema debe mostrar al docente rural, en la pantalla del nodo (laptop o celular), un resumen ("Semana 12: completa, 24 de 24 archivos"), lo que falta, lo dañado y qué tablets ya tienen la semana. La pantalla tiene un botón "reintentar". |
| RF18 | **Copia a la tablet.** La App Escuela debe copiar sola la semana verificada al conectarse a la WiFi de la escuela y revisar cada 10 minutos. Verifica el hash y, si la copia se corta, sigue donde quedó. |

## Estudiar sin internet

| ID | Requerimiento funcional |
|---|---|
| RF19 | **Semana en la tablet.** La App Escuela debe mostrar en el inicio la semana y si está completa. Si la nueva no llegó, lo dice ("La Semana 12 todavía no llega"). |
| RF20 | **Estudiar sin internet.** El alumno debe poder abrir los materiales y resolver los ejercicios sin conexión. Cada respuesta se guarda al escribirla. |
| RF21 | **Envío de respuestas.** La App Escuela debe mandar sola las respuestas al nodo al volver a la escuela y mostrar cuáles faltan enviar. El nodo las sube a la central en la siguiente sincronización. |

## Seguimiento

| ID | Requerimiento funcional |
|---|---|
| RF22 | **Estado por escuela.** El sistema debe mostrar al docente creador el estado de cada escuela y grado (pendiente, en curso, completa, sin contacto por más de 48 h), con filtros y los archivos que faltan. Se actualiza hasta 10 minutos después del acuse. |
| RF23 | **Correo del domingo.** El sistema debe mandar el domingo a las 18:00 un correo al creador y al coordinador con las escuelas incompletas. |

## Agregados después de la primera corrida del eval

| ID | Requerimiento funcional |
|---|---|
| RF24 | **Respuestas en el nodo.** El docente rural debe ver en el nodo las respuestas de cada alumno por semana y curso. |
| RF25 | **Búsqueda en la biblioteca.** El docente creador debe poder buscar en la biblioteca por grado, curso, tema, tipo o autor sin gastar tokens. |
| RF26 | **Semana anterior si no llega.** Si la semana nueva no llegó completa, el nodo y las tablets siguen con la anterior, y el domingo a las 18:00 se le avisa al docente rural qué falta. |
