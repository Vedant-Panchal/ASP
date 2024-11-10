import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { message } from "../InnerComponents/modal";
import { FirebaseError } from "firebase/app";

const AdminSignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("AdminSignIn must be used within an AuthContextProvider");
  }

  const { loginUser } = context;

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShowError(false);

    try {
      await loginUser(email, password);
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (err) {
      setShowError(true);
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
            message({
              type: "error",
              title: "Account not found"
            });
            break;
          case "auth/wrong-password":
            message({
              type: "error", 
              title: "Wrong Password"
            });
            break;
          default:
            message({
              type: "error",
              title: "Please verify your email"
            });
        }
        console.error(err);
      }
    }
  };

  const inputClasses = "shadow-sm bg-gray-50 text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200";

  return (
    <section className="bg-light dark:bg-dark">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 sm:h-screen">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img src="/assets/Logo.png" alt="Logo" className="h-24" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkElevate dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={inputClasses}
                  placeholder="name.branchYY@adaniuni.ac.in"
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  value={email}
                  required
                />
                {showError && (
                  <p className="text-xs font-light text-red-500 dark:text-red-400 mt-2">
                    {error}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className={inputClasses}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-2"
                    onClick={togglePasswordVisibility}
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff
                        className="dark:text-slate-200 text-zinc-900"
                        strokeWidth={1.25}
                      />
                    ) : (
                      <Eye
                        className="dark:text-slate-200 text-zinc-900"
                        strokeWidth={1.25}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-sm">
                <p className="font-normal text-gray-500 dark:text-slate-200">
                  Forgot your password?{" "}
                  <Link
                    to="/forgotpasswordemail"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Click here
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSignIn;
