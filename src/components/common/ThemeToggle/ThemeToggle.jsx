import { Tooltip } from "react-tooltip";
import { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Handle theme toggle
  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center">
      <button
        className="w-[32px] h-[32px] border border-base-300 rounded-md flex items-center justify-center ml-2"
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={`${theme === "dark" ? "Light" : "Dark"}`}
        onClick={handleThemeChange}
      >
        {theme === "dark" ? (
          <HiSun className="text-lg hover:text-accent" />
        ) : (
          <HiMoon className="text-lg hover:text-accent" />
        )}
      </button>
      {/* Tooltip Component */}
      <Tooltip
        id="theme-tooltip"
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

export default ThemeToggle;
