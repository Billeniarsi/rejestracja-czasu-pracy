from rest_framework import generics, filters, permissions
from .models import Report, Summary
from .serializers import ReportListSerialzier, SummaryListSerializer


class ReportListAPI(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier


class ReportDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier


class SummaryListAPI(generics.ListCreateAPIView):
    queryset = Summary.objects.all()
    serializer_class = SummaryListSerializer


class SummaryDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Summary.objects.all()
    serializer_class = SummaryListSerializer

