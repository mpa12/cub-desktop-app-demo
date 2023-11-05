from django.db import models

from .tasks_enums import TaskStatuses


class Task(models.Model):
    """Модель для задач"""
    title = models.CharField(max_length=255, verbose_name="Заголовок задачи")
    description = models.TextField(verbose_name="Описание задачи")
    status = models.CharField(
        max_length=50,
        choices=TaskStatuses.choices,
        default=TaskStatuses.NEW,
        verbose_name="Статус задачи"
    )
    due_date = models.DateTimeField(verbose_name="Срок выполнения задачи", null=True, blank=True)
    project = models.ForeignKey('projects.Project', on_delete=models.CASCADE, verbose_name="Проект")
    is_paused = models.BooleanField(default=False, verbose_name="На паузе")
    is_stopped = models.BooleanField(default=False, verbose_name="Завершена")
    time = models.TimeField("Время выполнения задачи", null=True, blank=True)

    def pause_task(self):
        self.is_paused = True
        self.save()

    def continue_task(self):
        self.is_paused = False
        self.save()

    def stop_task(self):
        self.is_stopped = True
        self.save()

    def __str__(self):
        return self.title
