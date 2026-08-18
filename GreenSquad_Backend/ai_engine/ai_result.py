import json
import cv2
from inference_sdk import InferenceHTTPClient


client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key="LPCX7PgD5Ix36yZvvlBt"
)


result = client.run_workflow(
    workspace_name="adityaexists2002-gmail-com",
    workflow_id="greensquad-waste-vgreensquad-waste-1-resnet18-t1-logic",
    images={
        "image": "test2.png.png"
    },
    use_cache=True
)


# Get Roboflow prediction
prediction_data = result[0]["predictions"]

# Get highest-confidence prediction
top_prediction = max(
    prediction_data["predictions"],
    key=lambda x: x["confidence"]
)

waste_type = top_prediction["class"]
confidence = top_prediction["confidence"]

confidence_percent = round(confidence * 100, 2)

print("Waste type:", waste_type)
print("Confidence:", confidence_percent, "%")

# Read image
img = cv2.imread("test.png")

if img is None:
    raise FileNotFoundError("test.png not found")


# Convert image to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


# Create waste mask
_, mask = cv2.threshold(
    gray,
    200,
    255,
    cv2.THRESH_BINARY_INV
)


# Count waste pixels
waste_pixels = cv2.countNonZero(mask)

# Count total pixels
total_pixels = mask.shape[0] * mask.shape[1]


# Calculate waste coverage percentage
volume_percent = (waste_pixels / total_pixels) * 100

volume_percent = round(volume_percent, 2)


print("Volume:", volume_percent, "%")

# Calculate score out of 10
score = round(
    (confidence * 5) +
    ((volume_percent / 100) * 5)
)

print("Score:", score, "/10")

greensquad_result = {
    "waste_type": waste_type,
    "confidence_percent": confidence_percent,
    "volume_percent": round(volume_percent, 2),
    "score": score
}

print(json.dumps(greensquad_result, indent=4))