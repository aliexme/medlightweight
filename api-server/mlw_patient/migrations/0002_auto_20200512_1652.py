# Generated by Django 3.0.4 on 2020-05-12 16:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mlw_patient', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='patient',
            options={'ordering': ['-created_at']},
        ),
    ]
