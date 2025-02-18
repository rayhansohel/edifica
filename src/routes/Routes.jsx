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
import ManageMembers from "../pages/Dashboard/Admin/ManageMember/ManageMember";
import UserProfile from "../pages/Dashboard/User/UserProfile/UserProfile";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../pages/Dashboard/Admin/AgreementRequests/AgreementRequests";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons/ManageCoupons";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import MakePayment from "../pages/Dashboard/Member/MakePayment/MakePayment";
import PaymentHistory from '../pages/Dashboard/Member/PaymentHistory/PaymentHistory';
import ManageUser from "../pages/Dashboard/Owner/ManageUser";
import AdminRoute from "./AdminRoute";
import OwnerRoute from "./OwnerRoute";
import MemberRoute from "./memberRoute";
import UserRoute from "./userRoute";
import Dashboard from "../pages/Dashboard/Dashboard";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <Error404 />,
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
      { index: true, element: <Dashboard />},
      // user Route
      { path: "profile", element: <UserRoute><UserProfile /></UserRoute>  },
      { path: "announcements", element: <UserRoute><Announcements /></UserRoute>},
      // member Route
      { path: "make-payment", element: <MemberRoute><MakePayment /></MemberRoute> },
      { path: "payment-history", element: <MemberRoute><PaymentHistory /></MemberRoute> },
      // admin Route
      { path: "admin-profile", element: <AdminRoute>< AdminProfile /></AdminRoute> },
      { path: "manage-member", element: <AdminRoute><ManageMembers /></AdminRoute> },
      { path: "make-announcement", element: <AdminRoute><MakeAnnouncement /></AdminRoute> },
      { path: "agreement-requests", element: <AdminRoute><AgreementRequests /></AdminRoute> },
      { path: "manage-coupons", element: <AdminRoute><ManageCoupons /></AdminRoute> },
      // owner Route
      { path: "manage-user", element: <OwnerRoute><ManageUser /></OwnerRoute>  },
    ],
  },
]);

export default Routes;
