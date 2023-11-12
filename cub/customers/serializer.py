from rest_framework import serializers

from .models import CustomerProfile, CustomerBank


class CustomerBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerBank
        fields = ('title', 'bik', 'kore_bill',)


class CustomerProfileSerializer(serializers.ModelSerializer):
    bank_info = CustomerBankSerializer(source='bank', read_only=True)

    class Meta:
        model = CustomerProfile
        fields = (
            'id',
            'title',
            'inn',
            'kpp',
            'bank_info',
            'address',
            'header_name',
            'email',
            'phone_number',
        )
