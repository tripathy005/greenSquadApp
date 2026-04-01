import React from 'react'
import profileimg from '../assets/profileimg.png'

export default function profile() {
  return (
    <>
    <div  style={{ backgroundImage: `url(${profileimg})` }} className='bg-cover h-13 w-13 border-3 border-[#538e3c] rounded-2xl'></div>
    <div className='ml-2 mb-1 flex flex-col items-start justify-center '>
        <p className=' font-bold text-lg ' >Name</p>
        <p className='text-[#EAF7EEab] font-bold text-xs'>#{"user Name"}</p>
    </div>      
    </>
  )
}
