import { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailPlaceholder, setemailPlaceholder] = useState("name.branchYY@adaniuni.ac.in");
  const [eye, seteye] = useState(false);
  const [error, setError] = useState('');
  const [hidden, sethidden] = useState(true);
  const {loginUser} = useContext(UserContext);
  const showeye = () => {
    seteye(!eye);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [localPart, domainPart] = email.split('@');

    // Check if the domain part is "adaniuni.ac.in"
    if (domainPart !== 'adaniuni.ac.in') {
      setEmail('');
      setemailPlaceholder("Please use an email ending with @adaniuni.ac.in");
      return;
    }

    // If all checks pass, attempt to create the user
    setError('')
    try {

      await loginUser(email, password).then(()=>{
        setEmail('');
        setPassword('');
        
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000);
      })
    } catch (err) {
      sethidden(false)
      setError('Account not found or password is incorrect');
      // console.log(`The error is ${error}`);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 sm:h-screen">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src="/assets/FinalLogo.png" alt="Logo" className="h-20" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={emailPlaceholder}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required="true"
                />
                {<p className="text-xs font-light text-red-500 dark:text-red-400 mt-2"
                  hidden={hidden}
                >
                    {error}
               </p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Password
                </label>
                <div className='relative flex items-center'>
                
                <input

                  type={eye ? 'password' : 'text'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  />
                <button className='absolute right-2'
                onClick={showeye}
                >
                  <div >
                  <Eye className='text-white'strokeWidth={1.25} hidden={eye} />
                  <EyeOff className='text-white'strokeWidth={1.25}  hidden={!eye}/>
                  </div>
                </button>
                  </div>
              </div>
              <div className="">
                <div className="text-sm">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Forgot your password?{' '}
                    <Link to="/forgotpassword" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Click here
                    </Link>
                  </p>
                </div>
              </div>
              {/* Use Link directly for navigation */}
              
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
