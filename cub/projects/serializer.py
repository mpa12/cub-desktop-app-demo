from rest_framework import serializers

from users.serializer import UserSerializer
from customers.serializer import CustomerProfileSerializer
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    leader_info = UserSerializer(source='leader', read_only=True)
    customer_info = CustomerProfileSerializer(source='customer', read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'title',
            'leader_info',
            'customer_info',
            'start_date',
            'stop_date',
        )
