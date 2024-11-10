import { Folder } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface FolderProps {
  folder: {
    id: string;
    name: string;
  }
}

const AdminFolder: React.FC<FolderProps> = ({ folder }) => {
  const baseClasses = "cursor-pointer max-h-44 h-fit shadow-lg transition-all duration-200 ease-in hover:scale-[1.03] rounded-lg flex items-center justify-start p-4 md:px-6 md:py-8";
  const lightClasses = "bg-lightElevate hover:bg-lightElevateHover text-zinc-900";
  const darkClasses = "dark:bg-darkElevate dark:hover:bg-darkElevate/90 dark:shadow-neutral-900 dark:text-slate-200";

  return (
    <Link
      to={`/admin/folder/${folder.id}`}
      className={`${baseClasses} ${lightClasses} ${darkClasses}`}
    >
      <Folder className="mr-2" />
      <div className="truncate">{folder.name}</div>
    </Link>
  );
};

export default AdminFolder;
