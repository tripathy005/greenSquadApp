import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/homepage.jsx'
import LeaderBoard from './pages/leaderboardpage.jsx'
import SquadPage from './pages/squadpage.jsx'
import ProfilePage from './pages/profilepage.jsx'
import LoginPage from './pages/loginpage.jsx'
import RegisterPage from './pages/registerpage.jsx'
import AboutPage from './pages/aboutpage.jsx'

import AuthProvider, { useAuth } from './context/AuthProvider.jsx'


const AppRoutes = () => {

    const { authUser, setAuthUser } = useAuth()

    return (

        <Routes>

            <Route
                path="/"
                element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />

            <Route
                path="/leaderboard"
                element={authUser ? <LeaderBoard /> : <Navigate to="/login" />}
            />

            <Route
                path="/squad"
                element={authUser ? <SquadPage /> : <Navigate to="/login" />}
            />

            <Route
                path="/profile"
                element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="*" element={<Navigate to="/" />} />

        </Routes>

    )
}


const App = () => {

    return (

        <BrowserRouter>

            <AuthProvider>

                <AppRoutes />

            </AuthProvider>


            <Toaster
                position="top-center"
                reverseOrder={false}
                containerStyle={{
                    zIndex: 9999999,
                }}
                toastOptions={{
                    duration: 3000,
                }}
            />

        </BrowserRouter>

    )
}


export default App