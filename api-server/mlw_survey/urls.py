from django.urls import path, include
from rest_framework.routers import DefaultRouter

from mlw_survey.views import SurveyViewSet, SurveyCommentViewSet

surveys_router = DefaultRouter()
surveys_router.register('', SurveyViewSet, basename='surveys')

survey_comments_router = DefaultRouter()
survey_comments_router.register('', SurveyCommentViewSet, basename='survey_comments')

urlpatterns = [
    path('comments/', include(survey_comments_router.urls)),
    path('', include(surveys_router.urls)),
]
