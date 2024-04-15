import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { aspauth, db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../context/AuthContext";
import { useContext, useState, useEffect, useRef } from "react";
import { ROOT_FOLDER, useFolder } from "./hooks/useFolder";
import AdminFolder from "./AdminFolder";
import AdminNav from "./AdminNav";

import { deleteObject, ref as deleteRef } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import {
  uploadBytes,
  ref as StorageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import AdminFile from "./AdminFile";
import {
  Moon,
  Sun,
  Plus,
  MousePointerSquareDashed,
  File,
  Folder,
  FileText
} from "lucide-react";
import Drag from "../../../public/assets/Drag";
import FolderBreadCrumb from "./FolderBreadCrumb";

const AdminDashboard = () => {
  const [comment, setComment] = useState('');
  const [uploadComplete, setUploadComplete] = useState(true);
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);
  const { mode, setmode } =
    useContext(UserContext);

  const ref = collection(db, "folders");
  const filesref = collection(db, "files");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteOption, setdeleteOption] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [open, setopen] = useState(false);
  const [hidden, sethidden] = useState(true);
  const [filename, setfilename] = useState('')
  useEffect(() => {
    return mode === "dark"
      ? document.getElementById("root").classList.add("dark")
      : document.getElementById("root").classList.remove("dark");
  }, [mode]);
  const toggleMode = () => {
    setmode(mode === "light" ? "dark" : "light");
  };


  const createFolder = async () => {
    const { value: folderName } = await Swal.fire({
      title: "Multiple inputs",
      html: `
  <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
  <div class="flex items-start">
      <div class="flex items-center h-5">
        <input id="swal-input1" aria-describedby="newsletter" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
      </div>
      <div class="ml-3 text-sm">
        <label for="newsletter" class="font-light text-blue-500 dark:text-gray-300">Send notification</label>
      </div>
  </div>
</form>
  `,

      title: "Enter folder name",
      input: "text",
      inputLabel: "Create folder",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (!folderName) return;

    if (folder == null) return;
    // Swal.fire(`Folder created with name ${folderName}`);
    const path = [...folder.path];

    const addComment = document.getElementById("swal-input1").checked;


    if (folder !== ROOT_FOLDER) path.push({ name: folder.name, id: folder.id });


    await addDoc(ref, {
      name: folderName,
      UserId: aspauth.currentUser.uid,
      createdAt: new Date().toLocaleString(),
      parentId: folder.id,
      path: path,
    });
    if (addComment) {      

      const currentPath = path.map(folder => folder.name).join('/');
      const comment = `Folder created with name "${folderName}" in "${currentPath}"`;
      try {
        await addDoc(collection(db, 'upload-message'), {
          time: serverTimestamp(),
          createdAt: getCurrentDate(),
          message: comment,
        });
      } catch (error) {
        console.error('Error adding comment:', error);
      }

    }

  };



  function getCurrentDate() {
    var currentDate = new Date();

    // Array of month names for formatting
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    // Get the day, month, and year components
    var day = currentDate.getDate();
    var month = monthNames[currentDate.getMonth()];
    var year = currentDate.getFullYear();

    // Function to add ordinal suffix to day
    function addOrdinalSuffix(day) {
      if (day >= 11 && day <= 13) {
        return day + "th";
      }
      switch (day % 10) {
        case 1: return day + "st";
        case 2: return day + "nd";
        case 3: return day + "rd";
        default: return day + "th";
      }
    }

    // Format the date
    var formattedDate = addOrdinalSuffix(day) + " " + month + " " + year;

    return formattedDate;
  }



  const handleCommentSubmit = async () => {
    try {
      // Create a new Date object


      // Output the formatted date


      const { value: comment } = await Swal.fire({
        title: "Enter  Notification",
        input: "text",
        inputLabel: "Add Notification",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });


      // Create a document in the 'upload-message' collection
      await addDoc(collection(db, 'upload-message'), {
        time: serverTimestamp(),
        createdAt: getCurrentDate(),
        message: comment,
      });

      // Clear the comment input field after submission
      setComment('');
    }

    catch (error) {
      console.error('Error adding comment:', error);
    }
  };



  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesChecked = document.getElementById("filenotify").checked;

    if (folder == null || selectedFiles.length === 0) return;

    setUploadComplete(false);
    const totalFiles = selectedFiles.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = selectedFiles[i];
      setfilename(file.name)
      const folderPathArray = folder.path;
      const folderPathString = folderPathArray.map(folder => folder.name).join('/');
      const filePath =
        folder === ROOT_FOLDER
          ? `Home/${file.name}`
          : `Home/${folderPathString}/${folder.name}/${file.name}`;

      const storageRef = StorageRef(storage, filePath);

      await new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const overallProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setUploadProgress(Math.floor(overallProgress));
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(filesref, {
                url: downloadURL,
                name: file.name,
                createdAt: new Date().toLocaleString(),
                folderId: folder.id,
              });

              if (filesChecked) {
                const comment = `File uploaded with name "${file.name}" in "${folderPathString}"`;
                addDoc(collection(db, 'upload-message'), {
                  time: serverTimestamp(),
                  createdAt: getCurrentDate(),
                  message: comment,
                });
              }

              // Resolve the promise for the current file
              resolve();
            });
          }
        );
      });
    }


    setUploadComplete(true);
  };

  const DragRef = useRef(null)
  const handleDragEnter = (e) => {
    e.preventDefault();
    DragRef.current.classList.add("bg-darkNav");
  }
  const handleDragLeave = (e) => {
    e.preventDefault();
    DragRef.current.classList.remove("bg-darkNav");
  }
  const handleDragOver = (e) => {
    e.preventDefault();
    // Necessary for Chrome to recognize the drop
    e.dataTransfer.dropEffect = "copy";
  };
  const handleDrop = (e) => {
    e.preventDefault();
    DragRef.current.classList.remove("bg-darkNav");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Handle dropped files (you can call your upload function here)
      handleUpload({ target: { files } });
    }
  }
  const toggleDelete = () => {
    setdeleteOption(!deleteOption)
  }
  const deleteFile = async (file) => {
    try {
      // Delete file from Storage
      const folderPathArray = folder.path || [];
      const folderPathString = folderPathArray.map(folder => folder.name).join('/');
      const filePath =
        folder === ROOT_FOLDER
          ? `Home/${file.name}`
          : `Home/${folderPathString}/${folder.name}/${file.name}`;
      const storageRef = deleteRef(storage, filePath);
      await deleteObject(storageRef);

      // Delete file from Firestore
      const fileDocRef = doc(filesref, file.id);
      await deleteDoc(fileDocRef);

      // You may want to update the UI here to reflect the deletion
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  return (
    <>
      <div className="h-fit w-full dark:bg-dark ">
        <button
          className={`${mode === "light" ? "bg-yellow-300" : "bg-darkElevate"
            } w-fit h-fit p-2 z-50 rounded-full fixed bottom-10 right-5 transition-all duration-500 ease-in mr-2`}
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
        <div
          className={`after:content-[''] after:w-0 after:h-0 after:absolute after:-bottom-2 after:right-2 after:border-l-transparent after:border-r-transparent after:border-r-[9px] after:border-l-[9px] 
          after:border-t-slate-50 after:dark:border-t-darkElevate after:border-t-8 after:border-b-0 w-96 h-fit bg-slate-50 dark:bg-darkElevate fixed right-[5em] bottom-[5.5em] rounded-md shadow-lg z-40 transition-all ease-in p-3 duration-300 ${open ? "opacity-100 translate-y-0" : "translate-y-3 opacity-0"
            } flex flex-col items-start justify-between gap-3`}
        >
          <label
            className={`dark:bg-darkElevateHover bg-slate-100 w-full h-52 rounded-md  items-center justify-center outline-2 outline-dashed outline-slate-800 dark:outline-slate-300 flex flex-col ${hidden ? "hidden" : ""
              }`}
            ref={DragRef}
            draggable={true}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="dark:text-slate-300 text-zinc-900 mb-2">
              Upload file
            </p>
            <MousePointerSquareDashed className="w-14 h-14 dark:text-slate-300 text-zinc-900 " />
            <input
              type="file"
              onChange={handleUpload}
              className="opacity-0 w-0 h-0"
              multiple
              disabled={hidden}
            />
          </label>
          <button
            className={`flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 w-full ${hidden ? "hidden" : ""
              }`}
            onClick={createFolder}
          >
            <Folder size={16} className="mr-3" />
            <div>Create Folder</div>
          </button>

          <label 
            className={`flex flex-col gap-2  items-start text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none w-full dark:focus:ring-green-800 ${hidden ? "hidden" : ""
              }`}
          >
            <div className='flex items-center justify-start'>
            <File size={16} className="mr-3" />
            <div>Upload File</div>
            </div>
            <input
              type="file"
              onChange={handleUpload}
              className="opacity-0 w-0 h-0"
              multiple
            />
            <div className="flex items-start">
  <div className="flex items-center h-5">
    <input
      id="filenotify"
      aria-describedby="newsletter"
      type="checkbox"
      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
      required=""
    />
  </div>
  <div className="ml-3 text-sm">
    <label
      htmlFor="newsletter"
      className="font-light text-blue-500 dark:text-gray-300"
    >
      Send notification
    </label>
  </div>
</div>

          </label>


          <button className={`focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button> ${hidden ? "hidden" : ""}`}
            onClick={handleCommentSubmit}>Enter Comment</button>


        </div>

        <button
          onClick={() => {
            setRotate(!rotate), setopen(!open), sethidden((p) => !p);
          }}
          className={`bg-gradient-to-r from-pink-500 to-yellow-500
        } w-fit h-fit p-2 rounded-full fixed bottom-10 right-16  mr-2 z-50 `}
        >
          <Plus
            strokeWidth={2}
            className={`text-slate-200 ${rotate ? "rotate-0" : "rotate-45"
              } transition-all duration-200 ease-in`}
          />
        </button>

        {/* Progress bar */}
        {
          <div className={`lg:w-[500px] w-96 h-fit rounded-md absolute bottom-10 left-10 transition-all duration-200 ease-in dark:bg-blue-800 bg-lightNav px-4 py-2 shadow-md ${uploadComplete ? 'translate-x-full opacity-0 hidden' : '-translate-x-0 opacity-100'}`}>
            <div className="flex justify-between mb-1">
              <span className="flex text-base font-medium text-zinc-900 dark:text-white mb-2">
                <FileText className="mx-2" /> {filename}
              </span>
            </div>
            <div className="w-full bg-blue-900 rounded-full h-6 dark:bg-blue-400">
              <div
                className="bg-blue-600 h-6 rounded-full p-0.5 leading-none text-sm text-slate-200 font-semibold flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out"
                style={{ width: uploadProgress + "%" }}
              >{uploadProgress + "%"}</div>
            </div>
          </div>
        }

        <AdminNav
          toggleDelete={toggleDelete}
        />

        <main
          className={`p-4 min-h-screen pt-20 transition-all ease-in-out delay-[40] duration-200 mb-20 `}
        >
          <FolderBreadCrumb currentFolder={folder} toggleMode={toggleMode} />
          <div className="md:pl-4">
            <div
              className={`flex flex-col items-start justify-center w-full`}
            >
              <div
                className={`grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6  gap-4 mt-14 lg:mt-12 w-full`}
              >
                {childFolders.length > 0 &&
                  childFolders.map((childFolder) => {
                    return (
                      <AdminFolder folder={childFolder} key={childFolder.id} />
                    );
                  })}
              </div>
              {childFolders.length > 0 && childFiles.length > 0 && (
                <div className="w-full">
                  <hr className="dark:bg-slate-300 h-1 w-full bg-slate-400 border-0 mt-5 rounded-md" />
                </div>
              )}
              <div
                className={`grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-5 w-full `}
              >
                {childFiles.length > 0 &&
                  childFiles.map((childFile) => {
                    return <AdminFile file={childFile} key={childFile.id} onDelete={() => deleteFile(childFile)} toggleDelete={deleteOption} />;
                  })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
