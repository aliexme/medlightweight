from django.urls import path, include
from rest_framework.routers import DefaultRouter

from mlw_patient.views import PatientViewSet

router = DefaultRouter()
router.register('', PatientViewSet, basename='patients')

urlpatterns = [
    path('', include(router.urls)),
]
