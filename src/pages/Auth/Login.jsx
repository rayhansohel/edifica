import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import LoginForm from "../../components/common/Form/LoginForm";
import { Helmet } from "react-helmet-async";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";

const Login = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Helmet>
        <title>Login - Edifica</title>
      </Helmet>
      <div className="min-h-screen w-full bg-cover bg-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center p-8 gap-8">
        <div className="hidden md:flex h-full w-full rounded-badge overflow-hidden md:col-span-1 lg:col-span-2">
          <img
            src="https://i.ibb.co.com/6Wc3V7X/login.jpg"
            alt="about us"
            className="object-cover h-full w-full min-h-80 hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>

        <div className="w-full h-full bg-base-100/20 backdrop-blur flex flex-col items-center justify-center gap-8 col-span-1">
          {/* Brand Logo for mobile*/}
          <div className="">
            <Link to="/">
              <div className="flex items-center justify-center gap-2">
                <img src={BrandLogo} alt="Brand Logo" className="w-8" />
                <h3 className="uppercase text-3xl font-semibold tracking-wider">
                  Edifica
                </h3>
              </div>
            </Link>
          </div>
          {/* Login Form */}
          <div className="flex-grow flex items-center justify-center">
            <LoginForm />
          </div>
                  {/* BacK to home and Theme  */}
        <div className="flex gap-2">
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
        </div>
      </div>
    </>
  );
};

export default Login;
