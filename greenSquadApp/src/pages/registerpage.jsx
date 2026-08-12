import React, { useState } from "react";
import API from "../api/api.js";
import { toast } from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import logo2 from "../assets/logo/logo2.png";
import logo3 from "../assets/logo/logo3.png";

const RegisterPage = () => {

    // for toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // for form data
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    // Function to handle form submission
    const handleRegister = async (e) => {

        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.')
            return
        }

        setIsLoading(true)

        try {

            const response = await API.register({
                full_name: name,
                username: username,
                email: email,
                password: password,
            })
            
            // Log the response for debugging
            const data = await response.json()

            console.log('Register response:', data)

            if (!response.ok) {

                if (data.username) {
                    toast.error(data.username[0])
                } else if (data.email) {
                    toast.error(data.email[0])
                } else if (data.password) {
                    toast.error(data.password[0])
                } else if (data.detail) {
                    toast.error(data.detail)
                } else {
                    toast.error('Registration failed.')
                }

                return
            }

            toast.success('Account created successfully! Please login.')

            setEmail('')
            setName('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')

            setTimeout(() => {
                window.location.href = '/login'
            }, 3500)

        } catch (error) {

            console.error('Registration error:', error)

            toast.error('Unable to connect to the server.')

        } finally {

            setIsLoading(false)

        }
    }

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
                    <form onSubmit={handleRegister} className="lg:w-1/2 px-10 py-7">

                        <h1 className="text-[30px] font-bold text-green-700 mb-6">
                            Register.
                        </h1>

                        <div className="space-y-3">

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter your Email Id
                                </label>

                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500'
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter your Name
                                </label>

                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500'
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Create Username
                                </label>

                                <input
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500'
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter Password
                                </label>

                                <div className="relative mt-1.5">

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full rounded-[15px] bg-gray-100 p-2 pr-12 outline-none focus:ring-2 focus:ring-green-500'
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#249138] transition"
                                    >
                                        {showPassword ? (
                                            <IoIosEyeOff size={22} />
                                        ) : (
                                            <IoIosEye size={22} />
                                        )}
                                    </button>

                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="relative mt-1.5">

                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className='w-full rounded-[15px] bg-gray-100 p-2 pr-12 outline-none focus:ring-2 focus:ring-green-500'
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#249138] transition"
                                    >
                                        {showConfirmPassword ? (
                                            <IoIosEyeOff size={22} />
                                        ) : (
                                            <IoIosEye size={22} />
                                        )}
                                    </button>

                                </div>
                            </div>

                            <button
                                type='submit'
                                disabled={isLoading}
                                className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white py-2 rounded-[15px] font-semibold transition"
                            >
                                Submit
                            </button>

                            <p className="text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="text-green-600 cursor-pointer hover:underline">
                                    {isLoading ? 'Creating Account...' : 'Login now.'}
                                </a>
                            </p>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
};

export default RegisterPage;