from django.urls import path
from .api import UserListAPI, UserDetailsAPI
from reports.api import SummaryListAPI


urlpatterns = [
    path('', UserListAPI.as_view(), name='user-list'),
    path('<int:pk>/', UserDetailsAPI.as_view(), name='user-details'),
    path('<int:user_id>/summaries/', SummaryListAPI.as_view(), name='summary-list'),
]

