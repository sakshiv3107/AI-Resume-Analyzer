import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

function Hero() {
  const { user } = useAuth();   // was: currentUser

  return (
    <>
        <section className="max-w-8xl mx-auto px-8 py-16 lg:py-16 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="max-w-2xl">
                    <span className='inline-block rounded-full border px-4 py-2 text-xs tracking-widest uppercase'>AUTO AWESOME NEXT-GEN CAREER INTELLIGENCE</span>
                    <h1 className="text-5xl font-bold leading-tight py-2">Unlock Your
                    <span className="text-blue-600 italic"> Career Potential </span>
                     with AI Intelligence</h1>

                    <p className="mt-6 text-lg text-gray-600">Optimize your professional identity with high-precision ATS scoring, real-time keyword matching, and AI-driven content enhancement</p>

                    <div className="mt-8 flex gap-4">
                        <NavLink
                            to="/dashboard"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                            Get Started
                        </NavLink>
                        {!user && (
                            <NavLink
                            to="/login"
                            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                            Login
                        </NavLink>
                        )}
                    </div>
                </div>
                <div className="relative">
                    <div className="bg-white rounded-3xl shadow-xl border-none p-8">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

                        <div className="space-y-3">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero