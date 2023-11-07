from django.contrib import admin

from projects.models import Project, Folder, ProjectFile


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'customer', 'leader', 'start_date', 'stop_date',)


@admin.register(Folder)
class FolderAdmin(admin.ModelAdmin):
    list_display = ('name', 'project',)


@admin.register(ProjectFile)
class ProjectFileAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'folder', 'file')
