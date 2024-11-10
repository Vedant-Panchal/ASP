import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { aspauth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../components/InnerComponents/Loading";

export interface AuthContextValue {
  createUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  currentUser: User | null;
  emailVerified: boolean;
  loading: boolean;
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
  pdfViewerOpen: boolean;
  setPdfViewerOpen: (open: boolean) => void;
  pdf: boolean;
  setPdf: (pdf: boolean) => void;
}

export const UserContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [pdf, setPdf] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(aspauth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await user.reload();
        setEmailVerified(user.emailVerified);
        
        if (!user.emailVerified) {
          return (
            <section className="bg-gray-50 dark:bg-gray-900 pt-10 h-screen">
              <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto">
                <div className="w-full h-48 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
        }
      } else {
        setCurrentUser(null);
        setEmailVerified(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const createUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(aspauth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(aspauth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async (): Promise<void> => {
    setLoading(true);
    try {
      localStorage.removeItem("tree");
      await aspauth.signOut();
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextValue = {
    createUser,
    loginUser,
    currentUser,
    logoutUser,
    emailVerified,
    loading,
    mode,
    setMode,
    pdfViewerOpen,
    setPdfViewerOpen,
    pdf,
    setPdf
  };

  if (loading) {
    return (
      <div className="dark:bg-dark bg-light flex items-center w-full h-screen justify-center">
        <Loading loading={loading} />
      </div>
    );
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
