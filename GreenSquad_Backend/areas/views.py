from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Area
from .serializers import AreaSerializer
from government.permissions import IsAdminUserRole


class AreaListView(generics.ListAPIView):

    queryset = Area.objects.all().order_by("id")
    serializer_class = AreaSerializer
    permission_classes = [IsAuthenticated]


class AreaCreateView(generics.CreateAPIView):

    serializer_class = AreaSerializer
    permission_classes = [IsAdminUserRole]


class AreaDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [IsAdminUserRole]