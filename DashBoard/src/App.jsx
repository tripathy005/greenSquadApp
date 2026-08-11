import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from './pages/homepage.jsx'
import SuperintendentPage from './pages/superintendent.jsx'
import UsersPage from './pages/users.jsx'
import SquadPage from './pages/squad.jsx'
import LoginPage from './pages/loginpage.jsx'

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          zIndex: 9999999,
        }}
        toastOptions={{
          duration: 3000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/superintendent" element={<SuperintendentPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/squad" element={<SquadPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
