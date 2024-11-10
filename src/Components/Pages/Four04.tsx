import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../InnerComponents/Header";
import { UserContext } from "../../context/AuthContext";

const Four04: React.FC = () => {
  const { mode } = useContext(UserContext)!;

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList.toggle("dark", mode === "dark");
    }
  }, [mode]);

  const headingClasses = "mb-4 tracking-tight font-extrabold";
  const paragraphClasses = "mb-4 text-lg font-light text-gray-500 dark:text-gray-400";
  const buttonClasses = "inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4";

  return (
    <section className="bg-light dark:bg-dark h-screen flex items-center justify-center">
      <Header />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <div className="flex items-center justify-center">
            <img src="/assets/404.png" alt="404 error illustration" className="w-3/5" />
          </div>
          <h1 className={`${headingClasses} text-7xl lg:text-9xl text-primary-600 dark:text-primary-500`}>
            404
          </h1>
          <p className={`${headingClasses} text-3xl md:text-4xl text-gray-900 dark:text-white`}>
            Something's missing.
          </p>
          <p className={paragraphClasses}>
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          <Link to="/" className={buttonClasses}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Four04;
