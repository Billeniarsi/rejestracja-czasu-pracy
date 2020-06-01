from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from users import urls as users_urls
from projects import urls as projects_urls
from reports import urls as reports_urls

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'Users list': reverse('user-list', request=request, format=format),
        'Projects list': reverse('project-list', request=request, format=format),
        'Project create': reverse('project-create', request=request, format=format),
        'Reports list': reverse('report-list', request=request, format=format),
        'Summaries list': reverse('overview-list', request=request, format=format),
    })


urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
]

urlpatterns += [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', api_root, name='api-root'),
    path('api/users/', include(users_urls), name='users-api'),
    path('api/projects/', include(projects_urls), name='projects-api'),
    path('api/reports/', include(reports_urls), name='reports-api'),
]

