from django.db import models

from users.models import User


class Event(models.Model):
    """Модель соытия в календаре"""
    title = models.CharField(max_length=255, verbose_name="Заголовок события")
    description = models.TextField(verbose_name="Описание события")
    start_datetime = models.DateTimeField(verbose_name="Дата и время начала события")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь", null=True, blank=True)
    text_color = models.CharField(max_length=7, verbose_name="Цвет текста", default="#000000")
    bg_color = models.CharField(max_length=7, verbose_name="Цвет фона", default="#fff")

    class Meta:
        verbose_name_plural = 'Календари'
        verbose_name = 'Календарь'

    def __str__(self):
        return self.title
