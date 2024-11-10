import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("PrivateRoute must be used within an AuthContextProvider");
  }

  const { currentUser } = context;

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
