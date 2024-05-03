/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";
import Maintenance from "./Maintenance";



// import { onMessage } from "firebase/messaging";
function Dashboard() {
  const { currentUser, logoutUser, mode, setmode } = useContext(UserContext);
  const userName = currentUser.displayName;
  const userEmail = currentUser.email;
 
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

 
//   function setLocalStorageData(data) {
//     localStorage.setItem("notificationData", JSON.stringify(data));
//   }

//   function getLocalStorageData() {
//     return JSON.parse(localStorage.getItem("notificationData"));
//   }
// // notifications
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const unsubscribe = await onSnapshot(
//           query(collection(db, "upload-notification"), orderBy("time", "desc")),
//           (snapshot) => {
//             // gets all the notifications stored in local storage
//             const storedData = getLocalStorageData();
//             // Map through the snapshot and get the data from firebase collection
//             const notifications = snapshot.docs.map((doc) => doc.data());

//             console.log("StoredData:" + storedData);

//             if (storedData && storedData.length > 0) {
//               // console.log("StoredData:"+ storedData);
//               // Compare fetched notifications with stored notifications to get new ones
//               const newNotis = notifications.filter(
//                 (item) =>
//                   !storedData.some(
//                     (existing) => existing.message === item.message
//                   )
//               );

//               if (newNotis.length > 0) {
//                 console.log("New notifications found " + newNotis.length);
//                 setNotificationIndicator(true); // Set indicator if there are new notifications
//                 setNotificationCount(newNotis.length);
//               }

//               const updatedNotis = [...newNotis, ...storedData]; // Combine old and new notifications
//               setNotificationData(updatedNotis);

//               console.log("UpdatedData:" + JSON.parse(updatedNotis));
//               setLocalStorageData(updatedNotis);
//             } else {
//               // If no notifications in local storage, set fetched notifications
//               setNotificationIndicator(true);
//               setNotificationCount(notifications.length);
//               setNotificationData(notifications);
//               console.log("NotificationData:" + JSON.stringify(notifications));
//             }
//           }
//         );
//         // Return the unsubscribe function to detach the listener when component unmounts
//         return unsubscribe;
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run the effect only once on component mount

//   useEffect(() => {
//     let handler = (e) => {
//       if (!filterRef.current.contains(e.target)) {
//         setFilterDropDown(false)
//       }
//     };
//     document.addEventListener("click", handler);
//     return () => {
//       document.removeEventListener("click", handler);
//     };
//   });
//   useEffect(() => {
//     let handler = (e) => {
//       if (!notiRef.current.contains(e.target)) {
//         setnotificationDropDown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => {
//       document.removeEventListener("mousedown", handler);
//     };
//   });

//   useEffect(() => {
//     let handler = (e) => {
//       if (!notiRef.current.contains(e.target)) {
//         setProfileHidden(false);
//       }
//     };

//     document.addEventListener("mousedown", handler);

//     return () => {
//       document.removeEventListener("mousedown", handler);
//     };
//   }, [profileHidden]); // Adding profileHidden to the dependency array

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       // Check if the click target is not within the sidebar
//       if (asideRef.current && !asideRef.current.contains(e.target)) {
//         setasidehidden(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [asideRef]);

  return (
    <div className="antialiased h-max  bg-Light20 dark:bg-dark">
      <Maintenance />
    </div>
  );
}

export default Dashboard;
