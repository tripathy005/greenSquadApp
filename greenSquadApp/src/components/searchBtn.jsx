import React from 'react'

export default function searchBtn() {
  return (
    <>
      <button type="submit" className='h-9 w-9 mr-2 md:hidden bg-[#538E3C] items-center justify-center rounded-[10px] p-1'>
        <box-icon className='w-7 h-7' color="#E2F6E8" name='search-alt'></box-icon>
      </button>
    </>
  )
}
