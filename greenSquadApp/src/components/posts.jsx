import React, { useEffect, useState } from 'react'
import PostCard from '../components/postsCard.jsx'
import { RxCrossCircled } from "react-icons/rx";


const Posts = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const token = localStorage.getItem('access_token')

                const response = await fetch('/api/posts/', {
                    method: 'GET',

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await response.json()

                // console.log('Posts:', data)

                if (!response.ok) {
                    console.error('Failed to fetch posts:', data)
                    return
                }

                setPosts(data)

            } catch (error) {

                console.error('Posts fetch error:', error)

            } finally {

                setLoading(false)

            }

        }

        fetchPosts()

    }, [])


    if (loading) {
        return (
            <div className="w-full h-100 md:h-160 lg:h-80 flex items-center justify-center lg:flex-col  p-2 md:p-4 mt-2 md:mt-4">
                <div className=' bg-white h-45 w-60 md:h-50 md:w-70 lg:w-100 flex flex-col items-center justify-center rounded-[15px] md:rounded-[30px] shadow-md p-2 md:p-4 mt-2'>
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#249138] border-t-transparent"></div>
                    <p className="mt-4 md:text-xl font-bold text-[#249138]">
                        Loading Posts...
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        Please wait
                    </p>

                </div>
            </div>
        )




    }


    return (

        <>
            {posts.length > 0 ? (

                posts.map((post) => (

                    <PostCard
                        key={post.id}
                        post={post}
                    />

                ))

            ) : (

                <div className="w-full h-100 lg:h-80 flex items-center justify-center lg:flex-col  p-2 md:p-4 mt-2 md:mt-4">
                    <div className=' bg-white h-45 w-60 md:h-50 md:w-70 lg:w-100 flex flex-col items-center justify-center rounded-[15px] md:rounded-[30px] shadow-md p-2 md:p-4 mt-2'>
                        <RxCrossCircled className=' text-[#249138] font-extrabold h-15 w-15 ' />
                        <p className="mt-4 md:text-xl font-bold text-[#249138]">
                            No posts available.
                        </p>
                        

                    </div>
                </div>

            )}
        </>

    )
}

export default Posts