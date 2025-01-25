/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";;
import { PiBuildingsBold } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { LuContactRound } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";

const MainMenu = ( {closeMenu} ) => {
  const links = [
    { to: "/", icon: <GoHome />, value: "Home" },
    { to: "/apartment", icon: <PiBuildingsBold />, value: "Apartments" },
    { to: "/about", icon: <LuContactRound />, value: "About" },
    { to: "/contact", icon: <MdOutlineAlternateEmail />, value: "Contact" },
  ];

  return (
    <div className="w-full py-2 px-4">
      {/* Links */}
      <ul>
        {links.map(({ to, icon, value }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center hover:text-accent ${
                  isActive ? "text-accent font-semibold" : "transition"
                }`
              }
            >
              <div className="flex gap-2 justify-start items-center p-2 w-full hover:bg-base-300 rounded-md">
                <div className="text-lg">
                  {icon}
                </div>
                <div>{value}</div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainMenu;