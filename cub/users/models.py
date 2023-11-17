import random
import string

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models
from transliterate import translit

from .tasks import send_passport_task
from .user_enums import UserRole, UserGender


class User(AbstractUser):
    """Модель для пользователей"""
    midl_name = models.CharField(max_length=255, verbose_name="Отчество")
    passport_data = models.ForeignKey(
        'UserPassport',
        on_delete=models.CASCADE,
        verbose_name="Паспортные данные",
        null=True, blank=True,
    )
    snils = models.CharField(max_length=255, verbose_name="СНИЛС", null=True, blank=True)
    inn = models.CharField(max_length=255, verbose_name="ИНН", null=True, blank=True)
    gender = models.CharField(max_length=10, verbose_name="Пол", choices=UserGender.choices, default=UserGender.DEFAULT)
    birth_date = models.DateField(verbose_name="Дата рождения", null=True, blank=True)
    photo = models.FileField(upload_to='user_files/', verbose_name="Фотография профиля", null=True, blank=True)
    role = models.CharField('Роль', max_length=50, choices=UserRole.choices)

    def is_manager(self):
        return self.role == UserRole.MANAGER

    def is_programmer(self):
        return self.role == UserRole.PROGRAMMER

    def is_admin(self):
        return self.role == UserRole.ADMIN

    class Meta:
        verbose_name_plural = 'Пользователи'
        verbose_name = 'Пользователь'
        ordering = ['last_name', 'first_name']

    def save(self, *args, **kwargs):

        if self.is_superuser or self.is_admin():
            self.is_staff = True
            self.is_superuser = True
            self.role = UserRole.ADMIN

        if not self.pk and not self.is_superuser:
            username = translit(f"{self.last_name}{self.first_name}", 'ru', reversed=True).lower()
            self.username = username

            password = ''.join(random.choices(string.ascii_letters + string.digits, k=15))
            self.password = make_password(password)

            send_passport_task.delay(self.get_full_name(), username, password, self.email)

        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.get_full_name()


class UserPassport(models.Model):
    """Модель паспорта"""
    serial = models.CharField(max_length=4, verbose_name="Серия паспорта")
    number = models.CharField(max_length=6, verbose_name="Номер паспорта")
    date_of_given = models.DateField("Дата выдачи")
    departament = models.CharField("Кем выдан", max_length=255)
    departament_code = models.CharField("Код подразделения", max_length=7)

    class Meta:
        verbose_name_plural = 'Паспорта'
        verbose_name = 'Паспорт'

    def __str__(self):
        return f'{self.serial} {self.number}'
