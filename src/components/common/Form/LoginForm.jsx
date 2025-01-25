/* eslint-disable react/no-unescaped-entities */
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const LoginForm = () => {
  const { userLogin, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password should be at least 6 characters long!";
    }
    return "";
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login with Google successful!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Google sign-in failed. Try again!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setEmailError("");
    setPasswordError("");

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-w-96">
        <div>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-sm bg-base-100 border-base-300 hover:bg-base-300 shadow-none"
          >
            <FcGoogle className="text-lg" />
            <span>Login with Google</span>
          </button>
        </div>
        <div className="flex w-full flex-col px-9 mt-4 -mb-4">
          <div className="divider">OR</div>
        </div>
        <form onSubmit={handleSubmit} className="card-body w-full space-y-2">
          <div className="form-control">
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email address"
              className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
              required
            />
            {emailError && (
              <div className=" text-accent mt-2 ml-4">{emailError}</div>
            )}
          </div>
          <div className="form-control relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
              required
            />
            <span
              className="absolute right-2 top-[7px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
            {passwordError && (
              <div className=" text-accent mt-2 ml-4">{passwordError}</div>
            )}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-sm btn-accent">
              <span>Login</span>
            </button>
          </div>
          <div className=" text-center">
            <p>
              Don't have an Account?{" "}
              <Link to="/register" className="font-semibold text-accent">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
