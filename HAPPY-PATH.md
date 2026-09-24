# Happy paths

Los números coinciden con las flechas de cada PDF.

## HP1 – Rocío genera una ficha gastando menos tokens

[HappyPath1.pdf](Diagramas/HappyPath1.pdf)

1. Rocío pide una ficha en el Portal Central.
2. y 3. Login Service la valida.
4. Llena la plantilla: grado, curso, tema, contexto.
5. a 7. Biblioteca Service busca en BD Materiales y no encuentra nada (NO EXISTE).
8. y 9. Contexto Service trae solo los párrafos del currículo que tocan.
10. IA Service revisa el CACHE y no está.
11. a 14. Pasa por el CIRCUIT BREAKER, llama al Proveedor IA y vuelve el borrador.
15. y 16. Tokens Service registra el gasto: US$ 0,04 (antes eran US$ 0,09 × 5 intentos).
17. Rocío recibe el borrador con su costo.

Cumple: RF02, RF04–RF10, RNF01.

## HP2 – El paquete llega completo a la tablet de Yesenia

[HappyPath2.pdf](Diagramas/HappyPath2.pdf)

1. y 2. Rocío marca el material como listo. Materiales Service revisa que abra, saca el hash y lo guarda en BD Archivos.
3. a 5. El jueves Publicar Job hace que Paquete Service arme el paquete y el manifiesto, y los publique en Sincronización Service.
6. a 9. Cuando hay señal, el nodo pregunta por el Enlace Satelital qué le falta.
10. a 12. Descarga Service le manda los archivos por partes. Si la señal se corta, el nodo sigue donde quedó.
13. y 14. Verificación Service compara los hashes y guarda los archivos en BD Nodo.
15. Manda el acuse a Entregas Service, y Rocío ve la escuela "completa" en el Portal.
16. y 17. Aula Local publica la semana y Julián la ve completa.
18. y 19. La tablet de Yesenia copia la semana por WiFi.
20. Yesenia la abre en su casa, sin internet.

Cumple: RF12–RF20, RF22, RNF02–RNF05.
