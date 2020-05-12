from django.urls import path, include
from rest_framework.routers import DefaultRouter

from mlw_auth.views import AuthToken, UserViewSet

router = DefaultRouter()
router.register('', UserViewSet, basename='users')

urlpatterns = [
    path('signin', AuthToken.as_view()),
    path('users/', include(router.urls))
]
