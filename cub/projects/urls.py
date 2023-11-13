from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/projects/', views.ProjectView.as_view(), name='projects-all'),
    path('api/v1/project/<int:project_id>/', views.ProjectDetailView.as_view(), name='projects-detail'),
]
