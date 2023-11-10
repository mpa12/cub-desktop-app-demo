from rest_framework import serializers

from users.serializer import UserSerializer
from projects.serializer import ProjectSerializer
from .models import Task, TaskFile


class TaskFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskFile
        fields = ('file',)


class TaskSerializer(serializers.ModelSerializer):
    task_files = TaskFileSerializer(many=True, required=False)
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
            'comment',
        )

    def create(self, validated_data):
        task_files_data = validated_data.pop('task_files', [])
        task = Task.objects.create(**validated_data)
        for task_file_data in task_files_data:
            TaskFile.objects.create(task=task, **task_file_data)
        return task
