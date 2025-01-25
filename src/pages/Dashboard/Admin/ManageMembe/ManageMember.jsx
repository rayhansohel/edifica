import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all members from the database
  const {
    data: members = [],
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
    mutationFn: async (email) => {
      await axiosSecure.patch(`/users/${email}`, { role: "user" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
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
              <th className="border border-base-100 p-2">User Name</th>
              <th className="border border-base-100 p-2">User Email</th>
              <th className="border border-base-100 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.email}
                className="bg-base-200 hover:bg-base-300 transition-colors duration-600"
              >
                <td className="border border-base-100 p-2">{member.name}</td>
                <td className="border border-base-100 p-2">{member.email}</td>
                <td className="border border-base-100 p-2">
                  {member.role === "member" ? (
                    <button
                      onClick={() => mutation.mutate(member.email)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  ) : (
                    <span className="text-base-500">User</span>
                  )}
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
