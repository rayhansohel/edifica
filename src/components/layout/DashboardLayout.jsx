import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="text-sm min-h-screen">
      {/* load auth pages here */}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;