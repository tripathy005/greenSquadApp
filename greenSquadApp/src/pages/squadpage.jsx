import React from 'react'
import Navbar from '../components/navbar.jsx'
import squadDP from '../assets/groupdp/greenCore.png'
import Diamond from '../assets/icon/Diamond.png'
import dp from '../assets/dp/Kunal Verma.png'
import { MdEditSquare } from "react-icons/md";


const members = Array(16).fill({
    name: "Kunal Verma",
    score: 1123
});




function squadpage() {
    return (
        <>
            <Navbar />


            <div className='p-2 md:p-3 lg:p-4 bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full'>
                <div className='w-full flex flex-col lg:flex-row justify-between '>
                    <div className=' w-full lg:w-[65vw] lg:h-[77vh] p-5 md:p-10 lg:py-5 rounded-[15px] md:rounded-[30px] bg-white '>
                        <div className='flex items-center'>
                            <img src={squadDP} alt="Squad name" className='w-20 h-20 md:w-60 md:h-60 my-3 object-cover rounded-full border-3 border-[#249138] ' />
                            <div class="ml-1 w-full justify-between md:ml-10 flex md:flex-col ">
                                <div >
                                    <p className='text-[#249138] font-bold text-[16px] md:text-[35px]'>Squad Name</p>
                                    <p className='text-[12px] md:text-[18px]'>{999 + " Members"}</p>
                                </div>

                                <div className='flex items-center justify-center bg-[#D9D9D944] w-20 md:w-34 h-7 md:h-10 rounded-[10px] md:rounded-[15px] md:mt-5 '>
                                    <img src={Diamond} className='h-3.25 w-3 md:h-6.5 md:w-6 mr-1 md:mr-2' />
                                    <p className='text-[12px]/[24px] md:text-[25px]/[28px] text-[#249138] font-extrabold tracking-[2px] md:tracking-[4px] '>1234 </p>
                                    <p className='text-[9px]/[24px] md:text-[14px]/[28px] text-[#249138] font-extrabold  '>+ </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className=' font-extrabold md:text-[25px] ml-2 md:ml-3'>Group Description</h2>
                            <div className='my-2 w-full  lg:h-50 py-1 px-2 md:p-3 text-[10px] md:text-[20px] md:leading-8 tracking-wide bg-[#D9D9D944] rounded-[15px] md:overflow-auto'>
                                <p className=' line-clamp-3 xl:line-clamp-5'>
                                    Here’s the same description with emojis added naturally:
                                    Urban Greens is a squad dedicated to making city life cleaner and more sustainable 🌱🏙️. From planting trees and saving energy to keeping our streets and parks clean, we believe small actions create big change 🌍. We take on eco challenges together, track our progress, and support each other every day 🤝. Our goal is simple — build a greener, healthier community for everyone 💚✨
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-1 md:gap-3 justify-end mt-4'>
                            <button className=' bg-[#538e3c] rounded-[11px]  flex items-center justify-center px-2 py-1 text-[12px] md:text-[20px] text-[#E2F6E8] font-bold border-3 border-[#E2F6E8]'>
                                Leave the Squad
                            </button>
                            <button className=' bg-[#538e3c] rounded-[11px]  flex items-center justify-center px-2 py-1 text-[12px] md:text-[20px] text-[#E2F6E8] font-bold border-3 border-[#E2F6E8]'>
                                Edit<MdEditSquare className=' h-5 w-5 md:h-8 md:w-8 py-1' color="#E2F6E8" />
                            </button>
                        </div>
                    </div>


                    {/* <div className='  w-full h-90 md:h-120 lg:h-[77vh] lg:w-[32vw] mt-2 md:mt-4 lg:mt-0  rounded-[15px] md:rounded-[30px] bg-white'>
                        <h2 className='bg-[#538e3c] md:text-[25px] lg:text-[18px] text-white font-extrabold text-center p-3 md:p-4 lg:p-3 rounded-tl-[15px] rounded-tr-[15px] md:rounded-tl-[30px] md:rounded-tr-[30px] '>Crew Members</h2>
                        <div className='p-5 md:p-10 lg:py-5'>
                        
                        </div>
                    </div> */}
                    <div className="bg-white rounded-[30px] overflow-hidden w-full h-90 md:h-120 lg:h-[77vh] lg:w-[32vw] mt-2 md:mt-4 lg:mt-0 ">

                        <h2 className='bg-[#538e3c] md:text-[25px] lg:text-[18px] text-white font-extrabold text-center p-3 md:p-4 lg:p-3 rounded-tl-[15px] rounded-tr-[15px] md:rounded-tl-[30px] md:rounded-tr-[30px] '>Crew Members</h2>


                        <div className="p-4 space-y-5 lg:h-160 
                        overflow-y-auto 
                        [&::-webkit-scrollbar]:w-2 
                        [&::-webkit-scrollbar-track]:my-5 
                        [&::-webkit-scrollbar-track]:bg-[#D9D9D9] 
                        [&::-webkit-scrollbar-thumb]:bg-[#249138]/60 
                        [&::-webkit-scrollbar-thumb]:rounded-full 
                        [&::-webkit-scrollbar-track]:rounded-full">

                            {members.map((member, index) => (

                                <div
                                    key={index}
                                    className="flex justify-between items-center"
                                >

                                    <div className="flex items-center gap-3">

                                        <img
                                            src={dp}
                                            className="w-12 h-12 rounded-full"
                                        />

                                        <div>

                                            <p className="font-bold">
                                                {member.name}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Crew Member
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center">

                                        <img
                                            src={Diamond}
                                            className="w-4 mr-1"
                                        />

                                        <span className="text-[#249138] font-bold">
                                            {member.score}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                </div>

                <div>
                </div>
            </div>

        </>
    )
}

export default squadpage
