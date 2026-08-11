import React from 'react'
import 'boxicons'
import Logo from '../assets/logo/Dlogo.png'


export default function navbar() {
    return (
        <>
            <div className='h-23 md:h-20 w-full px-3  md:px-10 lg:px-15 xl:px-25 py-3 flex md:items-center text-[#E2F6E8] sticky top-0 left-0 z-30 bg-[linear-gradient(to_top,#249138_0%,#1D782E_25%,#186226_50%,#134F1E_75%,#0F3D17_100%)]'>

                    <img src={Logo} alt="Green Squad" className='w-9 md:w-16 h-8 md:h-15.25 mr-auto md:mr-3  ' />


            </div>
        </>
    )
}
