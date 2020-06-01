from rest_framework import generics, permissions
from .models import Report, Summary
from .serializers import ReportListSerialzier, SummaryListSerializer


class ReportListAPI(generics.ListCreateAPIView):
    serializer_class = ReportListSerialzier

    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

    def get_queryset(self):
        queryset = Report.objects.all()
        employee = self.request.query_params.get('employee', None)
        project = self.request.query_params.get('project', None)
        date = self.request.query_params.get('date', None)

        if employee is not None:
            queryset = queryset.filter(employee__id=employee)
        if project is not None:
            queryset = queryset.filter(task__project__id=project)
        if date is not None:
            queryset = queryset.filter(date=date)
        return queryset


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

