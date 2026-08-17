from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .roboflow_service import analyze_waste


class WasteAnalysisView(APIView):

    def post(self, request):

        image = request.FILES.get("image")

        if not image:
            return Response(
                {"error": "Image is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        result = analyze_waste(image)

        return Response(result)