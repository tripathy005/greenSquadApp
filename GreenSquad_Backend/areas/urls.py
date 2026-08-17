from django.urls import path

from .views import (
    AreaDetailView,
    AreaCreateView,
    AreaListView
)


urlpatterns = [

    path(
        "",
        AreaListView.as_view(),
        name="area-list"
    ),

    path(
        "create/",
        AreaCreateView.as_view(),
        name="area-create"
    ),

    path(
        "<int:pk>/",
        AreaDetailView.as_view(),
        name="area-detail"
    ),
    
]