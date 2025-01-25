import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../../../context/ThemeContext";
import { getAuth, signOut } from "firebase/auth";
import { BiLogOutCircle } from "react-icons/bi";
import { Tooltip } from "react-tooltip";

const LogoutButton = () => {

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

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
      <Link
        onClick={handleLogout}
        data-tooltip-id="Logout-tooltip"
        data-tooltip-content="Logout"
      >
        <div className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center text-xl hover:text-accent">
          <BiLogOutCircle />
        </div>
      </Link>

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
  );
};

export default LogoutButton;
