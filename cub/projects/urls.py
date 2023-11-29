from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/projects/', views.ProjectView.as_view(), name='projects-all'),
    path('api/v1/project/<int:project_id>/', views.ProjectDetailView.as_view(), name='projects-detail'),
    path('api/v1/project/<int:project_id>/folders/create/', views.FolderCreateView.as_view(), name='create_folder'),
    path('api/v1/project/<int:project_id>/folders/', views.FolderView.as_view(), name='view-folders'),
    path('api/v1/project/<int:project_id>/folders/<int:folder_id>/files/',views.FilesView.as_view(), name='files-view'),
]
