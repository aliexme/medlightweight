from rest_framework.status import HTTP_200_OK
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def resp200(_request):
    return Response(status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resp_auth200(_request):
    return Response(status=HTTP_200_OK)
