from rest_framework import serializers

from users.serializer import UserSerializer
from projects.serializer import ProjectSerializer
from .models import Task, TaskFile, TaskComment


class TaskCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskComment
        fields = ('comment', 'date','task')


class TaskFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskFile
        fields = ('file',)


class TaskSerializer(serializers.ModelSerializer):
    task_files = TaskFileSerializer(source='files', many=True, required=False)
    executor_info = UserSerializer(source='executor', read_only=True)
    project_manager_info = UserSerializer(source='project_manager', read_only=True)
    project_info = ProjectSerializer(source='project', read_only=True)

    class Meta:
        model = Task
        fields = (
            'id',
            'title',
            'description',
            'executor_info',
            'project_manager_info',
            'status',
            'task_files',
            'due_date',
            'project_info',
            'is_paused',
            'is_stopped',
            'time',
            'start_timestamp',
            'start_time',
        )

class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'id',
            'title',
            'description',
            'executor',
            'project_manager',
            'status',
            'files',
            'due_date',
            'project',
            'is_paused',
            'is_stopped',
            'start_timestamp',
            'time',
            'start_time',
        )

    def create(self, validated_data):
        return Task.objects.create(**validated_data)