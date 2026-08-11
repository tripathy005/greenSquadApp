from django.db import models

class Area(models.Model):

    name = models.CharField(max_length=150)

    latitude = models.DecimalField(
        max_digits=11,
        decimal_places=8
    )

    longitude = models.DecimalField(
        max_digits=11,
        decimal_places=8
    )

    radius = models.PositiveIntegerField(
        default=2000
    )

    superintendent = models.ForeignKey(
        "government.SuperintendentProfile",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="areas"
    )

    def __str__(self):
        return self.name
