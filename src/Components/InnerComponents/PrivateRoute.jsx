import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
function PrivateDashboard({children} ) {
  const { currentUser,emailVerified } = useContext(UserContext);

  if(!currentUser || !emailVerified )
  {
    return <Navigate to="/signin" />
  }
  return children
}

export default PrivateDashboard;
