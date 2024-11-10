import { useContext, useState, FormEvent, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { updatePassword, User } from "firebase/auth";
import { UserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const showMessage = (type: string, title: string, text: string) => {
    const config: SweetAlertOptions = {
      icon: type as SweetAlertOptions['icon'],
      title,
      text,
      timer: 1500,
      position: 'center',
      width: 600,
      background: '#1F2937',
      color: '#FFFFF2',
      confirmButtonColor: '#111827',
      showConfirmButton: false
    };
    Swal.fire(config);
  };

  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handlePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      resetForm();
      setError("Please fill all the fields");
      showMessage("error", "Oops...☹️", "Please fill all the fields");
      return;
    }

    if (password.length < 8) {
      resetForm();
      setError("Password must be at least 8 characters");
      showMessage("error", "Oops...☹️", "Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      resetForm();
      setError("Passwords do not match");
      showMessage("error", "Oops...☹️", "Passwords do not match");
      return;
    }

    setError("");
    try {
      if (!currentUser) {
        throw new Error("No user logged in");
      }
      await updatePassword(currentUser as User, confirmPassword);
      resetForm();
      showMessage("success", "Password Updated 🎊", "");
      setTimeout(() => navigate("/sign-in"), 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      showMessage("error", "Oops...", errorMessage);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const inputClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";

  return (
    <section className="bg-white dark:bg-gray-900 h-screen mt-10">
      <Header />
      <div className="max-w-md px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Update Password
        </h2>
        <form onSubmit={handlePassword}>
          <div className="flex flex-col gap-4 mb-4 mt-8 sm:gap-6 sm:mb-5">
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className={inputClassName}
                placeholder="••••••••"
                required
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className={inputClassName}
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="text-white" strokeWidth={1.25} />
                  ) : (
                    <EyeOff className="text-white" strokeWidth={1.25} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
