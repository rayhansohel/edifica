import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle announcement submission
  const createAnnouncement = useMutation({
    mutationFn: async (announcement) => {
      await axiosSecure.post("/announcements", announcement);
    },
    onSuccess: () => {
      toast.success("Announcement posted successfully.");
      setTitle("");
      setDescription("");
    },
    onError: () => {
      toast.error("Failed to post announcement.");
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

  return (
    <div className="p-4 flex flex-col gap-4">
      <Helmet>
        <title>Make Announcement - Edifica</title>
      </Helmet>
      <div className="bg-base-200 py-4 px-6 rounded-xl text-accent">
        <h2 className="text-xl font-semibold">Make Announcement</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-base-200 p-8 rounded-xl flex-grow">
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
        <button type="submit" className="btn btn-sm btn-accent w-fit">Submit Announcement</button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
