# from requests import post
# from rest_framework import serializers
# from areas.utils import find_matching_area
# from government.utils import find_duplicate_post
# from .models import Post, PostMedia, DuplicatePost
# from ai_engine.roboflow_service import analyze_waste
# from areas.models import Area
# from django.contrib.auth import get_user_model
# User = get_user_model()


# class PostMediaSerializer(serializers.ModelSerializer):

#     thumbnail = serializers.SerializerMethodField()

#     class Meta:
#         model = PostMedia
#         fields = [
#             "id",
#             "image",
#             "thumbnail",
#             "media_type",
#             "uploaded_at",
#         ]

#     def get_thumbnail(self, obj):

#         if not obj.image:
#             return None

#         url = obj.image.url

#         if "res.cloudinary.com" not in url:
#             return url

#         return url.replace(
#             "/upload/",
#             "/upload/w_400,h_400,c_fill,q_auto,f_auto/"
#         )

# class AreaSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Area
#         fields = [
#             "id",
#             "name",
#         ]

# class PostUserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = [
#             "id",
#             "username",
#             "full_name",
#             "profile_photo",
#         ]


# class PostSerializer(serializers.ModelSerializer):

#     user = PostUserSerializer(
#     read_only=True
#     )

#     like_count = serializers.IntegerField(
#     source="likes.count",
#     read_only=True
#     )
#     is_liked = serializers.SerializerMethodField()

#     image = serializers.ImageField(write_only=True)

#     action = serializers.ChoiceField(
#     choices=Post.ACTION_CHOICES,
#     required=True
#     )

#     media = PostMediaSerializer(many=True,read_only=True)

#     area = AreaSerializer(
#     read_only=True
#     )

#     area_name = serializers.CharField(
#     write_only=True,
#     required=False
#     )

#     class Meta:
#         model = Post
#         fields = [
#             "id",
#             "user",
#             "description",
#             "location",
#             "latitude",
#             "longitude",
#             "area",
#             "area_name",
#             "action",
#             "image",
#             "media",
#             "is_liked",
#             "posted_at",
#             "ai_verified",
#             "waste_type",
#             "ai_confidence",
#             "waste_volume",
#             "is_duplicate",
#             "is_resolved",
#             "credit_points",
#             "like_count",
#         ]

#         read_only_fields = [
#             "id",
#             "posted_at",
#             "ai_verified",
#             "waste_type",
#             "ai_confidence",
#             "waste_volume",
#             "is_duplicate",
#             "is_resolved",
#             "credit_points",
#         ]
#     def get_is_liked(self, obj):
#             request = self.context.get("request")
    
#             if not request or not request.user.is_authenticated:
#                 return False
    
#             return obj.likes.filter(user=request.user).exists()
    
# def create(self, validated_data):

#     image = validated_data.pop("image")

#     validated_data.pop(
#         "area_name",
#         None
#     )

#     user = self.context["request"].user

#     latitude = validated_data.get("latitude")
#     longitude = validated_data.get("longitude")

#     area = find_matching_area(
#         latitude,
#         longitude
#     )

#     # Create post
#     post = Post.objects.create(
#         user=user,
#         area=area,
#         **validated_data
#     )

#     # Save original post image
#     post_media = PostMedia.objects.create(
#         post=post,
#         image=image,
#         media_type="original"
#     )

#     image_url = post_media.image.url

#     print("\n========== CLOUDINARY URL ==========")
#     print(image_url)
#     print("====================================\n")

#     # Analyze image using Roboflow
#     try:
#         ai_result = analyze_waste(image_url)

#         post.waste_volume = ai_result.get("waste_volume")
#         post.waste_type = ai_result["waste_type"]
#         post.ai_confidence = ai_result["confidence_percent"]

#         post.credit_points = round(
#             ai_result["confidence_percent"] / 10,
#             1
#         )

#         post.ai_verified = True

#         post.save(
#             update_fields=[
#                 "waste_volume",
#                 "waste_type",
#                 "ai_confidence",
#                 "credit_points",
#                 "ai_verified",
#             ]
#         )

#     except Exception as e:
#         print(f"Roboflow AI analysis failed: {e}")

#     # Check duplicate after Post is created
#     duplicate_post = find_duplicate_post(
#         post,
#         area
#     )

#     if duplicate_post:
#         post.is_duplicate = True

#         post.save(
#             update_fields=["is_duplicate"]
#         )

#         DuplicatePost.objects.create(
#             post=post,
#             duplicate_of=duplicate_post
#         )

#     return post      
#     post.waste_volume = ai_result.get("waste_volume")
#     post.waste_type = ai_result["waste_type"]
#     post.ai_confidence = ai_result["confidence_percent"]

#     post.credit_points = round(
#         ai_result["confidence_percent"] / 10,
#         1
#     )

#     post.ai_verified = True

#     post.save(
#         update_fields=[
#             "waste_volume",
#             "waste_type",
#             "ai_confidence",
#             "credit_points",
#             "ai_verified",
#         ]
#     )
#     except Exception as e:
#         print(f"Roboflow AI analysis failed: {e}")

# post.save(
#         update_fields=[
#             "waste_type",
#             "ai_confidence",
#             "ai_verified",
#         ]
#     )

#         # Check duplicate after Post is created
# duplicate_post = find_duplicate_post(
#             post,
#             area
#         )

# if duplicate_post:
#         post.is_duplicate = True
      
#         post.save(update_fields=["is_duplicate"])
      
#         DuplicatePost.objects.create(
#                       post=post,
#                       duplicate_of=duplicate_post
#                   )
          
#         return post
    

# class SuperintendentPostSerializer(serializers.ModelSerializer):

#     user = PostUserSerializer(
#     read_only=True
#     )

#     like_count = serializers.IntegerField(
#         source="likes.count",
#         read_only=True
#     )

#     media = PostMediaSerializer(
#         many=True,
#         read_only=True
#     )

#     area = AreaSerializer(
#         read_only=True
#     )

#     class Meta:
#         model = Post
#         fields = [
#             "id",
#             "user",
#             "description",
#             "location",
#             "latitude",
#             "longitude",
#             "area",
#             "action",
#             "media",
#             "posted_at",
#             "is_resolved",
#             "credit_points",
#             "waste_type",
#             "ai_confidence",
#             "waste_volume",
#             "like_count",
#         ]
    
# class CleanupImageSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = PostMedia
#         fields = ["image"]

#     def create(self, validated_data):

#         post = self.context["post"]

#         return PostMedia.objects.create(
#             post=post,
#             image=validated_data["image"],
#             media_type="cleanup"
#         )





from rest_framework import serializers
from areas.utils import find_matching_area
from government.utils import find_duplicate_post
from .models import Post, PostMedia, DuplicatePost
from ai_engine.roboflow_service import analyze_waste
from areas.models import Area
from django.contrib.auth import get_user_model

User = get_user_model()


class PostMediaSerializer(serializers.ModelSerializer):

    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = PostMedia
        fields = [
            "id",
            "image",
            "thumbnail",
            "media_type",
            "uploaded_at",
        ]

    def get_thumbnail(self, obj):

        if not obj.image:
            return None

        url = obj.image.url

        if "res.cloudinary.com" not in url:
            return url

        return url.replace(
            "/upload/",
            "/upload/w_400,h_400,c_fill,q_auto,f_auto/"
        )


class AreaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Area
        fields = [
            "id",
            "name",
        ]


class PostUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "full_name",
            "profile_photo",
        ]


class PostSerializer(serializers.ModelSerializer):

    user = PostUserSerializer(
        read_only=True
    )

    like_count = serializers.IntegerField(
        source="likes.count",
        read_only=True
    )

    is_liked = serializers.SerializerMethodField()

    image = serializers.ImageField(
        write_only=True
    )

    action = serializers.ChoiceField(
        choices=Post.ACTION_CHOICES,
        required=True
    )

    media = PostMediaSerializer(
        many=True,
        read_only=True
    )

    area = AreaSerializer(
        read_only=True
    )

    area_name = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:
        model = Post

        fields = [
            "id",
            "user",
            "description",
            "location",
            "latitude",
            "longitude",
            "area",
            "area_name",
            "action",
            "image",
            "media",
            "is_liked",
            "posted_at",
            "ai_verified",
            "waste_type",
            "ai_confidence",
            "waste_volume",
            "is_duplicate",
            "is_resolved",
            "credit_points",
            "like_count",
        ]

        read_only_fields = [
            "id",
            "posted_at",
            "ai_verified",
            "waste_type",
            "ai_confidence",
            "waste_volume",
            "is_duplicate",
            "is_resolved",
            "credit_points",
        ]

    def get_is_liked(self, obj):

        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False

        return obj.likes.filter(
            user=request.user
        ).exists()

    def create(self, validated_data):

        # --------------------------------
        # 1. Get uploaded image
        # --------------------------------

        image = validated_data.pop("image")

        validated_data.pop(
            "area_name",
            None
        )

        # --------------------------------
        # 2. Get logged-in user
        # --------------------------------

        user = self.context["request"].user

        # --------------------------------
        # 3. Find area from coordinates
        # --------------------------------

        latitude = validated_data.get("latitude")
        longitude = validated_data.get("longitude")

        area = find_matching_area(
            latitude,
            longitude
        )

        # --------------------------------
        # 4. Create Post
        # --------------------------------

        post = Post.objects.create(
            user=user,
            area=area,
            **validated_data
        )

        # --------------------------------
        # 5. Save original image
        # --------------------------------

        post_media = PostMedia.objects.create(
            post=post,
            image=image,
            media_type="original"
        )

        image_url = post_media.image.url

        print(
            "\n========== CLOUDINARY URL =========="
        )
        print(image_url)
        print(
            "====================================\n"
        )

        # --------------------------------
        # 6. AI / Roboflow Analysis
        # --------------------------------

        try:

            ai_result = analyze_waste(
                image_url
            )

            print(
                "\n========== AI RESULT =========="
            )
            print(ai_result)
            print(
                "================================\n"
            )

            # Waste volume
            post.waste_volume = ai_result.get(
                "waste_volume"
            )

            # Waste type
            post.waste_type = ai_result.get(
                "waste_type"
            )

            # AI confidence
            post.ai_confidence = ai_result.get(
                "confidence_percent"
            )

            # Credit points
            if post.ai_confidence is not None:

                post.credit_points = round(
                    post.ai_confidence / 10,
                    1
                )

            # AI verification
            post.ai_verified = True

            # --------------------------------
            # 7. Save AI data
            # --------------------------------

            post.save(
                update_fields=[
                    "waste_volume",
                    "waste_type",
                    "ai_confidence",
                    "credit_points",
                    "ai_verified",
                ]
            )

        except Exception as e:

            print(
                f"Roboflow AI analysis failed: {e}"
            )

        # --------------------------------
        # 8. Check duplicate post
        # --------------------------------

        duplicate_post = find_duplicate_post(
            post,
            area
        )

        if duplicate_post:

            post.is_duplicate = True

            post.save(
                update_fields=[
                    "is_duplicate"
                ]
            )

            DuplicatePost.objects.create(
                post=post,
                duplicate_of=duplicate_post
            )

        # --------------------------------
        # 9. Return post
        # --------------------------------

        return post


class SuperintendentPostSerializer(
    serializers.ModelSerializer
):

    user = PostUserSerializer(
        read_only=True
    )

    like_count = serializers.IntegerField(
        source="likes.count",
        read_only=True
    )

    media = PostMediaSerializer(
        many=True,
        read_only=True
    )

    area = AreaSerializer(
        read_only=True
    )

    class Meta:
        model = Post

        fields = [
            "id",
            "user",
            "description",
            "location",
            "latitude",
            "longitude",
            "area",
            "action",
            "media",
            "posted_at",
            "is_resolved",
            "credit_points",
            "waste_type",
            "ai_confidence",
            "waste_volume",
            "like_count",
        ]


class CleanupImageSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = PostMedia

        fields = [
            "image"
        ]

    def create(
        self,
        validated_data
    ):

        post = self.context["post"]

        return PostMedia.objects.create(
            post=post,
            image=validated_data["image"],
            media_type="cleanup"
        )