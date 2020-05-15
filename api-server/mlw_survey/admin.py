from django.contrib import admin

from mlw_survey.models import SurveyComment


@admin.register(SurveyComment)
class SurveyCommentAdmin(admin.ModelAdmin):
    list_display = ('text', 'survey', 'owner')
