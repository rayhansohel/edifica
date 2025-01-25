import { Helmet } from "react-helmet-async";

const Announcements = () => {
  return (
    <div>
      <Helmet>
        <title>Notice - Edifica</title>
      </Helmet>
      <div className="space-y-4">
        <div className="bg-base-200 p-4 rounded-xl">
          <h2 className="text-xl font-semibold text-accent text-center">
            Announcements
          </h2>
        </div>
        <div className="bg-base-200 rounded-box min-h-[calc(100vh-108px)] flex items-center justify-center">
          <h3>No Announcement Available!</h3>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
