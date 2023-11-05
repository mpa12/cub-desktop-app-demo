from django.contrib import admin

from projects.models import Project


@admin.register(Project)
class UserPassportsAdmin(admin.ModelAdmin):
    list_display = ('title', 'customer', 'leader', 'start_date', 'stop_date',)
