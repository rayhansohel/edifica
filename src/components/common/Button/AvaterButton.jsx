import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ProfilePlaceholder from "../../../assets/images/profile-placeholder.png";
import { BiLogOutCircle } from "react-icons/bi";
import LoginButton from "./LoginButton";
import { RiDashboardLine } from "react-icons/ri";
import UserCard from "../Card/UserCard";

const AvaterButton = () => {
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
              className="absolute right-0 top-12 bg-base-200 border border-base-300 rounded-lg p-4"
              style={{ minWidth: "max-content" }}
            >
              <UserCard />
              <hr className="border-base-300 my-4" />
              <ul>
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="p-2 flex items-center gap-2 hover:bg-base-300 rounded-md"
                  >
                    <RiDashboardLine className="text-lg" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full p-2 flex items-center gap-2 hover:bg-base-300 rounded-md"
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
        <LoginButton />
      )}
    </div>
  );
};

export default AvaterButton;
