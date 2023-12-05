from django.conf import settings

from telebot import TeleBot, types
from celery import shared_task

from users.models import User

bot = TeleBot(token=settings.TELEGRAM_BOT_TOKEN)


@shared_task
@bot.message_handler()
def send_task_notice(executor_id, title, description, due_time, task_id ):
    executor = User.objects.get(pk=executor_id)
    txt = f'Уважаемый {executor.get_full_name()}, у вас появилась новая задача: {title}\n\n{description}\n\nСрок выполненения: до {due_time}\n\nСсылка на вашу новую задачу:\nhttps://nevada-frontend.213-171-10-35.nip.io/tasks/{task_id}'
    bot.send_message(executor.telegram_id, txt)
