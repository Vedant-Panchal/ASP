import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import {message} from "../InnerComponents/modal"
function AdminRoute({children} ) {
  const { currentUser } = useContext(UserContext);
    if(!currentUser)
    {
        return <Navigate to="/adminsignin" />
    }
  else if(currentUser && currentUser.email)
  {
    if(currentUser.email === 'vedantpanchal.ict22@adaniuni.ac.in')
    {
      return children
    }
    else if(currentUser.email === "mrunalshah.ict22@adaniuni.ac.in")
    {
      return children
    }
    else
    {
      message('error','You must be an admin to access this page')
      return <Navigate to="/adminsignin" />
    }
  }
  
}

export default AdminRoute;
