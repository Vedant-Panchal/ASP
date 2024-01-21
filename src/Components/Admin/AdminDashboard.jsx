import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { aspauth, db, storage } from "../../firebase";
import { collection, addDoc, documentId } from "firebase/firestore";
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
} from "lucide-react";
import Drag from "../../../public/assets/Drag";
import FolderBreadCrumb from "./FolderBreadCrumb";

const AdminDashboard = () => {
  const [uploadComplete, setUploadComplete] = useState(true);
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);
  const { logoutUser, mode, setmode, pdfViewerOpen, setpdfViewerOpen } =
    useContext(UserContext);
  const navigate = useNavigate();
  const ref = collection(db, "folders");
  const filesref = collection(db, "files");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteOption, setdeleteOption] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [open, setopen] = useState(false);
  const [hidden, sethidden] = useState(true);
  const openPdfViewer = (fileUrl) => {
    setPDF(fileUrl);
    setpdfViewerOpen(true);
  };

  const closePdfViewer = () => {
    setPDF(null);
    setpdfViewerOpen(false);
  };

  useEffect(() => {
    return mode === "dark"
      ? document.getElementById("root").classList.add("dark")
      : document.getElementById("root").classList.remove("dark");
  }, [mode]);
  const toggleMode = () => {
    setmode(mode === "light" ? "dark" : "light");
  };
  const handleSignOut = async () => {
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
      background: "#111827",
      color: "#FFFFF2",
      backdrop: `
        rgba(255, 255, 255, 0.4) 
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
  const createFolder = async () => {
    const { value: folderName } = await Swal.fire({
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
    console.log(path);

    if (folder !== ROOT_FOLDER) path.push({ name: folder.name, id: folder.id });
    console.log(path);

    await addDoc(ref, {
      name: folderName,
      UserId: aspauth.currentUser.uid,
      createdAt: new Date().toLocaleString(),
      parentId: folder.id,
      path: path,
    });
    setopen(!open)
    sethidden((p) => !p)
  };
  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (folder == null || selectedFiles.length === 0) return;

    setUploadComplete(false);
    const totalFiles = selectedFiles.length;

    const uploadPromises = selectedFiles.map((file) => {
      const filePath =
        folder === ROOT_FOLDER
          ? `Home${folder.path.join("/")}/${file.name}`
          : `Home${folder.path.join("/")}/${folder.name}/${file.name}`;

      const storageRef = StorageRef(storage, filePath);

      return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const overallProgress =
              (snapshot.bytesTransferred / (totalFiles * snapshot.totalBytes)) *
              100;

            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: Math.floor(progress),
              overall: Math.floor(overallProgress),
            }));
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

              // Resolve the promise for the current file
              resolve();
              setopen(!open)
              sethidden((p) => !p)
            });
          }
        );
      });
    });

    // Wait for all uploads to complete
    Promise.all(uploadPromises)
      .then(() => {
        // All files uploaded successfully
        console.log("All files uploaded successfully");
        setUploadComplete(true);
      })
      .catch((error) => {
        // Handle errors during uploads
        console.error("Error uploading files:", error);
        setUploadComplete(false);
      });
  };

  // const DragRef = useRef(null)
  // const onDragEnter = () => {
  //   DragRef.classList.add("dark:bg-darkNav")
  // }
  // const onDragLeave = () => {
  //   DragRef.classList.add("dark:bg-darkElevate")
  // }
  // const onDrop = () => {
  //   DragRef.classList.add("dark:bg-darkNav")
  // }
  // const [fileList, setFileList] = useState([])
  // const onFileDrop = (e)=>{
  //   const files = Array.from(e.target.files[0]);
  //   if(files)
  //   {
  //     const updatedFiles = [...FileList,files]
  //     setFileList(updatedFiles)
  //     console.log(fileList)
  //   }
  // }
  const toggleDelete = () => {
    setdeleteOption(!deleteOption)
  }
  const deleteFile = async (file) => {
    try {
      // Delete file from Storage
      const filePath =
        folder === ROOT_FOLDER
          ? `Home${folder.path.join("/")}/${file.name}`
          : `Home${folder.path.join("/")}/${folder.name}/${file.name}`;
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
          className={`${
            mode === "light" ? "bg-yellow-300" : "bg-darkElevate"
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
          after:border-t-slate-50 after:dark:border-t-darkElevate after:border-t-8 after:border-b-0 w-96 h-fit bg-slate-50 dark:bg-darkElevate fixed right-[5em] bottom-[5.5em] rounded-md shadow-lg z-40 transition-all ease-in p-3 duration-300 ${
            open ? "opacity-100 translate-y-0" : "translate-y-3 opacity-0"
          } flex flex-col items-start justify-between gap-3`}
        >
          <label
            className={`dark:bg-darkElevateHover bg-slate-100 w-full h-32 rounded-md  items-center justify-center  outline-2 outline-dashed outline-slate-800 dark:outline-slate-300 flex flex-col ${
              hidden ? "hidden" : ""
            }`}
            // ref={DragRef}
            draggable={true}
            // onDragEnter={onDragEnter}
            // onDragLeave={onDragLeave}
            // onDrop={onDrop}
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
            className={`flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 w-full ${
              hidden ? "hidden" : ""
            }`}
            onClick={createFolder}
          >
            <Folder size={16} className="mr-3" />
            <div>Create Folder</div>
          </button>

          <label
            className={`flex items-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none w-full dark:focus:ring-green-800 ${
              hidden ? "hidden" : ""
            }`}
          >
            <File size={16} className="mr-3" />
            Upload File
            <input
              type="file"
              onChange={handleUpload}
              className="opacity-0 w-0 h-0"
              multiple
            />
          </label>
        </div>

        <button
          onClick={() => {
            setRotate(!rotate), setopen(!open), sethidden((p) => !p);
          }}
          className={`bg-gradient-to-r from-pink-500 to-yellow-500
        } w-fit h-fit p-2 rounded-full fixed bottom-10 right-16  mr-2 z-50`}
        >
          <Plus
            strokeWidth={2}
            className={`text-slate-200 ${
              rotate ? "rotate-45" : "rotate-0"
            } transition-all duration-200 ease-in`}
          />
        </button>
        {/* {
          <div className="w-[500px] h-fit rounded-md absolute bottom-28 right-10 bg-blue-800 px-4 py-2 shadow-md">
            <div className="flex justify-between mb-1">
              <span className="flex text-base font-medium text-blue-700 dark:text-white mb-2">
                <FileText className="mx-2" /> {files}
              </span>
            </div>
            <div className="w-full bg-blue-900 rounded-full h-6 dark:bg-blue-400">
              <div
                className="bg-blue-600 h-6 rounded-full p-0.5 leading-none text-sm text-slate-200 font-semibold flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out"
                style={{ width: uploadProgress + "%" }}
              ></div>
            </div>
          </div>
        } */}
        
        <AdminNav
          handleSignOut={handleSignOut}
          handleUpload={handleUpload}
          toggleMode={toggleMode}
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
