from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination

from mlw_survey.models import Survey
from mlw_survey.serializers import SurveySerializer


class SurveyViewSet(viewsets.ModelViewSet):
    serializer_class = SurveySerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return Survey.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
