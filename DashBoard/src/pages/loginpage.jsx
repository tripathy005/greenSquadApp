import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider.jsx";
import { encryptData } from '../utils/secureStorage'
import logo from "../assets/logo/Dlogo.png";
import { toast } from "react-hot-toast";


const LoginPage = () => {

    const [
        authUser,
        setAuthUser,
        userRole,
        setUserRole,
        user,
        setUser
    ] = useAuth()

    // for toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)


            // Login
            const response = await fetch(
                '/api/auth/login/',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            )


            const data = await response.json()


            if (!response.ok) {

                toast.error(
                    data.detail || 'Invalid username or password'
                )

                return
            }


            // Save JWT tokens
            localStorage.setItem(
                'access_token',
                data.access
            )

            localStorage.setItem(
                'refresh_token',
                data.refresh
            )


            // Get logged-in user profile
            const profileResponse = await fetch(
                '/api/auth/profile/',
                {
                    method: 'GET',

                    headers: {
                        'Content-Type': 'application/json',

                        'Authorization': `Bearer ${data.access}`,
                    },
                }
            )


            const userData = await profileResponse.json()


            if (!profileResponse.ok) {

                toast.error(
                    userData.detail || 'Unable to get user information'
                )

                return
            }


            // Encrypt user data
            const encryptedUserData = encryptData(
                userData
            )


            // Store encrypted user data
            localStorage.setItem(
                'user_info',
                encryptedUserData
            )


            // Get role for current React session
            setUserRole(userData.role)


            // Set authentication
            setAuthUser(true)


            toast.success('Login successful')

            setUser(userData)
            setUserRole(userData.role)
            setAuthUser(true)


            navigate('/')


        } catch (error) {

            console.error(error)

            toast.error('Something went wrong')

        } finally {

            setLoading(false)

        }

    }


    return (
        <>
            <div className="min-h-screen bg-[linear-gradient(to_top,#E6FFE1_0%,#ABD3A4_100%)] flex items-center justify-center px-6 py-10">

                <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden lg:px-20 lg:py-20">

                    {/* Left */}
                    <div className="lg:w-1/2 flex items-center justify-center px-2 pb-7 pt-15 lg:p-10">

                        <img
                            src={logo}
                            alt="Green Squad"
                            className=" w-72 md:w-120"
                        />


                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-gray-300"></div>

                    {/* Right */}
                    <form onSubmit={handleLogin} className="lg:w-1/2 p-10">

                        <h1 className="text-[30px] font-bold text-green-700 mb-6">
                            Login.
                        </h1>

                        <div className="space-y-3">

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter User Name
                                </label>

                                <input
                                    type="text"
                                    value={username}
                                    autoComplete="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1.5 w-full rounded-[15px] bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter Password
                                </label>

                                <div className="relative mt-1.5">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-[15px] bg-gray-100 p-2 pr-12 outline-none focus:ring-2 focus:ring-green-500"
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white py-2 rounded-[15px] font-semibold transition disabled:opacity-60"
                            >
                                {loading ? 'Logging in...' : 'Submit'}
                            </button>



                        </div>

                    </form>

                </div>

            </div>


        </>
    )
}

export default LoginPage    
