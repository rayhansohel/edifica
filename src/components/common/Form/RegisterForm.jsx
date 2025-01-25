import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { registerWithEmailPassword, signInWithGoogle } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = password.length >= 6;

    if (!uppercase.test(password)) {
      return "Password must have at least one uppercase letter!";
    }
    if (!lowercase.test(password)) {
      return "Password must have at least one lowercase letter!";
    }
    if (!minLength) {
      return "Password must be at least 6 characters long!";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const displayName = form.get("displayName");
    const email = form.get("email");
    const photoURL = form.get("photoURL") || "";
    const password = form.get("password");

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError("");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setPasswordError("");
    toast.dismiss();

    try {
      await registerWithEmailPassword(email, password, displayName, photoURL);
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Try a different one.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
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

  return (
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
        <div>
          <h1 className="text-md text-center">Register Here</h1>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="displayName"
            placeholder="Your Name"
            className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
            required
          />
          {emailError && (
            <div className="text-error mt-2 ml-4">{emailError}</div>
          )}
        </div>
        <div className="form-control relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
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
            <div className=" text-error mt-2 ml-4">{passwordError}</div>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            name="photoURL"
            placeholder="Profile Picture URL"
            className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none rounded-md bg-base-300"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-sm btn-accent">
            Register
          </button>
        </div>
        <div className=" text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-accent">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
