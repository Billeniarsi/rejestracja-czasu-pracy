from django.urls import path
from .api import ReportListAPI, ReportDetailsAPI, OverviewListAPI, OverviewDetailsAPI


urlpatterns = [
    path('', ReportListAPI.as_view(), name='report-list'),
    path('<int:pk>/', ReportDetailsAPI.as_view(), name='report-details'),
    path('overviews/', OverviewListAPI.as_view(), name='overview-list'),
    path('overviews/<int:pk>/', OverviewDetailsAPI.as_view(), name='overview-details'),
]

