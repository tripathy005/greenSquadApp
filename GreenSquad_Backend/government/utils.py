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

def find_area_for_location(latitude, longitude, areas):
    """
    Find the first Area whose radius contains
    the given location.
    """

    for area in areas:

        if is_within_radius(
            latitude,
            longitude,
            area.latitude,
            area.longitude,
            radius=area.radius
        ):
            return area

    return None


def find_duplicate_post(post, area):
    """
    Find an existing post within 100 meters
    of the new post inside the same Area.
    """

    existing_posts = area.posts.filter(
        is_duplicate=False
    ).exclude(
        id=post.id
    )

    for existing_post in existing_posts:

        if is_within_radius(
            post.latitude,
            post.longitude,
            existing_post.latitude,
            existing_post.longitude,
            radius=100
        ):
            return existing_post

    return None


def post_is_in_superintendent_area(post, superintendent):
    """
    Check whether the post belongs to one of the
    superintendent's assigned areas.
    """

    if post.area is None:
        return False

    return superintendent.areas.filter(
        id=post.area.id
    ).exists()