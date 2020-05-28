from rest_framework import serializers
from .models import Project, Task


class ProjectListSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TaskListSerializer(serializers.ModelSerializer):
    project = ProjectListSerialzier

    class Meta:
        model = Task
        fields = ['id', 'project', 'name', 'description']

