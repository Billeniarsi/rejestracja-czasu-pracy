from django.urls import path
from .api import ReportListAPI, ReportDetailsAPI, SummaryListAPI, SummaryDetailsAPI


urlpatterns = [
    path('', ReportListAPI.as_view(), name='report-list'),
    path('<int:pk>/', ReportDetailsAPI.as_view(), name='report-details'),
    path('summaries/', SummaryListAPI.as_view(), name='summary-list'),
    path('summaries/<int:pk>/', SummaryDetailsAPI.as_view(), name='summary-details'),
]

