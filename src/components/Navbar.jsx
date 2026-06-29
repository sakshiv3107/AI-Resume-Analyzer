import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <navbar className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
            <Link to="/">Home</Link>
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
            <Link to="/Result">Result</Link>
        </div>
      </nav>
    </navbar>
  )
}

export default Navbar