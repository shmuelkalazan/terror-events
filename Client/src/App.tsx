import React from 'react'
import DashboardLayoutBasic from './Components/NavBar'
import { Router } from 'express'
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './Components/Main'

export default function App() {
  return (
    <div>
      {/* <Routes> */}
        {/* <Route path="home" element={<Main />} /> */}
        {/* <Route path="types" element={<About />} />
        <Route path="country" element={<Penetration />} />
        <Route path="year" element={<SignIn />} /> */}
        {/* <Route path="/" element={<Navigate to={"/home"} />} />
      </Routes> */}
      <DashboardLayoutBasic/>
    </div>
  )
}
