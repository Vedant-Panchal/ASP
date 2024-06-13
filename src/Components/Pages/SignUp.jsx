import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { aspauth, db } from "../../firebase";
import { message } from "../InnerComponents/modal.js";
import {
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Header from "../InnerComponents/Header.jsx";

function SignUp() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [branch, setBranch] = useState("ICT");
  const [semester, setSemester] = useState("1");
  const [enrollmentnumber, setEnrollmentnumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(true);
  const [error, setError] = useState("");
  const { createUser } = useContext(UserContext);
  const [emailPlaceholder, setemailPlaceholder] = useState(
    "name.branchYY@adaniuni.ac.in",
  );
  const [eye, seteye] = useState(false);
  const [emailVerified, setemailVerified] = useState(true);

  const navigate = useNavigate();

  // User refernce in db
  const userRef = collection(db, "users");

  const showeye = () => {
    seteye(!eye);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(aspauth, (user) => {
      if (user) {
        // Reload user to get the latest emailVerified status
        user.reload();

        if (user.emailVerified) {
          // Redirect to the dashboard if verified
          navigate("/dashboard");
        } else {
          // Handle case where the user is not verified
          setemailVerified(false);
        }
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, [navigate, aspauth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split email address into local and domain parts
    const [localPart, domainPart] = email.split("@");

    // Check if the domain part is "adaniuni.ac.in"
    if (domainPart !== "adaniuni.ac.in" && domainPart !== "aii.ac.in") {
      setEmail("");
      message(
        "error",
        "Please use an email ending with @adaniuni.ac.in or @aii.ac.in",
        "",
      );
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      return;
    }
    if (password.length < 8) {
      message("error", "Password must be at least 8 characters", "");
      return;
    }
    // Check if terms and conditions are accepted
    if (!termsChecked) {
      return;
    }
    const fullName = firstName + " " + lastName;
    const lowerCaseEmail = email.toLowerCase();

    // If all checks pass, attempt to create the user
    try {
      await createUser(lowerCaseEmail, password);

      await updateProfile(aspauth.currentUser, {
        displayName: fullName, // You can custo mize how you want to set the display name
      });

      message("success", "Verification link sent on your email", "");
      await sendEmailVerification(aspauth.currentUser).then(() => {
        setemailVerified(true);
      });

      await addDoc(userRef, {
        userName: fullName,
        userEmail: lowerCaseEmail,
        userBranch: branch,
        userSemester: parseInt(semester),
        userEnrollNum: parseInt(enrollmentnumber),
      });

      setfirstName("");
      setlastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setEnrollmentnumber("");
      setTermsChecked(false);
      setemailPlaceholder("name.branchYY@adaniuni.ac.in");
    } catch (err) {
      setError(err.message);
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="bg-gray-50 dark:bg-dark pt-10 "
        hidden={!emailVerified}
      >
        <Header />
        <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto ">
          <Link
            to={"/"}
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="h-24 mr-2" src="assets/Logo.png" alt="logo" />
          </Link>
          <div className="w-full bg-light rounded-lg shadow dark:border md:mt-0 sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-darkElevate dark:border-gray-700">
            <div className=" space-y-4 md:space-y-6 p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="First Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="First Name"
                    className="shadow-sm bg-[#F2F2F2]  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                    placeholder="Atmaram"
                    required="true"
                    onChange={(e) => setfirstName(e.target.value)}
                    value={firstName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Last Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="Last Name"
                    className="shadow-sm bg-[#F2F2F2]  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                    placeholder="Bhide"
                    required="true"
                    onChange={(e) => setlastName(e.target.value)}
                    value={lastName}
                  />
                </div>

                <div className=" w-full flex items-center justify-between space-x-2">
                  <div className="w-1/2">
                    <label
                      htmlFor="Branch"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-1/2"
                    >
                      Branch
                    </label>

                    <select
                      name="branch"
                      required="true"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                    >
                      <option value="ICT" className="mb-2 p-2">
                        ICT
                      </option>
                      <option value="CSE" className="mb-2 p-2">
                        CSE
                      </option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="Semester"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-1/2"
                    >
                      Semester
                    </label>
                    <select
                      name="semester"
                      required="true"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="shadow-sm bg-[#F2F2F2]  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                    >
                      <option value="1" className="mb-2 p-2">
                        1
                      </option>
                      <option value="2" className="mb-2 p-2">
                        2
                      </option>
                      <option value="3" className="mb-2 p-2">
                        3
                      </option>
                      <option value="4" className="mb-2 p-2">
                        4
                      </option>
                      <option value="5" className="mb-2 p-2">
                        5
                      </option>
                      <option value="6" className="mb-2 p-2">
                        6
                      </option>
                      <option value="7" className="mb-2 p-2">
                        7
                      </option>
                      <option value="8" className="mb-2 p-2">
                        8
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="enrollmentnumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enrollment Number
                  </label>
                  <input
                    type="number"
                    id="enrollmentnumber"
                    className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                    placeholder="Example : 220012"
                    required="true"
                    onChange={(e) => setEnrollmentnumber(e.target.value)}
                    value={enrollmentnumber}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow-sm bg-[#F2F2F2]  text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                    placeholder={emailPlaceholder}
                    required="true"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={` text-gray-900 dark:text-slate-200 sm:text-sm rounded-lg block w-full p-2.5
      ${password !== "" ? "" : "dark:bg-darkNav/80 bg-[#F2F2F2] "}
    ${password !== confirmPassword && password && confirmPassword !== "" ? "dark:bg-rose-400 bg-rose-300" : "dark:bg-emerald-500 bg-emerald-500"}
      `}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={eye ? "password" : "text"}
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className={` text-gray-900 dark:text-slate-200 sm:text-sm rounded-lg block w-full p-2.5
      ${confirmPassword !== "" ? "" : "dark:bg-darkNav/80 bg-[#F2F2F2]"}
    ${password !== confirmPassword ? "dark:bg-rose-400 bg-rose-300" : "dark:bg-emerald-500 bg-emerald-500"}
      `}
                      required={true}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                    <button
                      className="absolute right-2"
                      onClick={showeye}
                      type="button"
                    >
                      <div>
                        <Eye
                          className="text-zinc-900 dark:text-slate-200"
                          strokeWidth={1.25}
                          hidden={eye}
                        />
                        <EyeOff
                          className="text-zinc-900 dark:text-slate-200"
                          strokeWidth={1.25}
                          hidden={!eye}
                        />
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-slate-100 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                      onChange={(e) => setTermsChecked(e.target.checked)}
                      checked={termsChecked}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-slate-500 disabled:dark:hover:bg-none disabled:dark:bg-slate-500 disabled:dark:text-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={!termsChecked}
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/signin"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-slate-100 dark:bg-gray-900 pt-10 h-screen "
        hidden={emailVerified}
      >
        <Header />
        <div className="flex flex-col items-center justify-start px-4 py-4 mx-auto bg-light dark:bg-dark h-screen ">
          <div
            className="w-full h-48 bg-light rounded-lg shadow mt-16
          md:mt-28 dark:border sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-darkElevate dark:border-gray-700"
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 px-5">
              <div className="block text-xl md:text-3xl text-slate-200 font-bold ">
                Please verify your email
              </div>
              <p className="text-sm text-slate-200 font-mono text-center text-wrap">
                Refresh the page after verifying your email 😊
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
