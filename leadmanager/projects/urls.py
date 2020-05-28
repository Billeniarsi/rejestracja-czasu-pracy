from django.urls import path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .api import ProjectListAPI, ProjectDetailsAPI, TaskListAPI, TaskDetailsAPI


@api_view(['GET'])
def projects_api_root(request, format=None):
    return Response({
        'Projects list': reverse('project-list', request=request, format=format),
        'Tasks list': reverse('task-list', request=request, format=format),
    })


urlpatterns = [
    path('', projects_api_root, name='projects-api'),
    path('/', ProjectListAPI.as_view(), name='project-list'),
    path('/<int:pk>/', ProjectDetailsAPI.as_view(), name='project-details'),
    path('/tasks/', TaskListAPI.as_view(), name='task-list'),
    path('/tasks/<int:pk>/', TaskDetailsAPI.as_view(), name='task-details'),

]

