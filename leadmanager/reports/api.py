from rest_framework import generics, filters, permissions
from .models import Report, Summary
from .serializers import ReportListSerialzier, SummaryListSerializer


class ReportListAPI(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier

    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)


class ReportDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier

    permission_classes = [permissions.IsAuthenticated]


class SummaryListAPI(generics.ListCreateAPIView):
    queryset = Summary.objects.all()
    serializer_class = SummaryListSerializer

    permission_classes = [permissions.IsAuthenticated]


class SummaryDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Summary.objects.all()
    serializer_class = SummaryListSerializer

    permission_classes = [permissions.IsAuthenticated]

