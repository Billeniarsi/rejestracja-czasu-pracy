from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserListSerializer, UserDetailsSerializer


class UserListAPI(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserDetailsAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer

