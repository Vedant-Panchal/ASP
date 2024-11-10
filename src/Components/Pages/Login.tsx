import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { message } from "../InnerComponents/modal";
import { aspauth } from "../../firebase";
import Header from "../InnerComponents/Header";

interface AuthContextValue {
  loginUser: (email: string, password: string) => Promise<void>;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPlaceholder] = useState("name.branchYY@adaniuni.ac.in");
  const [eye, setEye] = useState(true);
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);
  const { loginUser } = useContext(UserContext) as AuthContextValue;
  const navigate = useNavigate();

  const showEye = () => {
    setEye(!eye);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [, domainPart] = email.split("@");

    // Check if the domain part is "adaniuni.ac.in"
    if (domainPart !== "adaniuni.ac.in" && domainPart !== "aii.ac.in") {
      setEmail("");
      message({
        type: "error",
        title: "Please use an email ending with @adaniuni.ac.in or @aii.ac.in"
      });
      return;
    }
    const lowerCaseEmail = email.toLowerCase();
    // If all checks pass, attempt to create the user
    setError("");
    try {
      await loginUser(lowerCaseEmail, password);

      // Wait for the user state to be updated
      const updatedUser = await aspauth.currentUser;

      // Display message only if the email is not verified
      if (updatedUser && !updatedUser.emailVerified) {
        setEmail("");
        setPassword("");
        message({
          type: "error",
          title: "Please verify your email ☹️"
        });
        return;
      }

      // Navigate to the dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      setHidden(false);
      if (err.code === "auth/user-not-found") {
        message({
          type: "error",
          title: "Account not found"
        });
      } else {
        message({
          type: "error",
          title: "Wrong Password"
        });
      }
    }
  };
  return (
    <section className="bg-light dark:bg-dark">
      <Header />
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
                  className="shadow-sm bg-[#F2F2F2]  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                  placeholder={emailPlaceholder}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  value={email}
                  required
                />
                {
                  <p
                    className="text-xs font-light text-red-500 dark:text-red-400 mt-2"
                    hidden={hidden}
                  >
                    {error}
                  </p>
                }
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  {eye ? (
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="shadow-sm bg-[#F2F2F2]  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      name="password"
                      id="password"
                      className="shadow-sm bg-gray-50  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  )}
                  <button
                    className="absolute right-2"
                    onClick={showEye}
                    type="button"
                  >
                    <div>
                      <Eye
                        className="dark:text-slate-200 text-zinc-900"
                        strokeWidth={1.25}
                        style={{ display: eye ? 'none' : 'block' }}
                      />
                      <EyeOff
                        className="dark:text-slate-200 text-zinc-900"
                        strokeWidth={1.25}
                        style={{ display: !eye ? 'none' : 'block' }}
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div className="">
                <div className="text-sm">
                  <p className="text-sm font-normal text-gray-500 dark:text-slate-200">
                    Forgot your password?{" "}
                    <Link
                      to="/forgotpasswordemail"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Click here
                    </Link>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
