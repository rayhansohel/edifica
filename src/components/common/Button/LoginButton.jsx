import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";
import { useContext } from "react";

const LoginButton = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div>
      <Link
        to="/login"
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
    </div>
  );
};

export default LoginButton;
