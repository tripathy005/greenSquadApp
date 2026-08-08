
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/homepage.jsx'
import LeaderBoard from './pages/leaderboardpage.jsx'
import SquadPage from './pages/squadpage.jsx'
import LoginPage from './pages/loginpage.jsx'
import RegisterPage from './pages/registerpage.jsx'
import AboutPage from './pages/aboutpage.jsx'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderBoard  />} />
        <Route path="/squad" element={<SquadPage  />} />
        <Route path="/login" element={<LoginPage  />} />
        <Route path="/register" element={<RegisterPage  />} />
        <Route path="/about" element={<AboutPage  />} />
        
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
      
    </>
  )
}
