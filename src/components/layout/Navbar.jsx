import { Link } from "react-router-dom";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import NavMenu from "../common/Menu/NavMenu";
import MobileMenu from "../common/Menu/MobileMenu";
import AvaterButton from "../common/Button/AvaterButton";

const Navbar = () => {
  return (
    <div className="backdrop-blur bg-secondary/80 border-b border-base-300">
      <div className="container mx-auto px-4 flex justify-between items-center min-h-12">
        {/*Mobile Menu*/}
        <div className="lg:hidden min-w-20 ">
          <MobileMenu />
        </div>
        {/* Brand Logo and Mobile Dropdown*/}
        <div className="flex items-center min-w-20 gap-2">
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
        <div className="hidden lg:flex">
          <NavMenu />
        </div>

        {/* Auth button */}
        <div className="min-w-20 flex justify-end items-center gap-2">
          <div>
            <AvaterButton />
          </div>
          <div className="hidden lg:flex">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
