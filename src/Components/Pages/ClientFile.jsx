import { FileText } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ClientFile({ file }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const openTooltip = () => {
    setTooltipVisible(true);
  };

  const closeTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <Link
      to={`/dashboard/folder/pdf/${file.name}/${file.id}`}
      target='_blank'
      className='relative rounded-lg dark:bg-darkElevate dark:hover:bg-darkElevate/90 h-fit md:h-20 shadow-lg bg-Light10 hover:bg-Light10/80 transition-all duration-200 ease-in hover:scale-[1.03] dark:shadow-lg dark:shadow-neutral-900 flex items-center justify-start p-4'
      onMouseOver={openTooltip}
      onMouseOut={closeTooltip}
    >
      <FileText className='mr-2 min-w-7 dark:text-slate-300 text-zinc-900' />
      <div className='truncate w-max text-zinc-900 dark:text-slate-200'>{file.name}</div>

      {/* Tooltip */}
      {tooltipVisible && (
        <div
          id="tooltip-light"
          role="tooltip"
          className='absolute z-[100] -top-8 left-0 px-3 py-2 text-sm font-medium dark:text-slate-200 dark:bg-darkElevateHover/90 dark:border  text-zinc-900 border border-zinc-900 bg-slate-200/90  rounded-lg shadow-lg w-max'
        >
          {file.name}
          <div className="tooltip-arrow bg-red-500 absolute z-[100]"  />
        </div>
      )}
    </Link>
  );
}

export default ClientFile;
