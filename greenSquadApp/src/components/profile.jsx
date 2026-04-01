import React from 'react'
import profileimg from '../assets/profileimg.png'

export default function profile() {
  return (
    <>
   <div className=' flex'>
    <div  style={{ backgroundImage: `url(${profileimg})` }} className=' h-9 w-9 md:h-13 md:w-13 border-3 bg-cover border-[#538e3c] rounded-[10px] md:rounded-2xl'></div>
    <div className='ml-2 mb-1 hidden xl:flex xl:flex-col items-start justify-center '>
        <p className=' font-bold text-lg ' >Name</p>
        <p className='text-[#EAF7EEab] font-bold text-xs'>#{"user Name"}</p>
    </div>      
    </div>
    </>
  )
}
