import React from 'react'

import Logo from '../assets/logo/Dlogo.png'
import supdp from '../assets/dp/supdp.png'
import admindp from '../assets/dp/admindp.png'

import { decryptData } from '../utils/secureStorage'


export default function Navbar() {

    // Get encrypted user data from localStorage
    const encryptedUser = localStorage.getItem('user_info')

    // Decrypt user data safely
    const user = decryptData(encryptedUser)
    // console.log(user)

    // Get role safely
    const role = user?.role || ''

    // Check superintendent role
    const isSuperintendent =
        role.toLowerCase() === 'superintendent'


    // Select profile image
    const profileImage = isSuperintendent
        ? supdp
        : admindp


    return (
        <nav className='h-23 md:h-20 w-full px-3 md:px-10 lg:px-15 xl:px-25 py-3 flex justify-between items-center  text-[#E2F6E8] sticky top-0 left-0 z-30 bg-[linear-gradient(to_top,#249138_0%,#1D782E_25%,#186226_50%,#134F1E_75%,#0F3D17_100%)]'>

            {/* Logo */}
            <img
                src={Logo}
                alt="Green Squad"
                className='w-17 h-16 drop-shadow-2xl'
            />


            {/* Profile Section */}
            <div className="flex items-center gap-3">

                {/* Profile Information */}
                <div className="text-right">

                    <h3 className="text-sm font-semibold text-white">
                        { user?.username || 'User'}
                    </h3>


                    <p className="text-xs font-medium text-green-200">
                        {role
                            ? role.charAt(0).toUpperCase() + role.slice(1)
                            : 'User'
                        }
                    </p>


                    {/* Employee ID only for Superintendent */}
                    {isSuperintendent && user?.employee_id && (

                        <p className="text-xs text-green-100">
                            {user.employee_id}
                        </p>

                    )}

                </div>


                {/* Profile Image */}
                <img
                    src={profileImage}
                    alt={role || 'Profile'}
                    className="h-12 w-12 rounded-[10px] md:rounded-2xl border-3 border-[#538e3c] object-cover"
                />

            </div>

        </nav>
    )
}