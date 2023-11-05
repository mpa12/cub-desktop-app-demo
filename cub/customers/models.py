from django.db import models


class CustomerProfile(models.Model):
    """Модель заказчика"""
    pass

    class Meta:
        verbose_name_plural = 'Заказчики'
        verbose_name = 'Заказчик'

    def __str__(self):
        pass
