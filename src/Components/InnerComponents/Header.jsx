import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { Moon, Sun, ArrowDownToLine } from "lucide-react";

function Header() {
  const [hidden, sethidden] = useState(true);
  const { currentUser, mode, setmode } = useContext(UserContext);
  // const [AuthBtns, setAuthBtns] = useState(true);

  //   if(mode === 'dark')
  //   document.getElementById('root').classList.add('dark')
  // else
  // document.getElementById('root').classList.remove('dark')
  // }
  useEffect(() => {
    return mode === "dark"
      ? document.getElementById("root").classList.add("dark")
      : document.getElementById("root").classList.remove("dark");
  }, [mode]);
  const toggleMode = () => {
    setmode(mode === "light" ? "dark" : "light");
  };

  return (
    <header>
      <Link
        to={
          "https://github.com/Mrunal-Shah7/ASP-Data/releases/download/v1.1.0/ASP-v1.1.0-arm64-v8a-release.apk"
        }
        className="fixed w-fit rounded-full bottom-24 right-5 mr-2 p-2 hover:bg-teal-900/95 bg-teal-900"
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
      <nav
        className={` fixed top-0 left-0 right-0  border-gray-200 shadow-sm  lg:px-6 bg-Light10 px-4  dark:bg-darkNav dark:shadow-sm`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex justify-between items-center w-max h-max">
            <button
              onClick={() => sethidden(!hidden)}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-600 rounded-lg lg:hidden hover:text-gray-900 hover:bg-slate-200/80 focus:bg-slate-200/80 dark:focus:bg-darkElevateHover  dark:focus:ring-gray-700 dark:text-slate-200 dark:hover:bg-darkElevate dark:hover:text-slate-300 transition-all duration-200 ease-in"
              hidden={hidden}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Link to={"/"} className="flex items-center">
              <img
                src="assets/Logo.png"
                className="h-14 ml-2 sm:h-14 lg:h-16"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex items-center lg:order-2">
            <button
              className={`${
                mode === "light" ? "bg-yellow-300" : "bg-darkElevate"
              } w-fit h-fit p-2 rounded-full fixed bottom-10 right-5 transition-all duration-500 ease-in mr-2`}
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

            <Link
              to={"/signin"}
              className="text-gray-800 dark:text-white hover:bg-slate-300 focus:ring-4 focus:ring-gray-300  rounded-lg text-sm px-4 font-bold lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 transition-all duration-200 ease-in"
              hidden={currentUser ? true : false}
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 transition-all duration-200 ease-in"
            >
              {currentUser ? "Dashboard" : "Sign Up"}
            </Link>
          </div>
          <div className="lg:flex lg:flex-row justify-between items-center hidden">
            <ul className="flex flex-col lg:flex-row  lg:space-x-8 lg:items-center lg:w-auto">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `block relative py-2 pr-4 pl-3 dark:border-transparent after:content[''] after:w-full after:h-1 after:block after:absolute after:-bottom-2 after:left-0 after:bg-transparent transition-all duration-500 ease-in after:border-transparent border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 font-bold dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700 ${
                      isActive
                        ? "text-blue-800 dark:text-blue-300"
                        : "dark:text-slate-200 text-zinc-900"
                    } hover:after:bg-[#FC54AD] hover:border-transparent`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/aboutus"}
                  className={({ isActive }) =>
                    `block relative py-2 pr-4 pl-3 dark:border-transparent after:content[''] after:w-full after:h-1 after:block after:absolute after:-bottom-2 after:left-0 after:bg-transparent transition-all duration-500 ease-in after:border-transparent border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 font-bold dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700 ${
                      isActive
                        ? "text-blue-800 dark:text-blue-300"
                        : "dark:text-slate-200 text-zinc-900"
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
                    `block relative py-2 pr-4 pl-3 dark:border-transparent after:content[''] after:w-full after:h-1 after:block after:absolute after:-bottom-2 after:left-0 after:bg-transparent transition-all duration-500 ease-in after:border-transparent border-gray-500 lg:hover:bg-transparent lg:border-0 lg:p-0 font-bold dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700 ${
                      isActive
                        ? "text-blue-800 dark:text-blue-300"
                        : "dark:text-slate-200 text-zinc-900"
                    } hover:after:bg-[#FC54AD] hover:border-transparent`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className={`justify-between items-center fixed top-0 left-0 transition-transform ease-in-out duration-200 bg-white border-r shadow-xl border-gray-200  dark:bg-darkNav dark:border-gray-700 w-1/2 lg:hidden ${
              hidden ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:h-auto h-screen">
              <li className=" ml-auto  mb-5">
                <button
                  className="inline-flex 

              items-center p-2 mt-1 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-slate-200/80 focus:bg-slate-200/80 dark:focus:bg-darkElevateHover  dark:focus:ring-gray-700 dark:text-slate-200 dark:hover:bg-darkElevate dark:hover:text-slate-300 transition-all duration-200 ease-in
              "
                  hidden={hidden}
                  onClick={() => sethidden((p) => !p)}
                >
                  <svg
                    className="w-6 h-6"
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
              </li>
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `block dark:text-white py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                      isActive
                        ? "bg-primary-700 text-white lg:text-primary-700"
                        : "text-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/aboutus"}
                  className={({ isActive }) =>
                    `block dark:text-white py-2 pr-4 pl-3  rounded lg:bg-transparent lg:p-0 ${
                      isActive
                        ? "bg-primary-700 text-white lg:text-primary-700"
                        : "text-gray-700"
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contactus"}
                  className={({ isActive }) =>
                    `block dark:text-white py-2 pr-4 pl-3  rounded lg:bg-transparent lg:p-0 ${
                      isActive
                        ? "bg-primary-700 text-white lg:text-primary-700"
                        : "text-gray-700"
                    }`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
