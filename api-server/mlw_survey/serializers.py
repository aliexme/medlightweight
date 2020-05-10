import shutil

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework import serializers

from mlw_patient.serializers import PatientSerializer
from mlw_survey.models import Survey
from utils.decorators import transaction_atomic
from utils.storage import get_absolute_path_regarding_media


class SurveySerializer(serializers.ModelSerializer):
    files = serializers.ListField(child=serializers.FileField(), allow_empty=False, write_only=True)

    class Meta:
        model = Survey
        fields = '__all__'
        read_only_fields = ['directory', 'created_at', 'updated_at']

    @transaction_atomic
    def create(self, validated_data):
        files = validated_data.pop('files')
        owner = validated_data.get('owner')

        survey = Survey.objects.create(**validated_data)
        survey.directory = 'owner_id_{0}/survey_id_{1}'.format(owner.id, survey.id)
        survey.save()

        survey_directory_absolute_path = get_absolute_path_regarding_media(survey.directory)
        self._overwrite_files(files, survey_directory_absolute_path)

        return survey

    @transaction_atomic
    def update(self, instance, validated_data):
        files = validated_data.pop('files', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if files is not None:
            survey_directory_absolute_path = get_absolute_path_regarding_media(instance.directory)
            self._overwrite_files(files, survey_directory_absolute_path)

        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)

        directory = data['directory']
        data['directory'] = self.context['request'].build_absolute_uri(directory)

        if instance.patient is not None:
            data['patient'] = PatientSerializer().to_representation(instance.patient)

        return data

    def _overwrite_files(self, files, directory):
        try:
            shutil.rmtree(directory)
        except FileNotFoundError:
            pass

        for file in files:
            path_to_save = directory + '/' + file.name
            default_storage.save(path_to_save, ContentFile(file.read()))
