import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Error404 from "../pages/Error/Error404";
import Home from "../pages/home/Home";
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
import ManageUser from "../pages/Dashboard/Owner/ManageUser/ManageUser";
import Profile from "../pages/Dashboard/Owner/Profile/Profile";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";

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
    errorElement: <Error404 />,
    children: [
      { path: "home", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "manage-user", element: <ManageUser /> },
      { path: "manage-member", element: <ManageMembers /> },
      { path: "make-announcement", element: <MakeAnnouncement /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "announcements", element: <Announcements /> },
      { path: "manage-members", element: <ManageMembers /> },
    ],
  },
]);

export default Routes;
