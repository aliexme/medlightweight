from django.urls import path, include
from rest_framework.routers import DefaultRouter

from mlw_survey.views import SurveyViewSet

router = DefaultRouter()
router.register('', SurveyViewSet, basename='surveys')

urlpatterns = [
    path('', include(router.urls)),
]
