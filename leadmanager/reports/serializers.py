from rest_framework import serializers
from .models import Report, Summary


class ReportListSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'sender', 'task', 'date', 'time', 'overtime', 'is_accepted']


class SummaryListSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    #overtime=serializers.SerializerMethodField()

    class Meta:
        model = Summary
        fields = ['id', 'project', 'worker', 'start_date', 'end_date', 'time'] #, 'overtime']

    def get_time(self, obj):
        type_of_summary = 0
        if obj.project is not None and obj.worker is not None:
            reports = Report.objects.filter(task__project=obj.project, sender=obj.worker)
        elif obj.project is not None:
            reports = Report.objects.filter(task__project=obj.project)
        else:
            reports = Report.objects.filter(sender=obj.worker)

        time = 0
        for report in reports:
            time += report.time

        return time

