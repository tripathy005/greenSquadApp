from math import radians, sin, cos, sqrt, atan2

from posts.models import Post


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two GPS coordinates in meters.
    """

    EARTH_RADIUS = 6371000

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

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a)
    )

    return EARTH_RADIUS * c


def find_matching_area(latitude, longitude):

    from .models import Area

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


def assign_unassigned_posts_to_area(area):

    posts = Post.objects.filter(
        area__isnull=True
    )

    matched_count = 0

    for post in posts:

        distance = calculate_distance(
            post.latitude,
            post.longitude,
            area.latitude,
            area.longitude
        )

        if distance <= float(area.radius):

            post.area = area

            post.save(
                update_fields=["area"]
            )

            matched_count += 1

    return matched_count