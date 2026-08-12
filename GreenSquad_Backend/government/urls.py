from django.urls import path

from .views import SuperintendentPostListView
from .views import (
    SuperintendentPostListView,
    SuperintendentCleanupView,
    SuperintendentListCreateView,
    SuperintendentDetailView,
    SuperintendentAreaUpdateView,
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

    path(
    "superintendents/<int:pk>/",
    SuperintendentDetailView.as_view(),
    name="superintendent-detail"
    ),

    path(
    "superintendents/<int:pk>/areas/",
    SuperintendentAreaUpdateView.as_view(),
    name="superintendent-area-update"
    ),
]