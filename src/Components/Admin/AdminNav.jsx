import React, { useContext, useEffect } from 'react'
import { Folder, Trash2,File,Moon,Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
function AdminNav({toggleDelete,handleSignOut,handleUpload}) {
  const { mode,setmode} = useContext(UserContext);
  useEffect(()=>{
    return (
      (mode === 'dark') ?
      document.getElementById('root').classList.add('dark') :
      document.getElementById('root').classList.remove('dark')
    )
    },[mode])
      const toggleMode = () => {
        setmode(mode === 'light'? 'dark' : 'light')
      }
  
  return (
    <nav className="border-gray-200  lg:px-6 bg-slate-100 px-4 w-full dark:bg-darkNav dark:shadow-sm fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center relative">
            <div className="flex justify-start items-center">
              <Link to="/admin" className="flex items-center justify-between mr-4">
                <img src="/assets/Logo.png" className="mr-3 h-16 ml-3" alt="Logo" />
              </Link>
            </div>
            <div className="flex items-center lg:order-2">
              <button onClick={toggleDelete} className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-rose-800">
                Delete
              </button>
              <button onClick={handleSignOut} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Logout
              </button>
            </div>
          </div>
        </nav>
  )
}

export default AdminNav