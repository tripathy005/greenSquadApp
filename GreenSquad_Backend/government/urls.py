from django.urls import path

from .views import SuperintendentPostListView


urlpatterns = [
    path(
        "posts/",
        SuperintendentPostListView.as_view(),
        name="superintendent-posts"
    ),
]