import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-circular-progressbar/dist/styles.css";
import App from './App.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Dashboard,Login, Result, Home, Signup, History, Settings, Chat} from './pages'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes with Navbar & Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:id" element={<Result />} />

        <Route
          path="history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Focused tool pages — no navbar/footer chrome */}
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ResumeProvider>
        <RouterProvider router={router} />
      </ResumeProvider>
    </AuthProvider>
  </StrictMode>,
)
