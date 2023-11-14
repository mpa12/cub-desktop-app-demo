from django.contrib import admin

from calendars.models import Event


@admin.register(Event)
class UserPassportsAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'start_datetime', 'user',)
