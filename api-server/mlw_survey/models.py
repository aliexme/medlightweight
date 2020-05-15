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
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, through='SurveyUser', related_name='shared_surveys')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return 'Survey "{name}" ({id})'.format(id=self.id, name=self.name)


class SurveyUser(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class SurveyComment(models.Model):
    TEXT_MAX_LENGTH = 1024

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    text = models.CharField(max_length=TEXT_MAX_LENGTH)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
