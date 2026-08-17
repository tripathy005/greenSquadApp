from django.urls import path

from .views import AreaListView, SuperintendentDeactivateView, SuperintendentPostListView
from .views import (
    SuperintendentPostListView,
    SuperintendentCleanupView,
    SuperintendentListCreateView,
    SuperintendentDetailView,
    SuperintendentAreaUpdateView,
    SuperintendentCreateView,
    SuperintendentUpdateView,
    SuperintendentPostListView,
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

    path(
    "superintendents/create/",
    SuperintendentCreateView.as_view(),
    name="superintendent-create"
    ),

    path(
    "superintendents/<int:id>/update/",
    SuperintendentUpdateView.as_view(),
    name="superintendent-update"
    ),

    path(
    "superintendents/<int:id>/status/",
    SuperintendentDeactivateView.as_view(),
    name="superintendent-status"
    ),

    path(
    "superintendent/posts/",
    SuperintendentPostListView.as_view(),
    name="superintendent-posts"
    ),

    path(
    "areas/",
    AreaListView.as_view(),
    name="area-list"
),

]