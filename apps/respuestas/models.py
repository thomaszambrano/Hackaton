from django.db import models
from django.contrib.auth.models import User


class BorradorRespuesta(models.Model):
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('revisado', 'Revisado por funcionario'),
        ('enviado', 'Enviado al ciudadano'),
    ]

    pqrsd = models.ForeignKey('pqrsd.PQRSD', on_delete=models.CASCADE, related_name='borradores')
    texto_borrador = models.TextField()
    texto_editado = models.TextField(blank=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')

    # Metadatos de generación
    modelo_ia = models.CharField(max_length=50, default='gemini-1.5-flash')
    precedentes_usados = models.ManyToManyField('conocimiento.PrecedenteRespuesta', blank=True)
    prompt_usado = models.TextField(blank=True)

    # Trazabilidad
    generado_en = models.DateTimeField(auto_now_add=True)
    revisado_por = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name='borradores_revisados'
    )
    revisado_en = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-generado_en']
        verbose_name = 'Borrador de Respuesta'
        verbose_name_plural = 'Borradores de Respuesta'

    def texto_final(self):
        return self.texto_editado or self.texto_borrador

    def __str__(self):
        return f"Borrador [{self.estado}] — {self.pqrsd.radicado}"
