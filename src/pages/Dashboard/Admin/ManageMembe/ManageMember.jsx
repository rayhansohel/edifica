import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all members from the database
  const {
    data: members = [],
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  useEffect(() => {
    if (isError) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load members.");
    }
  }, [isError, error]);

  // Handle remove member (change role to "user")
  const mutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      refetch();
      toast.success("Member removed successfully.");
    },
    onError: () => {
      toast.error("Failed to remove member.");
    },
  });

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="bg-base-200 p-4 rounded-xl">
        <h2 className="text-xl font-semibold text-accent text-center">
          Manage Member
        </h2>
      </div>
      <div className="overflow-x-auto rounded-box">
        <table className="table w-full border-collapse border border-base-100 rounded-lg">
          <thead>
            <tr className="bg-base-300 text-accent text-base">
              <th className="border-b border-base-100 px-4 py-2">Serial</th>
              <th className="border-b border-base-100 px-4 py-2">Name</th>
              <th className="border-b border-base-100 px-4 py-2">Email</th>
              <th className="border-b border-base-100 px-4 py-2">Role</th>
              <th className="border-b border-base-100 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                key={member.email}
                className="bg-base-200 hover:bg-base-300 transition-colors duration-600"
              >
                <td className="border-b border-base-100 px-4 py-2">{index+1}</td>
                <td className="border-b border-base-100 px-4 py-2">{member.name}</td>
                <td className="border-b border-base-100 px-4 py-2">{member.email}</td>
                <td className="border-b border-base-100 px-4 py-2">User</td>
                <td className="border-b border-base-100 px-4 py-2">
                  <button
                    onClick={() => mutation.mutate(member._id)}
                    className="text-rose-600 hover:text-rose-800 text-xl"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
