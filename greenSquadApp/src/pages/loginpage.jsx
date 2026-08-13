import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import toast from 'react-hot-toast'

import logo2 from '../assets/logo/logo2.png'
import logo3 from '../assets/logo/logo3.png'



const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)



    const handleLogin = async (e) => {

        e.preventDefault()

        setIsLoading(true)

        try {

            const response = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })

            const data = await response.json()

            console.log('Login response:', data)

            if (!response.ok) {

                if (data.detail) {
                    toast.error(data.detail)
                } else if (data.username) {
                    toast.error(data.username[0])
                } else if (data.password) {
                    toast.error(data.password[0])
                } else {
                    toast.error('Invalid username or password.')
                }

                return
            }

            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)

            toast.success('Login successful!')

            setTimeout(() => {
                window.location.href = '/'
            }, 1500)

        } catch (error) {

            console.error('Login error:', error)

            toast.error('Unable to connect to the server.')

        } finally {

            setIsLoading(false)

        }
    }


    return (
        <>

            <div className='min-h-screen bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] flex items-center justify-center px-6 py-10'>

                <div className='bg-white rounded-3xl shadow-xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden lg:px-20 lg:py-20'>

                    {/* Left */}

                    <div className='lg:w-1/2 flex items-center justify-center px-2 pb-7 pt-15 lg:p-10'>

                        {/* Mobile Logo */}

                        <img
                            src={logo3}
                            alt='Green Squad'
                            className='block lg:hidden w-72 md:w-120'
                        />

                        {/* Tablet & Desktop Logo */}

                        <img
                            src={logo2}
                            alt='Green Squad'
                            className='hidden lg:block w-72'
                        />

                    </div>


                    {/* Divider */}

                    <div className='hidden lg:block w-px bg-gray-300'></div>


                    {/* Right */}

                    <form
                        onSubmit={handleLogin}
                        className='lg:w-1/2 p-10'
                    >

                        <h1 className='text-[30px] font-bold text-green-700 mb-6'>
                            Login.
                        </h1>


                        <div className='space-y-3'>

                            {/* Username */}

                            <div>

                                <label className='text-sm text-gray-700'>
                                    Enter User Name
                                </label>

                                <input
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500'
                                    required
                                />

                            </div>


                            {/* Password */}

                            <div>

                                <label className='text-sm text-gray-700'>
                                    Enter Password
                                </label>

                                <div className='relative mt-1.5'>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full rounded-[15px] bg-gray-100 p-2 pr-12 outline-none focus:ring-2 focus:ring-green-500'
                                        required
                                    />

                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#249138] transition'
                                    >

                                        {showPassword ? (
                                            <IoIosEyeOff size={22} />
                                        ) : (
                                            <IoIosEye size={22} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Submit */}

                            <button
                                type='submit'
                                disabled={isLoading}
                                className='w-full mt-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white py-2 rounded-[15px] font-semibold transition'
                            >
                                {isLoading ? 'Logging in...' : 'Submit'}
                            </button>


                            {/* Register */}

                            <p className='text-sm'>

                                If you do not have any account{' '}

                                <a
                                    href='/register'
                                    className='text-green-600 cursor-pointer hover:underline'
                                >
                                    Create now.
                                </a>

                            </p>

                        </div>

                    </form>

                </div>

            </div>

        </>
    )
}

export default LoginPage