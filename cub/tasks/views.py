from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from .models import Task
from .serializer import TaskFullSerializer, TaskDetailSerializer, TaskSerializer


class TaskCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.none()

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTasksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user_id):
        return Task.objects.filter(executor_id=user_id)

    def get(self, request, user_id):
        tasks = self.get_queryset(user_id)
        serializer = TaskFullSerializer(tasks, many=True)
        return Response(serializer.data)


class UserDetailTasksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user_id, task_id):
        return Task.objects.filter(executor_id=user_id, id=task_id)

    def get(self, request, user_id, task_id):
        task = self.get_queryset(user_id, task_id)
        serializer = TaskDetailSerializer(task, many=True)
        return Response(serializer.data)
