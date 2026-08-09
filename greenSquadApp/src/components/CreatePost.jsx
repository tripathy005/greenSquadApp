import React, { useState } from "react";
import addPost from "../assets/icon/addPost.png";
import { IoMdSend } from "react-icons/io";
import CreatePostForm from "../components/CreatePostForm.jsx";

export default function CreatePost() {

  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  return (
    <>
      <div className=" h-auto w-full rounded-[15px] bg-white p-2 shadow-lg md:rounded-[30px] md:p-4 ">

        <a onClick={() => setIsPostFormOpen(true)} className='flex align-center items-center '>

          <img src={addPost} alt="Choose Image" className='h-12.5 w-15 md:h-16 md:w-18  ' />

          <div className='flex flex-col w-full ml-2 '>
            <div className='flex  gap-3  '>

              <p className='  text-[8px] md:text-[16px] h-7.5 md:h-12 p-2 md:p-3 w-full bg-[#D9D9D944] rounded-[10px] md:rounded-[15px]  '>
                Create a New Post ..
              </p>

              <button
                type='button'
                className=' bg-[#538E3C] text-white py-1 md:py-2 px-1.5 md:px-3 rounded-[10px] md:rounded-[15px] md:text-[25px]'
                onClick={() => setIsPostFormOpen(true)}>
                <IoMdSend />
              </button>

            </div>

          </div>

        </a>

      </div>

      <CreatePostForm isOpen={isPostFormOpen} onClose={() => setIsPostFormOpen(false)}/>

    </>
  );
}