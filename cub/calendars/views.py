from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics, status
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


class EventCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Event.objects.none()

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDeleteView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        events_ids = request.data.get('events_ids', [])
        if not events_ids:
            return Response({'detail': 'События не выбраны.'}, status=status.HTTP_400_BAD_REQUEST)

        events_to_delete = Event.objects.filter(pk__in=events_ids)
        if not events_to_delete.exists():
            return Response({'detail': 'События не найдены.'}, status=status.HTTP_400_BAD_REQUEST)

        events_to_delete.delete()
        return Response({'detail': 'Событие(я) успешно удалены.'}, status=status.HTTP_204_NO_CONTENT)


class EventUpdateView(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
