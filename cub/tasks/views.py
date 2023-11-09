from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework import status
from rest_framework.decorators import api_view

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


class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        task_ids = request.data.get('task_ids', [])
        if not task_ids:
            return Response({'detail': 'Задачи не выбраны.'}, status=status.HTTP_400_BAD_REQUEST)

        tasks_to_delete = Task.objects.filter(pk__in=task_ids)
        if not tasks_to_delete.exists():
            return Response({'detail': 'Задачи не найдены.'}, status=status.HTTP_400_BAD_REQUEST)

        tasks_to_delete.delete()
        return Response({'detail': 'Задача(и) успешно удалены.'}, status=status.HTTP_204_NO_CONTENT)


class TaskUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


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
