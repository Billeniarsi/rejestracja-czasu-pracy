from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from users import urls as users_urls


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'Users API': reverse('users-api', request=request, format=format),
    })


urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
]

urlpatterns += [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', api_root, name='api-root'),
    path('api/users', include(users_urls), name='users-api'),
]

