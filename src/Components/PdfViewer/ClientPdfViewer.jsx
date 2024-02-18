import React, { useContext, useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import AdminNav from "../Admin/AdminNav";
import { ArrowDownToLine, Moon, Sun, XSquare } from "lucide-react";
import { UserContext } from "../../context/AuthContext";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

async function fetchFileData(fileId) {
  const filesref = doc(db, "files", fileId);
  const fileDocSnap = await getDoc(filesref);
  const fileDoc = fileDocSnap.data();
  return fileDoc;
}
function ClientPdfViewer() {
  const { currentUser, mode, setmode, logoutUser } = useContext(UserContext);
  const { fileId } = useParams();
  const [profileHidden, setProfileHidden] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [fileDoc, setFileDoc] = useState(null);
  const [error, seterror] = useState("");
  const userName = currentUser.displayName;
  const userEmail = currentUser.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFileData(fileId);
        setFileDoc(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [fileId]);
  const url = fileDoc && fileDoc.url ? fileDoc.url : "default-url"; // Provide a default URL or handle it accordingly
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

  const downloadFile = async () => {
    try {
      const response = await fetch(fileDoc.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileDoc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  const transformToolbarSlot = (slot) => ({
    ...slot,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    OpenFile: () => <></>,
    OpenMenuItem: () => <></>,
    ShowProperties: () => <></>,
    Open: () => <></>,
    Download:()=> <>
      <button className="hover:bg-[#D6D6D6] px-1 py-1 rounded-md" onClick={downloadFile}>
      <ArrowDownToLine strokeWidth={1} width={20}/>
      </button>
      </>,
    DownloadMenuItem: () => <>
    <button className="hover:bg-[#D6D6D6] ml-2.5 px-1 py-1 rounded-md flex" onClick={downloadFile}> 
      <ArrowDownToLine strokeWidth={1} width={20} className="mr-2"/> Download
      </button>
    </>,
  });



  const renderToolbar = (Toolbar) => (
    <Toolbar>{renderDefaultToolbar(transformToolbarSlot)}</Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    fileNameGenerator: file => {
      // `file.name` is the URL of opened file
      const fileName = file.name
      return `${fileName}`
    },
  });

  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;
  const toggleMode = () => {
    setmode(mode === "light" ? "dark" : "light");
  };
  useEffect(() => {
    return mode === "dark"
      ? document.getElementById("root").classList.add("dark")
      : document.getElementById("root").classList.remove("dark");
  }, [mode]);
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
  return (
    <>
      <div className="w-screen h-screen">
        <nav className="bg-slate-100 px-4  dark:bg-darkNav dark:shadow-sm fixed left-0 right-0 top-0 z-[1000] shadow-lg rounded-sm">
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
                  <Link
                    className="block  text-gray-900 truncate dark:text-white mt-5"
                    to={"/aboutus"}
                  >
                    About Us
                  </Link>
                  <Link
                    className="block text-gray-900 truncate dark:text-white mt-5 mb-5"
                    to={"/contactus"}
                  >
                    Contact Us
                  </Link>

                  <Link
                    className="block dark:border-light border-zinc-900 border-t-2 pt-3 text-gray-900 truncate dark:text-white"
                    onClick={handleSignOut}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative h-full w-screen mt-16">
          <button
            onClick={() => window.close()}
            className="px-4 py-1 absolute bg-transparent z-[500] md:top-1 md:right-40 top-1 right-10 w-fit h-fit rounded-none"
          >
            <XSquare strokeWidth={1} className="text-blue-500" />
          </button>
          <div className="w-screen h-full absolute top-0 right-0 z-50 print:hidden px-2 ">
            <Worker
              workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}
            >
              <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientPdfViewer;
