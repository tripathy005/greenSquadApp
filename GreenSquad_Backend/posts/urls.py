from django.urls import path

from .views import (
    PostCreateView,
    PostListView,
    PostDetailView,
    MyPostsView,
    SelfResolvePostView,
    PostDeleteView,
)


urlpatterns = [

    path(
        "",
        PostListView.as_view(),
        name="post-list"
    ),

    path(
        "create/",
        PostCreateView.as_view(),
        name="post-create"
    ),

    path(
        "my/",
        MyPostsView.as_view(),
        name="my-posts"
    ),

    path(
        "<int:pk>/",
        PostDetailView.as_view(),
        name="post-detail"
    ),

    path(
    "<int:pk>/resolve/",
    SelfResolvePostView.as_view(),
    name="self-resolve"
    ),

    path(
    "<int:pk>/delete/",
    PostDeleteView.as_view(),
    name="post-delete"
    ),
]