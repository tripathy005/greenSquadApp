import cv2


def calculate_waste_volume(image_path):

    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Image could not be read.")

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

    waste_pixels = cv2.countNonZero(mask)

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