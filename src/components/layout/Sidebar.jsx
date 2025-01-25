import { Link } from "react-router-dom";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import LogoutButton from "../common/Button/LogoutButton";
import UserCard from "../common/Card/UserCard";
import DashboardMenu from "../common/Menu/DashboardMenu";

const Sidebar = () => {
  return (
    <div className="w-72 h-full flex flex-col bg-base-200 border-r border-base-300 rounded-box">
      <div className="flex items-center gap-2 justify-between w-full p-4">
        {/* Brand Logo */}
        <Link to="/">
          <div className="flex items-center justify-center gap-1">
            <img src={BrandLogo} alt="Brand Logo" className="w-5" />
            <h3 className="uppercase text-xl font-semibold tracking-wider">
              Edifica
            </h3>
          </div>
        </Link>
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
      <hr className="border-base-300 mx-4" />

      {/* Menu Items */}
      <div className="flex-grow">
        <DashboardMenu />
      </div>

      {/* User info */}
      <div>
        <hr className="border-base-300 mx-4" />
        <div className="flex justify-between items-center w-full p-4">
          <UserCard />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
