from django.contrib import admin
from django.urls import path, include

from .views import resp200, resp_auth200

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test200', resp200),
    path('api/testAuth200', resp_auth200),
    path('api/auth/', include('mlwauth.urls'))
]
