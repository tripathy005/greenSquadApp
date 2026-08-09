import React from 'react'
import Navbar from '../components/navbar.jsx'

import Diamond from '../assets/icon/Diamond.png'
import squadDP from '../assets/groupdp/greenCore.png'
import Pl1 from '../assets/awards/place1.png'
import Pl2 from '../assets/awards/place2.png'
import Pl3 from '../assets/awards/place3.png'
import Logo2 from '../assets/logo/logo3.png'



const leaderboard = () => {
  return (
    <>
      <Navbar />
      <div className='w-full h-auto lg:h-[90vh]  p-2 md:p-3 xl:p-4 flex flex-col lg:flex-row justify-between overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)]'>
        <div className=' w-full lg:w-[43%] '>

          <div className=' h-13 md:h-26.25 w-full bg-white rounded-[15px] md:rounded-[30px] flex items-center justify-center '>
            <h1 className=' text-[30px] md:text-[49px] text-[#249138] font-extrabold   '>Leader Board</h1>
          </div>

          <div className='w-full bg-white rounded-[15px] md:rounded-[30px] flex items-center justify-around mt-2 md:mt-4 py-4 px-2'>

            <div className=' h-57 w-25 md:h-70 md:w-39  bg-[linear-gradient(to_bottom,#ffffff_71%,#249138_100%)] rounded-[15px] md:rounded-[30px] flex flex-col justify-center items-center space-y-5 '>
              <div className='flex items-center justify-center  mt-1 md:mt-2 bg-[#D9D9D944] w-25 md:w-34 h-8 md:h-10 rounded-[10px] md:rounded-[15px] mx-auto'>
                <img src={Diamond} className='h-4.25 w-4 md:h-6.5 md:w-6 mr-1 md:mr-2' />
                <p className='text-[18px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
                <p className='text-[13px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
              </div>

              <img src={squadDP} alt="Squad name" className='w-20 h-21 md:w-23.75 md:h-23.75 m-1 object-cover rounded-[15px] md:rounded-[30px] border-3 border-[#249138] ' />

              <img src={Pl3} alt="1st place" className=' h-19.25 w-19.25 ' />

            </div>
            <div className='h-57 w-25 md:h-70 md:w-39  bg-[linear-gradient(to_bottom,#ffffff_30%,#249138_100%)] rounded-[15px] md:rounded-[30px] flex flex-col justify-center items-center space-y-5 '>
              <div className='flex items-center justify-center  mt-1 md:mt-2 bg-[#D9D9D944] w-25 md:w-34 h-8 md:h-10 rounded-[10px] md:rounded-[15px] mx-auto'>
                <img src={Diamond} className='h-4.25 w-4 md:h-6.5 md:w-6 mr-1 md:mr-2' />
                <p className='text-[18px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
                <p className='text-[13px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
              </div>

              <img src={squadDP} alt="Squad name" className='w-20 h-21 md:w-23.75 md:h-23.75 m-1 object-cover rounded-[15px] md:rounded-[30px] border-3 border-[#249138] ' />

              <img src={Pl1} alt="1st place" className=' h-19.25 w-19.25 ' />

            </div>
            <div className=' h-57 w-25 md:h-70 md:w-39  bg-[linear-gradient(to_bottom,#ffffff_50%,#249138_100%)] rounded-[15px] md:rounded-[30px] flex flex-col justify-center items-center space-y-5 '>
              <div className='flex items-center justify-center  mt-1 md:mt-2 bg-[#D9D9D944] w-25 md:w-34 h-8 md:h-10 rounded-[10px] md:rounded-[15px] mx-auto'>
                <img src={Diamond} className='h-4.25 w-4 md:h-6.5 md:w-6 mr-1 md:mr-2' />
                <p className='text-[18px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
                <p className='text-[13px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
              </div>

              <img src={squadDP} alt="Squad name" className='w-20 h-21 md:w-23.75 md:h-23.75 m-1 object-cover rounded-[15px] md:rounded-[30px] border-3 border-[#249138] ' />

              <img src={Pl2} alt="1st place" className=' h-19.25 w-19.25 ' />

            </div>


          </div>

          <div className=' hidden  w-full  bg-white rounded-[15px] md:rounded-[30px] lg:flex items-center justify-center mt-2 md:mt-4 p-3'>
            <img src={Logo2} alt="" className='h-50 w-140' />
          </div>

        </div>

        <div className=' min-h-100 w-full lg:w-[56%] bg-white rounded-[15px] md:rounded-[30px] mt-2 md:mt-4 lg:mt-0 p-2 md:p-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full  '>
          
          <div className='flex items-center  bg-[#D9D9D944] rounded-[15px] md:rounded-[30px] p-2 md:p-4 mb-2 md:mb4 '>
            <p className='text-[#249138] text-[22px] md:text-[30px] font-extrabold mr-3 md:mr-5 '>#1</p>
            <img src={squadDP} alt="Squad name" className='w-15 h-15.5 md:w-18 md:h-18 m-1 object-cover rounded-[15px] md:rounded-[20px] border-3 border-[#249138] mr-3 md:mr-5  ' />
            <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
              <p className='font-bold text-[16px] md:text-[20px]'>Squad Name</p>
              <p className='text-[#249138] text-[12px] md:text-[12px]'>{999 + " Members"}</p>
            </div>
            <div className='flex items-center justify-center bg-white w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] ml-auto '>
              <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />
              <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
              <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
            </div>
          </div>
          <div className='flex items-center  bg-[#D9D9D944] rounded-[15px] md:rounded-[30px] p-2 md:p-4 mb-2 md:mb4 '>
            <p className='text-[#249138] text-[22px] md:text-[30px] font-extrabold mr-3 md:mr-5 '>#1</p>
            <img src={squadDP} alt="Squad name" className='w-15 h-15.5 md:w-18 md:h-18 m-1 object-cover rounded-[15px] md:rounded-[20px] border-3 border-[#249138] mr-3 md:mr-5  ' />
            <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
              <p className='font-bold text-[16px] md:text-[20px]'>Squad Name</p>
              <p className='text-[#249138] text-[12px] md:text-[12px]'>{999 + " Members"}</p>
            </div>
            <div className='flex items-center justify-center bg-white w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] ml-auto '>
              <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />
              <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
              <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
            </div>
          </div>
          <div className='flex items-center  bg-[#D9D9D944] rounded-[15px] md:rounded-[30px] p-2 md:p-4 mb-2 md:mb4 '>
            <p className='text-[#249138] text-[22px] md:text-[30px] font-extrabold mr-3 md:mr-5 '>#1</p>
            <img src={squadDP} alt="Squad name" className='w-15 h-15.5 md:w-18 md:h-18 m-1 object-cover rounded-[15px] md:rounded-[20px] border-3 border-[#249138] mr-3 md:mr-5  ' />
            <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
              <p className='font-bold text-[16px] md:text-[20px]'>Squad Name</p>
              <p className='text-[#249138] text-[12px] md:text-[12px]'>{999 + " Members"}</p>
            </div>
            <div className='flex items-center justify-center bg-white w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] ml-auto '>
              <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />
              <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
              <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
            </div>
          </div>
          <div className='flex items-center  bg-[#D9D9D944] rounded-[15px] md:rounded-[30px] p-2 md:p-4 mb-2 md:mb4 '>
            <p className='text-[#249138] text-[22px] md:text-[30px] font-extrabold mr-3 md:mr-5 '>#1</p>
            <img src={squadDP} alt="Squad name" className='w-15 h-15.5 md:w-18 md:h-18 m-1 object-cover rounded-[15px] md:rounded-[20px] border-3 border-[#249138] mr-3 md:mr-5  ' />
            <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
              <p className='font-bold text-[16px] md:text-[20px]'>Squad Name</p>
              <p className='text-[#249138] text-[12px] md:text-[12px]'>{999 + " Members"}</p>
            </div>
            <div className='flex items-center justify-center bg-white w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] ml-auto '>
              <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />
              <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
              <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
            </div>
          </div>
          <div className='flex items-center  bg-[#D9D9D944] rounded-[15px] md:rounded-[30px] p-2 md:p-4 mb-2 md:mb4 '>
            <p className='text-[#249138] text-[22px] md:text-[30px] font-extrabold mr-3 md:mr-5 '>#1</p>
            <img src={squadDP} alt="Squad name" className='w-15 h-15.5 md:w-18 md:h-18 m-1 object-cover rounded-[15px] md:rounded-[20px] border-3 border-[#249138] mr-3 md:mr-5  ' />
            <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
              <p className='font-bold text-[16px] md:text-[20px]'>Squad Name</p>
              <p className='text-[#249138] text-[12px] md:text-[12px]'>{999 + " Members"}</p>
            </div>
            <div className='flex items-center justify-center bg-white w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] ml-auto '>
              <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />
              <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
              <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
            </div>
          </div>
          <div className='flex items-center  bg-[#D9D9D944] rounded-[15px] md:rounded-[30px] p-2 md:p-4 mb-2 md:mb4 '>
            <p className='text-[#249138] text-[22px] md:text-[30px] font-extrabold mr-3 md:mr-5 '>#1</p>
            <img src={squadDP} alt="Squad name" className='w-15 h-15.5 md:w-18 md:h-18 m-1 object-cover rounded-[15px] md:rounded-[20px] border-3 border-[#249138] mr-3 md:mr-5  ' />
            <div className='ml-1 md:ml-3 mb-1 flex flex-col items-start justify-center'>
              <p className='font-bold text-[16px] md:text-[20px]'>Squad Name</p>
              <p className='text-[#249138] text-[12px] md:text-[12px]'>{999 + " Members"}</p>
            </div>
            <div className='flex items-center justify-center bg-white w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] ml-auto '>
              <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />
              <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
              <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default leaderboard
