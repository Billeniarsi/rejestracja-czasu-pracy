from django.urls import path
from .api import ProjectListAPI, ProjectDetailsAPI, TaskListAPI, TaskDetailsAPI
from reports.api import OverviewListAPI


urlpatterns = [
    path('', ProjectListAPI.as_view(), name='project-list'),
    path('<int:pk>/', ProjectDetailsAPI.as_view(), name='project-details'),
    path('<int:project_id>/overviews/', OverviewListAPI.as_view(), name='overview-details'),

    path('<int:project_id>/tasks/', TaskListAPI.as_view(), name='task-list'),
    path('<int:project_id>/tasks/<int:pk>/', TaskDetailsAPI.as_view(), name='task-details'),
]

