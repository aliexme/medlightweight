from django.urls import path

from .views import AuthToken

urlpatterns = [
    path('login', AuthToken.as_view()),
]
