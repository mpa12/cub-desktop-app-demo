from django.contrib import admin

from customers.models import CustomerProfile, CustomerBank


@admin.register(CustomerProfile)
class UserPassportsAdmin(admin.ModelAdmin):
    list_display = ('title', 'header_name', 'email', 'phone_number',)


@admin.register(CustomerBank)
class UserPassportsAdmin(admin.ModelAdmin):
    list_display = ('title', )
