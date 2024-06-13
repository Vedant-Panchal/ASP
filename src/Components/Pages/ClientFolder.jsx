import { Folder } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ClientFolder({ folder, key }) {
  return (
    <Link
      to={`/dashboard/folder/${folder.id}`}
      className="rounded-lg dark:bg-darkElevate dark:hover:bg-darkElevate/90 h-fit md:h-20  shadow-lg bg-Light10 hover:bg-Light10/80 transition-all duration-200 ease-in hover:scale-[1.03] dark:shadow-lg dark:shadow-neutral-900 flex items-center justify-start p-4"
      key={key}
    >
      <Folder className="mr-2 min-w-3 dark:text-slate-300 text-zinc-900" />
      <div className="truncate text-zinc-900 dark:text-slate-200 text-sm">
        {folder.name}
      </div>
    </Link>
  );
}

export default ClientFolder;
