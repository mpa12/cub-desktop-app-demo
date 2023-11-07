from django.db import models

from users.models import User
from customers.models import CustomerProfile
from tasks.models import Task


class Project(models.Model):
    """Модель проекта"""
    title = models.CharField(max_length=255, verbose_name="Название проекта")
    leader = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Руководитель проекта",
        related_name="leading_projects",
    )
    customer = models.ForeignKey(
        CustomerProfile,
        on_delete=models.CASCADE,
        verbose_name="Заказчик",
        null=True, blank=True,
        related_name="customer_projects"
    )
    start_date = models.DateTimeField(verbose_name="Дата начала проекта", null=True, blank=True)
    stop_date = models.DateTimeField(verbose_name="Дата завершения проекта", null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Проекты'
        verbose_name = 'Проект'

    def __str__(self):
        return self.title


class Folder(models.Model):
    """Модель папки"""
    name = models.CharField(max_length=255, verbose_name="Название папки")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="folders")

    class Meta:
        verbose_name_plural = 'Папки'
        verbose_name = 'Папка'

    def __str__(self):
        return self.name


class ProjectFile(models.Model):
    """Модель файла проекта"""
    name = models.CharField(max_length=255, verbose_name="Название файла")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="files")
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, blank=True, related_name="files")
    file = models.FileField(upload_to='project_files/', verbose_name="Файл")

    class Meta:
        verbose_name_plural = 'Файлы проекта'
        verbose_name = 'Файл проекта'

    def __str__(self):
        return self.name
