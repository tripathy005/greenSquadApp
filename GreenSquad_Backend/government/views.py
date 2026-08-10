from rest_framework import generics

from posts.models import Post

from .permissions import IsSuperintendent
from .serializers import GovernmentPostSerializer
from .utils import is_within_radius


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