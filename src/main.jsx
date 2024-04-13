import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import { Home,AboutUs,ContactUs,Four04,Dashboard,SignUp,Login,AdminDashboard } from './Components/index.js'
import PrivateRoute from './Components/InnerComponents/PrivateRoute'
import ForgotPasswordViaEmail from './Components/InnerComponents/ForgotPasswordViaEmail'
import AdminRoute from './Components/Admin/AdminRoute.jsx'
import AdminSignIn from './Components/Admin/AdminSignIn.jsx'
import PdfViewer from './Components/PdfViewer/PdfViewer.jsx'
import ClientPdfViewer from './Components/PdfViewer/ClientPdfViewer.jsx'
import Calculator from './Components/Pages/Calculator.jsx'

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
      <Route path='dashboard/calculator' element={
      <PrivateRoute>
      <Calculator/>
      </PrivateRoute>}/>
      
      <Route path='forgotpasswordemail' element={<ForgotPasswordViaEmail />}/>
      <Route path='signup' element={<SignUp />}/>
      <Route path='signin' element={<Login />}/>
      <Route path='adminsignin' element={<AdminSignIn />}/>
      <Route path='admin' element={
        <AdminRoute>
        <AdminDashboard/>
        </AdminRoute>
      }/>
      <Route path='/admin/folder/:folderId' element={
        <AdminRoute>
        <AdminDashboard/>
        </AdminRoute>
      }/>
      <Route path='/admin/folder/pdf/:fileName/:fileId' element={ 
        <AdminRoute>
        <PdfViewer/>
        </AdminRoute>

      }/>
      <Route path='/dashboard/folder/:folderId' element={
        <PrivateRoute>
        <Dashboard/>
        </PrivateRoute>
      }/>
      <Route path='/dashboard/folder/pdf/:fileName/:fileId' element={ 
        <PrivateRoute>
        <ClientPdfViewer/>
        </PrivateRoute>

      }/>
      <Route path='*' element={<Four04 />}/>
    </Route>
    
))
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={Routes}/>
)
