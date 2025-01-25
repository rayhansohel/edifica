/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbNotification } from "react-icons/tb";

const DashboardMenu = ({ closeMenu }) => {
  const links = [
    { to: "/dashboard/profile", icon: <FiUser />, value: "My Profile" },
    { to: "/dashboard/announcements", icon: <TbNotification />, value: "Announcements" },
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
