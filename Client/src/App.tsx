import React from 'react'
import DashboardLayoutBasic from './Components/NavBar'
import { Router } from 'express'
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './Components/Main'

export default function App() {
  return (
    <div>
      <DashboardLayoutBasic/>
    </div>
  )
}
