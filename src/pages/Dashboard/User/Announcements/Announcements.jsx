import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";
import { Helmet } from "react-helmet-async";

const Announcements = () => {
  const {
    data: announcements = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const axiosPublic = useAxiosPublic();
      const response = await axiosPublic.get("/announcements");
      return response.data;
    },
  });

  // Handle loading and error states
  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Error fetching announcements!</div>;
  }

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <Helmet>
        <title>Announcements - Edifica</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-base md:text-xl font-semibold">Announcements</h2>
        <h2 className="text-base md:text-xl font-semibold">
          Total Announcements: <span>{announcements.length}</span>
        </h2>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto max-h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-300">
        <table className="table w-full border-collapse border border-base-100 rounded-lg ">
          <thead className="sticky -top-[1px] bg-base-300 z-20">
            <tr className="text-base text-primary">
              <th className="border border-base-100 bg-base-300 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 w-10">
                Serial
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Title
              </th>
              <th className="border border-base-100 px-6 py-3 min-w-96">
                Description
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, index) => (
              <tr
                key={index}
                className="bg-base-200 hover:bg-base-300 transition-colors duration-300"
              >
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 bg-base-300 text-center">
                  {index + 1}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {announcement.title}
                </td>
                <td className="border border-base-100 px-6 py-3">
                  {announcement.description}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcements;
