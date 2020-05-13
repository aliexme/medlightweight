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
    patient = models.ForeignKey(Patient, null=True, on_delete=models.SET_NULL)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              null=True,
                              on_delete=models.SET_NULL,
                              related_name='own_surveys')
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserSurvey', related_name='shared_surveys')

    class Meta:
        ordering = ['-created_at']


class UserSurvey(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
