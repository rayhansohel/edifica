import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="space-x-6 flex items-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `hover:text-accent ${isActive ? "text-accent font-semibold" : "transition"}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/apartment"
        className={({ isActive }) =>
          `hover:text-accent ${isActive ? "text-accent font-semibold" : "transition"}`
        }
      >
        Apartment
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `hover:text-accent ${isActive ? "text-accent font-semibold" : "transition"}`
        }
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `hover:text-accent ${isActive ? "text-accent font-semibold" : "transition"}`
        }
      >
        Contact
      </NavLink>
    </div>
  );
};

export default NavLinks;
