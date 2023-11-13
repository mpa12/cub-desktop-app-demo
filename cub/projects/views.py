from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Project
from .serializer import ProjectSerializer


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
