from rest_framework import serializers

from .models import Event
from users.serializer import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(source='user', read_only=True)

    class Meta:
        model = Event
        fields = (
            'id',
            'title',
            'description',
            'start_datetime',
            'user_info',
            'text_color',
            'bg_color',
        )
