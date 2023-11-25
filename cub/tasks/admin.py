from django.contrib import admin

from tasks.models import Task, TaskComment, TaskFile


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'status', 'project', 'time',)
    exclude = ('start_time', )


@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', )
