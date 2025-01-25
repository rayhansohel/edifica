import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="text-sm min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex py-4 pl-4">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
