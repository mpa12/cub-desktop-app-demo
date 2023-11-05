from django.db import models


class CustomerProfile(models.Model):
    """Модель заказчика"""
    title = models.CharField(max_length=255, verbose_name="Название организации")
    inn = models.CharField(max_length=255, verbose_name="ИНН")
    kpp = models.CharField(max_length=255, verbose_name="КПП", null=True, blank=True)
    bank = models.ForeignKey(
        'customers.CustomerBank',
        verbose_name='Банк',
        related_name='customer_bank',
        on_delete=models.PROTECT
    )
    address = models.CharField('Адрес', max_length=255)
    header_name = models.CharField('ФИО директора', max_length=255)
    email = models.EmailField('Электронная почта')
    phone_number = models.CharField('Номер телефона', max_length=12)

    class Meta:
        verbose_name_plural = 'Заказчики'
        verbose_name = 'Заказчик'
        ordering = ['title']

    def __str__(self):
        return self.title


class CustomerBank(models.Model):
    """Модель банка для заказчика"""
    title = models.CharField("Название банка", max_length=255)
    bik = models.CharField(max_length=4, verbose_name="БИК")
    kore_bill = models.CharField(max_length=6, verbose_name="Кор счет")

    class Meta:
        verbose_name_plural = 'Банки'
        verbose_name = 'Банк'
        ordering = ['title']

    def __str__(self):
        return self.title
