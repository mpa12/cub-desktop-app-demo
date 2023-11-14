from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Event
from .serializer import EventSerializer


class UserEventView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user):
        return Event.objects.filter(user=user)

    def get(self, request):
        event = self.get_queryset(request.user)
        serializer = EventSerializer(event, many=True)
        return Response(serializer.data)


class UserDetailEventView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, user, event_id):
        return Event.objects.filter(user=user, id=event_id)

    def get(self, request, event_id):
        event = self.get_queryset(request.user, event_id)
        serializer = EventSerializer(event, many=True)
        return Response(serializer.data)
