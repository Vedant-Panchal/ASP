/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PowerOff,
  PanelsTopLeft,
  Moon,
  Sun,
  GraduationCap,
} from "lucide-react";
import { useContext } from "react";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useFolder } from "../Admin/hooks/useFolder";
import ClientFolder from "./ClientFolder";
import ClientFile from "./ClientFile";
import ClientBreadCrumb from "../InnerComponents/ClientBreadCrumb";
import { IoGitNetworkOutline } from "react-icons/io5";
import { DirectoryContext } from "../../context/DirectoryContext";

function Dashboard() {
  const [error, seterror] = useState("");
  const [profileHidden, setProfileHidden] = useState(false);
  const navigate = useNavigate();
  const [asidehidden, setasidehidden] = useState(false);
  const { currentUser, logoutUser, mode, setmode } = useContext(UserContext);
  const userName = currentUser.displayName;
  const userEmail = currentUser.email;
  const [profilePicture, setProfilePicture] = useState(null);
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);

  const [notificationDropDown, setnotificationDropDown] = useState(false);
  const [notificationIndicator, setNotificationIndicator] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationData, setNotificationData] = useState([]);

  const [_, setFilterDropDown] = useState(false);

  const { tree, setTree } = useContext(DirectoryContext);

  let notiRef = useRef();
  let asideRef = useRef();
  let filterRef = useRef();

  async function forceFetchTree() {
    try {
      const treeRef = collection(db, "trees");
      const snapshot = await getDocs(
        query(treeRef, orderBy("createdAt", "desc"), limit(1)),
      );

      if (snapshot.docs.length > 0) {
        const latestTree = snapshot.docs[snapshot.docs.length - 1].data();

        const parsedTree = JSON.parse(latestTree.tree);
        setTree(parsedTree);
        localStorage.setItem("tree", JSON.stringify(parsedTree));
        localStorage.setItem("treeTimestamp", new Date().getTime().toString());
      } else {
        console.log("No tree documents found");
      }
    } catch (error) {
      console.error("Error fetching tree:", error);
    }
  }

  useEffect(() => {
    async function fetchTree() {
      try {
        const storedTree = localStorage.getItem("tree");
        const storedTreeTimestamp = localStorage.getItem("treeTimestamp");

        if (storedTree && storedTreeTimestamp) {
          const parsedTree = JSON.parse(storedTree);
          const treeCreatedAt = parseInt(storedTreeTimestamp);

          const now = new Date().getTime();
          const treeAge = now - treeCreatedAt;
          const sevenDays = 7 * 24 * 60 * 60 * 1000;

          // If tree is less than 7 days old, use it
          if (treeAge < sevenDays) {
            setTree(parsedTree);
            return;
          }
        }

        // If no stored tree or tree is old, fetch new one
        const treeRef = collection(db, "trees");
        const snapshot = await getDocs(
          query(treeRef, orderBy("createdAt", "desc"), limit(1)),
        );

        if (snapshot.docs.length > 0) {
          const latestTree = snapshot.docs[snapshot.docs.length - 1].data();
          const parsedTree = JSON.parse(latestTree.tree);

          // Store timestamp separately
          const currentTimestamp = new Date().getTime();
          localStorage.setItem("treeTimestamp", currentTimestamp.toString());

          setTree(parsedTree);
          localStorage.setItem("tree", JSON.stringify(parsedTree));
        } else {
          console.log("No tree documents found");
        }
      } catch (error) {
        console.error("Error fetching tree:", error);

        // On error, try to use stored tree as fallback
        const storedTree = localStorage.getItem("tree");
        if (storedTree) {
          setTree(JSON.parse(storedTree));
        }
      }
    }

    // Only fetch if tree is empty
    if (Object.keys(tree).length === 0) {
      fetchTree();
    }
  }, [tree, setTree]);

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

  function setLocalStorageData(data) {
    localStorage.setItem("notificationData", JSON.stringify(data));
  }

  function getLocalStorageData() {
    return JSON.parse(localStorage.getItem("notificationData"));
  }
  // notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = await onSnapshot(
          query(collection(db, "upload-notification"), orderBy("time", "desc")),
          (snapshot) => {
            // gets all the notifications stored in local storage
            const storedData = getLocalStorageData();
            // Map through the snapshot and get the data from firebase collection
            const notifications = snapshot.docs.map((doc) => doc.data());

            if (storedData && storedData.length > 0) {
              // console.log("StoredData:"+ storedData);
              // Compare fetched notifications with stored notifications to get new ones
              const newNotis = notifications.filter(
                (item) =>
                  !storedData.some(
                    (existing) => existing.message === item.message,
                  ),
              );

              if (newNotis.length > 0) {
                console.log("New notifications found " + newNotis.length);
                setNotificationIndicator(true); // Set indicator if there are new notifications
                setNotificationCount(newNotis.length);
              }

              const updatedNotis = [...newNotis, ...storedData]; // Combine old and new notifications
              setNotificationData(updatedNotis);

              console.log("UpdatedData:" + JSON.parse(updatedNotis));
              setLocalStorageData(updatedNotis);
            } else {
              // If no notifications in local storage, set fetched notifications
              setNotificationIndicator(true);
              setNotificationCount(notifications.length);
              setNotificationData(notifications);
            }
          },
        );
        // Return the unsubscribe function to detach the listener when component unmounts
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  useEffect(() => {
    let handler = (e) => {
      if (!filterRef.current.contains(e.target)) {
        setFilterDropDown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });
  useEffect(() => {
    let handler = (e) => {
      if (!notiRef.current.contains(e.target)) {
        setnotificationDropDown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    let handler = (e) => {
      if (!notiRef.current.contains(e.target)) {
        setProfileHidden(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [profileHidden]); // Adding profileHidden to the dependency array

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Check if the click target is not within the sidebar
      if (asideRef.current && !asideRef.current.contains(e.target)) {
        setasidehidden(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [asideRef]);

  return (
    <div className="antialiased h-max  bg-Light20 dark:bg-dark">
      <button
        className="z-50 fixed w-fit rounded-full bottom-24 right-5 mr-2 p-3 bg-blue-400 text-white hover:bg-blue-500/95 transition-colors"
        title="Force Fetch"
        onClick={(e) => {
          e.stopPropagation();
          forceFetchTree();
        }}
      >
        <IoGitNetworkOutline />
      </button>
      <Link
        to={
          "https://github.com/Mrunal-Shah7/ASP-Data/releases/download/v1.1.0/ASP-v1.1.0-arm64-v8a-release.apk"
        }
        className="z-50 fixed w-fit rounded-full bottom-10 right-5 mr-2 p-3 hover:bg-teal-900/95 bg-teal-900"
      >
        <div className="flex items-center  justify-start gap-2 w-max">
          <span className="peer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              x="0"
              y="0"
              viewBox="0 0 256 256"
            >
              <g
                fill={`${mode === "dark" ? "#00D824" : "#00DE73"}`}
                strokeMiterlimit="10"
                fontFamily="none"
                fontSize="none"
                fontWeight="none"
                textAnchor="none"
                transform="scale(10.66667)"
              >
                <path
                  d="M18.239 7.945l1.593-2.39a1 1 0 10-1.664-1.11l-1.679 2.519A10.956 10.956 0 0012 6c-1.601 0-3.117.35-4.489.964L5.832 4.445a1 1 0 10-1.664 1.11l1.593 2.39A10.984 10.984 0 001 17v1a2 2 0 002 2h18a2 2 0 002-2v-1c0-3.757-1.887-7.071-4.761-9.055z"
                  opacity="0.35"
                ></path>
                <circle cx="16.5" cy="14.5" r="1.5"></circle>
                <circle cx="7.5" cy="14.5" r="1.5"></circle>
              </g>
            </svg>
          </span>
          <span className="text-[#00DE73] peer-hover:block text-xs font-normal hidden">
            Download App Now
          </span>
        </div>
      </Link>
      <nav className="bg-light px-4  dark:bg-darkNav dark:shadow-sm fixed left-0 right-0 top-0 z-50 shadow-sm">
        <div className="flex flex-wrap justify-between items-center relative">
          <div className="flex justify-start items-center" ref={asideRef}>
            <button
              className="p-2 mr-2 text-zinc-900 rounded-lg cursor-pointer  hover:text-gray-900 hover:bg-Light30 focus:bg-Light30 dark:focus:bg-darkElevateHover  dark:focus:ring-gray-700 dark:text-slate-200 dark:hover:bg-darkElevate dark:bg-darkElevate bg-Light30 dark:hover:text-slate-300 transition-all duration-200 ease-in"
              onClick={() => {
                setasidehidden(!asidehidden);
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
                src="/assets/Logo.png"
                className="mr-3 h-16 ml-3"
                alt="Logo"
              />
            </Link>
          </div>

          <div
            className="flex flex-row items-center justify-start w-fit lg:order-2"
            ref={notiRef}
          >
            {/* Notifications */}
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="relative p-2 mr-2 text-zinc-900 bg-Light30 rounded-full hover:text-zinc-900 hover:bg-Light30/70 dark:text-slate-100 dark:bg-darkElevate dark:hover:text-white dark:hover:bg-darkElevate/70"
              onClick={() => {
                setnotificationDropDown(!notificationDropDown);
                setNotificationIndicator(false);
                setNotificationCount(0);
                setLocalStorageData(notificationData);
              }}
            >
              <span className="sr-only">View notifications</span>
              {/* Bell icon */}
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              {/* Notification indicator */}
              {notificationIndicator && (
                <div
                  className={`absolute -top-1 right-0 w-4 h-4 pl-[1px] pb-[1px] flex justify-center items-center rounded-full text-xs bg-blue-600 text-primary-200 font-semibold ${
                    notificationCount > 0 ? "" : "hidden"
                  }`}
                >
                  <div>{notificationCount}</div>
                </div>
              )}
            </button>
            {/* Dropdown menu */}
            <div
              className={`overflow-hidden absolute z-[55] w-full lg:w-1/4 w-90 right-0 top-9 md:right-32 md:top-7 my-4  text-base list-none bg-white divide-y divide-gray-300 shadow-lg dark:divide-gray-600 dark:bg-darkElevate rounded-xl outline outline-2 outline-zinc-800`}
              hidden={!notificationDropDown}
              id="notification-dropdown"
            >
              <div className="block py-2 px-4 text-base font-medium text-center text-zinc-900 bg-Light30 dark:bg-darkNav dark:text-slate-100">
                Notifications
              </div>
              <div id="box" className="overflow-y-scroll scroll max-h-64">
                {/* Render notification data here */}
                {notificationData.map((notification, index) => (
                  <div className="w-full px-2 py-2">
                    <div className="text-zinc-900 font-semibold text-sm dark:text-white mb-2">
                      {notification.message}
                    </div>
                    <div className="flex items-center justify-start gap-5 mb-2">
                      <div className="text-xs font-medium text-zinc-500 dark:text-gray-400">
                        Team ASP
                      </div>
                      <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                        {String(notification.createdAt)}
                      </div>
                      <div className="flex-1"></div>
                    </div>
                    <hr />
                  </div>
                ))}

                {notificationData.length === 0 && (
                  <div className="p-4 text-gray-500">No notifications</div>
                )}
              </div>
            </div>
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
              className="flex mr-2 text-sm z-50 bg-Light30 hover:bg-Light30/70 dark:bg-darkElevate rounded-full md:mr-2"
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
              hidden={!profileHidden}
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {userName}
                </span>
                <span className="block  text-gray-900 truncate dark:text-white mt-5 mb-5">
                  {userEmail}
                </span>
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
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ease-in-out duration-200 bg-Light20 border-r shadow-xl border-gray-200  dark:bg-darkNav dark:border-gray-700 ${
          asidehidden ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="overflow-y-auto py-5 px-3 h-full dark:bg-transparent">
          <ul className="space-y-2">
            <li>
              <Link
                className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-Light30 dark:text-white dark:hover:bg-darkElevate "
                to={"/dashboard"}
              >
                <PanelsTopLeft />
                <span className="ml-3 dark:text-white font-medium">
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-Light30 dark:text-white dark:hover:bg-darkElevate "
                to={"/dashboard/calculator"}
              >
                <GraduationCap />
                <span className="ml-3 dark:text-white font-medium">
                  Calculators
                </span>
              </Link>
            </li>
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {/* Power off button */}
            <li>
              <Link
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in hover:bg-Light30 dark:hover:bg-darkElevate dark:text-white group "
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
        className={`p-4 min-h-screen bg-Light20 dark:bg-dark pt-20 transition-all ease-in-out delay-[40] duration-200 mb-20 `}
      >
        <div className="flex flex-col mb-2 items-start justify-center md:mt-14 mt-14">
          <h1 className="dark:text-slate-100 text-zinc-900 lg:text-2xl text-md font-bold mb-2">
            Welcome to ASP
            <br />
          </h1>
          <div className="md:text-md text-sm lg:text-md dark:text-slate-200">
            <ul className="list-disc list-inside">
              <li>
                The requests are cached in order to save read requests. If a
                document has been uploaded but not reflected, use the force
                fetch button in bottom right.
              </li>
            </ul>
          </div>
          <p className="text-white"></p>
          <div className="md:text-md text-sm lg:text-md dark:text-slate-200"></div>
        </div>

        <ClientBreadCrumb currentFolder={folder} toggleMode={toggleMode} />
        {/* <div className="hidden flex flex-row items-center gap-4 md:mt-14 mt-14">
          
       Add search bar here
        </div> */}

        <div className="md:pl-0">
          <div className={`flex flex-col items-start justify-center w-full`}>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-full`}
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
                <hr className="dark:bg-slate-300 h-1 w-full bg-zinc-800 border-0 mt-4 rounded-md" />
              </div>
            )}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 w-full `}
            >
              {childFiles.length > 0 &&
                childFiles.map((childFile) => {
                  return <ClientFile file={childFile} key={childFile.id} />;
                })}
              {childFolders.length === 0 && childFiles.length === 0 && (
                <div className="dark:text-slate-200 text-center w-full">
                  We will be uploading files as soon as we get them 🫡
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
