import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/homepage.jsx'
import SuperintendentPage from './pages/superintendent.jsx'
import UsersPage from './pages/users.jsx'
import SquadPage from './pages/squad.jsx'
import LoginPage from './pages/loginpage.jsx'

import AuthProvider, { useAuth } from './context/AuthProvider.jsx'


const AppRoutes = () => {

    const [
        authUser,
        setAuthUser,
        userRole,
        setUserRole
    ] = useAuth()


    return (
        <Routes>

            {/* Issues
                Admin + Superintendent
            */}
            <Route
                path="/"
                element={
                    authUser
                        ? <HomePage />
                        : <Navigate to="/login" />
                }
            />


            {/* Superintendent
                Admin only
            */}
            <Route
                path="/superintendent"
                element={
                    authUser && userRole === 'admin'
                        ? <SuperintendentPage />
                        : <Navigate to="/" />
                }
            />


            {/* Users
                Admin only
            */}
            <Route
                path="/users"
                element={
                    authUser && userRole === 'admin'
                        ? <UsersPage />
                        : <Navigate to="/" />
                }
            />


            {/* Squad
                Admin only
            */}
            <Route
                path="/squad"
                element={
                    authUser && userRole === 'admin'
                        ? <SquadPage />
                        : <Navigate to="/" />
                }
            />


            {/* Login */}
            <Route
                path="/login"
                element={
                    authUser
                        ? <Navigate to="/" />
                        : <LoginPage />
                }
            />


            {/* Unknown routes */}
            <Route
                path="*"
                element={<Navigate to="/" />}
            />

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