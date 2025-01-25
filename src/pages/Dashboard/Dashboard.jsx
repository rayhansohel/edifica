import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard- Edifica</title>
      </Helmet>
      <div className="flex flex-col min-h-[calc(100vh-49px)] md:min-h-screen space-y-4 p-4">
        <div className="bg-base-200 p-4 rounded-xl">
          <h2 className="text-xl font-semibold text-accent text-center">
            Dashboard
          </h2>
        </div>
        <div className="bg-base-200 rounded-box flex flex-col gap-4 items-center justify-center flex-grow p-4">
          <h1 className="text-7xl text-accent">Hello!</h1> 
          <h3 className="text-base">Welcome to Edifica!</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
