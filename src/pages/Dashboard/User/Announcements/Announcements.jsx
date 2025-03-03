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
    return (
      <div className="container mx-auto w-full ">
        <div className="flex min-h-[calc(100vh-344px)] items-center justify-center">
          Error fetching announcements!
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 min-h-[calc(100vh-49px)] md:min-h-screen">
      <Helmet>
        <title>Announcements - Edifica</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-base md:text-xl font-semibold">Announcements</h2>
        <h2 className="text-base md:text-xl font-semibold">
          Total: <span>{announcements.length}</span>
        </h2>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-200">
        <div className="bg-base-300">
          <table className="table w-full border-collapse border border-base-100 rounded-lg ">
            <thead className="sticky -top-[1px] bg-base-300 z-20">
              <tr className="text-base text-primary">
                <th className="border border-base-100 bg-base-300 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 w-10">
                  #
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  Title
                </th>
                <th className="border border-base-100 px-6 py-3 min-w-96">
                  Description
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap text-center">
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
                  <td className="border border-base-100 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 bg-base-200 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                    {announcement.title}
                  </td>
                  <td className="border border-base-100 px-6 py-3">
                    {announcement.description}
                  </td>
                  <td className="border border-base-100 px-6 py-3 whitespace-nowrap text-center">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
