from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/user/events/', views.UserEventView.as_view(), name='user-all-event'),
    path('api/v1/user/event/<int:event_id>/', views.UserDetailEventView.as_view(), name='user-detail-event'),
    path('api/v1/event/create/', views.EventCreateView.as_view(), name='event-create'),
    path('api/v1/events/delete/', views.EventDeleteView.as_view(), name='event-delete'),
    path('api/v1/events/<int:pk>/update/', views.EventUpdateView.as_view(), name='event-update'),
]
