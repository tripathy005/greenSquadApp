import React from 'react'

export default function searchBox() {
  return (
    <>
    <form className='w-60 lg:w-80 h-10.5 hidden md:flex items-center mr-35 lg:mr-50 xl:mr-auto  bg-white border-3 border-[#538E3C] rounded-full p-0.5'>
            <input className=' outline-0 p-2 w-full text-[#0F3D17]' type="text" placeholder="Search..." />
            <button type="submit" className='h-8 w-8 bg-[#538E3C] items-center justify-center rounded-full p-1'>
              <box-icon className='w-7 h-7' color="#E2F6E8" name='search-alt'></box-icon>
            </button>
          </form>
      
    </>
  )
}
