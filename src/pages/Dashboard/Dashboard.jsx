import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard- Edifica</title>
      </Helmet>
      <div className="space-y-4">
        <div className="bg-base-200 p-4 rounded-xl">
          <h2 className="text-xl font-semibold text-accent text-center">
            Dashboard
          </h2>
        </div>
        <div className="bg-base-200 rounded-box min-h-[calc(100vh-108px)] flex flex-col gap-4 items-center justify-center">
          <h1 className="text-7xl text-accent">Hello!</h1> 
          <h3 className="text-base">Welcome to Edifica! We're thrilled to have you with us and look forward to being a part of your journey.</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
