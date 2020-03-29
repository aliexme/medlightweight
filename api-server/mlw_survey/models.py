from django.conf import settings
from django.db import models

from mlw_patient.models import Patient
from utils.models.fields import MediaPathField


class Survey(models.Model):
    NAME_MAX_LENGTH = 128
    DESCRIPTION_MAX_LENGTH = 1024

    name = models.CharField(max_length=NAME_MAX_LENGTH)
    description = models.CharField(max_length=DESCRIPTION_MAX_LENGTH, null=True, blank=True)
    directory = MediaPathField(root='survey')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    patient = models.ForeignKey(Patient, null=True, on_delete=models.SET_NULL)
