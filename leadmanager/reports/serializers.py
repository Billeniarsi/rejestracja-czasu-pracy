from rest_framework import serializers
from .models import Report


class ReportListSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'sender', 'task', 'date', 'time', 'overtime', 'is_accepted']


