// import React, { useState } from 'react'
// import post from '../assets/post/post3.png'

// import dp from '../assets/dp/Kunal Verma.png'
// import likeIcon from '../assets/icon/like.png'
// import dislikeIcon from '../assets/icon/dislike.png'

// export default function Posts() {

//   //for like icon
//   const [isLiked, setIsLiked] = useState(false);

//   const handleToggleLike = () => {
//     setIsLiked(!isLiked);
//   };

//   return (
//     <>
//         <div className='w-full h-auto flex flex-col lg:flex-row gap-4 bg-white rounded-[15px] md:rounded-[30px] shadow-md p-2 md:p-4 mt-2 md:mt-4'>
//           <div style={{ backgroundImage: `url(${post})` }} className='h-70 md:h-106.75 w-full lg:w-123 rounded-[15px] md:rounded-[30px] bg-cover min-h-55'>
//           </div>

//           <div className='flex flex-1 flex-col justify-between md:my-3'>
//             <div className='flex items-center justify-between'>
//               <div className='flex items-center  ml-2'>
//                 <div style={{ backgroundImage: `url(${dp})` }} className='h-12 w-12 md:h-18 md:w-18  bg-cover rounded-full'></div>
//                 <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
//                   <p className='font-bold text-[13px] md:text-[18px]'>Kunal Verma</p>
//                   <p className='text-[#249138] text-[9px] md:text-[14px]'>{"Energy Champs"}</p>
//                 </div>
//               </div>
//               <div className='mr-4 flex  gap-2 items-end xl:hidden '>
//                 <p className='font-bold text-6 md:text-lg leading-none'>400K</p>
//                 <button onClick={handleToggleLike} className='h-6 w-6 md:h-7 md:w-7'>
//                   <img src={isLiked ? dislikeIcon : likeIcon} alt="like toggle" />
//                 </button>
//               </div>
//             </div>

//             <div className='my-2 w-full lg:w-70 xl:h-65 py-1 px-2 md:p-3 text-[10px] md:text-[12px] md:leading-5 tracking-wide lg:bg-[#D9D9D944] rounded-[15px] md:overflow-auto'>
//               <p className=' line-clamp-1 xl:line-clamp-none'>Here’s another post, with a different purpose (energy saving), keeping it clean and social-app ready: Turned off unused lights and unplugged devices today 💡Saving energy is an easy habit that really adds up. Small steps, big impact for the planet 🌍</p>
//               <p className='text-[#249138] md:mt-2'>#GreenSquad #SaveEnergy #EcoHabits</p>
//             </div>

//             <div className='ml-3 xl:flex items-end gap-2 hidden'>
//               <button onClick={handleToggleLike} className='h-7 w-7'>
//                 <img src={isLiked ? dislikeIcon : likeIcon} alt="like toggle" />
//               </button>
//               <p className='font-bold'>400K</p>
//             </div>
//           </div>
//         </div>
//     </>
//   )
// }


import React, { useState } from "react";

import post1 from "../assets/post/post3.png";
import post2 from "../assets/post/post2.png";

import dp from "../assets/dp/Kunal Verma.png";
import LikeIcon from "../assets/icon/like.png";
import DislikeIcon from "../assets/icon/dislike.png";
import DiamondIcon from "../assets/icon/Diamond.png";

export default function Posts() {

  // Like
  const [isLiked, setIsLiked] = useState(false);

  // Current image
  const [currentImage, setCurrentImage] = useState(0);

  const images = [post1, post2];

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

  return (
    <div
      className="w-full h-auto flex flex-col lg:flex-row gap-4 bg-white rounded-[15px] md:rounded-[30px] shadow-md p-2 md:p-4 mt-2 md:mt-4"
    >

      {/* ================= IMAGE SLIDER ================= */}



      <div
        className="relative w-full lg:w-123 aspect-4/3 overflow-hidden rounded-[15px] md:rounded-[30px] bg-black"
      >
        {/* Images */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
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
              style={{
                backgroundImage: `url(${dp})`,
              }}
              className="h-12 w-12 rounded-full bg-cover md:h-18 md:w-18"
            />

            <div
              className="ml-1 mb-1 flex flex-col items-start justify-center md:ml-3"
            >

              <p className="text-[13px] font-bold md:text-[18px]">
                Kunal Verma
              </p>

              <p className="text-[9px] text-[#249138] md:text-[14px]">
                Energy Champs
              </p>

            </div>

          </div>


          {/* Mobile Like & credit points */}

          <div className="flex items-center lg:hidden">
            <div className="mr-4 flex items-end gap-2 ">

              <p className="text-6 font-bold leading-none md:text-[14px]">
                400K
              </p>

              <img
                src={DiamondIcon}
                alt="credit points"
                className="h-5 w-5 md:h-6 md:w-6"
              />

            </div>

            <div className="mr-4 flex items-end gap-2">

              <p className="text-6 font-bold leading-none md:text-[14px]">
                400K
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
            Here's another post, with a different purpose
            (energy saving), keeping it clean and social-app
            ready: Turned off unused lights and unplugged
            devices today 💡 Saving energy is an easy habit
            that really adds up. Small steps, big impact for
            the planet 🌍
          </p>

          <p className="mt-2 text-[#249138]">
            #GreenSquad #SaveEnergy #EcoHabits
          </p>

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
              400K
            </p>

          </div>
          <div className="ml-3  items-end gap-2 flex ">

            <img src={DiamondIcon} alt="credit points" className=" h-5 w-5 " />

            <p className="font-bold text-[14px] ">
              400K
            </p>

          </div>
        </div>


      </div>

    </div>
  );
}