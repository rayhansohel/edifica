import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiBuildingsBold } from "react-icons/pi";
import { useAuth } from "../../../context/AuthContext";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { RxComponent1 } from "react-icons/rx";


const FooterMenu = () => {
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
    <div>
        <div>
          {/* Links */}
          <ul>
            {links.map(({ to, value }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center py-1 hover:text-accent rounded-lg max-w-36 ${
                      isActive ? "text-accent font-semibold" : "transition"
                    }`
                  }
                >
                  <div className="flex gap-2 justify-center items-center">
                    <div>{value}</div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default FooterMenu;
