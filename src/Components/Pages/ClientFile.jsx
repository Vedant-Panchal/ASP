import { FileText } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ClientFile({ file, key }) {
  return (
    <Link
    to={`/dashboard/folder/pdf/${file.name}/${file.id}`}
    target='_blank'
    className='rounded-lg dark:bg-darkElevate dark:hover:bg-darkElevate/90 h-fit md:h-20  shadow-lg bg-lightElevate hover:bg-lightElevateHover transition-all duration-200 ease-in hover:scale-[1.03] dark:shadow-lg dark:shadow-neutral-900 flex items-center justify-start p-4'
    key={key}
  >
    <FileText className='mr-2 min-w-7 dark:text-slate-300 text-zinc-900' />
    <div className='text-wrap w-max text-zinc-900 dark:text-slate-200'>{file.name}</div>
  </Link>
  )
}

export default ClientFile