import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  ChevronDown,
  ChevronUp,
  PowerOff,
  FileText,
  PanelsTopLeft,
  BellRing,
  XCircle,
  Moon,
  Sun,
} from "lucide-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useFolder } from "../Admin/hooks/useFolder";
import AdminFolder from "../Admin/AdminFolder";
import ClientFolder from "./ClientFolder";
import FolderBreadCrumb from "../Admin/FolderBreadCrumb";
import ClientFile from "./ClientFile";
import ClientBreadCrumb from "../InnerComponents/ClientBreadCrumb";

// import { onMessage } from "firebase/messaging";
function Dashboard() {
  const [error, seterror] = useState("");
  const [asidehidden, setasidehidden] = useState(true);
  const [asidecourses, setasidecourses] = useState(true);
  const [notiHidden, setNotiHidden] = useState(true);
  const [profileHidden, setProfileHidden] = useState(true);
  const [welcomehidden, setwelcomehidden] = useState(false);
  const navigate = useNavigate();

  const { currentUser, logoutUser, mode, setmode } = useContext(UserContext);

  const userName = currentUser.displayName;
  const userEmail = currentUser.email;
  console.log(userName);
  const [profilePicture, setProfilePicture] = useState(null);
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (currentUser) {
          const url = `https://api.dicebear.com/7.x/initials/svg?seed=${userName}`;
          setProfilePicture(url);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userEmail]);
  const handleSignOut = async () => {
    seterror("");

    const bgColor = mode === "dark" ? "#15131D" : "#F2F2F1";
    const txtColor = mode === "dark" ? "#F1F5F9" : "#18181B";
    Swal.fire({
      title: "Are you sure?",
      imageUrl: "assets/svgviewer-png-output.png  ",
      text: "You will be logged out of this application",
      showDenyButton: true,
      confirmButtonText: "Yes, logout",
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton:
          "px-3 py-2.5 border border-emerald-400 mr-2 rounded-lg text-md bg-green-500/70 hover:bg-green-500/80 focus:bg-green-500/80",
        denyButton:
          "px-3 py-2.5 border border-rose-300 rounded-lg text-md bg-rose-500/70 hover:bg-rose-500/80 focus:bg-rose-500/80",
      },
      buttonsStyling: false,
      background: bgColor,
      color: txtColor,
      backdrop: `
        rgba(46, 43, 59, 0.8) 
        left top
        no-repeat
        `,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logoutUser();
        navigate("/signin");
      } else if (result.isDenied) {
        return;
      }
    });
  };
  useEffect(() => {
    return mode === "dark"
      ? document.getElementById("root").classList.add("dark")
      : document.getElementById("root").classList.remove("dark");
  }, [mode]);
  const toggleMode = () => {
    setmode(mode === "light" ? "dark" : "light");
  };
  return (
    <div className="antialiased h-max  bg-light dark:bg-dark">
      <nav className="bg-slate-100 px-4  dark:bg-darkNav dark:shadow-sm fixed left-0 right-0 top-0 z-50 shadow-lg rounded-sm">
        <div className="flex flex-wrap justify-between items-center relative">
          <div className="flex justify-start items-center">
            <button
              className="p-2 mr-2 text-slate-600 rounded-lg cursor-pointer  hover:text-gray-900 hover:bg-slate-200/80 focus:bg-slate-200/80 dark:focus:bg-darkElevateHover  dark:focus:ring-gray-700 dark:text-slate-200 dark:hover:bg-darkElevate dark:hover:text-slate-300 transition-all duration-200 ease-in"
              onClick={() => {
                setasidehidden(!asidehidden), setasidecourses(true);
              }}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Link
              to="/dashboard"
              className="flex items-center justify-between mr-4"
            >
              <img
                src="assets/Logo.png"
                className="mr-3 h-16 ml-3"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex items-center lg:order-2">
          <ul className="flex flex-col lg:flex-row  lg:space-x-8 lg:items-center lg:w-auto">
         
            <li>
            <NavLink
                to={"/aboutus"}
                className={({ isActive }) =>
                  `block relative py-2 pr-4 pl-3 dark:border-transparent after:content[''] after:w-full after:h-1 after:block after:absolute after:-bottom-2 after:left-0 after:bg-transparent transition-all duration-500 ease-in after:border-transparent border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 font-bold dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700 ${
                    isActive ? 'text-blue-800 dark:text-blue-300' : 'dark:text-slate-200 text-zinc-900'
                  } hover:after:bg-[#FC54AD] hover:border-transparent`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contactus"}
                
                className={({ isActive }) =>
                  `block mr-3 relative py-2 pr-4 pl-3 dark:border-transparent after:content[''] after:w-full after:h-1 after:block after:absolute after:-bottom-2 after:left-0 after:bg-transparent transition-all duration-500 ease-in after:border-transparent border-gray-500 lg:hover:bg-transparent lg:border-0 lg:p-0 font-bold dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700 ${
                    isActive ? 'text-blue-800 dark:text-blue-300' : 'dark:text-slate-200 text-zinc-900'
                  } hover:after:bg-[#FC54AD] hover:border-transparent`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
            <button
              className={`${
                mode === "light" ? "bg-yellow-300" : "bg-darkElevate"
              } w-fit h-fit p-2 rounded-full transition-all duration-500 ease-in mr-2`}
              onClick={toggleMode}
            >
              <span className="transition-all duration-200 ease-in">
                {mode === "dark" ? (
                  <Moon size={22} className=" opacity-100 text-slate-100" />
                ) : (
                  <Sun size={22} className="text-yellow-800 opacity-100" />
                )}
              </span>
            </button>
            <button
              type="button"
              className="flex mr-2 text-sm z-50 dark:bg-darkElevate rounded-full md:mr-2"
              id="user-menu-button"
              onClick={() => setProfileHidden(!profileHidden)}
            >
              <img
                className="w-8 h-8 m-2 rounded-full"
                src={profilePicture}
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            <div
              className="absolute top-0 right-0 z-20 my-2 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-dark dark:divide-gray-600 rounded-xl"
              id="dropdown"
              hidden={profileHidden}
            >
              <div className="py-3 px-4 as">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {userName}
                </span>
                <span className="block text-xs text-gray-900 truncate dark:text-white mt-5">
                  {userEmail}
                </span>
              </div>
              

              <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
              >
                <li
                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-darkElevate dark:text-slate-100 dark:hover:text-slate-200 cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ease-in-out duration-200 bg-white border-r shadow-xl border-gray-200  dark:bg-darkNav dark:border-gray-700 ${
          asidehidden ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-transparent">
          <ul className="space-y-2">
            <li>
              <Link className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-gray-100 dark:text-white dark:hover:bg-darkElevate ">
                <PanelsTopLeft />
                <span className="ml-3 dark:text-white font-medium">
                  Overview
                </span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-gray-100 dark:text-white dark:hover:bg-darkElevate "
                onClick={() => setasidecourses(!asidecourses)}
              >
                <FileText />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Courses
                </span>
                <div>
                  <ChevronDown strokeWidth={2.5} hidden={!asidecourses} />
                </div>
                <div hidden={asidecourses}>
                  <ChevronUp strokeWidth={2.5} />
                </div>
              </button>
              <ul
                id="dropdown-pages"
                className={`py-2 space-y-2 transition-transform ease-in-out duration-200 delay-100 ${
                  asidecourses ? "-translate-x-full" : "translate-x-0"
                }`}
                hidden={asidecourses}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-gray-100 dark:text-white dark:hover:bg-darkElevate "
                  >
                    C1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-gray-100 dark:text-white dark:hover:bg-darkElevate "
                  >
                    C2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-gray-100 dark:text-white dark:hover:bg-darkElevate "
                  >
                    C3
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {/* Power off button */}
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in hover:bg-gray-100 dark:hover:bg-darkElevate dark:text-white group "
                onClick={handleSignOut}
              >
                <PowerOff />
                <span className="ml-3">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main
        className={`p-4 min-h-screen pt-20 transition-all ease-in-out delay-[40] duration-200 mb-20 ${asidehidden ? "md:pl-0" : "md:pl-64 "}`}
      >
        <div className="flex flex-row items-center md:mt-10 mt-10">
          <h1
            className="dark:text-slate-100 text-zinc-900 lg:text-2xl text-xs font-bold md:pl-4 mb-2 "
            hidden={welcomehidden}
          >
            Hey {userName} <span className="wave">👋</span>, We have been
            missing you! 😊
          </h1>
          <div className="ml-3" hidden={welcomehidden}>
            <button
              type="button"
              onClick={() => {
                setwelcomehidden(true);
              }}
            >
              <XCircle className="text-slate-400 hover:text-slate-200 transition-colors ease-in duration-100" />
            </button>
          </div>
        </div>
        <ClientBreadCrumb currentFolder={folder} toggleMode={toggleMode} />
        <div className="md:pl-4">
          <div
            className={`flex flex-col items-start justify-center w-full ${
              asidehidden ? "" : ""
            }`}
          >
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-full ${asidehidden ? "md:grid-cols-1" : ""}`}
            >
              {childFolders.length > 0 &&
                childFolders.map((childFolder) => {
                  return (
                    <ClientFolder folder={childFolder} key={childFolder.id} />
                  );
                })}
            </div>
            {childFolders.length > 0 && childFiles.length > 0 && (
              <div className="w-full">
                <hr className="dark:bg-slate-300 h-1 w-full bg-slate-400 border-0 mt-4 rounded-md" />
              </div>
            )}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-full ${asidehidden ? "md:grid-cols-1" : ""}`}
            >
              {childFiles.length > 0 &&
                childFiles.map((childFile) => {
                  return <ClientFile file={childFile} key={childFile.id} />;
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
