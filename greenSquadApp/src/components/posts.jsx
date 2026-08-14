import React, { useEffect, useState } from 'react'
import PostCard from '../components/postsCard.jsx'

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
        return <p className='text-center py-20'>Loading posts...</p>
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

                <p className='text-center py-20'>No posts available.</p>

            )}
        </>

    )
}

export default Posts