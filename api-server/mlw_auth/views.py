from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.response import Response

from mlw_auth.models import User
from mlw_auth.serializers import UserSerializer


class AuthToken(ObtainAuthToken):
    pass


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.exclude(pk=self.request.user.pk)

    @action(url_path='current', detail=False)
    def get_current_user(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
