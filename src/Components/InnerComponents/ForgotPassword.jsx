import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { aspauth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { UserContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [eye, seteye] = useState(false);
  const { currenUser } = useContext(UserContext);

  const navigate = useNavigate();
  const message = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      timer: 1500,
      position: "center",
      width: 600,
      background: "#1F2937",
      color: "#FFFFF2",
      confirmButtonColor: "#111827",
      showConfirmButton: false,
      marginBottom: "5em",
    });
  };
  const handlePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmpassword) {
      setPassword("");
      setconfirmPassword("");
      setError("Please fill all the fields");
      message("error", "Oops...☹️", error);
      return;
    } else if (password.length < 8) {
      setPassword("");
      setconfirmPassword("");
      setError("Password must be at least 8 characters");
      message("error", "Oops...☹️", error);
      return;
    } else if (password !== confirmpassword) {
      setPassword("");
      setconfirmPassword("");
      setError("Passwords do not match");
      message("error", "Oops...☹️", error);
      return;
    }

    setError("");
    try {
      await updatePassword(currenUser, confirmpassword).then(() => {
        setPassword("");
        message("success", "Password Updated 🎊", "");

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      });
    } catch (err) {
      setError(err);
      message("success", "Oops...", error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 h-screen mt-10 ">
      <Header />
      <div className="max-w-md px-4 py-8 mx-auto lg:py-16 ">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="••••••••"
                required="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {eye ? (
                  <input
                    type="text"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="••••••••"
                    required={true}
                    value={confirmpassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                ) : (
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="••••••••"
                    required={true}
                    value={confirmpassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                )}

                <button
                  type="button"
                  className="absolute right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    seteye(!eye);
                  }}
                >
                  <div>
                    <Eye
                      className="text-white"
                      strokeWidth={1.25}
                      hidden={!eye}
                    />
                    <EyeOff
                      className="text-white"
                      strokeWidth={1.25}
                      hidden={eye}
                    />
                  </div>
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
}

export default ForgotPassword;
