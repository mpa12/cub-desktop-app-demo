from rest_framework import serializers

from .models import User, UserPassport


class UserPassportSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPassport
        fields = ('serial', 'number', 'date_of_given', 'departament', 'departament_code')


class UserSerializer(serializers.ModelSerializer):
    passport_info = UserPassportSerializer(source='passport_data', read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'midl_name',
            'username',
            'email',
            'passport_info',
            'snils',
            'inn',
            'gender',
            'birth_date',
            'photo',
            'role',
        )
