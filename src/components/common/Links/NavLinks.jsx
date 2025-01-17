import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GoHome } from "react-icons/go";
import { PiBuildingsBold } from "react-icons/pi";
import { LuContactRound } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";

const NavLinks = () => {
  const { theme } = useContext(ThemeContext);

  const links = [
    { to: "/", icon: <GoHome />, tooltip: "Home" },
    { to: "/apartment", icon: <PiBuildingsBold />, tooltip: "Apartments" },
    { to: "/about", icon: <LuContactRound />, tooltip: "About" },
    { to: "/contact", icon: <MdOutlineAlternateEmail />, tooltip: "Contact"},
  ];

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
            <div className="w-[32px] h-[32px] border border-base-300 rounded-md flex items-center justify-center">
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

export default NavLinks;
