import { Folder, X } from 'lucide-react'
import React from 'react'

import { Link } from 'react-router-dom'
function AdminFolder({folder}) {
  return (
    <Link
    to={`/admin/folder/${folder.id}`}
     className='cursor-pointer max-h-44 dark:bg-darkElevate dark:hover:bg-darkElevate/90 h-fit shadow-lg bg-lightElevate hover:bg-lightElevateHover transition-all duration-200 ease-in hover:scale-[1.03] dark:shadow-lg dark:shadow-neutral-900 md:px-6 md:py-8
     p-4
     flex items-center justify-start rounded-lg text-zinc-900 dark:text-slate-200' >
      <Folder className='mr-2'/>
      
      <div className='truncate dark:text-slate-200'>
      {folder.name}
      </div>
      </Link>
  )
}

export default AdminFolder