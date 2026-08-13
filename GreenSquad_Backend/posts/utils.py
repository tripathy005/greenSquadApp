from math import radians, sin, cos, sqrt, atan2
from areas.models import Area


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two GPS coordinates in meters.
    """

    EARTH_RADIUS = 6371000  # meters

    lat1 = radians(float(lat1))
    lon1 = radians(float(lon1))
    lat2 = radians(float(lat2))
    lon2 = radians(float(lon2))

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        sin(dlat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return EARTH_RADIUS * c



def find_matching_area(latitude, longitude):

    areas = Area.objects.all()

    for area in areas:

        distance = calculate_distance(
            latitude,
            longitude,
            area.latitude,
            area.longitude
        )

        if distance <= float(area.radius):
            return area

    return None