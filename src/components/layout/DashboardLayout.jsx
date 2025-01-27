import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="text-sm min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex py-4 pl-4 h-screen sticky top-0 z-50">
        <Sidebar />
      </div>

      <div className="flex-grow min-h-screen flex flex-col">
        <div className="lg:hidden sticky top-0 z-50">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
