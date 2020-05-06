from django.contrib import admin

from mlw_patient.models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'age', 'owner')
