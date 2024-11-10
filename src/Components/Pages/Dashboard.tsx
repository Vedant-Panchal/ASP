import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { collection, orderBy, query, onSnapshot, getDocs, limit } from "firebase/firestore";
import { PowerOff, PanelsTopLeft, Moon, Sun, GraduationCap } from "lucide-react";
import { IoGitNetworkOutline } from "react-icons/io5";
import Swal from "sweetalert2";

import { UserContext } from "../../context/AuthContext";
import { DirectoryContext } from "../../context/DirectoryContext";
import { db } from "../../firebase";
import { useFolder } from "../Admin/hooks/useFolder";
import ClientFolder from "./ClientFolder";
import ClientFile from "./ClientFile";
import ClientBreadCrumb from "../InnerComponents/ClientBreadCrumb";

interface Notification {
  message: string;
  time: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [error, setError] = useState("");
  const [profileHidden, setProfileHidden] = useState(false);
  const [asideHidden, setAsideHidden] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const [notificationIndicator, setNotificationIndicator] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationData, setNotificationData] = useState<Notification[]>([]);
  const [filterDropDown, setFilterDropDown] = useState(false);

  const navigate = useNavigate();
  const { folderId } = useParams();
  const { currentUser, logoutUser, mode, setMode } = useContext(UserContext)!;
  const { tree, setTree } = useContext(DirectoryContext);
  // !TODO Fix this
  const { folder, childFolders, childFiles } = useFolder(folderId || undefined);
  const { displayName: userName, email: userEmail } = currentUser!;

  const notiRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const fetchTreeData = async () => {
    try {
      const treeRef = collection(db, "trees");
      const snapshot = await getDocs(
        query(treeRef, orderBy("createdAt", "desc"), limit(1))
      );

      if (snapshot.docs.length > 0) {
        const latestTree = snapshot.docs[snapshot.docs.length - 1].data();
        const parsedTree = JSON.parse(latestTree.tree);
        setTree(parsedTree);
        localStorage.setItem("tree", JSON.stringify(parsedTree));
        localStorage.setItem("treeTimestamp", Date.now().toString());
      }
    } catch (error) {
      console.error("Error fetching tree:", error);
    }
  };

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const storedTree = localStorage.getItem("tree");
        const storedTreeTimestamp = localStorage.getItem("treeTimestamp");
        const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

        if (storedTree && storedTreeTimestamp) {
          const parsedTree = JSON.parse(storedTree);
          const treeAge = Date.now() - parseInt(storedTreeTimestamp);

          if (treeAge < SEVEN_DAYS) {
            setTree(parsedTree);
            return;
          }
        }

        await fetchTreeData();
      } catch (error) {
        console.error("Error fetching tree:", error);
        const storedTree = localStorage.getItem("tree");
        if (storedTree) {
          setTree(JSON.parse(storedTree));
        }
      }
    };

    if (Object.keys(tree).length === 0) {
      fetchTree();
    }
  }, [tree, setTree]);

  useEffect(() => {
    if (currentUser) {
      const url = `https://api.dicebear.com/7.x/initials/svg?seed=${userName}`;
      setProfilePicture(url);
    }
  }, [userEmail, userName]);

  const handleSignOut = async () => {
    setError("");
    const bgColor = mode === "dark" ? "#15131D" : "#F2F2F1";
    const txtColor = mode === "dark" ? "#F1F5F9" : "#18181B";

    const result = await Swal.fire({
      title: "Are you sure?",
      imageUrl: "assets/svgviewer-png-output.png",
      text: "You will be logged out of this application",
      showDenyButton: true,
      confirmButtonText: "Yes, logout",
      denyButtonText: "Cancel",
      customClass: {
        confirmButton: "px-3 py-2.5 border border-emerald-400 mr-2 rounded-lg text-md bg-green-500/70 hover:bg-green-500/80 focus:bg-green-500/80",
        denyButton: "px-3 py-2.5 border border-rose-300 rounded-lg text-md bg-rose-500/70 hover:bg-rose-500/80 focus:bg-rose-500/80",
      },
      buttonsStyling: false,
      background: bgColor,
      color: txtColor,
      backdrop: "rgba(46, 43, 59, 0.8) left top no-repeat",
    });

    if (result.isConfirmed) {
      logoutUser();
      navigate("/signin");
    }
  };

  useEffect(() => {
    document.getElementById("root")?.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  const handleNotifications = (data: Notification[]) => {
    localStorage.setItem("notificationData", JSON.stringify(data));
  };

  const getStoredNotifications = (): Notification[] => {
    const data = localStorage.getItem("notificationData");
    return data ? JSON.parse(data) : [];
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "upload-notification"), orderBy("time", "desc")),
      (snapshot) => {
        const storedData = getStoredNotifications();
        const notifications = snapshot.docs.map(doc => doc.data() as Notification);

        if (storedData.length > 0) {
          const newNotis = notifications.filter(
            item => !storedData.some(existing => existing.message === item.message)
          );

          if (newNotis.length > 0) {
            setNotificationIndicator(true);
            setNotificationCount(newNotis.length);
          }

          const updatedNotis = [...newNotis, ...storedData];
          setNotificationData(updatedNotis);
          handleNotifications(updatedNotis);
        } else {
          setNotificationIndicator(true);
          setNotificationCount(notifications.length);
          setNotificationData(notifications);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!filterRef.current?.contains(e.target as Node)) {
        setFilterDropDown(false);
      }
      if (!notiRef.current?.contains(e.target as Node)) {
        setNotificationDropDown(false);
        setProfileHidden(false);
      }
      if (!asideRef.current?.contains(e.target as Node)) {
        setAsideHidden(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="antialiased h-max bg-Light20 dark:bg-dark">
      {/* Rest of the JSX remains the same */}
    </div>
  );
};

export default Dashboard;
