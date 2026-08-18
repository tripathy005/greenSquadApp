import os

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

    print("\n========== ROBOFLOW RAW RESULT ==========")
    print(result)
    print("=========================================\n")
    

    return result

def extract_prediction(result):
    prediction_data = result[0]["predictions"]

    predictions = prediction_data["predictions"]

    top_prediction = max(
        predictions,
        key=lambda x: x["confidence"]
    )

    waste_type = top_prediction["class"]
    confidence = top_prediction["confidence"]

    confidence_percent = round(confidence * 100, 2)

    # Get image dimensions
    image_data = result[0].get("image", {})

    image_width = image_data.get("width")
    image_height = image_data.get("height")

    # Get detected object's bounding-box dimensions
    prediction_width = top_prediction.get("width")
    prediction_height = top_prediction.get("height")

    # Calculate occupied area percentage
    volume_percent = None

    if (
        image_width
        and image_height
        and prediction_width
        and prediction_height
    ):
        volume_percent = (
            prediction_width * prediction_height
            / (image_width * image_height)
        ) * 100

    # Convert percentage to required volume type
    waste_volume = None

    if volume_percent is not None:
        if volume_percent <= 33:
            waste_volume = "small"
        elif volume_percent <= 66:
            waste_volume = "medium"
        else:
            waste_volume = "large"

    return {
        "waste_type": waste_type,
        "confidence_percent": confidence_percent,
        "waste_volume": waste_volume,
    }

def analyze_waste(image_url):
    # Step 1: Send image to Roboflow
    result = run_roboflow(image_url)

    # Step 2: Extract the prediction
    prediction = extract_prediction(result)

    # Step 3: Return final result
    return prediction