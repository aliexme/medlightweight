from django.urls import path

from mlw_auth.views import AuthToken

urlpatterns = [
    path('signin', AuthToken.as_view()),
]
