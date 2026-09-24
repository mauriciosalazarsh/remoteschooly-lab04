# Requerimientos No Funcionales

| ID | Requerimiento no funcional |
|---|---|
| RNF01 | **Ahorro de tokens.** El gasto semanal de tokens debe ser al menos 40 % menor que la línea base (RF10), medido cada semana en dólares. |
| RNF02 | **Internet limitado.** La distribución debe funcionar con enlaces de 1 a 4 Mbps disponibles pocas horas al día. Una descarga cortada nunca empieza de cero. |
| RNF03 | **Tamaño del paquete.** El paquete de un grado debe pesar máximo 100 MB (videos de 5 min a 360p). Los 6 grados de una escuela suman 600 MB, unos 40 min a 2 Mbps. Con 1 h de señal, la semana queda verificada antes del viernes a las 12:00. |
| RNF04 | **Integridad.** El 100 % de los archivos mostrados debe coincidir con el hash del manifiesto, sin mezclar semanas. |
| RNF05 | **Escuela sin internet.** En la escuela deben funcionar sin internet el login, los materiales, la copia a las tablets y las respuestas. Cada escuela baja el paquete una sola vez por semana. |
| RNF06 | **Tiempos de respuesta.** biblioteca o caché en menos de 2 s; IA inmediata en menos de 60 s; lotes en menos de 24 h. Una adaptación de la escuela llega a más tardar con el paquete siguiente. |
| RNF07 | **Seguridad básica.** Las contraseñas deben guardarse con hash, el tráfico debe ir cifrado y los prompts no deben llevar datos de alumnos. |
| RNF08 | **Escala.** 5 000 escuelas, 150 000 alumnos, 12 000 docentes rurales y 60 creadores. |
| RNF09 | **Alcance de confiabilidad.** Por el enunciado, todavía no se exige alta disponibilidad ni confiabilidad, pero sí que los cursos lleguen correctos (RNF04). |
