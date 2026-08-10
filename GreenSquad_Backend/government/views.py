from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from posts.models import Post

from .permissions import IsSuperintendent
from .serializers import GovernmentPostSerializer
from .serializers import GovernmentCleanupSerializer
from .utils import (
    is_within_radius,
    post_is_in_superintendent_area,
)


class SuperintendentPostListView(generics.ListAPIView):

    serializer_class = GovernmentPostSerializer
    permission_classes = [IsSuperintendent]

    def get_queryset(self):

        superintendent = self.request.user.superintendent_profile

        areas = superintendent.areas.all()

        posts = Post.objects.filter(
            action="handover",
            is_resolved=False,
            is_duplicate=False,
        ).order_by("-posted_at")

        matching_posts = []

        for post in posts:

            for area in areas:

                if is_within_radius(
                    post.latitude,
                    post.longitude,
                    area.latitude,
                    area.longitude,
                    radius=100
                ):
                    matching_posts.append(post)
                    break

        return matching_posts


class SuperintendentCleanupView(generics.CreateAPIView):

    serializer_class = GovernmentCleanupSerializer
    permission_classes = [
        IsAuthenticated,
        IsSuperintendent
    ]

    def create(self, request, *args, **kwargs):

        post = Post.objects.get(
            pk=self.kwargs["pk"]
        )

        if post.action != "handover":
            return Response(
                {
                    "detail": "This post was not handed over to authority."
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
        if not post_is_in_superintendent_area(
                post,
                request.user.superintendent_profile
                ):
            return Response(
                    {
                        "detail": "This post is outside your assigned area."
                    },status=status.HTTP_403_FORBIDDEN
                )

        serializer = self.get_serializer(
            data=request.data,
            context={
                "post": post
            }
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        post.is_resolved = True

        post.save(
            update_fields=[
                "is_resolved"
            ]
        )

        return Response(
            {
                "message": "Cleanup submitted successfully."
            },
            status=status.HTTP_201_CREATED
        )