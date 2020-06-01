from rest_framework import serializers
from .models import Report, Summary


class ReportListSerialzier(serializers.ModelSerializer):
    project = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ['id', 'employee', 'project', 'task', 'date', 'time', 'overtime', 'is_accepted']
        extra_kwargs = {'employee': {'read_only': True}, 'is_accepted': {'read_only': True}}

    def get_project(self, obj):
        return obj.task.project.id


class SummaryListSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    #overtime=serializers.SerializerMethodField()

    class Meta:
        model = Summary
        fields = ['id', 'project', 'employee', 'start_date', 'end_date', 'time'] #, 'overtime']

    def get_time(self, obj):
        if obj.project is not None and obj.employee is not None:
            reports = Report.objects.filter(task__project=obj.project, employee=obj.employee)
        elif obj.project is not None:
            reports = Report.objects.filter(task__project=obj.project)
        else:
            reports = Report.objects.filter(employee=obj.employee)

        time = 0
        for report in reports:
            time += report.time

        return time

