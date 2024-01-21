import { FileText, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import PdfViewer from '../PdfViewer/PdfViewer';
import { UserContext } from '../../context/AuthContext';
import AdminNav from './AdminNav';
import { Link } from 'react-router-dom';
import { Button } from '@react-pdf-viewer/core';

function AdminFile({ file, key, onDelete,toggleDelete }) {
  
  return (
    <button type="button" className={`rounded-lg relative cursor-pointer  max-h-44 dark:bg-darkElevate dark:hover:bg-darkElevate/90 h-fit shadow-lg bg-lightElevate hover:bg-lightElevateHover transition-all duration-200 ease-in hover:scale-[1.03] dark:shadow-lg dark:shadow-neutral-900 md:px-6 md:py-8 ${
      toggleDelete ? 'opacity-70' : ''
    }`}>
    <Link
    type='button'
      to={`/admin/folder/pdf/${file.name}/${file.id}`}
      target='_blank'
      className={` 
      p-4 flex items-center justify-start  text-zinc-900 dark:text-slate-200 
      ${
        toggleDelete ? 'pointer-events-none' : ''
      }`}
      key={key}
    >
      
      <FileText className='mr-2 lg:min-w-7 min-w-5' />
      <div className='truncate w-max'>{file.name}</div>
    </Link>
    <X
        className={`absolute md:top-2 md:right-2 top-0 right-0 dark:text-slate-50 hover:bg-dark/30 rounded-full p-2 ${toggleDelete ? '' : 'hidden'} `}
        size={30}
        strokeWidth={3}
        onClick={onDelete}
      />
    </button>
  );
}
export default AdminFile;
