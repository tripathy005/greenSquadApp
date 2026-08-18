from django.urls import path
from .views import WasteAnalysisView


urlpatterns = [
    path(
        "analyze/",
        WasteAnalysisView.as_view(),
        name="waste-analysis",
    ),
]