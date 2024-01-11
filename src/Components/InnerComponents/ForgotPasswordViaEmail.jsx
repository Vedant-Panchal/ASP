import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { aspauth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPasswordViaEmail() {

    const [error, setError] = useState("");
    const [email,setemail] = useState("");

    const [hidden, sethidden] = useState(true);
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
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const [localPart, domainPart] = email.split('@');

    // Check if the domain part is "adaniuni.ac.in"
    if (domainPart !== 'adaniuni.ac.in') {
        sethidden(true)
      setemail('');

      setError("Please use an email ending with @adaniuni.ac.in");
      sethidden(false)
      
      return;
    }

    // If all checks pass, attempt to create the user
    setError('')
    try {

      await sendPasswordResetEmail(aspauth,email)
        setemail('');        
        
        // setTimeout(() => {
        //   navigate("/signin")
        // }, 1000);
    } catch (err) {
      sethidden(false)
      setError('Account not found or password is incorrect');
      message("error", "Oops...☹️", error);
    }
  };
  
  
  return (
    <section className="relative z-20 bg-white dark:bg-gray-900 h-screen mt-10 ">
      <div className="max-w-md px-4 py-8 mx-auto lg:py-16 ">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Forgot Password
        </h2>
        <form onSubmit= {handleSubmit}>
          <div className="flex flex-col gap-4 mb-4 mt-8 sm:gap-6 sm:mb-5"   >
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="name.branchYY@adaniuni.ac.in"
                required = 'true'
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              {<p className="text-xs font-light text-red-500 dark:text-red-400 mt-2"
                  hidden={hidden}
                >
                    {error}
               </p>}
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
  )
}

export default ForgotPasswordViaEmail