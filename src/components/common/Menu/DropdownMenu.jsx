import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiBuildingsBold } from "react-icons/pi";
import { LuContactRound } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { to: "/", icon: <GoHome />, value: "Home" },
    { to: "/apartment", icon: <PiBuildingsBold />, value: "Apartments" },
    { to: "/about", icon: <LuContactRound />, value: "About" },
    { to: "/contact", icon: <MdOutlineAlternateEmail />, value: "Contact" },
  ];

  return (
    <div className="relative">
      {/* Hamburger icon for mobile */}
      <button
        onClick={toggleDropdown}
        className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center "
      >
        {isOpen ? (
          <span className="text-xl">
            <IoClose />
          </span>
        ) : (
          <span className="text-xl">
            <HiMenu />
          </span>
        )}
      </button>

      {/* Dropdown menu (visible only when `isOpen` is true on mobile) */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-10 mt-2 bg-base-200 border border-base-300 rounded-lg overflow-hidden"
          style={{ minWidth: "max-content" }}
        >
          {/* Links */}
          <ul>
            {links.map(({ to, icon, value }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeDropdown}
                  className={({ isActive }) =>
                    `px-4 py-2 flex items-center gap-2 hover:bg-base-300 ${
                      isActive ? "text-accent font-semibold" : "transition"
                    }`
                  }
                >
                  <div className="flex gap-2 justify-center items-center">
                    <div className="text-lg">{icon}</div>
                    <div>{value}</div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
