from django.db import models


class AIAnalysis(models.Model):

    post = models.OneToOneField(
        "posts.Post",
        on_delete=models.CASCADE,
        related_name="ai_analysis"
    )

    is_garbage = models.BooleanField(
        default=False
    )

    confidence_score = models.FloatField(
        null=True,
        blank=True
    )

    analysis_result = models.TextField(
        blank=True
    )

    analyzed_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"AI Analysis - Post {self.post.id}" 