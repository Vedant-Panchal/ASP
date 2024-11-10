import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { message } from "../InnerComponents/modal";

const ADMIN_EMAILS = [
  "vedantpanchal.ict22@adaniuni.ac.in",
  "shravanasati.cse23@adaniuni.ac.in", 
  "mrunalshah.ict22@adaniuni.ac.in",
  "janmejaychatterjee.cse21@aii.ac.in"
];

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("AdminRoute must be used within an AuthContextProvider");
  }

  const { currentUser } = context;

  if (!currentUser) {
    return <Navigate to="/admin-sign-in" />;
  }

  if (currentUser.email && ADMIN_EMAILS.includes(currentUser.email)) {
    return <>{children}</>;
  }

  message({
    type: "error",
    title: "You must be an admin to access this page"
  });
  return <Navigate to="/admin-sign-in" />;
};

export default AdminRoute;
