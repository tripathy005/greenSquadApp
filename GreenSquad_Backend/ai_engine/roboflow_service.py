import os

import cv2
import numpy as np
import requests

from dotenv import load_dotenv
from inference_sdk import InferenceHTTPClient


# ============================================================
# Load environment variables
# ============================================================

load_dotenv()


# ============================================================
# Roboflow client
# ============================================================

client = InferenceHTTPClient(
    api_url=os.getenv("ROBOFLOW_API_URL"),
    api_key=os.getenv("ROBOFLOW_API_KEY"),
)

WORKSPACE_NAME = os.getenv("ROBOFLOW_WORKSPACE")
WORKFLOW_ID = os.getenv("ROBOFLOW_WORKFLOW")


# ============================================================
# Run Roboflow classification
# ============================================================

def run_roboflow(image_url):

    result = client.run_workflow(
        workspace_name=WORKSPACE_NAME,
        workflow_id=WORKFLOW_ID,
        images={
            "image": image_url
        },
        use_cache=True,
    )

    print("\n========== ROBOFLOW RAW RESULT ==========")
    print(result)
    print("=========================================\n")

    return result


# ============================================================
# Calculate visible waste coverage using OpenCV
# ============================================================

def calculate_waste_volume(image_source):
    """
    Calculates apparent waste coverage from the image.

    Returns:
        small
        medium
        large
        None
    """

    # --------------------------------------------------------
    # Read image
    # --------------------------------------------------------

    image = None

    # Case 1: Local image path
    if os.path.isfile(str(image_source)):

        image = cv2.imread(
            str(image_source)
        )

    # Case 2: URL
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

    # --------------------------------------------------------
    # Check image
    # --------------------------------------------------------

    if image is None:

        print(
            "Could not read image for volume analysis."
        )

        return None

    # --------------------------------------------------------
    # Resize
    # --------------------------------------------------------

    image = cv2.resize(
        image,
        (800, 600)
    )

    # --------------------------------------------------------
    # Convert BGR → HSV
    # --------------------------------------------------------

    hsv = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2HSV
    )

    # --------------------------------------------------------
    # Extract saturation
    # --------------------------------------------------------

    saturation = hsv[:, :, 1]

    # --------------------------------------------------------
    # Threshold
    # --------------------------------------------------------

    _, mask = cv2.threshold(
        saturation,
        40,
        255,
        cv2.THRESH_BINARY
    )

    # --------------------------------------------------------
    # Remove small noise
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Calculate coverage
    # --------------------------------------------------------

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

    coverage_percent = (
        coverage_ratio * 100
    )

    print(
        "Waste coverage:",
        round(coverage_percent, 2),
        "%"
    )

    # --------------------------------------------------------
    # Convert coverage to volume category
    # --------------------------------------------------------

    if coverage_ratio <= 0.33:

        waste_volume = "small"

    elif coverage_ratio <= 0.66:

        waste_volume = "medium"

    else:

        waste_volume = "large"

    print(
        "Waste volume:",
        waste_volume
    )

    return waste_volume


# ============================================================
# Extract Roboflow prediction
# ============================================================

def extract_prediction(result):

    prediction_data = result[0]["predictions"]

    predictions = prediction_data["predictions"]

    # --------------------------------------------------------
    # Get highest-confidence prediction
    # --------------------------------------------------------

    top_prediction = max(
        predictions,
        key=lambda x: x["confidence"]
    )

    # --------------------------------------------------------
    # Waste type
    # --------------------------------------------------------

    waste_type = top_prediction["class"]

    # --------------------------------------------------------
    # Score out of 10
    # --------------------------------------------------------

    confidence = top_prediction["confidence"]

    score = round(
        confidence * 10,
        1
    )

    return {
        "waste_type": waste_type,
        "score": score,
    }


# ============================================================
# Main AI analysis
# ============================================================

def analyze_waste(image_source):

    # --------------------------------------------------------
    # Step 1: Roboflow classification
    # --------------------------------------------------------

    result = run_roboflow(
        image_source
    )

    prediction = extract_prediction(
        result
    )

    # --------------------------------------------------------
    # Step 2: OpenCV volume estimation
    # --------------------------------------------------------

    waste_volume = calculate_waste_volume(
        image_source
    )

    # --------------------------------------------------------
    # Step 3: Final GreenSquad result
    # --------------------------------------------------------

    final_result = {
        "waste_type": prediction["waste_type"],
        "score": prediction["score"],
        "waste_volume": waste_volume,
    }

    print("\n========== GREEN SQUAD RESULT ==========")
    print(final_result)
    print("=========================================\n")

    return final_result