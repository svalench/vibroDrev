
from django.conf.urls import url
from django.urls import path

from . import views
app_name = 'vibroDiagnostic'
urlpatterns = [
    url(r'^$', views.index, name='startsystem'),
    url(r'3d', views.threed, name='3d'),
    url(r'^vibro$', views.vibromenu, name='vibration'),
    url(r'^vibro/vibroOnline$', views.vibroSelect, name='vibroOnlineSelect'),
    path('vibro/vibroOnline/point/<int:zavodid>/<int:parentid>/<int:id>/', views.vibroPoint, name='point'),
    url(r'oee$', views.oeemenu, name='oeemenu'),
    url(r'oee/oeeAll$', views.oeeall, name='oeeall'),
    path('oee/oeePoint/<int:zavodid>/<int:oborid>/', views.oeepoint, name='oeepoint'),
    url(r'jurnal$', views.jurnalmenu, name='jurnalmenu'),
    url(r'message$', views.vibromenu, name='messages'),

]
