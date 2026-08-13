import React, { useEffect, useState } from 'react'
import profileimg from '../assets/dp/image.png'

export default function Profile() {

    const [user, setUser] = useState(null)

    useEffect(() => {

    // console.log('Profile component loaded')

    const getProfile = async () => {

        // console.log('getProfile started')

        try {

            const token = localStorage.getItem('access_token')

            // console.log('Token:', token)

            const response = await fetch('/api/auth/profile/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // console.log('Response:', response)
            // console.log('Status:', response.status)

            const data = await response.json()

            // console.log('User:', data)

            if (response.ok) {
                setUser(data)
            }

        } catch (error) {

            console.error('Profile error:', error)

        }

    }

    getProfile()

}, [])

    const profilePhoto = user?.profile_photo
        ? user.profile_photo
        : profileimg


    return (
        <>
            <a href="/profile" className='flex'>

                <div
                    style={{
                        backgroundImage: `url(${profilePhoto})`
                    }}
                    className='h-9 w-9 md:h-13 md:w-13 border-3 bg-cover border-[#538e3c] rounded-[10px] md:rounded-2xl'
                >
                </div>

                <div className='ml-2 mb-1 hidden xl:flex xl:flex-col items-start justify-center'>

                    <p className='font-bold text-lg'>
                        {user?.full_name || 'loading....'}
                    </p>

                    <p className='text-[#EAF7EEab] font-bold text-xs'>
                        @{user?.username || 'loading...'}
                    </p>

                </div>

            </a>
        </>
    )
}