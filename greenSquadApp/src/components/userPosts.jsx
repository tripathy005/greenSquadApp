import React, { useEffect, useState } from 'react'
import UserPostsCard from '../components/userPostsCard.jsx'

export default function UserPosts() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const fetchMyPosts = async () => {

            const token = localStorage.getItem('access_token')

            try {

                const response = await fetch(
                    '/api/posts/my/',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const data = await response.json()

                console.log('My Posts:', data)

                if (!response.ok) {
                    console.error('Failed to fetch posts:', data)
                    return
                }

                setPosts(data)

            } catch (error) {

                console.error('My posts error:', error)

            } finally {

                setLoading(false)

            }
        }


        fetchMyPosts()

    }, [])


    // Remove deleted post from screen
    const handlePostDeleted = (postId) => {

        setPosts((previousPosts) =>
            previousPosts.filter((post) => post.id !== postId)
        )

    }


    return (

        <section className='mt-3 w-full md:mt-5'>

            {/* Heading */}

            <div className='rounded-[15px] bg-white px-4 py-3 shadow-md md:rounded-[20px] md:px-6 md:py-4'>

                <h2 className='text-xl font-extrabold text-[#249138] md:text-2xl'>
                    My Posts
                </h2>

            </div>


            {/* Loading */}

            {loading && (

                <p className='py-10 text-center'>
                    Loading your posts...
                </p>

            )}


            {/* No Posts */}

            {!loading && posts.length === 0 && (

                <p className='py-10 text-center'>
                    You have not created any posts yet.
                </p>

            )}


            {/* Post Cards */}

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-0'>

                {posts.map((post) => (

                    <UserPostsCard
                        key={post.id}
                        post={post}
                        onDelete={handlePostDeleted}
                    />

                ))}

            </div>

        </section>

    )
}