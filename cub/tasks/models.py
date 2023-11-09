from django.db import models

from users.models import User
from users.user_enums import UserRole
from .tasks_enums import TaskStatuses


class Task(models.Model):
    """Модель для задач"""
    title = models.CharField(max_length=255, verbose_name="Заголовок задачи")
    description = models.TextField(verbose_name="Описание задачи")
    executor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Исполнитель",
        limit_choices_to={'role': UserRole.PROGRAMMER},
        related_name="executor_projects",
    )
    project_manager = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Менеджер проекта",
        limit_choices_to={'role': UserRole.MANAGER},
        related_name="managed_projects",
        null=True, blank=True,
    )
    status = models.CharField(
        max_length=50,
        choices=TaskStatuses.choices,
        default=TaskStatuses.NEW,
        verbose_name="Статус задачи"
    )
    files = models.ManyToManyField('TaskFile', blank=True, verbose_name='Файлы к задаче', related_name='task_file')
    due_date = models.DateTimeField(verbose_name="Срок выполнения задачи", null=True, blank=True)
    project = models.ForeignKey('projects.Project', on_delete=models.CASCADE, verbose_name="Проект")
    is_paused = models.BooleanField(default=False, verbose_name="На паузе")
    is_stopped = models.BooleanField(default=False, verbose_name="Завершена")
    time = models.TimeField("Время выполнения задачи", null=True, blank=True)
    comment = models.TextField(verbose_name="Результат выполнения", null=True, blank=True)

    def pause_task(self):
        self.is_paused = True
        self.save()

    def continue_task(self):
        self.is_paused = False
        self.save()

    def stop_task(self):
        self.is_stopped = True
        self.save()

    class Meta:
        verbose_name_plural = 'Задачи'
        verbose_name = 'Задача'

    def __str__(self):
        return self.title


class TaskFile(models.Model):
    """Модель для файлов к задаче"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='task_files')
    file = models.FileField(upload_to='task_files/', verbose_name='Файл к задаче')

    def __str__(self):
        return str(self.file)
