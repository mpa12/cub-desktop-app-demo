from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/user/tasks/', views.UserTasksView.as_view(), name='user-all-tasks'),
    path('api/v1/user/task/<int:task_id>/', views.UserDetailTasksView.as_view(), name='user-detail-tasks'),
    path('api/v1/tasks/create/', views.TaskCreateView.as_view(), name='task-create'),
    path('api/v1/tasks/delete/', views.TaskDeleteView.as_view(), name='task-delete'),
    path('api/v1/tasks/<int:task_id>/update/', views.TaskUpdateView.as_view(), name='task-update'),
    path('api/v1/tasks/<int:task_id>/stop/', views.StopTasksView.as_view(), name='task-stop'),
    path('api/v1/tasks/<int:task_id>/pause/', views.PauseTasksView.as_view(), name='task-pause'),
    path('api/v1/tasks/<int:task_id>/start_continue/', views.StartOrContinueTasksView.as_view(), name='task-start-or-continue'),
]
