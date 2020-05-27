from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, UserListAPI, UserDetailsAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]


urlpatterns += [
    path('api/users/', UserListAPI.as_view(), name='user-list'),
    path('api/users/<int:pk>/', UserDetailsAPI.as_view(), name='user-details'),
]

