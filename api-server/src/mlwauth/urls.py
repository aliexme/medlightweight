from django.urls import path

from .views import AuthToken

urlpatterns = [
    path('signin', AuthToken.as_view()),
]
