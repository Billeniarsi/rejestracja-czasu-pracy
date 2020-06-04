from django.contrib.auth.models import User
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


class ReportAcceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['is_accepted']


class OverviewListSerializer(serializers.ModelSerializer):

    project_name = serializers.SerializerMethodField()
    details = serializers.SerializerMethodField()

    class Meta:
        model = Overview
        fields = ['start_date', 'end_date', 'project', 'project_name',  'details']
        extra_kwargs = {'project': {'read_only': True}}

    def validate(self, attrs):
        if attrs['end_date'] < attrs['start_date']:
            raise serializers.ValidationError("Data końca podglądu musi być późniejsza niż data jego rozpoczęcia.")
        return attrs

    def get_project_name(self, obj):
        return obj.project.name

    def get_details(self, obj):
        details = {'time': 0, 'overtime': 0, 'tasks': []}
        reports = Report.objects.filter(task__project=obj.project, date__range=[obj.start_date, obj.end_date])

        for report in reports:
            add_task = True
            details['time'] += report.time
            details['overtime'] += report.overtime

            for task in details['tasks']:
                if task['id'] == report.task.id:
                    add_task = False
                    task['time'] += report.time
                    task['overtime'] += report.overtime
                    break

            if add_task:
                details['tasks'].append({'id': report.task.id, 'name': report.task.name, 'time': report.time, 'overtime': report.overtime})

        return details


class SummaryListSerializer(serializers.ModelSerializer):

    employee = serializers.SerializerMethodField()
    details = serializers.SerializerMethodField()

    class Meta:
        model = Summary
        fields = ['start_date', 'end_date', 'employee', 'details']
        extra_kwargs = {'employee': {'read_only': True}}

    def validate(self, attrs):
        if attrs['end_date'] < attrs['start_date']:
            raise serializers.ValidationError("Data końca podsumowania musi być późniejsza niż data jego rozpoczęcia.")
        return attrs

    def create(self, validated_data):
        return Summary.objects.create(employee=User.objects.get(id=self.context['employee_id']), **validated_data)

    def get_employee(self, obj):
        return {'id': obj.employee.id, 'username': obj.employee.username, 'first_name': obj.employee.first_name, 'last_name': obj.employee.last_name}

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
                            break

                    if add_task:
                        project['tasks'].append({'id': report.task.id, 'name': report.task.name, 'time': report.time, 'overtime': report.overtime})

                    break

            if add_project:
                details['projects'].append({'id': report.task.project.id, 'name': report.task.project.name, 'time': report.time, 'overtime': report.overtime,
                                            'tasks': [{'id': report.task.id, 'name': report.task.name, 'time': report.time, 'overtime': report.overtime}]})

        return details


