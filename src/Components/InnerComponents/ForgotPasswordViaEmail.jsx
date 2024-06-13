import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { aspauth } from "../../firebase";
import {message} from "./modal";
import Header from "./Header";
function ForgotPasswordViaEmail() {

  const [error, setError] = useState("");
  const [email, setemail] = useState("");

  const [hidden, sethidden] = useState(true);
  const [success,setSuccess] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const [localPart, domainPart] = email.split("@");

    const newdomain = domainPart.toLowerCase()
    // Check if the domain part is "adaniuni.ac.in"
    if (newdomain !== "adaniuni.ac.in" && newdomain !== "aii.ac.in") {
      sethidden(true);
      setemail("");
      setError("Please use an email ending with @adaniuni.ac.in or aii.ac.in");
      sethidden(false);

      return;
    }

    // If all checks pass, attempt to create the user
    setError("");
    const lowerEmail = email.toLowerCase()
    await sendPasswordResetEmail(aspauth, lowerEmail)
      .then(() => {
          setemail("");
          message("success", "Check your junk inbox 📩", "");
          setSuccess(true);
          setTimeout(() => {
          navigate("/signin")
        }, 7000);
        // message("success", res, "Password reset link sent to your email");
    }).catch(() => {
        sethidden(false);
        setError("Email does not exist");
        message("error", "Oops...☹️", error);
      });

  
}

  return (
    
    <section className="bg-white dark:bg-dark h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center px-6 pt-40 mx-auto md:h-screen  sm:h-screen">
        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md md:p-5 dark:bg-darkElevate dark:border-gray-700 py-5 px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Forgot Password
        </h2>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <div className="flex flex-col gap-4 mb-4 mt-8 sm:gap-6 sm:mb-5">
            { success ? (<div className="rounded-lg bg-green-200 w-full h-fit px-2.5 py-3 text-center flex items-center">
                <label htmlFor="" className="mx-auto text-wrap text-green-800">Verification link sent to your email/Outlook <br /> Please check Junk folder</label>
            </div>) : ''}
            
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
                className="shadow-sm bg-gray-50  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                placeholder="name.branchYY@adaniuni.ac.in"
                required="true"
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
                    Remembered your password?{' '}
                    <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
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
}

export default ForgotPasswordViaEmail;
