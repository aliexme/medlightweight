import shutil

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework import serializers

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
        survey_name = validated_data.get('name').replace(' ', '_')

        validated_data['directory'] = 'id_{0}_{1}/{2}'.format(owner.pk, owner.username, survey_name)
        survey = Survey.objects.create(**validated_data)

        survey_directory_absolute_path = get_absolute_path_regarding_media(survey.directory)

        try:
            shutil.rmtree(survey_directory_absolute_path)
        except FileNotFoundError:
            pass

        for file in files:
            path_to_save = survey_directory_absolute_path + '/' + file.name
            default_storage.save(path_to_save, ContentFile(file.read()))

        return survey

    def to_representation(self, instance):
        data = super().to_representation(instance)

        directory = data['directory']
        data['directory'] = self.context['request'].build_absolute_uri(directory)

        return data
