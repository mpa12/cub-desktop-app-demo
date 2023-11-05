from django.db import models


class UserRole(models.TextChoices):
    """Статусы для юзеров"""
    MANAGER = 'manager', 'руководитель проекта'
    PROGRAMMER = 'programmer', 'программист'
    ADMIN = 'admin', 'администратор'