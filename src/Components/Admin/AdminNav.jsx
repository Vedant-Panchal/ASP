import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/AuthContext';
function AdminNav({toggleDelete,handleUpload}) {
  const { logoutUser} =
    useContext(UserContext);
      const navigate = useNavigate()
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
  return (
    <nav className="border-gray-200  lg:px-6 bg-slate-100 px-4 w-full dark:bg-darkNav dark:shadow-sm fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center relative">
            <div className="flex justify-start items-center">
              <Link to="/admin" className="flex items-center justify-between mr-4">
                <img src="/assets/Logo.png" className="mr-3 h-16 ml-3" alt="Logo" />
              </Link>
            </div>
            <div className="flex items-center lg:order-2">
              <button onClick={toggleDelete} className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-rose-800">
                Delete
              </button>
              <Link onClick={handleSignOut} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Logout
              </Link>
            </div>
          </div>
        </nav>
  )
}

export default AdminNav