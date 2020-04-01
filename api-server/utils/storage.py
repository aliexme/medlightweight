import os

from django.conf import settings


def get_absolute_path_regarding_media(path: str) -> str:
    if path.startswith(settings.MEDIA_URL):
        path_regarding_media = path[len(settings.MEDIA_URL):]
        return os.path.join(settings.MEDIA_ROOT, path_regarding_media)

    return path
