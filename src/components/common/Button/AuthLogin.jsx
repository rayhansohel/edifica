import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePlaceholder from "../../../assets/images/profile-placeholder.png";
import { RiLoginCircleLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";

const AuthLogin = () => {
  const { theme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = {
    name: "John Doe",
    profilePicture: ProfilePlaceholder,
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      {isLoggedIn ? (
        <div className="flex items-center">
          <img
            src={user.profilePicture}
            alt="User Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-base-200 border border-base-300 rounded-md shadow-lg">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-semibold">{user.name}</p>
              </div>
              <hr className="border-base-300" />
              <ul>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-base-300"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-base-300"
                    onClick={handleLogout}
                  >
                    Logout
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
          className="w-[32px] h-[32px] border border-base-300 rounded-md flex items-center justify-center"
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
