from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Zavod, Ceh, Oborudovanie, Point, Client

class EmployeeInline(admin.StackedInline):
    model = Client
    verbose_name_plural = 'permissions'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (EmployeeInline, )

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


admin.site.register(Zavod)
admin.site.register(Ceh)
admin.site.register(Oborudovanie)
admin.site.register(Point)
admin.site.register(Client)