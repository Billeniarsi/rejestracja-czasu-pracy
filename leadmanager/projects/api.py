from rest_framework import generics, filters, permissions
from .models import Project, Task
from .serializers import ProjectListSerialzier, TaskListSerializer
from users.permissions import IsStaffMember


class ProjectListAPI(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier


class ProjectCreateAPI(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier

    permission_classes = [IsStaffMember]


class ProjectDetailsAPI(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier


class ProjectUpdateAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier

    permission_classes = [IsStaffMember]


class TaskListAPI(generics.ListAPIView):
    serializer_class = TaskListSerializer
    filter_backends = [filters.SearchFilter]

    def get_queryset(self):
        pk = self.kwargs['project_id']
        return Task.objects.filter(project__id=pk)


class TaskCreateAPI(generics.CreateAPIView):
    serializer_class = TaskListSerializer
    filter_backends = [filters.SearchFilter]

    permission_classes = [IsStaffMember]

    def get_queryset(self):
        pk = self.kwargs['project_id']
        return Task.objects.filter(project__id=pk)

    def perform_create(self, serializer):
        serializer.save(project=Project.objects.get(id=self.kwargs['project_id']))


class TaskDetailsAPI(generics.RetrieveAPIView):
    serializer_class = TaskListSerializer

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Task.objects.filter(project__id=project_id)


class TaskUpdateAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskListSerializer

    permission_classes = [IsStaffMember]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Task.objects.filter(project__id=project_id)

