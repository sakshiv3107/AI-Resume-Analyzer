import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Dashboard,Login, Result, Signup,History,Settings} from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes with Navbar & Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Routes without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
