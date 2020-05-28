from django.urls import path
from .api import UserListAPI, UserDetailsAPI


urlpatterns = [
    path('', UserListAPI.as_view(), name='user-list'),
    path('<int:pk>/', UserDetailsAPI.as_view(), name='user-details'),
]

