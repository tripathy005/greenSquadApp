import json

from ai_engine.roboflow_service import analyze_waste


IMAGE_PATH = "test.png"


result = analyze_waste(
    IMAGE_PATH
)


print("===== GREEN SQUAD RESULT =====")

print(
    json.dumps(
        result,
        indent=4
    )
)