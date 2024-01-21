import { FileText } from 'lucide-react';
import React, { useContext, useEffect } from 'react';
import PdfViewer from '../PdfViewer/PdfViewer';
import { UserContext } from '../../context/AuthContext';
import AdminNav from './AdminNav';
import { Link } from 'react-router-dom';

function AdminFile({ file, key }) {


  return (
    <Link
      to={`/admin/folder/pdf/${file.name}/${file.id}`}
      target='_blank'
      className='cursor-pointer max-h-44 dark:bg-darkElevate dark:hover:bg-darkElevate/90 h-fit shadow-lg bg-lightElevate hover:bg-lightElevateHover transition-all duration-200 ease-in hover:scale-[1.03] dark:shadow-lg dark:shadow-neutral-900 px-6 py-8 flex items-center justify-start rounded-lg text-zinc-900 dark:text-slate-200'
      key={key}
    >
      <FileText className='mr-2 min-w-7' />
      <div className='text-wrap w-max'>{file.name}</div>
    </Link>
  );
}

export default AdminFile;
