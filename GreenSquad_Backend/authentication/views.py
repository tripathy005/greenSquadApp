from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated

from .models import User
from .serializers import (
    ProfileSerializer, 
    RegisterSerializer,
    ProfileUpdateSerializer,
    AdminUserSerializer)
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .permissions import IsAdmin

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer

class ProfileUpdateView(generics.UpdateAPIView):

    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class ProfileView(generics.RetrieveAPIView):

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class AdminUserListView(generics.ListAPIView):

    queryset = User.objects.all().order_by("id")
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdmin]

class AdminUserDeleteView(generics.DestroyAPIView):

    queryset = User.objects.all()
    permission_classes = [IsAdmin]

    lookup_url_kwarg = "id"

    def destroy(self, request, *args, **kwargs):

        user = self.get_object()

        if user.id == request.user.id:
            return Response(
                {
                    "detail": "You cannot delete your own admin account."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.delete()

        return Response(
            {
                "detail": "User account deleted successfully."
            },
            status=status.HTTP_200_OK
        )