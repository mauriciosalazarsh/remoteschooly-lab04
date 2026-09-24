# Lab 04 – RemoteSchooly

Fabian Alvarado Vargas y Mauricio Salazar Hillenbrand.
Arquitectura de Software, UTEC 2026-II. Top down design (R.E.D.A.L.E.).

## Problema

1. Llevar los materiales semanales desde la central de Lima a escuelas remotas con internet limitado, y que lleguen correctos.
2. Reducir el gasto en tokens de IA de los docentes creadores en al menos 40 %.

No se pide todavía 100 % de disponibilidad ni mecanismos de confiabilidad.

## Entregables

- Requerimientos: [ReqFunc.md](Requirements/ReqFunc.md) y [ReqNoFunc.md](Requirements/ReqNoFunc.md).
- Eval: [REPORTE.md](REPORTE.md) (personas en `Personas/`, agentes en `Agents/`). Resultado final: 9,8/10 PASSED.
- Diagrama de arquitectura: [Diagrama.pdf](Diagramas/Diagrama.pdf) ([.excalidraw](Diagramas/Diagrama.excalidraw), [mermaid](Diagramas/DiagramaFinal.md)).
- Happy paths: [HAPPY-PATH.md](HAPPY-PATH.md), [HP1 generar material](Diagramas/HappyPath1.pdf), [HP2 distribuir el paquete](Diagramas/HappyPath2.pdf).
- REDALE: [R](REDALE/1-Requerimientos.md), [E](REDALE/2-Estimar.md), [D](REDALE/3-Disenar-el-servicio.md), [A](REDALE/4-Armar-modelo-de-datos.md), [L](REDALE/5-Listar-componentes.md).

## Solución

- Cada escuela tiene un nodo (laptop + WiFi) que baja el paquete una vez, por partes, y verifica el hash de cada archivo. Las tablets copian del nodo y funcionan sin internet.
- Los pedidos a la IA usan plantilla, buscan primero en la biblioteca y en caché, y mandan solo los párrafos del currículo que tocan. Solo esto último baja el gasto 58 %.
