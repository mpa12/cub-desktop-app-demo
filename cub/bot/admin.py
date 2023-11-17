from django.contrib import admin

from bot.models import BotFAQ


@admin.register(BotFAQ)
class BotFAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer', 'file',)
