from rest_framework import generics, filters, permissions
from .models import Project, Task
from .serializers import ProjectListSerialzier, TaskListSerializer


class ProjectListAPI(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier


class ProjectDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier


class TaskListAPI(generics.ListCreateAPIView):
    serializer_class = TaskListSerializer
    filter_backends = [filters.SearchFilter]

    def get_queryset(self):
        pk = self.kwargs['project_id']
        return Task.objects.filter(project__id=pk)


class TaskDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskListSerializer

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Task.objects.filter(project__id=project_id)



