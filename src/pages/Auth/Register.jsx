import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import { Helmet } from "react-helmet-async";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";
import RegisterForm from "../../components/common/Form/RegisterForm";

const Register = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div className="min-h-screen bg-register w-full h-screen bg-cover bg-center flex justify-center items-center">
        <Helmet>
          <title>Login - Edifica</title>
        </Helmet>
        <div className="h-full w-full bg-base-300/50 backdrop-blur flex items-center justify-center">
          <div>
            <RegisterForm />
          </div>
        </div>
      </div>
      {/* BacK to home  */}
      <div className="fixed top-4 right-4 flex gap-2">
          <Link
          to="/"
          data-tooltip-id="home-tooltip"
          data-tooltip-content="Go Back to Home"
          className="w-[32px] h-[32px] border border-base-300 rounded-md flex items-center justify-center"
        >
          <GoHome className="text-lg hover:text-accent" />
          <Tooltip
            id="home-tooltip"
            place="bottom"
            style={{
              backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
              color: theme === "light" ? "#ffffff" : "#000000",
              padding: "6px 10px",
              borderRadius: "4px",
            }}
          />
        </Link>
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
        {/* Brand Logo */}
        <div className="fixed top-4 left-4">
          <Link to="/">
            <div className="flex items-center justify-center gap-1">
              <img src={BrandLogo} alt="Brand Logo" className="w-7" />
              <h3 className="uppercase text-2xl font-semibold tracking-wider">
                Edifica
              </h3>
            </div>
          </Link>
        </div>
    </div>
  );
};

export default Register;
