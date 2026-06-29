import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Layout() {
  return (
    <>
        <Navbar/>
        <main className="min-h-screen">
            <Outlet />
        </main>
        <Footer/>

    </>
  )
}

export default Layout