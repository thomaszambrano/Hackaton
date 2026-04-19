from django.contrib import admin
from .models import BorradorRespuesta


@admin.register(BorradorRespuesta)
class BorradorRespuestaAdmin(admin.ModelAdmin):
    list_display = ['pqrsd', 'estado', 'modelo_ia', 'generado_en', 'revisado_por']
    list_filter = ['estado', 'modelo_ia']
    search_fields = ['pqrsd__radicado']
    readonly_fields = ['generado_en', 'prompt_usado']
