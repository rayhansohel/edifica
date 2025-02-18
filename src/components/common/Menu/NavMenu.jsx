import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GoHome } from "react-icons/go";
import { PiBuildingsBold } from "react-icons/pi";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";
import { RxComponent1 } from "react-icons/rx";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { useAuth } from "../../../context/AuthContext";

const NavMenu = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();

  const links = [
    { to: "/", icon: <GoHome />, tooltip: "Home" },
    { to: "/apartment", icon: <PiBuildingsBold />, tooltip: "All Apartments" },
    { to: "/about", icon: <RxComponent1 />, tooltip: "About" },
    { to: "/contact", icon: <RiContactsLine />, tooltip: "Contact" },
  ];

  // Only show Dashboard link if user exists
  if (user) {
    links.push({ to: "/dashboard", icon: <RiDashboardLine />, tooltip: "Dashboard" });
  }

  return (
    <div className="space-x-6 flex items-center">
      {links.map(({ to, icon, tooltip }) => (
        <div key={to} className="relative">
          <NavLink
            to={to}
            data-tooltip-id={`${tooltip}-tooltip`}
            data-tooltip-content={tooltip}
            className={({ isActive }) =>
              `text-lg hover:text-accent ${
                isActive ? "text-accent font-semibold" : "transition"
              }`
            }
          >
            <div className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center">
              {icon}
            </div>
          </NavLink>

          <Tooltip
            id={`${tooltip}-tooltip`}
            place="bottom"
            style={{
              backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
              color: theme === "light" ? "#ffffff" : "#000000",
              padding: "6px 10px",
              borderRadius: "4px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NavMenu;
