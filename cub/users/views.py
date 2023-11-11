from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import User
from .serializer import UserRoleSerializer


class UserRoleView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user_id):
        return User.objects.filter(id=user_id)

    def get(self, request):
        user = self.get_queryset(request.user)
        serializer = UserRoleSerializer(user, many=True)
        return Response(serializer.data)
