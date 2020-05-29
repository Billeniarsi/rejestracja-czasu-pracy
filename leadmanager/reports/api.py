from rest_framework import generics, filters, permissions
from .models import Report
from .serializers import ReportListSerialzier


class ReportListAPI(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier


class ReportDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier


