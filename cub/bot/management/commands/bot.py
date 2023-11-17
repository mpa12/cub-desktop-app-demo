import logging

from django.core.management.base import BaseCommand
from django.conf import settings

from aiogram import Bot, Dispatcher, executor, types
from aiogram.types.web_app_info import WebAppInfo

bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
dp = Dispatcher(bot)


@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    markup = types.ReplyKeyboardMarkup()
    markup.add(
        types.KeyboardButton('Открыть вы старницу', web_app=WebAppInfo(url='https://itproger.com/')),
        types.InlineKeyboardButton('Открыть вы старницу 2', web_app=WebAppInfo(url='https://itproger.com/')),
    )
    await message.answer('some text', reply_markup=markup)


class Command(BaseCommand):
    help = 'Невада бот'

    def handle(self, *args, **options):
        executor.start_polling(dp)
        # while True:
        #     try:
        #         bot.polling(none_stop=True)
        #     except Exception as e:
        #         logging.exception(e)
