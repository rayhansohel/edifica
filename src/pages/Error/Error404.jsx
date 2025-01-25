import { Helmet } from "react-helmet-async";

const Error404 = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Helmet>
        <title>404 - Edifica</title>
      </Helmet>
      <div>
        Error 404 | Sorry page not found.
      </div>
    </div>
  );
};

export default Error404;
