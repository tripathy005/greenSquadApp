from django.urls import path

from .views import SuperintendentPostListView
from .views import (
    SuperintendentPostListView,
    SuperintendentCleanupView,
    SuperintendentListCreateView,
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

    path(
    "superintendents/",
    SuperintendentListCreateView.as_view(),
    name="superintendent-list-create"
    ),
]