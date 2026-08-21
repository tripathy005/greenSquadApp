import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar.jsx'
import PostCard from '../components/postsCard.jsx'
import squadDP from '../assets/squad/greenCore.png'
import Diamond from '../assets/icon/Diamond.png'
import dp from '../assets/dp/image.png'
import { MdEditSquare } from "react-icons/md"
import { IoMdClose } from "react-icons/io"

const members = Array(42).fill({
    name: "Name",
    credit: 1123
})

const squadData = {
    id: 1,
    name: "Urban Greens",
    members: 42,
    credit: 1234,
    image: squadDP,
    description: "Urban Greens is a squad dedicated to making city life cleaner and more sustainable 🌱🏙️. From planting trees and saving energy to keeping our streets and parks clean, we believe small actions create big change 🌍. We take on eco challenges together, track our progress, and support each other every day 🤝. Our goal is simple, build a greener, healthier community for everyone 💚✨"
}

function SquadPage() {

    const [squad, setSquad] = useState(squadData)

    const [showEditModal, setShowEditModal] = useState(false)

    const [editName, setEditName] = useState(squad.name)
    const [editDescription, setEditDescription] = useState(squad.description)
    const [editImage, setEditImage] = useState(squad.image)
    const [imageFile, setImageFile] = useState(null)

    const [posts, setPosts] = useState([])
    const [postsLoading, setPostsLoading] = useState(true)

    const fetchPosts = async () => {

        const token = localStorage.getItem('access_token')

        try {

            setPostsLoading(true)

            const response = await fetch(
                '/api/posts/',
                {
                    method: 'GET',

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const data = await response.json()

            console.log('All posts:', data)

            if (!response.ok) {

                console.error('Failed to fetch posts:', data)

                setPosts([])

                return
            }

            // If API returns an array
            if (Array.isArray(data)) {
                setPosts(data)
            }

            // If Django pagination returns { results: [...] }
            else if (Array.isArray(data.results)) {
                setPosts(data.results)
            }

            else {
                setPosts([])
            }

        } catch (error) {

            console.error('Posts fetch error:', error)

            setPosts([])

        } finally {

            setPostsLoading(false)

        }
    }

    useEffect(() => { fetchPosts() }, [])

    const handleEdit = () => {
        setEditName(squad.name)
        setEditDescription(squad.description)
        setEditImage(squad.image)
        setImageFile(null)
        setShowEditModal(true)
    }

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if (!file) return

        setImageFile(file)

        const preview = URL.createObjectURL(file)

        setEditImage(preview)
    }

    const handleSave = () => {

        setSquad({
            ...squad,
            name: editName,
            description: editDescription,
            image: editImage
        })
        // console.log("Saved changes:", {
        //     name: editName,
        //     description: editDescription,
        //     image: editImage
        // })

        setShowEditModal(false)
    }

    const handleCancel = () => {

        setEditName(squad.name)
        setEditDescription(squad.description)
        setEditImage(squad.image)
        setImageFile(null)

        setShowEditModal(false)
    }

    return (
        <>
            <Navbar />

            <div className='p-2 md:p-3 lg:p-4 bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full'>

                <div className='w-full flex flex-col lg:flex-row justify-between'>

                    {/* TOP LEFT SECTION */}

                    <div className='w-full lg:w-[65vw] lg:h-[77vh] p-5 md:p-10 lg:py-5 rounded-[15px] md:rounded-[30px] bg-white'>

                        <div className='flex items-center'>

                            <img src={squad.image} alt={squad.name} className='w-20 h-20 md:w-60 md:h-60 my-3 object-cover rounded-full border-3 border-[#249138]' />

                            <div className='ml-1 w-full justify-between md:ml-10 flex md:flex-col'>

                                <div>

                                    <p className='text-[#249138] font-bold text-[16px] md:text-[35px]'>
                                        {squad.name}
                                    </p>

                                    <p className='text-[12px] md:text-[18px]'>
                                        {squad.members} Members
                                    </p>

                                </div>

                                <div className='flex items-center justify-center bg-[#D9D9D944] w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] md:mt-5'>

                                    <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />

                                    <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px]'>
                                        {squad.credit}
                                    </p>

                                    <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold'>
                                        +
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Description */}

                        <div>

                            <h2 className='font-extrabold md:text-[25px] ml-2 md:ml-3'>
                                Group Description
                            </h2>

                            <div className='my-2 w-full lg:h-50 py-1 px-2 md:p-3 text-[11px] md:text-[20px] md:leading-8 tracking-wide bg-[#D9D9D944] rounded-[15px] md:overflow-auto'>

                                <p className='line-clamp-4 xl:line-clamp-5'>
                                    {squad.description}
                                </p>

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className='flex gap-1 md:gap-3 justify-end mt-4'>

                            <button type='button' className='bg-[#538e3c] rounded-[11px] flex items-center justify-center px-2 py-1 text-[12px] md:text-[20px] text-[#E2F6E8] font-bold border-3 border-[#E2F6E8]'>
                                Leave the Squad
                            </button>

                            <button type='button' onClick={() => setShowEditModal(true)} className='bg-[#538e3c] rounded-[11px] flex items-center justify-center px-2 py-1 text-[12px] md:text-[20px] text-[#E2F6E8] font-bold border-3 border-[#E2F6E8]'>
                                Edit
                                <MdEditSquare className='h-5 w-5 md:h-8 md:w-8 py-1' color='#E2F6E8' />
                            </button>

                        </div>

                    </div>


                    {/* TOP RIGHT SECTION */}

                    <div className='bg-white rounded-[30px] overflow-hidden w-full h-100 md:h-120 lg:h-[77vh] lg:w-[32vw] mt-2 md:mt-4 lg:mt-0'>

                        <h2 className='bg-[#538e3c] md:text-[25px] lg:text-[18px] text-white font-extrabold text-center p-3 md:p-4 lg:p-3 rounded-tl-[15px] rounded-tr-[15px] md:rounded-tl-[30px] md:rounded-tr-[30px]'>
                            @username
                        </h2>

                        <div className='p-4 space-y-5 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full'>

                            {members.map((member, index) => (

                                <div key={index} className='flex justify-between items-center'>

                                    <div className='flex items-center gap-3'>

                                        <img src={dp} className='w-12 h-12 rounded-full' />

                                        <div>

                                            <p className='font-bold'>
                                                {member.name}
                                            </p>

                                            <p className='text-xs text-gray-500'>
                                                Crew Member
                                            </p>

                                        </div>

                                    </div>

                                    <div className='mt-1 flex w-fit items-center justify-center rounded-[10px] bg-[#D9D9D944] px-3 py-1 md:rounded-[15px]'>

                                        <img
                                            src={Diamond}
                                            alt='Credit'
                                            className='mr-2 h-4 w-4 md:h-5 md:w-5'
                                        />

                                        <p className='text-lg font-extrabold tracking-[1px] text-[#249138] '>
                                            {member.credit}
                                        </p>

                                        <p className='ml-1 font-extrabold text-[#249138]'>
                                            +
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>


                {/* POSTS */}

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-0'>

                    {postsLoading ? (

                        <p className='col-span-full py-10 text-center text-gray-600'>
                            Loading posts...
                        </p>

                    ) : posts.length === 0 ? (

                        <p className='col-span-full py-10 text-center text-gray-600'>
                            No posts available.
                        </p>

                    ) : (

                        posts.map((post) => (

                            <PostCard
                                key={post.id}
                                post={post}
                            />

                        ))

                    )}

                </div>


                {/* EDIT MODAL */}

                {showEditModal && (
                    <div className='fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 '>

                        <div className='relative w-full max-w-lg rounded-[25px] bg-white p-6 shadow-2xl'>

                            <div className='flex items-center justify-between'>

                                <h2 className='text-2xl font-extrabold text-[#249138]'>
                                    Edit Squad
                                </h2>

                                <button type='button' onClick={() => setShowEditModal(false)} className='flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-[#249138] hover:text-white'>
                                    <IoMdClose size={24} />
                                </button>

                            </div>

                            <div className='mt-6'>

                                <label className='mb-2 block font-bold'>
                                    Squad Image
                                </label>

                                <div className='flex flex-col items-center'>

                                    <img src={editImage} alt='Squad preview' className='h-28 w-28 rounded-full border-4 border-[#249138] object-cover md:h-36 md:w-36' />

                                    <label htmlFor='editSquadImage' className='mt-4 cursor-pointer rounded-[11px] bg-[#538e3c] px-5 py-2 text-sm font-bold text-white hover:bg-[#467a32] transition'>
                                        Change Image
                                    </label>

                                    <input id='editSquadImage' type='file' accept='image/png,image/jpeg,image/jpg,image/webp' className='hidden' onChange={handleImageChange} />

                                    {imageFile && (
                                        <p className='mt-2 max-w-full truncate text-xs text-gray-500'>
                                            {imageFile.name}
                                        </p>
                                    )}

                                </div>

                            </div>

                            <div className='mt-6'>

                                <label className='mb-2 block font-bold'>
                                    Squad Name
                                </label>

                                <input type='text' value={editName} className='w-full rounded-[15px] bg-[#D9D9D944] p-3 outline-none focus:ring-2 focus:ring-[#538e3c]' />

                            </div>

                            <div className='mt-4'>

                                <label className='mb-2 block font-bold'>
                                    Description
                                </label>

                                <textarea rows='5' value={editDescription} className='w-full resize-none rounded-[15px] bg-[#D9D9D944] p-3 outline-none focus:ring-2 focus:ring-[#538e3c]' />

                            </div>

                            <div className='mt-6 flex justify-end gap-3'>

                                <button type='button' onClick={() => setShowEditModal(false)} className='rounded-[11px] border-2 border-gray-300 px-5 py-2 font-bold text-gray-600'>
                                    Cancel
                                </button>

                                <button type='button'
                                    onClick={() => {
                                        setShowEditModal(false)
                                        handleSave()
                                    }}
                                    className='rounded-[11px] bg-[#538e3c] px-5 py-2 font-bold text-white'>
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>
    )
}

export default SquadPage