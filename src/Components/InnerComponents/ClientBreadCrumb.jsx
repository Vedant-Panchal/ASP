import React from 'react'
import { ROOT_FOLDER } from '../Admin/hooks/useFolder'
import { Link, NavLink } from 'react-router-dom'

function ClientBreadCrumb({currentFolder}) {
            let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if(currentFolder) path = [...path,...currentFolder.path]
  return (
    <>
    <nav
      className="flex py-4 fixed top-16 w-screen text-gray-700  bg-light dark:bg-dark"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex justify-start flex-wrap items-center md:space-x-2">
        {path.map((folder,index)=>(
        <Link to={folder.id ? `/dashboard/folder/${folder.id}`: "/dashboard"} key={folder.id}
        >
          <div className="flex items-center">
            <div
              className="ms-1 text-sm font-medium text-zinc-900 hover:text-zinc-800 md:ms-2 dark:text-slate-200 dark:hover:text-slate-100"
            >
              {folder.name}
            </div>
            <svg
              className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
          </div>
        </Link>
        ))}
        {currentFolder && (
        <NavLink className={({isActive})=>`${isActive ? 'text-blue-600':''}`} >
        <div className="pl-1 flex items-center">
          <div
            className="text-sm font-medium "
          >
            {currentFolder.name}
          </div>
          
        </div>
      </NavLink>
      )}
      </ol>
    </nav>
  </>
  
  )
}

export default ClientBreadCrumb;