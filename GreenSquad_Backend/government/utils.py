from math import radians, sin, cos, sqrt, atan2


def distance_in_meters(lat1, lon1, lat2, lon2):
    """
    Calculate the distance between two GPS coordinates
    using the Haversine formula.
    """

    earth_radius = 6371000  # meters

    lat1 = radians(float(lat1))
    lon1 = radians(float(lon1))
    lat2 = radians(float(lat2))
    lon2 = radians(float(lon2))

    delta_lat = lat2 - lat1
    delta_lon = lon2 - lon1

    a = (
        sin(delta_lat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(delta_lon / 2) ** 2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a)
    )

    return earth_radius * c


def is_within_radius(
    post_lat,
    post_lon,
    area_lat,
    area_lon,
    radius=100
):
    """
    Check whether a post is within the given
    radius of an area.
    """

    distance = distance_in_meters(
        post_lat,
        post_lon,
        area_lat,
        area_lon
    )

    return distance <= radius