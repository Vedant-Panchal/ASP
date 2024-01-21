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
  else if(currentUser && currentUser.email !== "vedantpanchal.ict22@adaniuni.ac.in")
  {
    message('error','You must be an admin to access this page')
    return <Navigate to="/adminsignin" />
  }
  return children
}

export default AdminRoute;
