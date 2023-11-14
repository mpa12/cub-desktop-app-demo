from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/user/events/', views.UserEventView.as_view(), name='user-all-event'),
    path('api/v1/user/event/<int:event_id>/', views.UserDetailEventView.as_view(), name='user-detail-event'),

]
