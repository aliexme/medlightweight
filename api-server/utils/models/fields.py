import os.path

from django.conf import settings
from django.db import models


class MediaPathField(models.TextField):
    def __init__(self, *args, root='', **kwargs):
        self.root = root
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()

        if self.root:
            kwargs['root'] = self.root

        return name, path, args, kwargs

    def pre_save(self, model_instance, add):
        value = getattr(model_instance, self.attname)
        media_path = os.path.join(settings.MEDIA_URL, self.root, value)
        setattr(model_instance, self.attname, media_path)
        return media_path
