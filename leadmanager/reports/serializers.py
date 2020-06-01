from rest_framework import serializers
from .models import Report, Overview


class ReportListSerialzier(serializers.ModelSerializer):
    project = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ['id', 'employee', 'project', 'task', 'date', 'time', 'overtime', 'is_accepted']
        extra_kwargs = {'employee': {'read_only': True}, 'is_accepted': {'read_only': True}}

    def get_project(self, obj):
        return obj.task.project.id


class OverviewListSerializer(serializers.ModelSerializer):
    project_name = serializers.SerializerMethodField()
    employee_username = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    overtime = serializers.SerializerMethodField()
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = Overview
        fields = ['id', 'project', 'project_name', 'employee', 'employee_username', 'start_date', 'end_date', 'time', 'overtime', 'tasks']

    def get_project_name(self, obj):
        if obj.project is not None:
            return obj.project.name
        else:
            return None

    def get_employee_username(self, obj):
        if obj.employee is not None:
            return obj.employee.username
        else:
            return None

    def get_tasks(self, obj):
        if obj.project is not None and obj.employee is not None:
            reports = Report.objects.filter(task__project=obj.project, employee=obj.employee, date__range=[obj.start_date, obj.end_date])
        elif obj.project is not None:
            reports = Report.objects.filter(task__project=obj.project, date__range=[obj.start_date, obj.end_date])
        else:
            reports = Report.objects.filter(employee=obj.employee, date__range=[obj.start_date, obj.end_date])

        tasks = []
        for report in reports:
            add_task = True
            for task in tasks:
                if task['id'] == report.task.id:
                    add_task = False
                    task['time'] += report.time
                    task['overtime'] += report.overtime
                    break

            if add_task:
                tasks.append({'id': report.task.id, 'project': report.task.project.id, 'name': report.task.name, 'time': report.time, 'overtime': report.overtime})

        return tasks

    def get_time(self, obj):
        if obj.project is not None and obj.employee is not None:
            reports = Report.objects.filter(task__project=obj.project, employee=obj.employee, date__range=[obj.start_date, obj.end_date])
        elif obj.project is not None:
            reports = Report.objects.filter(task__project=obj.project, date__range=[obj.start_date, obj.end_date])
        else:
            reports = Report.objects.filter(employee=obj.employee, date__range=[obj.start_date, obj.end_date])

        time = 0
        for report in reports:
            time += report.time

        return time

    def get_overtime(self, obj):
        if obj.project is not None and obj.employee is not None:
            reports = Report.objects.filter(task__project=obj.project, employee=obj.employee, date__range=[obj.start_date, obj.end_date])
        elif obj.project is not None:
            reports = Report.objects.filter(task__project=obj.project, date__range=[obj.start_date, obj.end_date])
        else:
            reports = Report.objects.filter(employee=obj.employee, date__range=[obj.start_date, obj.end_date])

        overtime = 0
        for report in reports:
            overtime += report.overtime

        return overtime
