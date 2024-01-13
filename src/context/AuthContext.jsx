import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { aspauth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/InnerComponents/Loading';



export const UserContext = createContext();

export const AuthCtxtProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const callLoader = ()=>{
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(aspauth, (user) => {
      if (user) {
        setCurrentUser(user);
        user.reload().then(() => {
            setEmailVerified(user.emailVerified);
            setLoading(true);
            callLoader()
           
            if (!user.emailVerified) {
          // Redirect or show an error message if the email is not verified
            <section
        className="bg-gray-50 dark:bg-gray-900 pt-10 h-screen "
      >
        <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto ">
          <div className="w-full h-48 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center h-full gap-4 px-5">
              
                      <div className="block text-xl md:text-3xl text-slate-200 font-bold ">Please verify your email
                      </div>
                      <p className="text-sm text-slate-200 font-mono text-center text-wrap">Refresh the page after verifying your email 😊</p>
              
            </div>
          </div>
        </div>
      </section>
        }
    });
      } else {
        setCurrentUser(null);
        setEmailVerified(false);
        setLoading(false);
        callLoader()
      }
    });

    // Cleanup function
    return unsubscribe;
  }, [navigate]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(aspauth, email, password).finally(()=>{
      callLoader()
    })
  };

  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(aspauth, email, password).finally(()=>{
      callLoader()
    })
  };

  const logoutUser = () => {
    return aspauth.signOut().finally(()=>{
      callLoader()
    })
  };

  const value = {
    createUser,
    loginUser,
    currentUser,
    logoutUser,
    emailVerified,
    loading
  };

  return <UserContext.Provider value={value}>
  {loading ? (
    <div className='bg-transparent flex items-center w-full h-screen justify-center'>
      <Loading loading={loading} />
    </div>
  ) : (
    children
  )}
</UserContext.Provider>;
};
