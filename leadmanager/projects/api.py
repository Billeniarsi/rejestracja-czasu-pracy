from rest_framework import generics, permissions
from .models import Project, Task
from .serializers import ProjectListSerialzier, TaskListSerializer


class ProjectListAPI(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier


class ProjectDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier


class TaskListAPI(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer


class TaskDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer



