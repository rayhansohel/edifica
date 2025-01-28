import { Link } from "react-router-dom";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import LogoutButton from "../common/Button/LogoutButton";
import UserCard from "../common/Card/UserCard";
import DashboardMenu from "../common/Menu/DashboardMenu";
import MainMenu from "../common/Menu/MainMenu";
import { GoHome } from "react-icons/go";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-72 h-full flex flex-col bg-base-200 rounded-box">
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
        <div className="flex gap-2">
          <Link
            to="/"
            data-tooltip-id="home-tooltip"
            data-tooltip-content="Go Back to Home"
            className="w-[32px] h-[32px] border border-base-300 rounded-md flex items-center justify-center"
          >
            <GoHome className="text-lg hover:text-accent" />
            <Tooltip
              id="home-tooltip"
              place="bottom"
              style={{
                backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
                color: theme === "light" ? "#ffffff" : "#000000",
                padding: "6px 10px",
                borderRadius: "4px",
              }}
            />
          </Link>
          <LogoutButton />
        </div>
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
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
