import { Link, NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import ProfilePlaceholder from "../../assets/images/profile-placeholder.png";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { BiLogOutCircle } from "react-icons/bi";
import SideBarMenu from "../common/Menu/SideBarMenu";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../context/ThemeContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User",
          email: currentUser.email,
          profilePicture: currentUser.photoURL || ProfilePlaceholder,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <div>
        {/* Brand Logo and Mobile Dropdown*/}
        <div className="flex items-center min-w-32 gap-2 justify-between w-full p-4 border-b border-base-300">
          {/* Brand Logo */}
          <Link to="/">
            <div className="flex items-center justify-center gap-1">
              <img src={BrandLogo} alt="Brand Logo" className="w-5" />
              <h3 className="uppercase text-lg font-semibold tracking-wider">
                Edifica
              </h3>
            </div>
          </Link>
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Menu Items */}
        <div className="min-h-[calc(100vh-138px)] w-full">
          <SideBarMenu />
        </div>

        {/* User info */}
        <div className="flex justify-between items-center w-full p-4 border-t border-base-300">
          {user && (
            <div className="flex items-center w-full gap-2">
              <img
                src={user.profilePicture}
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-xs">{user.email}</p>
              </div>
            </div>
          )}
          <div>
            <NavLink
              onClick={handleLogout}
              data-tooltip-id="Logout-tooltip"
              data-tooltip-content="Logout"
            >
              <div className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center text-xl hover:text-accent">
                <BiLogOutCircle />
              </div>
            </NavLink>

            <Tooltip
              id="Logout-tooltip"
              place="bottom"
              style={{
                backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
                color: theme === "light" ? "#ffffff" : "#000000",
                padding: "6px 10px",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
