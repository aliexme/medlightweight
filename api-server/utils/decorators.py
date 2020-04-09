from django.db import transaction
from rest_framework.exceptions import ValidationError


def transaction_atomic(func):
    def wrapper(*args, **kwargs):
        try:
            with transaction.atomic():
                return func(*args, **kwargs)
        except Exception as e:
            raise ValidationError({'exception': e.__class__.__name__, 'details': e.__dict__})

    return wrapper
