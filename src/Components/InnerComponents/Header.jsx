import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [hidden, sethidden] = useState(true);
  return (
    <header>
    <nav className="bg-white fixed top-0 left-0 right-0 b border-gray-200 px-4 lg:px-6 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link to={"/"} className="flex items-center">
          <img
            src="assets/FinalLogo.png"
            className="mr-10 h-14 sm:h-14 lg:h-16"
            alt="Flowbite Logo"
          />
          
        </Link>
        <div className="flex items-center lg:order-2">
          <Link
          to={"/signin"}
            
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Sign In
          </Link>
          <Link
            to={"/signup"}
           
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Sign Up
          </Link>
          <button
            onClick={() => sethidden(!hidden)}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        </div>
        <div className="lg:flex lg:flex-row justify-between items-center hidden">
          <ul className="flex flex-col lg:flex-row  lg:space-x-8 lg:items-center lg:w-auto">
          <li>
              <Link
                to={"/"}
                className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"aboutus"}
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to={"/contactus"}
                
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="justify-between items-center absolute top-0 right-0.5 bg-gray-800  w-1/2 lg:hidden" 
        hidden={hidden}
        >
        
          <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:h-auto h-screen">
            <li className=" mr-auto ml-0 mb-5" >
              <button className="inline-flex 
              bg-blue-800
              items-center p-2 mt-1 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
              "
              hidden={hidden}
              onClick={() => sethidden((p)=> !p)}
              ><svg
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
            </svg></button>
            </li>
            <li>
              <Link
                to={"/"}
                className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"aboutus"}
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to={"/contactus"}
                
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact Us
              </Link>
            </li>
            
          </ul>
        
        </div>
      </div>
    </nav>
  </header>
  );
}

export default Header;
