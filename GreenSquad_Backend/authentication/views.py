from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated

from .models import User
from .serializers import ProfileSerializer, RegisterSerializer,ProfileUpdateSerializer


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

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

