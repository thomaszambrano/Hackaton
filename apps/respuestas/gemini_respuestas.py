"""
Agente de respuestas: genera borradores de respuesta oficial para PQRSDs
usando Gemini 1.5 Flash, precedentes de la dependencia y síntesis estructurada.
La respuesta generada es SIEMPRE un borrador — el funcionario decide qué enviar.
"""
import json
import logging
from django.conf import settings

logger = logging.getLogger(__name__)


def _construir_prompt(pqrsd, precedentes, sintesis=None) -> str:
    info_ciudadano = (
        f"Nombre: {pqrsd.nombre_ciudadano}\n"
        f"Email: {pqrsd.email_ciudadano or 'No proporcionado'}"
        if not pqrsd.anonimo
        else "Solicitud anónima"
    )

    sintesis_txt = ""
    if sintesis:
        sintesis_txt = f"""
SÍNTESIS ESTRUCTURADA (generada por IA):
- Resumen ejecutivo: {sintesis.resumen_ejecutivo}
- Problema central: {sintesis.problema_central}
- Acción requerida: {sintesis.accion_requerida}
- Normativa aplicable: {sintesis.normativa_aplicable}
"""

    precedentes_txt = ""
    if precedentes:
        partes = []
        for p in precedentes:
            partes.append(
                f"Pregunta frecuente: {p.pregunta_frecuente}\n"
                f"Respuesta base: {p.respuesta_base[:600]}\n"
                f"Normativa: {p.normativa_aplicable or 'N/A'}"
            )
        precedentes_txt = "\nPRECEDENTES DE RESPUESTA SIMILARES:\n" + "\n---\n".join(partes)

    dep_nombre = pqrsd.dependencia_asignada.nombre if pqrsd.dependencia_asignada else "Alcaldía de Medellín"
    dep_sigla = pqrsd.dependencia_asignada.sigla if pqrsd.dependencia_asignada else "Alcaldía"

    return f"""Eres un asistente redactor para la Secretaría de Desarrollo Económico de la Alcaldía de Medellín. Tu tarea es redactar un borrador de respuesta oficial a una solicitud ciudadana (PQRSD).

SOLICITUD CIUDADANA:
Radicado: {pqrsd.radicado}
Tipo: {pqrsd.get_tipo_display()}
Asunto: {pqrsd.asunto}
Descripción: {pqrsd.descripcion[:2000]}
Canal de entrada: {pqrsd.get_canal_entrada_display()}
{info_ciudadano}
{sintesis_txt}{precedentes_txt}

INSTRUCCIONES PARA LA RESPUESTA:
1. Redacta en nombre de {dep_nombre} ({dep_sigla}).
2. Usa un tono formal, claro y empático — lenguaje ciudadano, no burocrático.
3. Estructura: (a) saludo, (b) acuse de recibo con radicado, (c) respuesta sustancial, (d) cierre con información de contacto o próximos pasos.
4. Cita la normativa pertinente si aplica (Ley 1755/2015 para peticiones, etc.).
5. Si el tipo es 'sugerencia': agradecer y confirmar que será evaluada.
6. Si el tipo es 'denuncia': indicar que se tramitará por los canales correspondientes sin comprometer resultados.
7. La respuesta NO debe comprometer a la Alcaldía más allá de lo que indica la normativa.
8. Máximo 400 palabras.
9. Si es anónima: no incluir nombre del destinatario.

IMPORTANTE: Esta es una SUGERENCIA para el funcionario. Responde ÚNICAMENTE con JSON válido:
{{
  "asunto_respuesta": "<línea de asunto para el email/oficio de respuesta>",
  "texto_respuesta": "<el cuerpo completo de la respuesta, con saltos de línea usando \\n>",
  "normativa_citada": ["<ley o decreto 1>", "<ley 2>"],
  "tono_detectado": "<formal|empático|técnico>",
  "advertencia": "<si hay algo que el funcionario debe verificar antes de enviar, o vacío>"
}}"""


def generar_borrador(pqrsd):
    """
    Llama a Gemini para generar un borrador de respuesta.
    Retorna dict con el borrador o un fallback si falla.
    """
    from apps.conocimiento.models import PrecedenteRespuesta

    sintesis = getattr(pqrsd, 'sintesis', None)

    precedentes = PrecedenteRespuesta.objects.filter(
        tipo_pqrsd=pqrsd.tipo,
        activo=True,
    )
    if pqrsd.dependencia_asignada:
        precedentes = precedentes.filter(dependencia=pqrsd.dependencia_asignada)
    precedentes = list(precedentes[:3])

    if not precedentes:
        precedentes = list(PrecedenteRespuesta.objects.filter(tipo_pqrsd=pqrsd.tipo, activo=True)[:3])

    api_key = settings.GEMINI_API_KEY
    if not api_key or api_key.startswith('REEMPLAZAR'):
        logger.warning("GEMINI_API_KEY no configurada — usando borrador simulado")
        return _borrador_simulado(pqrsd, precedentes)

    prompt = _construir_prompt(pqrsd, precedentes, sintesis)

    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')

        response = model.generate_content(prompt)
        texto = response.text.strip()

        if texto.startswith('```'):
            texto = texto.split('```')[1]
            if texto.startswith('json'):
                texto = texto[4:]

        resultado = json.loads(texto)
        resultado['prompt'] = prompt
        resultado['modelo'] = 'gemini-1.5-flash'
        resultado['precedentes_ids'] = [p.pk for p in precedentes]
        return resultado

    except Exception as e:
        logger.error(f"Error llamando a Gemini para borrador: {e}")
        return _borrador_simulado(pqrsd, precedentes, prompt=prompt)


def _borrador_simulado(pqrsd, precedentes, prompt=""):
    dep = pqrsd.dependencia_asignada
    dep_nombre = dep.nombre if dep else "Alcaldía de Medellín"
    ciudadano = pqrsd.nombre_ciudadano if not pqrsd.anonimo and pqrsd.nombre_ciudadano else "Ciudadano(a)"
    tipo_display = pqrsd.get_tipo_display()

    texto = (
        f"Estimado(a) {ciudadano},\n\n"
        f"En atención a su {tipo_display.lower()} radicada bajo el número {pqrsd.radicado}, "
        f"relacionada con: {pqrsd.asunto}.\n\n"
        f"[BORRADOR SIMULADO — API key no configurada. El funcionario debe redactar la respuesta.]\n\n"
        f"De conformidad con lo establecido en la Ley 1755 de 2015, su solicitud ha sido recibida "
        f"y será tramitada dentro de los términos legales establecidos.\n\n"
        f"Para cualquier inquietud, puede comunicarse con {dep_nombre}.\n\n"
        f"Atentamente,\n{dep_nombre}\nAlcaldía de Medellín"
    )

    return {
        'asunto_respuesta': f"Respuesta a {tipo_display} — Radicado {pqrsd.radicado}",
        'texto_respuesta': texto,
        'normativa_citada': ['Ley 1755/2015'],
        'tono_detectado': 'formal',
        'advertencia': 'Borrador simulado. API key de Gemini no configurada. Redacte manualmente.',
        'prompt': prompt,
        'modelo': 'simulado',
        'precedentes_ids': [p.pk for p in precedentes],
    }
