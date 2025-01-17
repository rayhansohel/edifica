import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ProfilePlaceholder from "../../../assets/images/profile-placeholder.png";
import { RiLoginCircleLine, RiDashboardLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";

const AuthLogin = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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
      setShowDropdown(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center" ref={dropdownRef}>
          <img
            src={user.profilePicture}
            alt="User Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              className="absolute right-0 top-10 mt-2 bg-base-200 border border-base-300 rounded-lg"
              style={{ minWidth: "max-content" }}
            >
              <div className="px-4 py-2 flex items-center gap-2">
                <img
                  src={user.profilePicture}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <hr className="border-base-300" />
              <ul>
                <li>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-base-300"
                    onClick={() => setShowDropdown(false)}
                  >
                    <RiDashboardLine className="text-lg" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-base-300"
                    onClick={handleLogout}
                  >
                    <BiLogOutCircle className="text-lg" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/auth/login"
          data-tooltip-id="login-tooltip"
          data-tooltip-content="Login"
          className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center"
        >
          <RiLoginCircleLine className="text-lg hover:text-accent" />
          <Tooltip
            id="login-tooltip"
            place="bottom"
            style={{
              backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
              color: theme === "light" ? "#ffffff" : "#000000",
              padding: "6px 10px",
              borderRadius: "4px",
            }}
          />
        </Link>
      )}
    </div>
  );
};

export default AuthLogin;
