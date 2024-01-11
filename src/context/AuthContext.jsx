import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState} from "react";
import { aspauth } from "../firebase";



export const UserContext = createContext()

export const AuthCtxtProvider = ({children}) =>
{
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(aspauth,(user) => {
            setCurrentUser(user);
            setloading(false);
        })
    
        // Cleanup function
        return unsubscribe;
      }, []);

    const createUser = (aspauth,email,password) => {
        return createUserWithEmailAndPassword(aspauth,email, password)
    }

    const loginUser = (aspauth,email,password) => {
        return signInWithEmailAndPassword(aspauth,email,password)
    }

    const logoutUser = ()=>{
        return aspauth.signOut()
    }


    
    const value = {
        createUser,
        loginUser,
        currentUser,
        logoutUser,
    
    }

    
    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
} 





