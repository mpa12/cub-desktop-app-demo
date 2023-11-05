from django.contrib import admin

from tasks.models import Task


@admin.register(Task)
class UserPassportsAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'status', 'project', 'time',)
