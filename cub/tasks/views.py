from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Q

from .models import Task, TaskComment
from .serializer import TaskSerializer, TaskCommentSerializer, TaskCreateSerializer
from users.user_enums import UserRole


class TaskCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        data.setdefault('project_manager', self.request.user.id)
        serializer = TaskCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskCommentCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, task_id):
        data = request.data
        data['task'] = task_id
        serializer = TaskCommentSerializer(data=data)
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
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, task_id):
        # Получаем данные из запроса
        data = request.data

        # Находим задачу по task_id
        try:
            task_instance = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

        # Сериализуем данные, передавая экземпляр задачи для обновления
        serializer = TaskCreateSerializer(task_instance, data=data)

        # Проверяем валидность данных
        if serializer.is_valid():
            # Сохраняем обновленные данные
            serializer.save()

            # Возвращаем успешный ответ
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Возвращаем ошибку, если данные не валидны
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTasksView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user):
        if user.role == UserRole.PROGRAMMER:
            return Task.objects.filter(executor=user)
        elif user.role == UserRole.ADMIN:
            return Task.objects.all()
        return Task.objects.filter(Q(executor=user) | Q(project_manager=user))


    def get(self, request):
        tasks = self.get_queryset(request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


class UserDetailTasksView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, task_id):
        return Task.objects.filter(id=task_id)

    def get_comments(self, task):
        # Получаем комментарии для задачи, если атрибут существует
        comments = TaskComment.objects.filter(task=task) if TaskComment.objects.filter(task=task) else None
        return TaskCommentSerializer(comments, many=True).data if comments else []

    def get(self, request, task_id):
        task = self.get_queryset(task_id).first()
        if task:
            task_data = TaskSerializer(task).data
            task_data['comments'] = self.get_comments(task)
            return Response(task_data)
        else:
            return Response({"detail": "Task not found"}, status=404)


class StopTasksView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user, task_id):
        return Task.objects.filter(executor_id=user, id=task_id)

    def post(self, request, task_id):
        task = self.get_queryset(request.user, task_id).first()
        if task and not task.is_stopped:
            task.stop_task()
            return Response({'message': 'Задача успешно завершена'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Задача не найдена'}, status=status.HTTP_404_NOT_FOUND)


class PauseTasksView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user, task_id):
        return Task.objects.filter(executor_id=user, id=task_id)

    def post(self, request, task_id):
        task = self.get_queryset(request.user, task_id).first()
        if task and not task.is_stopped:
            task.pause_task()
            return Response({'message': 'Задача успешно остановлена'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Ошибка'}, status=status.HTTP_404_NOT_FOUND)


class StartOrContinueTasksView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user, task_id):
        return Task.objects.filter(executor_id=user, id=task_id)

    def post(self, request, task_id):
        task = self.get_queryset(request.user, task_id).first()
        if task and not task.is_stopped:
            task.start_or_continue_task()
            return Response({'message': 'Учет времени включен'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Ошибка'}, status=status.HTTP_404_NOT_FOUND)
