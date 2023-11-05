from django.db import models


class TaskStatuses(models.TextChoices):
    """Статусы для задачи"""
    STOPPED = 'stopped', 'завершена'
    PAUSED = 'paused', 'остановлена'
    NEW = 'new', 'новая'
    IN_WORK = 'in_work', 'в работе'