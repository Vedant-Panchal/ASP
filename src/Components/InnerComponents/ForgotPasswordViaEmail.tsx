import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { aspauth } from "../../firebase";
import { message } from "./modal";
import Header from "./Header";

const ForgotPasswordViaEmail = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateDomain = (domain: string): boolean => {
    const allowedDomains = ["adaniuni.ac.in", "aii.ac.in"];
    return allowedDomains.includes(domain.toLowerCase());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [, domainPart] = email.split("@");

    if (!validateDomain(domainPart)) {
      setIsErrorVisible(false);
      setEmail("");
      setError("Please use an email ending with @adaniuni.ac.in or aii.ac.in");
      return;
    }

    setError("");
    const lowerEmail = email.toLowerCase();

    try {
      await sendPasswordResetEmail(aspauth, lowerEmail);
      setEmail("");
      message({
        type: "success",
        title: "Check your junk inbox 📩"
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/sign-in");
      }, 7000);
    } catch {
      setIsErrorVisible(false);
      setError("Email does not exist");
      message({
        type: "error", 
        title: "Oops...☹️",
        text: error
      });
    }
  };

  return (
    <section className="bg-white dark:bg-dark h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center px-6 pt-40 mx-auto md:h-screen sm:h-screen">
        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md md:p-5 dark:bg-darkElevate dark:border-gray-700 py-5 px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-4 mt-8 sm:gap-6 sm:mb-5">
              {isSuccess && (
                <div className="rounded-lg bg-green-200 w-full h-fit px-2.5 py-3 text-center flex items-center">
                  <label className="mx-auto text-wrap text-green-800">
                    Verification link sent to your email/Outlook <br /> Please
                    check Junk folder
                  </label>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Registered Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm bg-gray-50 text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                  placeholder="name.branchYY@adaniuni.ac.in"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isErrorVisible && (
                  <p className="text-xs font-light text-red-500 dark:text-red-400 mt-2">
                    {error}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-3 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update password
            </button>

            <div className="mt-3">
              <div className="text-sm">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Remembered your password?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Back to login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordViaEmail;
