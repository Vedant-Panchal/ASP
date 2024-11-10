import React from "react";
import { ROOT_FOLDER } from "../Admin/hooks/useFolder";
import { Link, NavLink } from "react-router-dom";

interface Folder {
  id: string | null;
  name: string;
  path: Folder[];
}

interface ClientBreadCrumbProps {
  currentFolder: Folder;
}

const ClientBreadCrumb: React.FC<ClientBreadCrumbProps> = ({ currentFolder }) => {
  const path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER, ...currentFolder?.path];

  const renderChevron = () => (
    <svg
      className="rtl:rotate-180 block w-3 h-3 mx-1 dark:text-zinc-500 text-zinc-400"
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
  );

  return (
    <nav
      className="z-[30] flex py-4 fixed top-16 w-screen text-gray-700 bg-Light20 dark:bg-dark"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex justify-start flex-wrap items-center">
        {path.map((folder) => (
          <Link
            key={folder.id}
            to={folder.id ? `/dashboard/folder/${folder.id}` : "/dashboard"}
          >
            <div className="flex items-center">
              <div className="text-sm font-medium text-zinc-900 hover:text-zinc-800 dark:text-slate-200 dark:hover:text-slate-100">
                {folder.name}
              </div>
              {renderChevron()}
            </div>
          </Link>
        ))}
        {currentFolder && (
          <NavLink
            to={currentFolder.id ? `/dashboard/folder/${currentFolder.id}` : "/dashboard"}
            className={({ isActive }) => `${isActive ? "text-blue-600" : ""}`}
          >
            <div className="flex items-center">
              <div className="text-sm font-medium">{currentFolder.name}</div>
            </div>
          </NavLink>
        )}
      </ol>
    </nav>
  );
};

export default ClientBreadCrumb;
