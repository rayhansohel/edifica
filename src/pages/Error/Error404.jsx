import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animations/404.json";
import { GrHomeRounded } from "react-icons/gr";

const Error404 = () => {
  return (
    <div className="text-sm">
      <Helmet>
        <title>Error 404 - Edifica</title>
      </Helmet>
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center bg-base-100">
        <Lottie animationData={loginAnimation} className="w-60 -mb-16 -mt-20" />
        <h1 className="font-antonio font-extrabold text-9xl">
          4<span className="text-accent">0</span>4
        </h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to="/">
          <button className="btn btn-sm btn-accent">
            <GrHomeRounded /> Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
