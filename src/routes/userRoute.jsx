/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUserRole from "../hooks/useUserRole";
import LoadingAnimation from "../components/common/Loading/LoadingAnimation";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data: role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <LoadingAnimation />;
  }

  if (user && (role === "user" || role === "member")) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserRoute;
