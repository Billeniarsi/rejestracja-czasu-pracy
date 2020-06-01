from django.urls import path
from .api import ReportListAPI, ReportDetailsAPI, ReportUpdateAPI, OverviewListAPI, OverviewDetailsAPI


urlpatterns = [
    path('', ReportListAPI.as_view(), name='report-list'),
    path('<int:pk>/', ReportDetailsAPI.as_view(), name='report-details'),
    path('<int:pk>/update', ReportUpdateAPI.as_view(), name='report-update'),

    path('overviews/', OverviewListAPI.as_view(), name='overview-list'),
    path('overviews/<int:pk>/', OverviewDetailsAPI.as_view(), name='overview-details'),
]

