import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import {
  Home,
  AboutUs,
  ContactUs,
  Four04,
  Dashboard,
  SignUp,
  Login,
  AdminDashboard,
} from "./components/index";
import PrivateRoute from "./components/InnerComponents/PrivateRoute";
import ForgotPasswordViaEmail from "./components/InnerComponents/ForgotPasswordViaEmail";
import AdminRoute from "./components/Admin/AdminRoute";
import AdminSignIn from "./components/Admin/AdminSignIn";
import PdfViewer from "./components/PdfViewer/PdfViewer";
import ClientPdfViewer from "./components/PdfViewer/ClientPdfViewer";
import Calculator from "./components/Pages/Calculator";

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="contact-us" element={<ContactUs />} />
      
      {/* Protected Dashboard Routes */}
      <Route element={<PrivateRoute>
        <Outlet />
      </PrivateRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/calculator" element={<Calculator />} />
        <Route path="dashboard/folder/:folderId" element={<Dashboard />} />
        <Route path="dashboard/folder/pdf/:fileName/:fileId" element={<ClientPdfViewer />} />
      </Route>

      {/* Auth Routes */}
      <Route path="forgot-password-via-email" element={<ForgotPasswordViaEmail />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<Login />} />
      <Route path="admin-sign-in" element={<AdminSignIn />} />
      {/* Protected Admin Routes */}
      <Route element={<AdminRoute>
        <Outlet />
      </AdminRoute>}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/folder/:folderId" element={<AdminDashboard />} />
        <Route path="admin/folder/pdf/:fileName/:fileId" element={<PdfViewer />} />
      </Route>

      <Route path="*" element={<Four04 />} />
    </Route>
  )
);

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={Routes} />
  </React.StrictMode>
);
