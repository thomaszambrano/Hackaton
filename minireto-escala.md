# Métricas de Escalabilidad – Sistema PQRS con IA

## Contexto
Sistema de gestión de PQRS con agentes de inteligencia artificial para análisis y generación de respuestas automatizadas.

**Stack tecnológico:**
- Backend: Python / Django  
- Frontend: React / TypeScript  
- IA: Agent Development Kit (ADK) de Google + arquitectura RAG  

---

## 1. Tiempo de Resolución Automatizada (TRA)

**Definición**  
Tiempo promedio desde ingreso de PQRS hasta respuesta generada y validada.

**Fórmula**  
TRA = promedio(timestamp_respuesta - timestamp_ingreso)

**Objetivo**  
Reducir tiempos manteniendo estabilidad ante aumento de volumen.

**Responsables**
- Data/BI: monitoreo y alertas  
- IA (ADK): optimización de agentes  
- Backend: latencia y colas  
- Revisor: validación final  

---

## 2. Tasa de Automatización Efectiva (TAE)

**Definición**  
Porcentaje de PQRS resueltas sin intervención humana significativa.

**Fórmula**  
TAE = (PQRS automatizadas / total PQRS) * 100

**Objetivo**  
Escalar capacidad sin aumentar recursos humanos.

**Responsables**
- IA (ADK + RAG): clasificación y generación  
- Funcional (Secretarías): reglas y excepciones  
- Product Owner: umbrales de automatización  
- QA: control de calidad  

---

## 3. Índice de Calidad de Respuesta (ICR)

**Definición**  
Métrica compuesta de calidad, cumplimiento y satisfacción.

**Fórmula (ejemplo)**  
ICR = (0.4 * precisión) + (0.3 * cumplimiento) + (0.3 * satisfacción)

**Objetivo**  
Garantizar respuestas confiables y alineadas a normativa.

**Responsables**
- Jurídico: lineamientos  
- QA: auditoría  
- IA: mejora de modelos  
- Atención ciudadano: feedback  

---

## Arquitectura IA (ADK + RAG)

- Agentes gestionados con ADK  
- RAG para consulta de normativa, históricos y bases documentales  
- Orquestación de agentes por tipo de PQRS  
- Trazabilidad de decisiones (logs y prompts)  

---

## Roles de Usuario

**Administrador del Sistema**
- Configura agentes (ADK)  
- Gestiona fuentes RAG  
- Define reglas globales  

**Analista / Revisor**
- Valida respuestas generadas  
- Corrige y retroalimenta al sistema  

**Usuario Funcional (Secretarías)**
- Define criterios de negocio  
- Clasifica excepciones  

**Ciudadano**
- Genera PQRS  
- Recibe respuestas  
- Proporciona feedback  

**Product Owner**
- Define métricas objetivo  
- Prioriza mejoras  

---

## Relación de Métricas

- TRA → velocidad  
- TAE → escalabilidad  
- ICR → calidad  

**Balance clave**
- Automatización sin calidad → riesgo institucional  
- Calidad sin automatización → no escalable  
- Velocidad sin control → errores  

---

## KPI Derivado

Costo por PQRS = costo total operativo / PQRS gestionadas  

---

## Nota Final

El sistema escala correctamente cuando:
- Disminuye el TRA  
- Aumenta el TAE  
- Aumenta el ICR