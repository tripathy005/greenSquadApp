import React, { useState } from 'react'
import Navbar from '../components/navbar.jsx'
import PostCard from '../components/userPostsCard.jsx'

import userDP from '../assets/dp/Kunal Verma.png'
import Diamond from '../assets/icon/Diamond.png'
import { MdEditSquare } from 'react-icons/md'
import { IoMdClose } from "react-icons/io"

const ProfilePage = () => {

    const [profile, setProfile] = useState({
        name: 'Kunal Verma',
        username: '@kunalverma',
        email: 'kunal@example.com',
        squad: 'Energy Champs',
        credit: 1234,
        image: userDP
    })


    const [showEditModal, setShowEditModal] = useState(false)

    const [editName, setEditName] = useState(profile.name)
    const [editEmail, setEditEmail] = useState(profile.email)
    const [editImage, setEditImage] = useState(profile.image)
    const [imageFile, setImageFile] = useState(null)

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if (!file) return

        setImageFile(file)

        const preview = URL.createObjectURL(file)

        setEditImage(preview)
    }

    const handleEdit = () => {

        setEditName(profile.name)
        setEditEmail(profile.email)
        setEditImage(profile.image)
        setImageFile(null)

        setShowEditModal(true)
    }

    const handleCancel = () => {

        setEditName(profile.name)
        setEditEmail(profile.email)
        setEditImage(profile.image)
        setImageFile(null)

        setShowEditModal(false)
    }

    const handleSave = () => {

        setProfile({
            ...profile,
            name: editName,
            email: editEmail,
            image: editImage
        })

        setShowEditModal(false)
    }


    return (
        <>
            <Navbar />

            <div className='min-h-screen w-full bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] p-2 md:p-3 xl:p-4 overflow-y-auto'>

                <div className='mx-auto w-full'>

                    {/* ================= PROFILE SECTION ================= */}

                    <section className='w-full rounded-[15px] bg-white p-4 md:p-7 lg:px-20 xl:px-36 shadow-md md:rounded-[30px]'>

                        {/* Heading */}

                        <h1 className='mb-5 text-center text-2xl font-extrabold text-[#249138] md:text-3xl'>
                            My Profile
                        </h1>


                        {/* Profile Content */}

                        <div className='flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-8'>

                            {/* DP */}

                            <div className='shrink-0'>

                                <img
                                    src={profile.image}
                                    alt='Profile'
                                    className='h-28 w-28 rounded-[15px] md:rounded-[30px]  border-4 border-[#249138] object-cover md:h-40 md:w-40'
                                />

                            </div>


                            {/* Details */}

                            <div className='grid w-full grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2'>

                                {/* Name */}

                                <div>
                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Name
                                    </p>

                                    <p className='text-base font-bold md:text-lg'>
                                        {profile.name}
                                    </p>
                                </div>


                                {/* Username */}

                                <div>
                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Username
                                    </p>

                                    <p className='text-base font-bold md:text-lg'>
                                        {profile.username}
                                    </p>
                                </div>


                                {/* Email */}

                                <div>
                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Email
                                    </p>

                                    <p className='break-all text-base font-bold md:text-lg'>
                                        {profile.email}
                                    </p>
                                </div>


                                {/* Squad */}

                                <div>
                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Squad
                                    </p>

                                    <p className='text-base font-bold text-[#249138] md:text-lg'>
                                        {profile.squad}
                                    </p>
                                </div>


                                {/* Credit */}

                                <div>

                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Credit Points
                                    </p>

                                    <div className='mt-1 flex w-fit items-center justify-center rounded-[10px] bg-[#D9D9D944] px-4 py-1.5 md:rounded-[15px]'>

                                        <img
                                            src={Diamond}
                                            alt='Credit'
                                            className='mr-2 h-5 w-5 md:h-6 md:w-6'
                                        />

                                        <p className='text-lg font-extrabold tracking-[2px] text-[#249138] md:text-2xl'>
                                            {profile.credit}
                                        </p>

                                        <p className='ml-1 font-extrabold text-[#249138]'>
                                            +
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className='mt-6 flex justify-center gap-2 md:justify-end md:gap-3'>

                            <button
                                type='button'
                                onClick={handleEdit}
                                className=' bg-[#538e3c] rounded-[11px]  flex items-center justify-center px-5 py-2 text-[12px] md:text-[20px] text-[#E2F6E8] font-bold border-3 border-[#E2F6E8]'
                            >
                                Edit
                                <MdEditSquare />
                            </button>


                            <button
                                type='button'
                                className='  hover:bg-[#538e3c] rounded-[11px]  flex items-center justify-center px-5 py-2 text-[12px] md:text-[20px] text-[#538E3C] hover:text-[#E2F6E8] font-bold border-3 border-[#538E3C] hover:border-[#E2F6E8]'
                            >
                                Logout
                            </button>

                        </div>

                    </section>


                    {/* ================= MY POSTS SECTION ================= */}

                    <section className='mt-3 w-full md:mt-5'>

                        {/* Heading */}

                        <div className='rounded-[15px] bg-white px-4 py-3 shadow-md md:rounded-[20px] md:px-6 md:py-4'>

                            <h2 className='text-xl font-extrabold text-[#249138] md:text-2xl'>
                                My Posts
                            </h2>

                        </div>


                        {/* Existing Post Cards */}

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-0 '>

                            <PostCard />
                            <PostCard />
                            <PostCard />
                            <PostCard />

                        </div>

                    </section>

                    {showEditModal && (

                        <div className='fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4'>

                            <div className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[25px] bg-white p-5 shadow-2xl md:p-7'>

                                {/* Header */}

                                <form className='flex items-center justify-between'>

                                    <h2 className='text-2xl font-extrabold text-[#249138] md:text-3xl'>
                                        Edit Profile
                                    </h2>

                                    <button type='button' onClick={handleCancel} className='flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-[#249138] hover:text-white transition'>
                                        <IoMdClose size={24} />
                                    </button>

                                </form>

                                <form className='mt-5 flex flex-col gap-4 md:mt-6 md:gap-5'>
                                    {/* Profile Image */}

                                    <div className='mt-6'>

                                        <label className='mb-2 block font-bold text-gray-700'>
                                            Profile Picture
                                        </label>

                                        <div className='flex flex-col items-center'>

                                            <img src={editImage} alt='Profile preview' className='h-28 w-28 rounded-[15px] md:rounded-[30px] border-4 border-[#249138] object-cover md:h-36 md:w-36' />

                                            <label htmlFor='profileImage' className='mt-4 cursor-pointer rounded-[11px] bg-[#538e3c] px-5 py-2 text-sm font-bold text-white hover:bg-[#467a32] transition'>
                                                Change Photo
                                            </label>

                                            <input id='profileImage' type='file' accept='image/png,image/jpeg,image/jpg,image/webp' className='hidden' onChange={handleImageChange} />

                                            {imageFile && (
                                                <p className='mt-2 max-w-full truncate text-xs text-gray-500'>
                                                    {imageFile.name}
                                                </p>
                                            )}

                                        </div>

                                    </div>


                                    {/* Name */}

                                    <div className='mt-5'>

                                        <label htmlFor='profileName' className='mb-2 block font-bold text-gray-700'>
                                            Name
                                        </label>

                                        <input
                                            id='profileName'
                                            type='text'
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            placeholder='Enter your name'
                                            className='w-full rounded-[15px] bg-[#D9D9D944] p-3 outline-none focus:ring-2 focus:ring-[#538e3c]'
                                            required

                                        />

                                    </div>


                                    {/* Email */}

                                    <div className='mt-5'>

                                        <label htmlFor='profileEmail' className='mb-2 block font-bold text-gray-700'>
                                            Email
                                        </label>

                                        <input
                                            id='profileEmail'
                                            type='email'
                                            value={editEmail}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                            placeholder='Enter your email'
                                            className='w-full rounded-[15px] bg-[#D9D9D944] p-3 outline-none focus:ring-2 focus:ring-[#538e3c]'
                                            required
                                        />

                                    </div>


                                    {/* Buttons */}

                                    <div className='mt-6 flex justify-end gap-3'>

                                        <button type='button' onClick={handleCancel} className='rounded-[11px] border-2 border-gray-300 px-5 py-2 font-bold text-gray-600 hover:bg-gray-100 transition'>
                                            Cancel
                                        </button>

                                        <button type='submit' onClick={handleSave} className='rounded-[11px] bg-[#538e3c] px-5 py-2 font-bold text-white hover:bg-[#467a32] transition'>
                                            Save Changes
                                        </button>

                                    </div>
                                </form>

                            </div>

                        </div>

                    )}

                </div>

            </div>
        </>
    )
}

export default ProfilePage