from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .models import User
from .serializer import UserRoleSerializer


class UserRoleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user_id):
        return User.objects.filter(id=user_id)

    def get(self, request, user_id):
        user = self.get_queryset(user_id)
        serializer = UserRoleSerializer(user, many=True)
        return Response(serializer.data)
