# Incapaces FC  
# Métricas de Escalabilidad – Sistema PQRS con IA

---

## 1. Contexto

Sistema de gestión de PQRS (Peticiones, Quejas, Reclamos y Sugerencias) soportado por agentes de inteligencia artificial para el análisis, clasificación y generación automatizada de respuestas.

El sistema está diseñado bajo un enfoque de **escalabilidad operativa**, permitiendo atender un mayor volumen de solicitudes sin aumentar proporcionalmente los recursos humanos.

### Stack tecnológico

- Backend: Python / Django  
- Frontend: React / TypeScript  
- IA: Agent Development Kit (ADK) de Google  
- Arquitectura IA: RAG (Retrieval-Augmented Generation)  

---

## 2. Enfoque de Escalabilidad

La escalabilidad del sistema se sostiene en tres dimensiones fundamentales:

- Velocidad de respuesta  
- Nivel de automatización  
- Calidad de las respuestas  

Estas dimensiones se miden mediante tres métricas clave: **TRA, TAE e ICR**, las cuales permiten evaluar el desempeño del sistema ante el crecimiento en volumen de PQRS.

---

## 3. Métrica 1: Tiempo de Resolución Automatizada (TRA)

### Definición  
Tiempo promedio desde el ingreso de una PQRS hasta la generación y validación de la respuesta.

### Fórmula  

TRA = promedio(timestamp_respuesta - timestamp_ingreso)

### Objetivo  

Reducir el tiempo de respuesta manteniendo estabilidad del sistema ante incrementos en la demanda.

### Cómo sostiene la escalabilidad  

- Permite identificar cuellos de botella en procesamiento  
- Mide la capacidad del sistema para responder en tiempo real  
- Garantiza eficiencia operativa en escenarios de alto volumen  

### Responsables  

- Data/BI: monitoreo continuo y generación de alertas  
- Backend: optimización de latencia, colas y concurrencia  
- IA (ADK): eficiencia en generación de respuestas  
- Revisor: validación final en casos necesarios  

---

## 4. Métrica 2: Tasa de Automatización Efectiva (TAE)

### Definición  

Porcentaje de PQRS resueltas sin intervención humana significativa.

### Fórmula  

TAE = (PQRS automatizadas / total PQRS) * 100

### Objetivo  

Incrementar la automatización para soportar crecimiento sin aumentar carga operativa humana.

### Cómo sostiene la escalabilidad  

- Reduce dependencia de revisores humanos  
- Permite manejar mayores volúmenes de solicitudes  
- Disminuye costos operativos  

### Responsables  

- IA (ADK + RAG): clasificación y generación automática  
- Usuario funcional (Secretarías): definición de reglas y excepciones  
- Product Owner: definición de umbrales de automatización  
- QA: validación de calidad en respuestas automatizadas  

---

## 5. Métrica 3: Índice de Calidad de Respuesta (ICR)

### Definición  

Métrica compuesta que evalúa la calidad de las respuestas generadas, considerando precisión, cumplimiento normativo y satisfacción del usuario.

### Fórmula (ejemplo)  

ICR = (0.4 * precisión) + (0.3 * cumplimiento) + (0.3 * satisfacción)

### Objetivo  

Asegurar que la automatización no comprometa la calidad ni el cumplimiento institucional.

### Cómo sostiene la escalabilidad  

- Evita degradación de calidad al aumentar automatización  
- Garantiza confianza en el sistema  
- Reduce reprocesos y retrabajo  

### Responsables  

- Jurídico: lineamientos normativos  
- QA: auditoría de calidad  
- IA: mejora continua de modelos  
- Atención al ciudadano: recolección de feedback  

---

## 6. Operacionalización de las Métricas

Para garantizar que las métricas realmente soporten la escalabilidad, se definen los siguientes mecanismos:

- Monitoreo en tiempo real mediante dashboards  
- Definición de umbrales (ej: TRA máximo permitido, TAE mínimo esperado)  
- Alertas automáticas ante desviaciones  
- Ciclos de mejora continua basados en datos  

---

## 7. Relación entre Métricas

Cada métrica cumple un rol específico dentro del sistema:

- TRA → mide eficiencia (velocidad)  
- TAE → mide capacidad de escalamiento  
- ICR → mide calidad y confiabilidad  

### Balance estratégico

- Alta automatización sin calidad → riesgo institucional  
- Alta calidad sin automatización → sistema no escalable  
- Alta velocidad sin control → incremento de errores  

El sistema debe mantener equilibrio entre estas tres dimensiones.

---

## 8. KPI Derivado

### Costo por PQRS

Costo por PQRS = costo total operativo / número de PQRS gestionadas  

### Interpretación  

- Disminuye cuando aumenta la automatización (TAE)  
- Aumenta cuando hay mayor intervención humana  
- Se optimiza manteniendo alto ICR y bajo TRA  

---

## 9. Condición de Escalabilidad del Sistema

El sistema se considera escalable cuando:

- El TRA disminuye o se mantiene estable ante mayor volumen  
- El TAE aumenta progresivamente  
- El ICR se mantiene alto o mejora  

Esto indica que el sistema puede crecer en demanda sin afectar calidad ni eficiencia.

---

## 10. Arquitectura IA (ADK + RAG)

- Agentes gestionados mediante ADK  
- Uso de RAG para consulta de:
  - Normativa  
  - Históricos  
  - Bases documentales  
- Orquestación de agentes según tipo de PQRS  
- Trazabilidad completa (logs, prompts, decisiones)  

---

## 11. Roles de Usuario

### Administrador del Sistema
- Configura agentes (ADK)  
- Gestiona fuentes RAG  
- Define reglas globales  

### Analista / Revisor
- Valida respuestas generadas  
- Retroalimenta el sistema  

### Usuario Funcional (Secretarías)
- Define criterios de negocio  
- Clasifica excepciones  

### Ciudadano
- Genera PQRS  
- Recibe respuestas  
- Proporciona feedback  

### Product Owner
- Define métricas objetivo  
- Prioriza mejoras
