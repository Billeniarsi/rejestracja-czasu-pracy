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

    details = serializers.SerializerMethodField()

    class Meta:
        model = Overview
        fields = ['id', 'project', 'start_date', 'end_date', 'details']
        extra_kwargs = {'project': {'read_only': True}}

    def validate(self, attrs):
        if attrs['end_date'] < attrs['start_date']:
            raise serializers.ValidationError("Data końca podglądu musi być późniejsza niż data jego rozpoczęcia.")
        return attrs

    def get_details(self, obj):
        details = {'time': 0, 'overtime': 0, 'tasks': []}
        reports = Report.objects.filter(task__project=obj.project, date__range=[obj.start_date, obj.end_date])

        for report in reports:
            add_task = True
            details['time'] += report.time
            details['overtime'] = report.overtime

            for task in details['tasks']:
                if task == report.task:
                    add_task = False
                    task['time'] += report.time
                    task['overtime'] += report.overtime
                    break

            if add_task:
                details['tasks'].append({'id': report.task.id, 'name': report.task.name, 'time': report.time, 'overtime': report.overtime})

        return details


class SummaryListSerializer(serializers.ModelSerializer):

    details = serializers.SerializerMethodField()

    class Meta:
        model = Summary
        fields = ['id', 'employee', 'start_date', 'end_date', 'details']
        extra_kwargs = {'employee': {'read_only': True}}

    def validate(self, attrs):
        if attrs['end_date'] < attrs['start_date']:
            raise serializers.ValidationError("Data końca podsumowania musi być późniejsza niż data jego rozpoczęcia.")
        return attrs

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


