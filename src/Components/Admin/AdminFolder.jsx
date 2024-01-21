import { Folder } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
function AdminFolder({folder,key}) {
  return (
    <Link
    to={`/admin/folder/${folder.id}`}
     className='max-w-44  h-fit min-w-32 dark:bg-darkElevate dark:hover:bg-darkElevate/90 shadow-lg bg-lightElevate hover:bg-lightElevateHover transition-all duration-200 ease-in hover:scale-[1.03] dark:shadow-lg dark:shadow-neutral-900 px-6 py-8 flex items-center justify-start rounded-lg text-zinc-900 dark:text-slate-200' key={key}>
      <Folder className='mr-2'/>
      <div className='truncate dark:text-slate-200'>
      {folder.name}
      </div>
      </Link>
  )
}

export default AdminFolder