from datetime import date

from dateutil.relativedelta import relativedelta
from django.conf import settings
from django.db import models

from utils.common import Gender
from utils.models.common import enum_to_model_choices


class Patient(models.Model):
    NAME_MAX_LENGTH = 256

    name = models.CharField(max_length=NAME_MAX_LENGTH)
    gender = models.CharField(max_length=1, choices=enum_to_model_choices(Gender))
    birth = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)

    @property
    def age(self) -> int:
        today = date.today()
        delta = relativedelta(today, self.birth)
        return delta.years
