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

## 2. Métricas de Escalabilidad

A continuación se presentan las tres métricas clave que permiten evaluar y sostener la escalabilidad del sistema:

| Métrica | Definición | Fórmula | Objetivo | Cómo aporta a la escalabilidad | Responsables |
|--------|------------|---------|----------|--------------------------------|--------------|
| **TRA (Tiempo de Resolución Automatizada)** | Tiempo promedio desde el ingreso de la PQRS hasta la generación y validación de la respuesta | `promedio(timestamp_respuesta - timestamp_ingreso)` | Reducir tiempos de respuesta manteniendo estabilidad | Identifica cuellos de botella y garantiza eficiencia operativa en alto volumen | Data/BI (monitoreo), Backend (latencia y colas), IA (optimización), Revisor (validación) |
| **TAE (Tasa de Automatización Efectiva)** | Porcentaje de PQRS resueltas sin intervención humana significativa | `(PQRS automatizadas / total PQRS) * 100` | Aumentar automatización sin aumentar recursos humanos | Permite escalar la capacidad del sistema sin depender de más personal | IA (clasificación y generación), Secretarías (reglas), Product Owner (umbrales), QA (control de calidad) |
| **ICR (Índice de Calidad de Respuesta)** | Métrica compuesta de calidad, cumplimiento y satisfacción | `(0.4 * precisión) + (0.3 * cumplimiento) + (0.3 * satisfacción)` | Garantizar respuestas confiables y alineadas a normativa | Evita degradación de calidad al escalar y reduce reprocesos | Jurídico (lineamientos), QA (auditoría), IA (mejora), Atención (feedback) |

---

## 3. Operacionalización de las Métricas

Para asegurar que estas métricas sostengan la escalabilidad del sistema, se implementan:

- Monitoreo en tiempo real mediante dashboards  
- Definición de umbrales (ej: TRA máximo, TAE mínimo esperado)  
- Alertas automáticas ante desviaciones  
- Ciclos de mejora continua basados en datos  

---

## 4. Relación entre Métricas

- TRA → eficiencia (velocidad)  
- TAE → escalabilidad  
- ICR → calidad  

### Balance estratégico

- Alta automatización sin calidad → riesgo institucional  
- Alta calidad sin automatización → sistema no escalable  
- Alta velocidad sin control → incremento de errores  

---

## 5. KPI Derivado

### Costo por PQRS

Costo por PQRS = costo total operativo / número de PQRS gestionadas  

---

## 6. Condición de Escalabilidad

El sistema se considera escalable cuando:

- Disminuye el TRA  
- Aumenta el TAE  
- Se mantiene o mejora el ICR  

---

## 7. Arquitectura IA (ADK + RAG)

- Agentes gestionados mediante ADK  
- RAG para consulta de normativa, históricos y bases documentales  
- Orquestación de agentes según tipo de PQRS  
- Trazabilidad de decisiones (logs y prompts)  

---

## 8. Roles de Usuario

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

---

## 9. Conclusión

Las métricas TRA, TAE e ICR constituyen el núcleo del modelo de escalabilidad, permitiendo que el sistema crezca en volumen sin comprometer la eficiencia, la automatización ni la calidad del servicio.
