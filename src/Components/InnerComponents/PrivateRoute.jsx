import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

function PrivateDashboard({children} ) {
  const { currentUser } = useContext(UserContext);

  if(!currentUser)
  {
    return <Navigate to="/signin" />
  }
  return children
}

export default PrivateDashboard;