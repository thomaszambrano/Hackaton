from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.utils import timezone

from apps.pqrsd.models import PQRSD
from apps.conocimiento.models import PrecedenteRespuesta
from .models import BorradorRespuesta
from .gemini_respuestas import generar_borrador


@login_required
def generar_o_ver_borrador(request, pqrsd_id):
    pqrsd = get_object_or_404(
        PQRSD.objects.select_related('dependencia_asignada', 'sintesis'),
        pk=pqrsd_id,
    )

    # Si ya existe un borrador vigente, ir directamente a verlo
    borrador_existente = pqrsd.borradores.filter(estado__in=['borrador', 'revisado']).first()
    if borrador_existente and request.method != 'POST':
        return redirect('respuestas:ver_borrador', borrador_id=borrador_existente.pk)

    # Generar nuevo borrador
    resultado = generar_borrador(pqrsd)

    texto = resultado.get('texto_respuesta', '')
    asunto = resultado.get('asunto_respuesta', f"Respuesta — {pqrsd.radicado}")
    advertencia = resultado.get('advertencia', '')
    modelo = resultado.get('modelo', 'gemini-1.5-flash')

    borrador = BorradorRespuesta.objects.create(
        pqrsd=pqrsd,
        texto_borrador=texto,
        modelo_ia=modelo,
        prompt_usado=resultado.get('prompt', ''),
    )

    precedentes_ids = resultado.get('precedentes_ids', [])
    if precedentes_ids:
        borrador.precedentes_usados.set(
            PrecedenteRespuesta.objects.filter(pk__in=precedentes_ids)
        )

    if advertencia:
        messages.warning(request, f"Advertencia IA: {advertencia}")
    messages.info(request, f"Borrador generado por {modelo}. Revise y edite antes de aprobar.")

    return redirect('respuestas:ver_borrador', borrador_id=borrador.pk)


@login_required
def ver_borrador(request, borrador_id):
    borrador = get_object_or_404(
        BorradorRespuesta.objects.select_related('pqrsd', 'pqrsd__dependencia_asignada', 'revisado_por'),
        pk=borrador_id,
    )
    return render(request, 'respuestas/borrador.html', {'borrador': borrador, 'pqrsd': borrador.pqrsd})


@login_required
def editar_borrador(request, borrador_id):
    borrador = get_object_or_404(BorradorRespuesta, pk=borrador_id, estado__in=['borrador', 'revisado'])

    if request.method != 'POST':
        return redirect('respuestas:ver_borrador', borrador_id=borrador_id)

    texto_editado = request.POST.get('texto_editado', '').strip()
    if not texto_editado:
        messages.error(request, 'El texto de la respuesta no puede estar vacío.')
        return redirect('respuestas:ver_borrador', borrador_id=borrador_id)

    borrador.texto_editado = texto_editado
    borrador.estado = 'revisado'
    borrador.revisado_por = request.user
    borrador.revisado_en = timezone.now()
    borrador.save()

    messages.success(request, 'Borrador actualizado.')
    return redirect('respuestas:ver_borrador', borrador_id=borrador_id)


@login_required
def aprobar_respuesta(request, borrador_id):
    borrador = get_object_or_404(BorradorRespuesta, pk=borrador_id, estado__in=['borrador', 'revisado'])

    if request.method != 'POST':
        return redirect('respuestas:ver_borrador', borrador_id=borrador_id)

    borrador.estado = 'enviado'
    borrador.revisado_por = request.user
    borrador.revisado_en = timezone.now()
    borrador.save()

    pqrsd = borrador.pqrsd
    pqrsd.estado = 'respondida'
    pqrsd.fecha_respuesta = timezone.now()
    if not pqrsd.observaciones_funcionario:
        pqrsd.observaciones_funcionario = f"Respuesta enviada via agente IA (borrador #{borrador.pk})."
    pqrsd.save()

    messages.success(request, f'Respuesta aprobada. PQRSD {pqrsd.radicado} marcada como respondida.')
    return redirect('funcionarios:detalle_pqrsd', pk=pqrsd.pk)


@login_required
def regenerar_borrador(request, pqrsd_id):
    if request.method != 'POST':
        return redirect('funcionarios:detalle_pqrsd', pk=pqrsd_id)
    return generar_o_ver_borrador(request, pqrsd_id)
