from django.urls import path
from .api import ReportListAPI, ReportDetailsAPI, ReportAcceptAPI


urlpatterns = [
    path('', ReportListAPI.as_view(), name='report-list'),
    path('<int:pk>/', ReportDetailsAPI.as_view(), name='report-details'),
    path('<int:pk>/accept', ReportAcceptAPI.as_view(), name='report-accept'),
]

