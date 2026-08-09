import React from 'react'
import Navbar from '../components/navbar.jsx'
import LAside from '../components/lAside.jsx'
import RAside from '../components/rAside.jsx'
import CreatePost from '../components/CreatePost.jsx'
import Highlights from '../components/highlights.jsx'
import Posts from '../components/posts.jsx'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className='flex w-full'>
        <LAside />
        <div className=' w-screen md:w-full h-auto lg:h-[90vh]  p-2 md:p-3 xl:p-4 
        overflow-y-auto 
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:my-1
            [&::-webkit-scrollbar-track]:bg-[#D9D9D9]
            [&::-webkit-scrollbar-thumb]:bg-[#249138]/60
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-track]:rounded-full


        bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)]'>
          <CreatePost />
          <Highlights />
          <Posts />
        </div>
        <RAside />
      </div>

    </>
  )
}

export default HomePage
