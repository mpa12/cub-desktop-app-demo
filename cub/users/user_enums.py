from django.db import models


class UserRole(models.TextChoices):
    """Статусы для юзеров"""
    MANAGER = 'manager', 'руководитель проекта'
    PROGRAMMER = 'programmer', 'программист'
    ADMIN = 'admin', 'администратор'


class UserGender(models.TextChoices):
    """Статусы для юзеров"""
    MALE = 'male', 'мужской'
    FEMALE = 'female', 'женский'
    DEFAULT = 'default', 'не выбран'