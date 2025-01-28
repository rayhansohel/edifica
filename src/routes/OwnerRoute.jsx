/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingAnimation from "../components/common/Loading/LoadingAnimation";

const OwnerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingAnimation />;
  }

  if (user && user.email === "arayhansohel@gmail.com") {
    return children;
  }


  return <Navigate to="/" state={{ from: location }} replace />;
};

export default OwnerRoute;
