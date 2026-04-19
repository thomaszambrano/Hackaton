from django.urls import path
from . import views

app_name = 'respuestas'

urlpatterns = [
    path('pqrsd/<int:pqrsd_id>/borrador/', views.generar_o_ver_borrador, name='generar_borrador'),
    path('pqrsd/<int:pqrsd_id>/borrador/nuevo/', views.regenerar_borrador, name='regenerar_borrador'),
    path('borrador/<int:borrador_id>/', views.ver_borrador, name='ver_borrador'),
    path('borrador/<int:borrador_id>/editar/', views.editar_borrador, name='editar_borrador'),
    path('borrador/<int:borrador_id>/aprobar/', views.aprobar_respuesta, name='aprobar_respuesta'),
]
