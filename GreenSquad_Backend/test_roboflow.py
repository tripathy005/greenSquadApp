# 1. Import the library
import json
from inference_sdk import InferenceHTTPClient

# 2. Connect to your workflow
client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key="LPCX7PgD5Ix36yZvvlBt"
)

# 3. Run your workflow on an image
result = client.run_workflow(
    workspace_name="adityaexists2002-gmail-com",
    workflow_id="greensquad-waste-vgreensquad-waste-1-resnet18-t1-logic",
    images={
        "image": "test.png" # Path to your image file
    },
    use_cache=True # Speeds up repeated requests
)
# Get Roboflow prediction data
prediction_data = result[0]["predictions"]

# Get the highest-confidence prediction
top_prediction = max(
    prediction_data["predictions"],
    key=lambda x: x["confidence"]
)

waste_type = top_prediction["class"]
confidence = top_prediction["confidence"]

# Convert confidence to percentage
confidence_percent = round(confidence * 100, 2)

# Structured response for GreenSquad
greensquad_result = {
    "waste_type": waste_type,
    "confidence_percent": confidence_percent,
    "volume_percent": None,
    "score": None
}

print("===== GREEN SQUAD RESULT =====")
print(json.dumps(greensquad_result, indent=4))
