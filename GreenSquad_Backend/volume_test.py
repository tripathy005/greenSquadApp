import cv2


IMAGE_PATH = "test.png"

# 1. Read image
image = cv2.imread(IMAGE_PATH)

if image is None:
    print("Image not found")
    exit()


# 2. Resize for faster processing
image = cv2.resize(image, (800, 600))


# 3. Convert BGR → HSV
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)


# 4. Extract saturation
saturation = hsv[:, :, 1]


# 5. Threshold
_, mask = cv2.threshold(
    saturation,
    40,
    255,
    cv2.THRESH_BINARY
)


# 6. Remove small noise
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


# 7. Calculate coverage
waste_pixels = cv2.countNonZero(mask)

total_pixels = mask.shape[0] * mask.shape[1]

coverage_percent = (
    waste_pixels / total_pixels
) * 100


print("===== WASTE COVERAGE =====")
print("Total pixels:", total_pixels)
print("Detected pixels:", waste_pixels)
print("Coverage:", round(coverage_percent, 2), "%")


# 8. Save mask for inspection
cv2.imwrite("waste_mask_v2.png", mask)

print("Mask saved as waste_mask_v2.png")