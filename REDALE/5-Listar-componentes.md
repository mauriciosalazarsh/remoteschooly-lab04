# L – Listar los componentes

Diagrama: [Diagrama.pdf](../Diagramas/Diagrama.pdf).

- Iteración #1: una sola app. No sirve porque todos bajan lo mismo por el satélite y la IA se llama con el currículo entero.
- Iteración #2: una responsabilidad por pieza.

| Pieza | Responsabilidad | RF |
|---|---|---|
| Portal Central | web de la central | RF02, RF09, RF10, RF22 |
| Login Service | valida usuario y contraseña | RF02 |
| Registro Service | crea cuentas, escuelas y roster | RF01 |
| Plantillas Service | arma el pedido con campos cerrados | RF04, RF11 |
| Biblioteca Service | busca material que ya existe | RF05, RF25 |
| Contexto Service | trae solo los párrafos del currículo que tocan | RF07 |
| IA Service | revisa el CACHE y elige modelo y modo | RF06, RF08 |
| CIRCUIT BREAKER | corta las llamadas al proveedor si falla | RNF01 |
| Proveedor IA (externo) | genera el texto | RF04 |
| Tokens Service | registra el gasto contra el presupuesto | RF09, RF10 |
| Materiales Service | revisa que el archivo abra, versión liviana, hash | RF12 |
| Publicar Job | el jueves arma y publica | RF13 |
| Paquete Service | arma el paquete por grado y el manifiesto | RF13 |
| Sincronización Service | calcula qué le falta a cada escuela | RF14 |
| Descarga Service | sirve los archivos por partes | RF15 |
| Entregas Service | lleva el estado por escuela | RF16, RF22 |
| Alerta Job + Email Service | manda el aviso del domingo | RF23 |
| Enlace Satelital (externo) | internet de la escuela | RNF02 |
| Sincronizador Service (nodo) | trae lo que falta, por partes | RF14, RF15 |
| Verificación Service (nodo) | compara el hash y manda el acuse | RF16, RF26 |
| Aula Local Service (nodo) | login con el roster y sirve por WiFi | RF03, RF17, RF18, RF24 |
| App Escuela | tablet sin internet | RF18 a RF21 |
| BD Usuarios, Materiales, Currículo, CACHE, Tokens, Archivos, Entregas, Nodo, Tablet | persistencia | — |

Lo que dejamos fuera: réplicas y balanceo (el enunciado no los pide), calificación automática y la E de Escalar.
