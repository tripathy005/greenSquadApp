from django.urls import path

from .views import SuperintendentPostListView
from .views import (
    SuperintendentPostListView,
    SuperintendentCleanupView,
)


urlpatterns = [
    path(
        "posts/",
        SuperintendentPostListView.as_view(),
        name="superintendent-posts"
    ),

    path(
    "posts/<int:pk>/cleanup/",
    SuperintendentCleanupView.as_view(),
    name="superintendent-cleanup"
    ),
]