from celery import shared_task

from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_passport_task(full_name, username, password, email):
    """
    отправка пароля на почту юзеру
    """

    user_subject = f'Добро пожаловать в Невада Групп!'
    user_message = (
        f'{full_name}, здравствуй! \n'
        f'Вам предоставлены доступы в сервисы нашей компании.\n\n'
        f'Телеграм бот:\n'
        f'Система логирования и учета времени: http://80.90.187.226:3000/login\n\n'
        f'Логин для входа в систему логирования: {username}\n'
        f'Пароль: {password}'
    )
    recipient_list = [email]

    send_mail(
        user_subject,
        user_message,
        settings.EMAIL_HOST_USER,
        recipient_list
    )
