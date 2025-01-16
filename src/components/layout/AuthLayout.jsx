import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="text-sm min-h-screen">
      {/* load auth pages here */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;