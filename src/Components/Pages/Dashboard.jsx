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
  const [profileHidden, setProfileHidden] = useState(true);
  const [welcomehidden, setwelcomehidden] = useState(false);
  const navigate = useNavigate();

  const { currentUser, logoutUser, mode, setmode } = useContext(UserContext);

  const userName = currentUser.displayName;
  const userEmail = currentUser.email;
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
           
            <Link
              to="/dashboard"
              className="flex items-center justify-between mr-4"
            >
              <img
                src="/assets/Logo.png"
                className="mr-3 h-16 ml-3"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex flex-row items-center justify-start w-fit lg:order-2">
          
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
              className="absolute top-0 right-0 z-20 my-2 w-56 text-base list-none bg-white outline-dashed outline-2 lg:outline-2 dark:outline-light shadow dark:bg-dark dark:divide-gray-600 rounded-xl"
              id="dropdown"
              hidden={profileHidden}
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {userName}
                </span>
                <span className="block  text-gray-900 truncate dark:text-white mt-5">
                  {userEmail}
                </span>
                <Link className="block  text-gray-900 truncate dark:text-white mt-5" to={'/aboutus'}>
                  About Us
                </Link>
                <Link className="block text-gray-900 truncate dark:text-white mt-5 mb-5" to={'/contactus'}>
                  Contact Us
                </Link>
                
                <Link className="block dark:border-light border-zinc-900 border-t-2 pt-3 text-gray-900 truncate dark:text-white"
                onClick={handleSignOut}>
                  Logout
                </Link>
                
              </div>
    
            </div>
          </div>
        </div>
      </nav>
     
      <main
        className={`p-4 min-h-screen pt-20 transition-all ease-in-out delay-[40] duration-200 mb-20 `}
      >
        <div className="flex flex-row items-center md:mt-14 mt-14">
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
            className={`flex flex-col items-start justify-center w-full`}
          >
            <div
              className={`grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-full`}
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
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-full `}
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
