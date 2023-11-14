from django.contrib import admin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

from users.models import User, UserPassport


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'last_name', 'first_name', 'username', 'role',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': (
            'first_name',
            'last_name',
            'midl_name',
            'email',
            'photo',
            'passport_data',
            'snils',
            'inn',
            'gender',
            'birth_date',
            'role'
        )}),
        (_('Permissions'), {'fields': ('is_active',), }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    readonly_fields = ('last_login', 'date_joined')

    # def save_model(self, request, obj, form, change):
    #     if 'password' in form.changed_data:
    #         obj.set_password(obj.password)
    #     super().save_model(request, obj, form, change)


@admin.register(UserPassport)
class UserPassportsAdmin(admin.ModelAdmin):
    list_display = ('serial', 'number', 'date_of_given', 'departament', 'departament_code',)


admin.site.unregister(Group)
