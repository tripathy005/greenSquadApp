import React from 'react'
import { IoPersonAdd } from 'react-icons/io5'
import { FaUserPlus } from 'react-icons/fa'

import user1 from '../assets/dp/Kunal Verma.png'
import user2 from '../assets/dp/Kunal Verma.png'
import user3 from '../assets/dp/Kunal Verma.png'

import squad1 from '../assets/groupdp/greenCore.png'
import squad2 from '../assets/groupdp/greenCore.png'
import squad3 from '../assets/groupdp/greenCore.png'

export default function RAside() {

    const users = [
        {
            name: 'Kunal Verma',
            username: '@kunalverma',
            image: user1,
        },
        {
            name: 'Aditya Sharma',
            username: '@adityasharma',
            image: user2,
        },
        {
            name: 'Satyaprakash',
            username: '@satyaprakash',
            image: user3,
        },
    ]

    const groups = [
        {
            name: 'GreenCore',
            members: '4456 Members',
            image: squad1,
        },
        {
            name: 'Energy Champs',
            members: '3289 Members',
            image: squad2,
        },
        {
            name: 'Urban Greens',
            members: '2156 Members',
            image: squad3,
        },
      
    ]

    return (
        <aside className='hidden md:block w-65 xl:w-190   bg-white  sticky top-20 right-0 flex-col p-4'>

            {/* ================= PEOPLE SUGGESTIONS ================= */}

            <section className='w-full'>

                <h2 className='text-lg font-extrabold text-[#249138] mb-3'>
                    People You May Follow
                </h2>

                <div className='space-y-2'>

                    {users.map((user, index) => (

                        <div
                            key={index}
                            className='w-full flex items-center gap-2 p-2 rounded-[12px] bg-[#D9D9D944] hover:bg-[#E6FFE1] transition'
                        >

                            <img
                                src={user.image}
                                alt={user.name}
                                className='w-11 h-11 rounded-full object-cover'
                            />

                            <div className='flex-1 min-w-0'>

                                <p className='text-sm font-bold truncate'>
                                    {user.name}
                                </p>

                                <p className='text-[10px] text-gray-500 truncate'>
                                    {user.username}
                                </p>

                            </div>

                            <button
                                type='button'
                                className='flex items-center justify-center w-8 h-8 rounded-full bg-[#538E3C] text-white hover:bg-[#467a32] transition'
                            >
                                <FaUserPlus size={14} />
                            </button>

                        </div>

                    ))}

                </div>

                <button
                    type='button'
                    className='w-full mt-3 text-sm font-bold text-[#249138] hover:underline'
                >
                    See More
                </button>

            </section>


            {/* Divider */}

            <div className='w-full h-px bg-gray-200 my-5'></div>


            {/* ================= GROUP SUGGESTIONS ================= */}

            <section className='w-full'>

                <h2 className='text-lg font-extrabold text-[#249138] mb-3'>
                    Groups You May Join
                </h2>

                <div className='space-y-2'>

                    {groups.map((group, index) => (

                        <div
                            key={index}
                            className='w-full flex items-center gap-2 p-2 rounded-[12px] bg-[#D9D9D944] hover:bg-[#E6FFE1] transition'
                        >

                            <img
                                src={group.image}
                                alt={group.name}
                                className='w-11 h-11 rounded-[10px] object-cover border-2 border-[#249138]'
                            />

                            <div className='flex-1 min-w-0'>

                                <p className='text-sm font-bold truncate'>
                                    {group.name}
                                </p>

                                <p className='text-[10px] text-gray-500'>
                                    {group.members}
                                </p>

                            </div>

                            <button
                                type='button'
                                className='flex items-center justify-center w-8 h-8 rounded-full bg-[#538E3C] text-white hover:bg-[#467a32] transition'
                            >
                                +
                            </button>

                        </div>

                    ))}

                </div>

                <button
                    type='button'
                    className='w-full mt-3 text-sm font-bold text-[#249138] hover:underline'
                >
                    See More
                </button>

            </section>

        </aside>
    )
}



