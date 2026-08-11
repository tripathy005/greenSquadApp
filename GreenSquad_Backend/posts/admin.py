from django.contrib import admin

from .models import Post, PostMedia, DuplicatePost


admin.site.register(Post)
admin.site.register(PostMedia)
admin.site.register(DuplicatePost)

list_display = (
    "id",
    "user",
    "area",
    "action",
    "is_duplicate",
    "is_resolved",
    "posted_at",
)
