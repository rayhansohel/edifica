/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbNotification } from "react-icons/tb";
import { RiDashboardLine } from "react-icons/ri";

const DashboardMenu = ({ closeMenu }) => {
  const links = [
    { to: "/dashboard", icon: <RiDashboardLine />, value: "Dashboard" },
    { to: "/profile", icon: <FiUser />, value: "My Profile" },
    { to: "/announcement", icon: <TbNotification />, value: "Announcements" },
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
                <div className="text-lg">{icon}</div>
                <div>{value}</div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardMenu;
