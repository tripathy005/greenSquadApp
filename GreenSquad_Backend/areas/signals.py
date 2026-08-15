from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Area
from .utils import assign_unassigned_posts_to_area


@receiver(post_save, sender=Area)
def update_unassigned_posts(sender, instance, created, **kwargs):

    assign_unassigned_posts_to_area(instance)