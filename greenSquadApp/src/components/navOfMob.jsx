import React from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineLeaderboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";


export default function navOfMob() {
  return (
    <>
      <ul className="md:hidden flex w-full justify-between mr-7">
        <li>
          <Link to="/">
            <div className='w-17 sm:w-30 h-7  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
              <box-icon className='w-7 h-7 p-0.5' color="#E2F6E8" name='home-alt'></box-icon>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/leaderboard">
            <div className='w-17 sm:w-30 h-7   bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
              <MdOutlineLeaderboard className='w-7 h-7 p-0.5' color="#E2F6E8" />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/squad">
            <div className='w-17 sm:w-30  h-7  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
              <HiOutlineUserGroup className='w-7 h-7 p-0.5  ' color="#E2F6E8" name='home-alt' />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/about"> <div className='w-17 sm:w-30 h-7  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
            <IoMdInformationCircleOutline className='w-7 h-7 p-0.5' color="#E2F6E8" />
          </div>
          </Link>
        </li>
        {/* <li>
          <Link to="/"> <div className='w-17 sm:w-30 h-7  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
            <AiOutlineLike className='w-7 h-7 p-0.5' color="#E2F6E8" />
          </div>
          </Link>
        </li> */}
      </ul>
    </>
  )
}
