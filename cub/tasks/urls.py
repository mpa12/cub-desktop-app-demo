from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/user/tasks/', views.UserTasksView.as_view(), name='user-all-tasks'),
    path('api/v1/user/task/<int:task_id>/', views.UserDetailTasksView.as_view(), name='user-detail-tasks'),
    path('api/v1/tasks/create/', views.TaskCreateView.as_view(), name='task-create'),
    path('api/v1/tasks/delete/', views.TaskDeleteView.as_view(), name='task-delete'),
    path('api/v1/tasks/<int:pk>/update/', views.TaskUpdateView.as_view(), name='task-update'),
]
