import logging

from django.core.management.base import BaseCommand
from django.conf import settings

from telebot import TeleBot, types

from users.models import User

bot = TeleBot(token=settings.TELEGRAM_BOT_TOKEN)


def menu(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, row_width=3)
    markup.add(
        types.KeyboardButton('Система логирования'),
        types.KeyboardButton('Вопрос ответ'),
        types.KeyboardButton('Поддержка'),
        types.KeyboardButton('Инструкция'),
    )
    bot.send_message(message.chat.id, 'Выбери раздел:', reply_markup=markup)

@bot.message_handler(commands=['start'])
def handle_start(message):
    msg = bot.send_message(message.chat.id, "Введите ваш email для системы логирования Невада:")
    bot.register_next_step_handler(msg, process_email_step)

def process_email_step(message):
    email = message.text
    user = User.objects.get(email=email)
    if user.telegram_id:
        bot.send_message(message.chat.id, "Вы уже зарегистрированы.")
        menu(message)
    else:
        user.telegram_id = message.chat.id
        user.save()
        bot.send_message(message.chat.id, "Теперь ваш Telegram ID привязан к аккаунту с email: {}".format(email))
        menu(message)


class Command(BaseCommand):
    help = 'Невада бот'

    def handle(self, *args, **options):
        bot.polling(none_stop=True)
        # while True:
        #     try:
        #         bot.polling(none_stop=True)
        #     except Exception as e:
        #         logging.exception(e)
