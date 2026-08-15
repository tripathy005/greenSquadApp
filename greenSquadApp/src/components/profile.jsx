import React from 'react'

import profileimg from '../assets/dp/image.png'

import { useAuth } from '../context/AuthProvider.jsx'


export default function Profile() {

    const { authUser } = useAuth()


    const profilePhoto = authUser?.profile_photo
        ? authUser.profile_photo
        : profileimg


    return (

        <a href="/profile" className='flex'>

            <div
                style={{
                    backgroundImage: `url(${profilePhoto})`
                }}
                className='h-9 w-9 md:h-13 md:w-13 border-3 bg-cover border-[#538e3c] rounded-[10px] md:rounded-2xl'
            />

            <div className='ml-2 mb-1 hidden xl:flex xl:flex-col items-start justify-center'>

                <p className='font-bold text-lg'>
                    {authUser?.full_name || 'User'}
                </p>

                <p className='text-[#EAF7EEab] font-bold text-xs'>
                    @{authUser?.username || 'username'}
                </p>

            </div>

        </a>

    )
}