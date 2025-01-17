import { Link } from "react-router-dom";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import NavLinks from "../common/Links/NavLinks";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import AuthLogin from "../common/Button/AuthLogin";

const Navbar = () => {
  return (
    <div className="px-4 backdrop-blur bg-base-200/50 border-b border-base-300">
      <div className="container mx-auto flex justify-between items-center min-h-12">
        {/* Brand Logo */}
        <div className="flex items-center min-w-32">
          <Link to="/">
            <div className="flex items-center justify-center gap-2">
              <img src={BrandLogo} alt="Brand Logo" className="w-5" />
              <h3 className="uppercase text-lg font-semibold tracking-wider">
                Edifica
              </h3>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div>
          <NavLinks />
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
