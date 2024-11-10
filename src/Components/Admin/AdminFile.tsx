import { FileText, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FileProps {
  id: string;
  name: string;
}

interface AdminFileProps {
  file: FileProps;
  onDelete: () => void;
  toggleDelete: boolean;
}

const AdminFile: React.FC<AdminFileProps> = ({ file, onDelete, toggleDelete }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const baseClasses = "rounded-lg relative cursor-pointer max-h-44 h-fit shadow-lg transition-all duration-200 ease-in hover:scale-[1.03]";
  const lightClasses = "bg-lightElevate hover:bg-lightElevateHover";
  const darkClasses = "dark:bg-darkElevate dark:hover:bg-darkElevate/90 dark:shadow-neutral-900";
  const deleteClasses = toggleDelete ? "opacity-70" : "";

  const tooltipClasses = "absolute z-[100] -top-8 left-0 px-3 py-2 text-sm font-medium rounded-lg shadow-lg w-max";
  const tooltipLightClasses = "text-zinc-900 border border-zinc-900 bg-slate-200/90";
  const tooltipDarkClasses = "dark:text-slate-200 dark:bg-darkElevateHover/90 dark:border";

  const deleteButtonClasses = `absolute md:top-2 md:right-2 top-0 right-0 dark:text-slate-50 hover:bg-dark/30 rounded-full p-2 ${toggleDelete ? "" : "hidden"}`;

  return (
    <button
      type="button"
      className={`${baseClasses} ${lightClasses} ${darkClasses} ${deleteClasses} md:px-6 md:py-8`}
    >
      <Link
        to={`/admin/folder/pdf/${file.name}/${file.id}`}
        target="_blank"
        className={`p-4 flex items-center justify-start text-zinc-900 dark:text-slate-200 ${toggleDelete ? "pointer-events-none" : ""}`}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <FileText className="mr-2 lg:min-w-7 min-w-5" />
        <div className="truncate w-max">{file.name}</div>
        {tooltipVisible && (
          <div
            role="tooltip"
            className={`${tooltipClasses} ${tooltipLightClasses} ${tooltipDarkClasses}`}
          >
            {file.name}
            <div className="tooltip-arrow bg-red-500 absolute z-[100]" />
          </div>
        )}
      </Link>
      <X
        className={deleteButtonClasses}
        size={30}
        strokeWidth={3}
        onClick={onDelete}
      />
    </button>
  );
};

export default AdminFile;
