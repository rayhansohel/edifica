import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbNotification } from "react-icons/tb";

const SideBarMenu = () => {
  const links = [
    { to: "/dashboard/my-profile", icon: <FiUser />, value: "My-profile" },
    { to: "/dashboard/announcement", icon: <TbNotification />, value: "Announcements" },
  ];

  return (
    <div className="w-full">
      {/* Links */}
      <ul>
        {links.map(({ to, icon, value }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center hover:text-accent rounded-lg ${
                  isActive ? "text-accent font-semibold" : "transition"
                }`
              }
            >
              <div className="flex gap-2 justify-start items-center p-2 w-full hover:bg-base-300">
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

export default SideBarMenu;
