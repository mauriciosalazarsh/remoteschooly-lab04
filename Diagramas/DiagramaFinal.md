# Diagrama final — RemoteSchooly

Iteración #2 de `Diagrama.excalidraw` en mermaid.

- CUELLO DE BOTELLA: Proveedor IA. Tiene CACHE Respuestas IA y CIRCUIT BREAKER.
- SPOF y CUELLO DE BOTELLA: Enlace Satelital. Tiene descarga por partes y BD Nodo como CACHE de la escuela.

```mermaid
flowchart TB
  ROCIO(["Rocío Paredes - docente creadora (Lima)"])
  JULIAN(["Julián Huamán - docente rural (río Marañón)"])
  YESENIA(["Yesenia Quispe - alumna (Ocongate)"])
  COORD(["Coordinador central"])

  subgraph LIMA["CENTRAL DE LIMA"]
    PORTAL["Portal Central - web de la central"]
    LOGIN["Login Service - usuario y contraseña - RF02"]
    REG["Registro Service - crea cuentas, escuelas y roster - RF01"]
    BDU[("BD Usuarios y Escuelas")]
    PLANT["Plantillas Service - solo campos cerrados - RF04"]
    BIB["Biblioteca Service - busca material listo antes de gastar - RF05 RF25"]
    BDM[("BD Materiales")]
    CTX["Contexto Service - solo los párrafos del currículo, máx 1000 tokens - RF07"]
    BDC[("BD Currículo por párrafos")]
    IA["IA Service - elige modelo barato, estándar o lotes - RF08"]
    CACHE[("CACHE Respuestas IA - protege al Proveedor IA, que es el CUELLO DE BOTELLA - RF06")]
    CB["CIRCUIT BREAKER del Proveedor IA - 3 fallas: no llama por 1 min"]
    PROV["Proveedor IA (externo) - CUELLO DE BOTELLA de costo"]
    TOK["Tokens Service - gasto vs presupuesto y % de ahorro - RF09 RF10 RNF01"]
    BDT[("BD Tokens")]
    MAT["Materiales Service - revisa que abra, versión liviana y hash - RF12"]
    BDA[("BD Archivos - versiones livianas")]
    PUB["Publicar Job - jueves 19:00 arma, 20:00 publica - RF13"]
    PAQ["Paquete Service - paquete por grado + manifiesto - RF13"]
    SINC["Sincronización Service - qué le falta a cada escuela - RF14"]
    DES["Descarga Service - sirve archivos por partes - RF15"]
    ENT["Entregas Service - estado por escuela en el Portal - RF16 RF22"]
    BDE[("BD Entregas")]
    ALERTA["Alerta Job - domingo 18:00 - RF23"]
    MAIL["Email Service"]
  end

  ENL["Enlace Satelital (externo) - 1 a 4 Mbps pocas horas - SPOF y CUELLO DE BOTELLA de la escuela"]

  subgraph ESCUELA["ESCUELA REMOTA - nodo escolar"]
    NODO["Sincronizador Service (nodo) - cada 5 min mira la señal, trae lo que falta por partes y sigue donde se cortó - RF14 RF15"]
    VER["Verificación Service - hash vs manifiesto, acuse - RF16"]
    BDN[("BD Nodo - CACHE de la escuela - RF26")]
    AULA["Aula Local Service - login con roster y sirve por WiFi - RF03 RF17 RF24"]
    APP["App Escuela - tablet sin internet - RF18 RF19 RF20 RF21"]
    BDTAB[("BD Tablet")]
  end

  COORD -->|"da de alta cuentas y escuelas"| REG
  REG -->|"guarda"| BDU
  LOGIN -->|"valida"| BDU

  ROCIO -->|"HP1 1 pide ficha de fracciones"| PORTAL
  PORTAL -->|"2 entra"| LOGIN
  PORTAL -->|"4 llena la plantilla"| PLANT
  PLANT -->|"5 ya existe?"| BIB
  BIB -->|"6 busca por grado, tema y tipo"| BDM
  BIB -->|"7 NO EXISTE"| CTX
  CTX -->|"8 máx 1000 tokens"| BDC
  CTX -->|"9 pedido corto"| IA
  IA -->|"10 está en CACHE? NO"| CACHE
  IA -->|"11 ahora"| CB
  CB -->|"12 llama"| PROV
  PROV -->|"13 borrador"| CB
  CB -->|"14 respuesta"| IA
  IA -->|"15 registra tokens y costo"| TOK
  TOK -->|"16 guarda"| BDT
  IA -->|"17 borrador + tokens y costo"| ROCIO

  ROCIO -->|"HP2 1 marca listo Semana 12"| MAT
  MAT -->|"2 guarda"| BDA
  PUB -->|"3 jueves"| PAQ
  MAT -->|"4 materiales listos"| PAQ
  PAQ -->|"5 manifiesto publicado"| SINC
  NODO -->|"6 qué me falta?"| ENL
  ENL -->|"7 sube"| SINC
  SINC -->|"8 lista de faltantes"| ENL
  ENL -->|"9 baja"| NODO
  DES -->|"10 lee por partes"| BDA
  DES -->|"11 archivos por partes"| ENL
  ENL -->|"12 partes"| NODO
  NODO -->|"13 archivo completo"| VER
  VER -->|"14 guarda verificado"| BDN
  VER -->|"15 SEMANA VERIFICADA: acuse"| ENT
  VER -->|"16 SEMANA COMPLETA"| AULA
  AULA -->|"17 ve Semana 12 completa"| JULIAN
  AULA -->|"18 copia por WiFi"| APP
  APP -->|"19 guarda semana y respuestas"| BDTAB
  APP -->|"20 abre en su casa sin internet"| YESENIA

  APP -->|"respuestas al volver a la escuela"| AULA
  SINC -->|"pedido de adaptación de la escuela"| PLANT
  ENT -->|"guarda"| BDE
  ENT -->|"incompletas"| ALERTA
  ALERTA -->|"lista"| MAIL
  MAIL -->|"correo domingo 18:00"| ROCIO
```
