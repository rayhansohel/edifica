import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiBuildingsBold } from "react-icons/pi";
import { LuContactRound } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";


const FooterMenu = () => {

  const links = [
    { to: "/", icon: <GoHome />, value: "Home" },
    { to: "/apartment", icon: <PiBuildingsBold />, value: "Apartments" },
    { to: "/about", icon: <LuContactRound />, value: "About" },
    { to: "/contact", icon: <MdOutlineAlternateEmail />, value: "Contact" },
  ];

  return (
    <div>
        <div>
          {/* Links */}
          <ul>
            {links.map(({ to, icon, value }) => (
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
