from django.urls import path
from .api import ProjectListAPI, ProjectCreateAPI, ProjectDetailsAPI, ProjectUpdateAPI, TaskListAPI, TaskCreateAPI, TaskDetailsAPI, TaskUpdateAPI


urlpatterns = [
    path('', ProjectListAPI.as_view(), name='project-list'),
    path('create', ProjectCreateAPI.as_view(), name='project-create'),
    path('<int:pk>/', ProjectDetailsAPI.as_view(), name='project-details'),
    path('<int:pk>/update', ProjectUpdateAPI.as_view(), name='project-update'),

    path('<int:project_id>/tasks/', TaskListAPI.as_view(), name='task-list'),
    path('<int:project_id>/tasks/create', TaskCreateAPI.as_view(), name='task-create'),
    path('<int:project_id>/tasks/<int:pk>/', TaskDetailsAPI.as_view(), name='task-details'),
    path('<int:project_id>/tasks/<int:pk>/update', TaskUpdateAPI.as_view(), name='task-update'),
]

