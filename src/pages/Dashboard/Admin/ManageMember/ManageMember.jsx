import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { MdOutlineDeleteForever } from "react-icons/md";
import useUsers from "../../../../hooks/useUsers";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users
  const { users, isError, error, refetch } = useUsers();

  // Filter members by role 'member'
  const members = users?.filter((user) => user.role === "member") || [];

  useEffect(() => {
    if (isError) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load members.");
    }
  }, [isError, error]);

  // Handle remove member
  const removeMember = useMutation({
    mutationFn: async ({ email, id }) => {
      try {
        const deleteAgreement = await axiosSecure.delete(`/agreement?email=${email}`);
        const updateRole = await axiosSecure.patch(`/users/role?email=${email}`, { role: "user" });
        const updateApartment = await axiosSecure.patch(`/apartment/${id}`, { availability: true });

        return { deleteAgreement, updateRole, updateApartment };
      } catch (error) {
        console.error("API Request Failed:", error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Member removed successfully.");
      refetch();
    },
    onError: (error) => {
      console.error("Error removing member:", error);
      console.error("Full Error Response:", error.response);

      toast.error(`Failed to remove member: ${error.response?.data?.message || error.message || "Unknown error"}`);
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4 min-h-[calc(100vh-49px)] md:min-h-screen">
      <Helmet>
        <title>Manage Members - Edifica</title>
      </Helmet>
      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-base md:text-xl font-semibold">Manage Members</h2>
        <h2 className="text-base md:text-xl font-semibold">
          Total Members: <span>{members.length}</span>
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-200">
        <table className="table w-full border-collapse border border-base-100 rounded-lg text-center">
          <thead className="sticky -top-[1px] bg-base-300 z-20">
            <tr className="text-base text-primary">
              <th className="border border-base-100 bg-base-300 px-6 py-3 sticky -left-[1px] z-10 w-10">#</th>
              <th className="border border-base-100 px-6 py-3">Name</th>
              <th className="border border-base-100 px-6 py-3">Email</th>
              <th className="border border-base-100 px-6 py-3 w-20">Remove</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id} className="bg-base-200 hover:bg-base-300 transition-colors duration-300">
                <td className="border border-base-100 px-6 py-3 sticky -left-[1px] z-10 bg-base-200 text-center">
                  {index + 1}
                </td>
                <td className="border border-base-100 px-6 py-3">{member.name}</td>
                <td className="border border-base-100 px-6 py-3">{member.email}</td>
                <td className="border border-base-100 px-6 py-3">
                  <button
                    onClick={() => removeMember.mutate({ email: member.email, id: member._id })}
                    className="w-full"
                    disabled={removeMember.isLoading}
                  >
                    <div className={`text-2xl flex items-center justify-center ${removeMember.isLoading ? "opacity-50" : "hover:text-rose-800"}`}>
                      <MdOutlineDeleteForever />
                    </div>
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
