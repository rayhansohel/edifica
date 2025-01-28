import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Error404 from "../pages/Error/Error404";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Apartment from "../pages/Apartment/Apartment";
import AuthLayout from "../components/layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Announcements from "../pages/Dashboard/User/Announcements/Announcements";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageMembers from "../pages/Dashboard/Admin/ManageMembe/ManageMember";
import UserProfile from "../pages/Dashboard/User/UserProfile/UserProfile";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../pages/Dashboard/Admin/AgreementRequests/AgreementRequests";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons/ManageCoupons";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import MakePayment from "../pages/Dashboard/Member/MakePayment/MakePayment";
import PaymentHistory from '../pages/Dashboard/Member/PaymentHistory/PaymentHistory';
import ManageUser from "../pages/Dashboard/Owner/ManageUser";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home /> },
      { path: "apartment", element: <Apartment /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    
    // errorElement: <Error404 />,
    children: [
      { path: "home", element: <Dashboard /> },

      { path: "user-profile", element: <UserProfile /> },
      { path: "announcements", element: <Announcements /> },

      { path: "make-payment", element: <MakePayment /> },
      { path: "payment-history", element: <PaymentHistory /> },

      { path: "admin-profile", element: <AdminProfile /> },
      { path: "manage-member", element: <ManageMembers /> },
      { path: "make-announcement", element: <MakeAnnouncement /> },
      { path: "agreement-requests", element: <AgreementRequests /> },
      { path: "manage-coupons", element: <ManageCoupons /> },

      { path: "manage-user", element: <ManageUser /> },
    ],
  },
]);

export default Routes;
