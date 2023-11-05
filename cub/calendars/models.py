from django.db import models

from projects.models import Project


class Event(models.Model):
    """Модель соытия в календаре"""
    title = models.CharField(max_length=255, verbose_name="Заголовок события")
    description = models.TextField(verbose_name="Описание события")
    start_datetime = models.DateTimeField(verbose_name="Дата и время начала события")
    end_datetime = models.DateTimeField(verbose_name="Дата и время окончания события")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name="Проект", null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Календари'
        verbose_name = 'Календарь'

    def __str__(self):
        return self.title
