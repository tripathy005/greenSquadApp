import React from 'react'
import { NavLink } from 'react-router'
import { AiOutlineAlert } from "react-icons/ai"
import { GrUserWorker } from "react-icons/gr"
import { LuUserRound } from "react-icons/lu"
import { LuUsersRound } from "react-icons/lu"
import { LuLogOut } from "react-icons/lu"

const Sidebar = () => {

    const navItems = [
        {
            icon: <AiOutlineAlert />,
            name: 'Issues',
            path: '/',
        },
        {
            icon: <GrUserWorker />,
            name: 'Superintendent',
            path: '/superintendent',
        },
        {
            icon: <LuUserRound />,
            name: 'Users',
            path: '/users',
        },
        {
            icon: <LuUsersRound />,
            name: 'Squad',
            path: '/squad',
        },
    ]


    const handleLogout = () => {
        // Logout functionality will be added later
        console.log('Logout clicked')
    }


    return (
        <aside className="h-full w-16 sm:w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col">


            {/* Navigation Items */}
            <nav className="flex-1 p-2 sm:p-3 lg:p-4">


                <div className="flex flex-col gap-2">


                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            title={item.name}
                            className={({ isActive }) =>
                                `flex items-center justify-center lg:justify-start px-2 sm:px-3 lg:px-4 py-3 rounded-lg text-sm font-medium transition ${isActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >

                            {/* Icon */}
                            <span className="text-xl shrink-0">
                                {item.icon}
                            </span>

                            {/* Name */}
                            <span className="hidden lg:block ml-3">
                                {item.name}
                            </span>

                        </NavLink>
                    ))}


                </div>


            </nav>



            {/* Logout */}
            <div className="p-2 sm:p-3 lg:p-4 border-t border-gray-200">


                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="w-full flex items-center justify-center lg:justify-start px-2 sm:px-3 lg:px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >

                    <span className="text-xl shrink-0">
                        <LuLogOut />
                    </span>

                    <span className="hidden lg:block ml-3">
                        Logout
                    </span>

                </button>


            </div>


        </aside>
    )
}


export default Sidebar