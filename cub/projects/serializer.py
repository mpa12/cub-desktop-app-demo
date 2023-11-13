from rest_framework import serializers

from users.serializer import UserSerializer
from customers.serializer import CustomerProfileSerializer
from .models import Project, Folder, ProjectFile


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'name')


class ProjectFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFile
        fields = ('id', 'name', 'file', 'folder')


class ProjectSerializer(serializers.ModelSerializer):
    leader_info = UserSerializer(source='leader', read_only=True)
    customer_info = CustomerProfileSerializer(source='customer', read_only=True)
    folders = FolderSerializer(many=True, read_only=True)
    files = ProjectFileSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'title',
            'leader_info',
            'customer_info',
            'start_date',
            'stop_date',
            'folders',
            'files',
        )
