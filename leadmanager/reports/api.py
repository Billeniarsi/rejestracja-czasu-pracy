from rest_framework import generics, permissions
from users.permissions import IsStaffMember
from .models import Report, Overview
from .serializers import ReportListSerialzier, OverviewListSerializer
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
    queryset = Overview.objects.all()
    serializer_class = OverviewListSerializer

    permission_classes = [permissions.IsAuthenticated]


class OverviewDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Overview.objects.all()
    serializer_class = OverviewListSerializer

    permission_classes = [permissions.IsAuthenticated]

