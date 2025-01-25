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
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import Announcements from "../pages/Dashboard/Announcements/Announcements";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";

const Routes = createBrowserRouter([
  // Main route
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/apartment", element: <Apartment /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },

  // Auth route
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <Error404 />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Dashboard routes (All children are private)
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/announcement",
        element: (
          <PrivateRoute>
            <Announcements />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Routes;
