import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import { Home,AboutUs,ContactUs,Four04,Dashboard,SignUp,Login } from './Components/index.js'
import PrivateRoute from './Components/InnerComponents/PrivateRoute'

export const Routes = createBrowserRouter(

  createRoutesFromElements(
    
    <Route path='/' element={<App />} >
      <Route path='/' element={<Home />}/>
      <Route path='aboutus' element={<AboutUs />}/>
      <Route path='contactus' element={<ContactUs />}/>
      <Route path='dashboard' element={
      <PrivateRoute>
      <Dashboard/>
      </PrivateRoute>}/>
      <Route path='signup' element={<SignUp />}/>
      <Route path='signin' element={<Login />}/>
      <Route path='*' element={<Four04 />}/>
    </Route>
    
))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Routes}/>
  </React.StrictMode>
)
