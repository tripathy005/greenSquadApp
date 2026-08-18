import React from 'react'
import Diamond from '../assets/icon/Diamond.png'
import profileimg from '../assets/dp/image.png'
import { MdLogout } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider.jsx'

export default function LAside() {


    const {authUser, setAuthUser}= useAuth()

    const profilePhoto = authUser?.profile_photo
        ? authUser.profile_photo
        : profileimg

    const handleLogout = () => {

        try {

            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')

            setAuthUser(null)

            toast.success("Logged out successfully")

            setTimeout(() => {
                window.location.href = '/login'
            }, 1000)

        } catch (error) {

            console.error(error)

            toast.error("Unable to logout")

        }

    }

    return (
        <aside className='hidden lg:flex w-[18%] min-w-55  bg-white flex-col items-center px-4 py-10 sticky top-20 left-0'>

            {/* Profile Image */}

            <img
                src={profilePhoto}
                alt='Profile'
                className='w-28 h-28 rounded-[30px]  object-cover border-4 border-[#249138]  '
            />


            {/* Name */}

            <h2 className='mt-3 text-xl font-extrabold text-center'>
                {authUser?.full_name || 'loading....'}
            </h2>


            {/* Username */}

            <p className='text-sm text-gray-500 mt-1'>
                @{authUser?.username || 'loading....'}
            </p>


            {/* Profile Details */}

            <div className='w-full mt-7 space-y-4'>

                {/* Email */}

                <div>
                    <p className='text-xs text-gray-500'>
                        Email
                    </p>

                    <p className='text-sm font-semibold break-all'>
                        {authUser?.email || 'loading....'}
                    </p>
                </div>


                {/* Squad */}

                <div>
                    <p className='text-xs text-gray-500'>
                        Squad
                    </p>

                    <p className='text-sm font-bold text-[#249138]'>
                        {authUser?.squad || 'loading....'}
                    </p>
                </div>


                {/* Credit Points */}

                <div>

                    <p className='text-xs text-gray-500 mb-1'>
                        Credit Points
                    </p>

                    <div className='flex items-center justify-center w-full bg-[#D9D9D944] rounded-xl py-2'>

                        <img
                            src={Diamond}
                            alt='Credit'
                            className='h-5 w-5 mr-2'
                        />

                        <p className='text-lg text-[#249138] font-extrabold tracking-[2px]'>
                            {authUser?.creditpoints ?? 0}
                        </p>

                        <p className='text-sm text-[#249138] font-extrabold ml-1'>
                            +
                        </p>

                    </div>

                </div>

            </div>


            {/* Logout */}

            <div className='w-full mt-30 pt-8'>

                <button
                    type='button'
                    onClick={handleLogout}
                    className='w-full flex items-center justify-center gap-2 border-2 border-[#538E3C] text-[#538E3C] hover:bg-[#538E3C] hover:text-white font-bold py-2 rounded-xl transition'
                >
                    <MdLogout size={20} />
                    Logout
                </button>

            </div>

        </aside>
    )
}






