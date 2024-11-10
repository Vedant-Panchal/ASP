import { Folder } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface FolderProps {
  folder: {
    id: string;
    name: string;
  };
  key: string;
}

const ClientFolder: React.FC<FolderProps> = ({ folder, key }) => {
  const baseClasses = "rounded-lg h-fit md:h-20 shadow-lg flex items-center justify-start p-4 transition-all duration-200 ease-in hover:scale-[1.03]";
  const lightClasses = "bg-Light10 hover:bg-Light10/80";
  const darkClasses = "dark:bg-darkElevate dark:hover:bg-darkElevate/90 dark:shadow-neutral-900";
  
  return (
    <Link
      to={`/dashboard/folder/${folder.id}`}
      className={`${baseClasses} ${lightClasses} ${darkClasses}`}
      key={key}
    >
      <Folder className="mr-2 min-w-3 text-zinc-900 dark:text-slate-300" />
      <div className="truncate text-sm text-zinc-900 dark:text-slate-200">
        {folder.name}
      </div>
    </Link>
  );
};

export default ClientFolder;
