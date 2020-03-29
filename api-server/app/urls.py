from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from app.views import resp200, resp_auth200

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test200', resp200),
    path('api/testAuth200', resp_auth200),
    path('api/auth/', include('mlw_auth.urls')),
    path('api/surveys/', include('mlw_survey.urls')),
    path('api/patients/', include('mlw_patient.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
