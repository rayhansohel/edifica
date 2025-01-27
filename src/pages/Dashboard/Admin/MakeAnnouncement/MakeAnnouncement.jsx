import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { MdOutlineDeleteForever } from "react-icons/md";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch existing announcements
  const {
    data: announcements = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const response = await axiosSecure.get("/announcements");
      return response.data;
    },
  });

  // Handle announcement submission
  const createAnnouncement = useMutation({
    mutationFn: async (announcement) => {
      await axiosSecure.post("/announcements", announcement);
    },
    onSuccess: () => {
      toast.success("Announcement posted successfully.");
      setTitle("");
      setDescription("");
      refetch();
    },
    onError: () => {
      toast.error("Failed to post announcement.");
    },
  });

  // Handle announcement deletion
  const deleteAnnouncement = useMutation({
    mutationFn: async (announcementId) => {
      await axiosSecure.delete(`/announcements/${announcementId}`);
    },
    onSuccess: () => {
      toast.success("Announcement deleted successfully.");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete announcement.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields.");
      return;
    }
    createAnnouncement.mutate({ title, description });
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
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
        <title>Make Announcement - Edifica</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-xl font-semibold">Make Announcement</h2>
      </div>

      {/* Announcement Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-base-200 p-8 rounded-xl flex-grow"
      >
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-sm w-full rounded-md"
            placeholder="Enter title"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea w-full rounded-md"
            placeholder="Enter description"
            rows="8"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-sm btn-accent w-fit">
          Submit Announcement
        </button>
      </form>

      {/* Announcement List */}
      <div className="overflow-x-auto max-h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-300">
        <table className="table w-full border-collapse border border-base-100 rounded-lg">
          <thead className="sticky -top-[1px] bg-base-300 z-20">
            <tr className="text-base text-primary">
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Title
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Description
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Date
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr
                key={announcement._id}
                className="bg-base-200 hover:bg-base-300 transition-colors duration-300"
              >
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {announcement.title}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {announcement.description}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {formatDate(announcement.createdAt)}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  <div
                    onClick={() => deleteAnnouncement.mutate(announcement._id)}
                    className="hover:text-rose-800 text-2xl flex items-center justify-center"
                  >
                    <MdOutlineDeleteForever />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
