from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import PostSerializer,CleanupImageSerializer

from .models import Post
from .serializers import PostSerializer


class PostCreateView(generics.CreateAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class PostListView(generics.ListAPIView):

    queryset = Post.objects.all().order_by("-posted_at")
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class PostDetailView(generics.RetrieveAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class MyPostsView(generics.ListAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(
            user=self.request.user
        ).order_by("-posted_at")


class SelfResolvePostView(generics.CreateAPIView):

    serializer_class = CleanupImageSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        post = Post.objects.get(
            pk=self.kwargs["pk"]
        )

        if post.user != request.user:
            return Response(
                {
                    "detail": "You can only resolve your own post."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        if post.action != "self_resolve":
            return Response(
                {
                    "detail": "This post was handed over to authority."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if post.is_resolved:
            return Response(
                {
                    "detail": "This post is already resolved."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(
            data=request.data,
            context={"post": post}
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Mark post as resolved
        post.is_resolved = True
        post.credit_points = 10

        post.save(
            update_fields=[
                "is_resolved",
                "credit_points"
            ]
        )

        return Response(
            {
                "message": "Post resolved successfully.",
                "credit_points": post.credit_points
            },
            status=status.HTTP_201_CREATED
        )


class HandoverPostView(generics.UpdateAPIView):

    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):

        post = self.get_object()

        if post.user != request.user:
            return Response(
                {"detail": "You can only hand over your own post."},
                status=status.HTTP_403_FORBIDDEN
            )

        if post.action != "handover":
            return Response(
                {"detail": "This post is marked for self-resolution."},
                status=status.HTTP_400_BAD_REQUEST
            )

        
        post.save(update_fields=["is_handed_over"])

        return Response({
            "message": "Post handed over to authority."
        })


class PostDeleteView(generics.DestroyAPIView):

    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):

        post = self.get_object()

        if post.user != request.user:
            return Response(
                {
                    "detail": "You can only delete your own post."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        return super().destroy(request, *args, **kwargs)


class PostUpdateView(generics.UpdateAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):

        post = self.get_object()

        if post.user != request.user:
            return Response(
                {
                    "detail": "You can only edit your own post."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        return super().update(
            request,
            *args,
            **kwargs
        )   
