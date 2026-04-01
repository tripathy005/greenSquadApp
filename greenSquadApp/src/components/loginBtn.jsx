import React from 'react'
import { IoMdLogIn } from "react-icons/io";


export default function loginBtn() {
  return (
    <>
    <button className='text-2xl h-9 md:h-13.25 w-9 md:w-30 flex items-center justify-center  rounded-[10px] font-bold bg-[#538e3c] text-[#E2F6E8] md:border-3 md:border-[#E2F6E8] '>
      <p className='hidden md:inline-block'>
      Sign in
      </p>
      <IoMdLogIn className='md:hidden text-[#E2F6E8] w-7 h-7'/>
    
      </button>
      
    </>
  )
}
