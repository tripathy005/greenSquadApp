import React from 'react'
import 'boxicons';
import Logo from '../assets/logo/logo1.png'
import SearchBox from '../components/searchBox.jsx'
import SearchBtn from '../components/searchBtn.jsx'
import LoginBtn from '../components/loginBtn.jsx'
import Profile from '../components/profile.jsx'
import NavOfMob from '../components/navOfMob.jsx'
import NavOfWeb from '../components/navOfWeb.jsx'


export default function navbar() {
  return (
    <>
      <div className='h-23 md:h-20 w-full px-3  md:px-10 lg:px-15 xl:px-25 py-3 flex flex-col sticky top-0 left-0 z-30 bg-[linear-gradient(to_top,#249138_0%,#1D782E_25%,#186226_50%,#134F1E_75%,#0F3D17_100%)]'>
        <div className=" mb-2 md:mb-0  flex md:items-center text-[#E2F6E8]  ">

          <img src={Logo} alt="Green Squad" className='w-9 md:w-17.5 h-8 md:h-15.25 mr-auto md:mr-3  ' />

          <SearchBox />
          <SearchBtn />

          <NavOfWeb />


          {/* <LoginBtn/> */}
          <Profile />

        </div>

        <NavOfMob />

      </div>
    </>
  )
}
