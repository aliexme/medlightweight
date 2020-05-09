from django.db.models import Q
from rest_framework import viewsets

from mlw_patient.models import Patient
from mlw_patient.serializers import PatientSerializer
from utils.pagination import PagePagination


class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    pagination_class = PagePagination

    def get_queryset(self):
        search_text = self.request.GET.get('searchText')
        q = Q(owner=self.request.user)

        if search_text is not None:
            q &= Q(name__icontains=search_text)

        return Patient.objects.filter(q)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
