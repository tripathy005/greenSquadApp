from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from posts.models import Post
from .models import SuperintendentProfile
from areas.models import Area
from .serializers import (
    SuperintendentSerializer,
    SuperintendentAreaSerializer,
)

from authentication.models import User


from .permissions import IsSuperintendent,IsAdminUserRole
from .serializers import GovernmentPostSerializer,GovernmentCleanupSerializer,SuperintendentSerializer
from .utils import post_is_in_superintendent_area


class SuperintendentPostListView(generics.ListAPIView):

    serializer_class = GovernmentPostSerializer
    permission_classes = [IsSuperintendent]

    def get_queryset(self):

        superintendent = self.request.user.superintendent_profile

        areas = superintendent.areas.all()

        return Post.objects.filter(
            area__in=areas,
            action="handover",
            is_resolved=False,
            is_duplicate=False,
        ).order_by("-posted_at")


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

        if post.is_duplicate:
            return Response(
                {
                    "detail": "Duplicate posts cannot be processed."
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

class SuperintendentListCreateView(generics.ListCreateAPIView):

    permission_classes = [IsAdminUserRole]
    serializer_class = SuperintendentSerializer

    def get_queryset(self):
        return User.objects.filter(
            role="superintendent"
        ).order_by("id")

class SuperintendentDetailView(generics.RetrieveUpdateAPIView):

    permission_classes = [IsAdminUserRole]
    serializer_class = SuperintendentSerializer

    def get_queryset(self):
        return User.objects.filter(
            role="superintendent"
        )


class SuperintendentAreaUpdateView(generics.GenericAPIView):

    permission_classes = [IsAdminUserRole]
    serializer_class = SuperintendentAreaSerializer

    def put(self, request, pk):

        superintendent = SuperintendentProfile.objects.filter(
            id=pk
        ).first()

        if not superintendent:
            return Response(
                {"detail": "Superintendent not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        area_ids = serializer.validated_data["area_ids"]

        areas = Area.objects.filter(id__in=area_ids)

        if areas.count() != len(set(area_ids)):
            return Response(
                {"detail": "One or more Areas do not exist."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Assign selected Areas to this Superintendent
        areas.update(superintendent=superintendent)

        return Response(
            {
                "message": "Areas assigned successfully.",
                "area_ids": list(
                    areas.values_list("id", flat=True)
                )
            },
            status=status.HTTP_200_OK
        )