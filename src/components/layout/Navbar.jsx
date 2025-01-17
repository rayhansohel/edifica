import { Link } from "react-router-dom";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import AuthLogin from "../common/Button/AuthLogin";
import NavMenu from "../common/Menu/NavMenu";
import DropdownMenu from "../common/Menu/DropdownMenu";

const Navbar = () => {
  return (
    <div className="backdrop-blur bg-base-200/70 border-b border-base-300">
      <div className="container mx-auto px-4 flex justify-between items-center min-h-12">
        {/* Brand Logo and Mobile Dropdown*/}
        <div className="flex items-center min-w-32 gap-2">
          {/* Dorpdown Menu Items */}
          <div className="md:hidden">
            <DropdownMenu />
          </div>
          {/* Brand Logo */}
          <Link to="/">
            <div className="flex items-center justify-center gap-1">
              <img src={BrandLogo} alt="Brand Logo" className="w-5" />
              <h3 className="uppercase text-lg font-semibold tracking-wider">
                Edifica
              </h3>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex">
          <NavMenu />
        </div>

        {/* Auth button */}
        <div className="min-w-32 flex justify-end items-center">
          <AuthLogin />
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
