from django.urls import path
from .views import support, contact

urlpatterns = [
    path('support/', support, name='bot-sup'),
    path('contact/', contact, name='bot-contact'),
]