from django.db import models


class BotFAQ(models.Model):
    """Модель для тг бота"""
    question = models.CharField(max_length=255, verbose_name="Вопрос")
    answer = models.CharField(max_length=255, verbose_name="Ответ", null=True, blank=True)
    file = models.FileField(verbose_name="Файл", upload_to='bot_files/', null=True, blank=True)
