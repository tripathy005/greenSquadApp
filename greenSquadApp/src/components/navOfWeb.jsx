import React from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineLeaderboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { AiOutlineLike } from "react-icons/ai";


export default function navOfWeb() {
  return (
    <>
      <ul className="hidden md:flex w-45 mb-1 justify-between mr-7">
        <li>
          <Link to="/">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
              <box-icon className='w-8.5 h-8.5 py-1' color="#E2F6E8" name='home-alt'></box-icon>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/leaderboard">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
              <MdOutlineLeaderboard className='w-8.5 h-8.5 py-1' color="#E2F6E8" />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/squad">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
              <HiOutlineUserGroup className='w-8.5 h-8.5 py-1' color="#E2F6E8" name='home-alt' />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/">
            <div className='w-9 h-9  bg-[#538e3c] rounded-[11px]  flex items-center justify-center'>
              <AiOutlineLike className='w-8.5 h-8.5 py-1' color="#E2F6E8" />
            </div>
          </Link>
        </li>
      </ul>
    </>
  )
}
