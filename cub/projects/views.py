from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Project, Folder
from .serializer import ProjectSerializer, FolderSerializer, ProjectFileSerializer


class ProjectView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.all()

    def get(self, request):
        project = self.get_queryset()
        serializer = ProjectSerializer(project, many=True)
        return Response(serializer.data)


class ProjectDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, project_id):
        return Project.objects.filter(id=project_id)

    def get(self, request, project_id):
        project = self.get_queryset(project_id)
        serializer = ProjectSerializer(project, many=True)
        return Response(serializer.data)


class FolderCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    queryset = Folder.objects.none()

    def post(self, request, project_id):
        # Проверяем существование проекта
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({'error': 'Проект не найден'}, status=status.HTTP_404_NOT_FOUND)

        # Сериализуем данные из запроса
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            # Сохраняем папку, связанную с проектом
            folder = serializer.save(project=project)
            return Response(FolderSerializer(folder).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FolderView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, project_id):
        return Folder.objects.filter(project_id=project_id)

    def get(self, request, project_id):
        folders = self.get_queryset(project_id)
        serializer = FolderSerializer(folders, many=True)
        return Response(serializer.data)


class FilesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, folder_id, project_id):
        try:
            folder = Folder.objects.get(id=folder_id, project__id=project_id)
            return folder.files.all()
        except Folder.DoesNotExist:
            return None

    def get(self, request, project_id, folder_id):
        files = self.get_queryset(folder_id, project_id)
        if files is not None:
            serializer = ProjectFileSerializer(files, many=True)
            return Response(serializer.data)
        else:
            return Response({'error': 'Папка не найдена'}, status=status.HTTP_404_NOT_FOUND)
