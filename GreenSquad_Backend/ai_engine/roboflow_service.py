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

    top_prediction = max(
        prediction_data["predictions"],
        key=lambda x: x["confidence"]
    )

    waste_type = top_prediction["class"]
    confidence = top_prediction["confidence"]

    confidence_percent = round(confidence * 100, 2)

    return {
        "waste_type": waste_type,
        "confidence_percent": confidence_percent,
    }

def analyze_waste(image_url):
    # Step 1: Send image to Roboflow
    result = run_roboflow(image_url)

    # Step 2: Extract the prediction
    prediction = extract_prediction(result)

    # Step 3: Return final result
    return prediction