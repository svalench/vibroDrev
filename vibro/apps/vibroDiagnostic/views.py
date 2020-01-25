from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.shortcuts import render
import datetime
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import redirect

from vibro.apps.vibroDiagnostic.models import *


def index(request):
    if (request.user.is_authenticated):
        return render(request, 'vibro/menu1.html')
    else:
        response = redirect('/accounts/login')
        return response


def logout_user(request):
    logout(request)


def threed(request):
    return render(request, 'vibro/3d.html')

def vibromenu(request):
    return render(request, 'vibro/vibromenu.html')

def vibroSelect(request, id=1):
    if(request.user.is_superuser):
        ceh = Zavod.objects.prefetch_related().all()
        print(dir(ceh[0]))
        return render(request, 'vibro/vibroCeh.html', {'ceh': ceh})
    else:
        ceh = Ceh.objects.prefetch_related().filter(parentid=request.user.client.zavod.id)
        return render(request, 'vibro/vibroCeh.html', {'ceh': ceh})

def vibroPoint(request, zavodid, parentid, id):
    return render(request, 'vibro/grafVibro.html')

def jurnalmenu(request):
    return render(request, 'vibro/jurnalmenu.html')

def oeemenu(request):
    return render(request, 'oee/oeemenu.html')

def oeeall(request):
    return render(request, 'oee/oeeAll.html')

def oeepoint(request,zavodid, oborid):
    return render(request, 'oee/oeePoint.html')

