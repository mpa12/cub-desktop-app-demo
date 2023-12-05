from django.db import models
from django.db.models import Q
from django.utils import timezone
from datetime import datetime

from users.models import User
from users.user_enums import UserRole
from .tasks_enums import TaskStatuses
from bot.tasks import send_task_notice


class Task(models.Model):
    """Модель для задач"""
    title = models.CharField(max_length=255, verbose_name="Заголовок задачи")
    description = models.TextField(verbose_name="Описание задачи")
    executor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Исполнитель",
        limit_choices_to=Q(role=UserRole.PROGRAMMER) | Q(role=UserRole.MANAGER),
        related_name="executor_projects",
    )
    project_manager = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Менеджер проекта",
        limit_choices_to=Q(role=UserRole.ADMIN) | Q(role=UserRole.MANAGER),
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
    start_timestamp = models.TimeField(
        verbose_name="Время начала выполнения",
        null=True,
        blank=True
    )
    time = models.DurationField("Время выполнения задачи", null=True, blank=True)
    start_time = models.DateTimeField(verbose_name="Для фронта", null=True, blank=True)

    def pause_task(self):
        if not self.is_stopped:
            self.is_paused = True
            self.status = TaskStatuses.PAUSED
            current_time = timezone.now().time()
            elapsed_time = datetime.combine(datetime.today(), current_time) - datetime.combine(datetime.today(),
                                                                                           self.start_timestamp)
            if self.time is None:
                self.time = elapsed_time
            else:
                self.time += elapsed_time
            self.start_timestamp = None
            self.save()

    def start_or_continue_task(self):
        if not self.is_stopped:
            self.is_paused = False
            self.status = TaskStatuses.IN_WORK
            self.start_timestamp = timezone.now().time()
            self.start_time = timezone.now()
            self.save()

    def stop_task(self):
        if self.start_timestamp is not None:
            self.pause_task()
            self.is_stopped = True
            self.status = TaskStatuses.STOPPED
            self.save()
        else:
            self.is_stopped = True
            self.status = TaskStatuses.STOPPED
            self.save()

    class Meta:
        verbose_name_plural = 'Задачи'
        verbose_name = 'Задача'

    def save(self, *args, **kwargs):

        if self.status == TaskStatuses.NEW:
            send_task_notice.delay(self.executor.id, self.title, self.description, self.due_date, self.pk)

        super(Task, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class TaskComment(models.Model):
    """Модель для комментариев"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name="Задача", null=True, blank=True)
    date = models.DateTimeField(verbose_name="Дата", null=True, blank=True)
    comment = models.TextField(verbose_name='Комментарий')

    class Meta:
        verbose_name_plural = 'Комментарии'
        verbose_name = 'Комментарий'
        ordering = ['date']

    def save(self, *args, **kwargs):
        if not self.date:
            self.date = timezone.now()
        super(TaskComment, self).save(*args, **kwargs)

    def __str__(self):
        return self.comment


class TaskFile(models.Model):
    """Модель для файлов к задаче"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='task_files')
    file = models.FileField(upload_to='task_files/', verbose_name='Файл к задаче')

    def __str__(self):
        return str(self.file)
