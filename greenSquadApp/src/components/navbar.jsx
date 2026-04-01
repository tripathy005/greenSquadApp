import React from 'react'
import Logo from '../assets/logo1.png'
import 'boxicons'
import { MdOutlineLeaderboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import LoginBtn from '../components/loginBtn.jsx'
import Profile from '../components/profile.jsx'
import { AiOutlineLike } from "react-icons/ai";


export default function navbar() {
  return (
    <>
      <div className="h-19 w-full px-20 py-2 flex items-end text-[#E2F6E8] bg-[linear-gradient(to_top,#249138_0%,#1D782E_25%,#186226_50%,#134F1E_75%,#0F3D17_100%)] ">

        <img src={Logo} alt="Green Squad" className='w-17.5 h-15.25 mr-3  ' />

        <form className=' w-80 h-10.5 flex items-center mr-120  bg-white border-3 border-[#538E3C] rounded-full p-0.5'>
          <input className=' p-2 w-full text-[#0F3D17]' type="text" placeholder="Search..." />
          <button type="submit" className='h-8 w-8 bg-[#538E3C] items-center justify-center rounded-full p-1'>
            <box-icon className='w-7 h-7' color="#E2F6E8" name='search-alt'></box-icon>
          </button>
        </form>

        <div className='flex w-45 mb-1 justify-between mr-7'>
          <a href="/">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
            <box-icon className='w-8.5 h-8.5 py-1' color="#E2F6E8" name='home-alt'></box-icon>
            </div>
          </a>
          <a href="/">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
            <MdOutlineLeaderboard className='w-8.5 h-8.5 py-1' color="#E2F6E8" />
            </div>
          </a>
          <a href="/">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
            <HiOutlineUserGroup className='w-8.5 h-8.5 py-1' color="#E2F6E8" name='home-alt' />  
            </div>
          </a>
          <a href="/">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
            <AiOutlineLike className='w-8.5 h-8.5 py-1' color="#E2F6E8" />  
            </div>
          </a>
          
        </div>
        {/* <LoginBtn/> */}
        <Profile/>
        <div>

        </div>
      </div>
    </>
  )
}
