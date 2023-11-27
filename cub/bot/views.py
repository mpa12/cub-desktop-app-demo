from django.shortcuts import render

from .models import BotFAQ


def support(request):
    sup = BotFAQ.objects.all()

    context = {
        'sup': sup,
    }

    return render(request, 'bot/support.html', context)

def contact(request):
    return render(request, 'bot/contact.html')