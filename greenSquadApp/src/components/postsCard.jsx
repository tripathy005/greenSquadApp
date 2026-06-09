import React, { useState } from 'react'
import post from '../assets/post/ChatGPT Image Feb 12, 2026, 11_49_43 AM.png'

import dp from '../assets/dp/Kunal Verma.png'
import likeIcon from '../assets/post/like.png'
import dislikeIcon from '../assets/post/dislike.png'

export default function Posts() {

  //for like icon
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
        <div className='w-full h-auto flex flex-col lg:flex-row gap-4 bg-white rounded-[15px] md:rounded-[30px] shadow-md p-2 md:p-4 mt-2 md:mt-4'>
          <div style={{ backgroundImage: `url(${post})` }} className='h-70 md:h-106.75 w-full lg:w-123 rounded-[15px] md:rounded-[30px] bg-cover min-h-55'>
          </div>

          <div className='flex flex-1 flex-col justify-between md:my-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center  ml-2'>
                <div style={{ backgroundImage: `url(${dp})` }} className='h-12 w-12 md:h-18 md:w-18  bg-cover rounded-full'></div>
                <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
                  <p className='font-bold text-[13px] md:text-[18px]'>Kunal Verma</p>
                  <p className='text-[#249138] text-[9px] md:text-[14px]'>{"Energy Champs"}</p>
                </div>
              </div>
              <div className='mr-4 flex  gap-2 items-end xl:hidden '>
                <p className='font-bold text-6 md:text-lg leading-none'>400K</p>
                <button onClick={handleToggleLike} className='h-6 w-6 md:h-7 md:w-7'>
                  <img src={isLiked ? dislikeIcon : likeIcon} alt="like toggle" />
                </button>
              </div>
            </div>

            <div className='my-2 w-full lg:w-70 xl:h-65 py-1 px-2 md:p-3 text-[10px] md:text-[12px] md:leading-5 tracking-wide lg:bg-[#D9D9D944] rounded-[15px] md:overflow-auto'>
              <p className=' line-clamp-1 xl:line-clamp-none'>Here’s another post, with a different purpose (energy saving), keeping it clean and social-app ready: Turned off unused lights and unplugged devices today 💡Saving energy is an easy habit that really adds up. Small steps, big impact for the planet 🌍</p>
              <p className='text-[#249138] md:mt-2'>#GreenSquad #SaveEnergy #EcoHabits</p>
            </div>

            <div className='ml-3 xl:flex items-end gap-2 hidden'>
              <button onClick={handleToggleLike} className='h-7 w-7'>
                <img src={isLiked ? dislikeIcon : likeIcon} alt="like toggle" />
              </button>
              <p className='font-bold'>400K</p>
            </div>
          </div>
        </div>
    </>
  )
}


