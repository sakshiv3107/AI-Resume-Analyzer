import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Dashboard, Home, Login, Result, Signup} from './pages'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}></Route>
      <Route path='Dashboard' element={<Dashboard/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='Signup' element={<Signup/>}/>
      <Route path='Result' element={<Result/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
