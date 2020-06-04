from rest_framework import generics, permissions
from .models import Report, Overview, Summary
from .serializers import ReportListSerialzier, OverviewListSerializer, SummaryListSerializer
from .permissions import IsReportSender, IsReportSenderOrStaffMember, ReportNotAccepted


class ReportListAPI(generics.ListCreateAPIView):
    serializer_class = ReportListSerialzier

    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

    def get_queryset(self):
        if self.request.user.is_staff:
            queryset = Report.objects.all()
        else:
            queryset = Report.objects.filter(employee=self.request.user)

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


class ReportDetailsAPI(generics.RetrieveAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier

    permission_classes = [IsReportSenderOrStaffMember]


class ReportUpdateAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier

    permission_classes = [IsReportSender, ReportNotAccepted]


class OverviewListAPI(generics.ListCreateAPIView):
    serializer_class = OverviewListSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            queryset = Overview.objects.all()
        else:
            queryset = Overview.objects.filter(employee=self.request.user)

        return queryset

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            serializer.save(employee=self.request.user)
        else:
            serializer.save()


class SummaryListAPI(generics.ListCreateAPIView):
    queryset = Summary.objects.all()
    serializer_class = SummaryListSerializer

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

