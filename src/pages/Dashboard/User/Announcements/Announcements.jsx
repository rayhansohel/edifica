import { Helmet } from "react-helmet-async";

const Announcements = () => {
  return (
    <div>
      <Helmet>
        <title>Notice - Edifica</title>
      </Helmet>
      <div className="flex flex-col min-h-[calc(100vh-49px)] md:min-h-screen space-y-4 p-4">
        <div className="bg-base-200 rounded-box flex items-center justify-center flex-grow">
          <h3>No Announcement Available!</h3>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
