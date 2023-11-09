from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/user/<int:user_id>/tasks/', views.UserTasksView.as_view(), name='user-all-tasks'),
    path('api/v1/user/<int:user_id>/task/<int:task_id>/', views.UserDetailTasksView.as_view(), name='user-detail-tasks'),
    path('api/v1/tasks/create/', views.TaskCreateView.as_view(), name='task-create'),
]
