from rest_framework import generics, permissions

from users.permissions import IsStaffMember
from projects.models import Project

from .models import Report, Overview, Summary
from .serializers import ReportListSerialzier, ReportAcceptSerializer, OverviewListSerializer, SummaryListSerializer
from .permissions import IsReportSender, ReportNotAccepted, IsSelfOrStaffMember


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


class ReportDetailsAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerialzier

    permission_classes = [IsReportSender]


class ReportAcceptAPI(generics.UpdateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportAcceptSerializer

    permission_classes = [IsStaffMember, ReportNotAccepted]

    def perform_update(self, serializer):
        serializer.save(is_accepted=True)


class OverviewListAPI(generics.ListCreateAPIView):
    serializer_class = OverviewListSerializer

    permission_classes = [IsStaffMember]

    def get_queryset(self):
        pk = self.kwargs['project_id']
        return Overview.objects.filter(project__id=pk)

    def perform_create(self, serializer):
        serializer.save(project=Project.objects.get(id=self.kwargs['project_id']))


class SummaryListAPI(generics.ListCreateAPIView):
    serializer_class = SummaryListSerializer

    permission_classes = [IsSelfOrStaffMember]

    def get_queryset(self):
        pk = self.kwargs['user_id']
        return Summary.objects.filter(employee__id=pk)

    def get_serializer_context(self):
        return {'employee_id': self.kwargs['user_id']}

"""
    def perform_create(self, serializer):
        serializer.save(employee=User.objects.get(id=self.kwargs['user_id']))
"""

