from rest_framework import generics, filters, permissions
from .models import Project, Task
from .serializers import ProjectListSerialzier, TaskListSerializer
from users.permissions import IsStaffMemberOrReadOnly


class ProjectListAPI(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier

    permission_classes = [IsStaffMemberOrReadOnly]


class ProjectDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerialzier

    permission_classes = [IsStaffMemberOrReadOnly]


class TaskListAPI(generics.ListCreateAPIView):
    serializer_class = TaskListSerializer
    filter_backends = [filters.SearchFilter]

    permission_classes = [IsStaffMemberOrReadOnly]

    def get_queryset(self):
        pk = self.kwargs['project_id']
        return Task.objects.filter(project__id=pk)

    def perform_create(self, serializer):
        serializer.save(project=Project.objects.get(id=self.kwargs['project_id']))


class TaskDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskListSerializer

    permission_classes = [IsStaffMemberOrReadOnly]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Task.objects.filter(project__id=project_id)

