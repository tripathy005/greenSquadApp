import React from "react";
import logo2 from "../assets/logo/logo2.png";
import logo3 from "../assets/logo/logo3.png";

const RegisterPage = () => {
    return (
        <>
            <div className="min-h-screen bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] flex items-center justify-center px-6 py-10">

                <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden lg:px-20 lg:py-10">

                    {/* Left */}
                    <div className="lg:w-1/2 flex items-center justify-center px-2 pb-7 pt-15 lg:p-10">

                        {/* Mobile Logo */}
                        <img
                            src={logo3}
                            alt="Green Squad"
                            className="block lg:hidden w-72 md:w-120"
                        />

                        {/* Desktop Logo */}
                        <img
                            src={logo2}
                            alt="Green Squad"
                            className="hidden lg:block w-72"
                        />

                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px  bg-gray-300"></div>

                    {/* Right */}
                    <form className="lg:w-1/2 px-10 py-7">

                        <h1 className="text-[30px] font-bold text-green-700 mb-6">
                            Register.
                        </h1>

                        <div className="space-y-3">

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter your Email Id
                                </label>

                                <input
                                    type="email"
                                    className="mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter your Name
                                </label>

                                <input
                                    type="text"
                                    className="mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Create Username
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

                            <div>
                                <label className="text-sm text-gray-700">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    className="mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <button className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white py-2 rounded-[15px] font-semibold transition">
                                Submit
                            </button>

                            <p className="text-sm">
                                Already have an account?{" "}
                                <span className="text-green-600 cursor-pointer hover:underline">
                                    Login now.
                                </span>
                            </p>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
};

export default RegisterPage;