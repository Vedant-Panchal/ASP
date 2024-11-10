import { useContext, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { aspauth, db } from "../../firebase";
import { message } from "../InnerComponents/modal.js";
import {
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Header from "../InnerComponents/Header.js";

interface FormData {
  firstName: string;
  lastName: string;
  branch: string;
  semester: string;
  enrollmentNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    branch: "ICT",
    semester: "1",
    enrollmentNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [termsChecked, setTermsChecked] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [emailPlaceholder, setEmailPlaceholder] = useState<string>(
    "name.branchYY@adaniuni.ac.in"
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);

  const { createUser } = useContext(UserContext)!;
  const navigate = useNavigate();
  const userRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(aspauth, (user: User | null) => {
      if (user) {
        user.reload();
        if (user.emailVerified) {
          navigate("/dashboard");
        } else {
          setEmailVerified(false);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const { email, password, confirmPassword } = formData;
    const [, domainPart] = email.split("@");

    if (domainPart !== "adaniuni.ac.in" && domainPart !== "aii.ac.in") {
      setFormData(prev => ({ ...prev, email: "" }));
      message({
        type: "error",
        title: "Please use an email ending with @adaniuni.ac.in or @aii.ac.in"
      });
      return false;
    }

    if (password !== confirmPassword) {
      message({
        type: "error", 
        title: "Passwords do not match"
      });
      return false;
    }

    if (password.length < 8) {
      message({
        type: "error",
        title: "Password must be at least 8 characters"
      });
      return false;
    }

    if (!termsChecked) {
      message({
        type: "error",
        title: "Please accept the terms and conditions"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { firstName, lastName, email, password, branch, semester, enrollmentNumber } = formData;
    const fullName = `${firstName} ${lastName}`;
    const lowerCaseEmail = email.toLowerCase();

    try {
      await createUser(lowerCaseEmail, password);

      if (aspauth.currentUser) {
        await updateProfile(aspauth.currentUser, {
          displayName: fullName,
        });

        await sendEmailVerification(aspauth.currentUser);
        setEmailVerified(true);
        message({
          type: "success",
          title: "Verification link sent to your email"
        });
      }

      await addDoc(userRef, {
        userName: fullName,
        userEmail: lowerCaseEmail,
        userBranch: branch,
        userSemester: parseInt(semester),
        userEnrollNum: parseInt(enrollmentNumber),
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        branch: "ICT",
        semester: "1",
        enrollmentNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTermsChecked(false);
      setEmailPlaceholder("name.branchYY@adaniuni.ac.in");

    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error(error);
    }
  };

  const renderVerificationMessage = () => (
    <section
      className="bg-slate-100 dark:bg-gray-900 pt-10 h-screen"
      hidden={emailVerified}
    >
      <Header />
      <div className="flex flex-col items-center justify-start px-4 py-4 mx-auto bg-light dark:bg-dark h-screen">
        <div className="w-full h-48 bg-light rounded-lg shadow mt-16 md:mt-28 dark:border sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-darkElevate dark:border-gray-700">
          <div className="flex flex-col items-center justify-center h-full gap-4 px-5">
            <div className="block text-xl md:text-3xl text-slate-200 font-bold">
              Please verify your email
            </div>
            <p className="text-sm text-slate-200 font-mono text-center text-wrap">
              Refresh the page after verifying your email 😊
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <section className="bg-gray-50 dark:bg-dark pt-10" hidden={!emailVerified}>
        <Header />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkElevate dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="branch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Branch
                    </label>
                    <select
                      name="branch"
                      id="branch"
                      className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                      required
                      value={formData.branch}
                      onChange={handleInputChange}
                    >
                      <option value="ICT">ICT</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Semester
                    </label>
                    <select
                      name="semester"
                      id="semester"
                      className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                      required
                      value={formData.semester}
                      onChange={handleInputChange}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="enrollmentNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    name="enrollmentNumber"
                    id="enrollmentNumber"
                    className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                    placeholder="Enter your enrollment number"
                    required
                    value={formData.enrollmentNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                    placeholder={emailPlaceholder}
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                      I accept the{" "}
                      <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {renderVerificationMessage()}
    </>
  );
}

export default SignUp;
