# Generated by Django 3.0.4 on 2020-05-15 15:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mlw_survey', '0003_auto_20200512_1657'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserSurvey',
            new_name='SurveyUser',
        ),
        migrations.CreateModel(
            name='SurveyComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1024)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mlw_survey.Survey')),
            ],
        ),
    ]