from rest_framework import serializers
from .models import Report, Overview, Summary


class ReportListSerialzier(serializers.ModelSerializer):
    project = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ['id', 'employee', 'project', 'task', 'date', 'time', 'overtime', 'is_accepted']
        extra_kwargs = {'employee': {'read_only': True}, 'is_accepted': {'read_only': True}}

    def get_project(self, obj):
        return obj.task.project.id

    def validate_time(self, data):
        if data < 0:
            raise serializers.ValidationError("Przepracowana liczba minut musi być nieujemna.")
        if data%5 != 0:
            raise serializers.ValidationError("Czas pracy musi być wielokrotnością liczby 5. (5 minut to podstawowa jednostka liczenia czasu pracy)")
        return data

    def validate_overtime(self, data):
        if data < 0:
            raise serializers.ValidationError("Przepracowana liczba minut musi być nieujemna.")
        if data%5 != 0:
            raise serializers.ValidationError("Czas pracy musi być wielokrotnością liczby 5. (5 minut to podstawowa jednostka liczenia czasu pracy)")
        return data

    def validate(self, attrs):
        if attrs['time'] == 0 and attrs['overtime'] == 0:
            raise serializers.ValidationError("Musisz podać standardowy czas pracy bądź nadgodziny.")
        return attrs


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


class SummaryListSerializer(serializers.ModelSerializer):
    """
    time = serializers.SerializerMethodField()
    overtime = serializers.SerializerMethodField()
    projects = serializers.SerializerMethodField()
    tasks = serializers.SerializerMethodField()
    """

    details = serializers.SerializerMethodField()

    class Meta:
        model = Summary
        fields = ['id', 'employee', 'start_date', 'end_date', 'is_accepted', 'details']
        extra_kwargs = {'employee': {'read_only': True}, 'is_accepted': {'read_only': True}}

    def get_details(self, obj):
        details = {'time': 0, 'overtime': 0, 'projects': []}
        reports = Report.objects.filter(employee=obj.employee, date__range=[obj.start_date, obj.end_date])
        for report in reports:
            add_project = True
            details['time'] += report.time
            details['overtime'] += report.overtime

            for project in details['projects']:
                if project['id'] == report.task.project.id:
                    add_project = False
                    add_task = True
                    project['time'] += report.time
                    project['overtime'] += report.overtime

                    for task in project['tasks']:
                        if task['id'] == report.task.id:
                            add_task = False
                            task['time'] += report.time
                            task['overtime'] += report.overtime

                    if add_task:
                        project['tasks'].append({'id': report.task.id, 'name': report.task.name, 'time': report.time, 'overtime': report.overtime})

                    break

            if add_project:
                details['projects'].append({'id': report.task.project.id, 'name': report.task.project.name, 'time': report.time, 'overtime': report.overtime,
                                            'tasks': [{'id': report.task.id, 'name': report.task.name, 'time': report.time, 'overtime': report.overtime}]})

        return details


