from django.urls import path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .api import UserListAPI, UserDetailsAPI


@api_view(['GET'])
def users_api_root(request, format=None):
    return Response({
        'User list': reverse('user-list', request=request, format=format),
    })


urlpatterns = [
    path('', users_api_root, name='users-api'),
    path('/', UserListAPI.as_view(), name='user-list'),
    path('/<int:pk>/', UserDetailsAPI.as_view(), name='user-details'),
]

