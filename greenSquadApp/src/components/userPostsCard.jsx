import React, { useState } from "react";

import profileimg from "../assets/dp/image.png";
import LikeIcon from "../assets/icon/like.png";
import DislikeIcon from "../assets/icon/dislike.png";
import DiamondIcon from "../assets/icon/Diamond.png";

import toast from "react-hot-toast";

import { MdDeleteOutline } from "react-icons/md";


export default function UserPostsCard({ post, onDelete }) {

  // Like
  const [isLiked, setIsLiked] = useState(false);

  // Current image
  const [currentImage, setCurrentImage] = useState(0);

  const images = post.media?.map((item) => item.image) || [profileimg];

  const profilePhoto = post.user?.profile_photo
    ? post.user.profile_photo
    : profileimg

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleDeleteClick = () => {

    toast.custom((t) => (

      <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">

        <p className="font-semibold">
          Delete this post?
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Are you sure you want to delete this post?
        </p>

        <div className="flex justify-end gap-3 mt-4">

          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-lg bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id)
              handleDelete()
            }}
            className="px-3 py-1 rounded-lg bg-red-500 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    ))

  }

  const handleDelete = async () => {

    const token = localStorage.getItem('access_token')

    try {

      const response = await fetch(
        `/api/posts/${post.id}/delete/`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )


      if (!response.ok) {

        const data = await response.json()

        toast.error(
          data.detail || 'Failed to delete post.'
        )

        return
      }


      toast.success('Post deleted successfully!')

      onDelete(post.id)

    } catch (error) {

      console.error('Delete error:', error)

      toast.error('Unable to delete the post.')

    }

  }

  return (
    <div
      className="w-full relative h-auto flex flex-col lg:flex-row gap-4 bg-white rounded-[15px] md:rounded-[30px] shadow-md p-2 md:p-4 mt-2 md:mt-4"
    >

      {/* delete btn */}
      <button
        onClick={handleDeleteClick}
        className="p-1 absolute top-5 md:top-7 right-5 md:right-7 bg-[#538e3c] border-2 border-[#E2F6E8] shadow-md rounded-full z-10 ">
        <MdDeleteOutline className="h-5 w-5 text-white md:h-6 md:w-6" />
      </button>


      {/* ================= IMAGE SLIDER ================= */}

      <div
        className="relative w-full lg:w-123 aspect-4/3 overflow-hidden rounded-[15px] md:rounded-[30px] bg-black"
      >
        {/* Images */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out "
          style={{
            transform: `translateX(-${currentImage * 100}%)`,
          }}
        >

          {images.map((image, index) => (
            <div
              key={index}
              className="h-full w-full min-w-full shrink-0"
            >
              <img
                src={image}
                alt={`Post ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Previous */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-xl font-bold text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            ‹
          </button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-xl font-bold text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            ›
          </button>
        )}

        {/* Dots */}
        <div
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        >
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${currentImage === index ? "w-5 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      </div>


      {/* ================= POST DETAILS ================= */}

      <div className="flex flex-1 flex-col justify-between md:my-3">

        {/* User */}

        <div className="flex items-center justify-between">

          <div className="ml-2 flex items-center">

            <div
              style={{ backgroundImage: `url(${profilePhoto})`, }}
              className="h-12 w-12 rounded-full bg-cover md:h-18 md:w-18"
            />

            <div
              className="ml-1 mb-1 flex flex-col items-start justify-center md:ml-3"
            >

              <p className="text-[13px] font-bold md:text-[18px]">
                {post.user?.full_name}
              </p>

              <p className="text-[9px] text-[#249138] md:text-[14px]">
                @{post.user?.username}
              </p>

            </div>

          </div>


          {/* Mobile Like & credit points */}

          <div className="flex items-center lg:hidden">
            <div className="mr-4 flex items-end gap-2 ">

              <p className="text-6 font-bold leading-none md:text-[14px]">
                {post.credit_points}
              </p>

              <img
                src={DiamondIcon}
                alt="credit points"
                className="h-5 w-5 md:h-6 md:w-6"
              />

            </div>

            <div className="mr-4 flex items-end gap-2">

              <p className="text-6 font-bold leading-none md:text-[14px]">
                {post.like_count}
              </p>

              <button
                onClick={handleToggleLike}
                className="h-5 w-5 md:h-6 md:w-6"
              >
                <img
                  src={isLiked ? DislikeIcon : LikeIcon}
                  alt="like toggle"
                />
              </button>

            </div>

          </div>

        </div>



        {/* Description */}

        <div
          className="my-2 w-full rounded-[15px] px-2 py-1 text-[10px] tracking-wide md:p-3 md:text-[12px] md:leading-5 lg:w-70 lg:bg-[#D9D9D944] xl:h-65 md:overflow-auto"
        >

          <p className="line-clamp-1 xl:line-clamp-none">
            {post.description}
          </p>

          {/* <p className="mt-2 text-[#249138]">
            #GreenSquad #SaveEnergy #EcoHabits
          </p> */}

        </div>


        {/* Desktop Like & credit points */}

        <div className="hidden lg:flex lg:items-end lg:gap-2 ">
          <div className="ml-3 items-end gap-2 flex ">

            <button
              onClick={handleToggleLike}
              className="h-6 w-5"
            >
              <img
                src={isLiked ? DislikeIcon : LikeIcon}
                alt="like toggle"
              />
            </button>

            <p className="font-bold text-[14px] ">
              {post.like_count}
            </p>

          </div>
          <div className="ml-3  items-end gap-2 flex ">

            <img src={DiamondIcon} alt="credit points" className=" h-5 w-5 " />

            <p className="font-bold text-[14px] ">
              {post.credit_points}
            </p>

          </div>
        </div>


      </div>

    </div>
  );
}