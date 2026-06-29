import React from 'react'
import { NavLink } from 'react-router-dom'
function Login() {
  return (
    
    <div className="min-h-screen bg-gray-200">
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10" >
        <h1 className="
text-4xl
font-bold
text-blue-600
text-center
">
ResumeIQ AI
</h1>
<p className="
text-center
text-gray-600
mt-3
">
Intelligent Precision for Your Career
</p>
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mt-8">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input placeholder="Email" className=" w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
            Password
          </label>
          <input placeholder="Password" type="password" className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-700 transition duration-200">
            Login
          </button>

          <div className="flex items-center my-6">

          <hr className="flex-1"/>

          <span className="mx-3 text-gray-400">
          OR
          </span>

          <hr className="flex-1"/>

          </div>
          <div className="border
border-gray-300
rounded-lg
py-3
hover:bg-gray-100
transition">
            <button className="flex items-center justify-center w-full">
              <img src="/google-icon.svg" alt="Google Icon" className="w-5 h-5 mr-2"/>
              <span className="text-gray-700">Login with Google</span>
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <NavLink to="/signup" className="text-blue-600 hover:underline">Sign Up</NavLink>
          </div>
        </div>
  

      </div>

    </div>
  )
}

export default Login