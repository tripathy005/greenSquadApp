import React from 'react'
import addPost from '../assets/icon/addPost.png'
import { IoMdSend } from "react-icons/io";


export default function CreatePost() {
  return (
    <>
      <div className=' h-auto w-full bg-white shadow-lg  rounded-[15px] md:rounded-[30px] p-2 md:p-4 '>
        <form action="" className='flex  '>    
        <input type="file" id='addImg' className='hidden' />
        <label for='addImg' className='cursor-pointer'>
          <img src={addPost} alt="Choose Image" className='h-12.5 w-15 md:h-22.5 md:w-26  ' />
        </label>
        <div className='flex flex-col w-full ml-2 '>
          <p className=' ml-2 md:ml-3 mb-1 md:mb-2 text-[11px] md:text-[18px] '>Create a New Post ..</p>
          <div className='flex  gap-3'>
          <input type="text" placeholder='add caption of your post....' className=' text-[8px] md:text-[16px] h-7.5 md:h-12 p-2 w-full bg-[#D9D9D944] rounded-[10px] md:rounded-[15px] '/>
          <button type='submit' className='bg-[#538E3C] text-white py-1 md:py-2 px-1.5 md:px-3 rounded-[10px] md:rounded-[15px] md:text-[25px]  '><IoMdSend /></button>
          </div>
        </div>
        </form>
      </div>

    </>
  )
}
