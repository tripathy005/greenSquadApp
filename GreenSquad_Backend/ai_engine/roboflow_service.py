import os

import cv2
import numpy as np
import requests

from dotenv import load_dotenv
from inference_sdk import InferenceHTTPClient


load_dotenv()


client = InferenceHTTPClient(
    api_url=os.getenv("ROBOFLOW_API_URL"),
    api_key=os.getenv("ROBOFLOW_API_KEY"),
)

WORKSPACE_NAME = os.getenv("ROBOFLOW_WORKSPACE")
WORKFLOW_ID = os.getenv("ROBOFLOW_WORKFLOW")


def run_roboflow(image_url):

    result = client.run_workflow(
        workspace_name=WORKSPACE_NAME,
        workflow_id=WORKFLOW_ID,
        images={
            "image": image_url
        },
        use_cache=True,
    )

    return result


def calculate_waste_volume(image_source):

    image = None

    if os.path.isfile(str(image_source)):

        image = cv2.imread(
            str(image_source)
        )

    else:

        try:

            response = requests.get(
                image_source,
                timeout=20
            )

            response.raise_for_status()

            image_array = np.frombuffer(
                response.content,
                dtype=np.uint8
            )

            image = cv2.imdecode(
                image_array,
                cv2.IMREAD_COLOR
            )

        except Exception as e:

            print(
                f"Could not download image for volume analysis: {e}"
            )

            return None

    if image is None:

        print(
            "Could not read image for volume analysis."
        )

        return None

    image = cv2.resize(
        image,
        (800, 600)
    )

    hsv = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2HSV
    )

    saturation = hsv[:, :, 1]

    _, mask = cv2.threshold(
        saturation,
        40,
        255,
        cv2.THRESH_BINARY
    )

    kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE,
        (5, 5)
    )

    mask = cv2.morphologyEx(
        mask,
        cv2.MORPH_OPEN,
        kernel
    )

    mask = cv2.morphologyEx(
        mask,
        cv2.MORPH_CLOSE,
        kernel
    )

    waste_pixels = cv2.countNonZero(
        mask
    )

    total_pixels = (
        mask.shape[0] *
        mask.shape[1]
    )

    coverage_ratio = (
        waste_pixels /
        total_pixels
    )

    if coverage_ratio <= 0.33:

        waste_volume = "small"

    elif coverage_ratio <= 0.66:

        waste_volume = "medium"

    else:

        waste_volume = "large"

    return waste_volume


def extract_prediction(result):

    prediction_data = result[0]["predictions"]

    predictions = prediction_data["predictions"]

    top_prediction = max(
        predictions,
        key=lambda x: x["confidence"]
    )

    waste_type = top_prediction["class"]

    confidence = top_prediction["confidence"]

    score = round(
        confidence * 10,
        1
    )

    return {
        "waste_type": waste_type,
        "score": score,
    }


def analyze_waste(image_source):

    result = run_roboflow(
        image_source
    )

    prediction = extract_prediction(
        result
    )

    waste_volume = calculate_waste_volume(
        image_source
    )

    return {
        "waste_type": prediction["waste_type"],
        "score": prediction["score"],
        "waste_volume": waste_volume,
    }