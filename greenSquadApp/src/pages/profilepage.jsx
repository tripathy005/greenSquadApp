import React, { useState } from 'react'
import Navbar from '../components/navbar.jsx'

import profileimg from '../assets/dp/image.png'
import Diamond from '../assets/icon/Diamond.png'
import { MdEditSquare } from 'react-icons/md'
import { IoMdClose } from "react-icons/io"
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider.jsx'

import Posts from '../components/userPosts.jsx'

const ProfilePage = () => {

    //for logout
    const {authUser, setAuthUser} = useAuth()

    // console.log('Auth User:', authUser)

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





    const [showEditModal, setShowEditModal] = useState(false)

    const [editName, setEditName] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editImage, setEditImage] = useState(profileimg)

    const [imageFile, setImageFile] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if (!file) return

        setImageFile(file)

        const preview = URL.createObjectURL(file)

        setEditImage(preview)
    }

    const handleEdit = () => {

        setEditName(user?.full_name || '')
        setEditEmail(user?.email || '')
        setEditImage(user?.profile_photo || profileimg)

        setImageFile(null)

        setShowEditModal(true)
    }

    const handleCancel = () => {

        setEditName('')
        setEditEmail('')
        setEditImage(profilePhoto)

        setImageFile(null)

        setShowEditModal(false)
    }

    const handleSave = async (e) => {

        e.preventDefault()

        try {
            setIsLoading(true)

            const token = localStorage.getItem('access_token')

            const formData = new FormData()

            formData.append('full_name', editName)
            formData.append('email', editEmail)

            if (imageFile) {
                formData.append('profile_photo', imageFile)
            }

            const response = await fetch('/api/auth/profile/update/', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            const data = await response.json()

            console.log('Update response:', data)

            if (!response.ok) {

                if (data.detail) {
                    toast.error(data.detail)
                } else {
                    toast.error('Failed to update profile')
                }

                return
            }

            setAuthUser(data)

            toast.success('Profile updated successfully!')

            setShowEditModal(false)

        } catch (error) {

            console.error('Profile update error:', error)

            toast.error('Unable to update profile')

        } finally {
            setIsLoading(false)
        }
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
                                    src={profilePhoto}
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
                                        {authUser?.full_name || 'loading....'}
                                    </p>
                                </div>


                                {/* Username */}

                                <div>
                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Username
                                    </p>

                                    <p className='text-base font-bold md:text-lg'>
                                        @{authUser?.username || 'loading....'}
                                    </p>
                                </div>


                                {/* Email */}

                                <div>
                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Email
                                    </p>

                                    <p className='break-all text-base font-bold md:text-lg'>
                                        {authUser?.email || 'loading....'}
                                    </p>
                                </div>


                                {/* Squad */}

                                <div>
                                    <p className='text-xs text-gray-500 md:text-sm'>
                                        Squad
                                    </p>

                                    <p className='text-base font-bold text-[#249138] md:text-lg'>
                                        {authUser?.squad || 'loading....'}
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
                                            {authUser?.total_credit_points ?? 0}
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
                                onClick={handleLogout}
                                className='  hover:bg-[#538e3c] rounded-[11px]  flex items-center justify-center px-5 py-2 text-[12px] md:text-[20px] text-[#538E3C] hover:text-[#E2F6E8] font-bold border-3 border-[#538E3C] hover:border-[#E2F6E8]'
                            >
                                Logout
                            </button>

                        </div>

                    </section>


                    {/* ================= MY POSTS SECTION ================= */}

                    <Posts />

                    {showEditModal && (

                        <div className='fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4'>

                            <div className='relative w-full max-w-lg max-h-[90vh] rounded-[25px] bg-white p-5 shadow-2xl md:p-7 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full'>

                                {/* Header */}

                                <form className='flex items-center justify-between'>

                                    <h2 className='text-2xl font-extrabold text-[#249138] md:text-3xl'>
                                        Edit Profile
                                    </h2>

                                    <button type='button' onClick={handleCancel} className='flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-[#249138] hover:text-white transition'>
                                        <IoMdClose size={24} />
                                    </button>

                                </form>

                                <form onSubmit={handleSave} className='mt-5 flex flex-col gap-4 md:mt-6 md:gap-5'>
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

                                        <button type='submit' className='rounded-[11px] bg-[#538e3c] px-5 py-2 font-bold text-white hover:bg-[#467a32] transition'>
                                            Save Changes
                                        </button>

                                    </div>
                                </form>

                                {/* loading interface */}

                                {isLoading && (

                                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[30px] bg-white/90 backdrop-blur-sm">

                                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#249138] border-t-transparent"></div>

                                        <p className="mt-4 font-bold text-[#249138]">
                                            Updateing your Details...
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Please wait
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    )}

                </div>

            </div>
        </>
    )
}

export default ProfilePage