import { useContext, useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import MainMenu from "./MainMenu";
import DashboardMenu from "./DashboardMenu";
import BrandLogo from "../../../assets/logo/edifica-logo.png";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import UserCard from "../Card/UserCard";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Hamburger button */}
      <button
        onClick={openMenu}
        data-tooltip-id="tooltip"
        data-tooltip-content="Menu"
        className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center text-xl"
      >
        <HiMenu />
      </button>

      {/* Drawer menu */}
      <div
        ref={menuRef}
        className={`z-50 fixed top-0 left-0 h-screen bg-base-200 border-r border-base-300 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-8 justify-between w-full p-4">
          {/* Brand Logo */}
          <Link to="/">
            <div className="flex items-center justify-center gap-1">
              <img src={BrandLogo} alt="Brand Logo" className="w-5" />
              <h3 className="uppercase text-lg font-semibold tracking-wider">
                Edifica
              </h3>
            </div>
          </Link>
          {/* Close button */}
          <button
            onClick={closeMenu}
            className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center text-xl"
          >
            <IoClose />
          </button>
        </div>
        <hr className="border-base-300 mx-4" />


        <div className="min-h-[calc(100vh-134px)]">
          <MainMenu closeMenu={closeMenu} />
          {user && (
            <div>
              <hr className="border-base-300 mx-4" />
              <DashboardMenu closeMenu={closeMenu} />
            </div>
          )}
        </div>

        <div>
          {user && (
            <div>
              <hr className="border-base-300 mx-4" />
              <div className="p-4 flex gap-4">
                <UserCard />
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close the menu when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={closeMenu}
        ></div>
      )}

      <Tooltip
        id="tooltip"
        place="bottom"
        style={{
          backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
          color: theme === "light" ? "#ffffff" : "#000000",
          padding: "6px 10px",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default MobileMenu;
