import React from 'react'
import logo2 from "../assets/logo/logo2.png";
import logo3 from "../assets/logo/logo3.png";

const LoginPage = () => {
    return (
        <>
            <div className="min-h-screen bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] flex items-center justify-center px-6 py-10">

                <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden lg:px-20 lg:py-20">

                    {/* Left */}
                    <div className="lg:w-1/2 flex items-center justify-center px-2 pb-7 pt-15 lg:p-10">

                        {/* Mobile Logo */}
                        <img
                            src={logo3}
                            alt="Green Squad"
                            className="block lg:hidden w-72 md:w-120"
                        />

                        {/* Tablet & Desktop Logo */}
                        <img
                            src={logo2}
                            alt="Green Squad"
                            className="hidden lg:block w-72"
                        />

                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-gray-300"></div>

                    {/* Right */}
                    <form className="lg:w-1/2 p-10">

                        <h1 className="text-[30px] font-bold text-green-700 mb-6">
                            Login.
                        </h1>

                        <div className="space-y-3">

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter User Name or Email Id
                                </label>

                                <input
                                    type="text"
                                    className="mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter Password
                                </label>

                                <input
                                    type="password"
                                    className="mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <button className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white py-2 rounded-[15px] font-semibold transition">
                                Submit
                            </button>

                            <a
                                href="/"
                                className="text-sm text-green-600 hover:underline"
                            >
                                Forgot Password?
                            </a>

                            <p className="text-sm">
                                If you do not have any account{" "}
                                <span className="text-green-600 cursor-pointer hover:underline">
                                    Create now.
                                </span>
                            </p>

                        </div>

                    </form>

                </div>

            </div>


        </>
    )
}

export default LoginPage    
