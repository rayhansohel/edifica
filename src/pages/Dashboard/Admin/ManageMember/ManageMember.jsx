import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { MdOutlineDeleteForever } from "react-icons/md";
import useUsers from "../../../../hooks/useUsers";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  
  // Use the custom hook to fetch users
  const { users, isError, error, refetch } = useUsers();
  
  // Filter members by their role 'member'
  const members = users?.filter((user) => user.role === "member") || [];

  useEffect(() => {
    if (isError) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load members.");
    }
  }, [isError, error]);

  // Handle remove member
  const removeMember = useMutation({
    mutationFn: async ({ id, name }) => {
      await axiosSecure.patch(`/users/role/${id}`, { role: "user" });
      return name;
    },
    onSuccess: (name) => {
      refetch();
      toast.success(`${name} removed from members successfully.`);
    },
    onError: () => {
      toast.error("Failed to remove member.");
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
      <div className="overflow-x-auto h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-200">
        <table className="table w-full border-collapse border border-base-100 rounded-lg text-center">
          <thead className="sticky -top-[1px] bg-base-300 z-20">
            <tr className="text-base text-primary">
              <th className="border border-base-100 bg-base-300 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 w-10">
                #
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Name
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Email
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap w-20">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                key={member._id}
                className="bg-base-200 hover:bg-base-300 transition-colors duration-300"
              >
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 bg-base-200 text-center">
                  {index + 1}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {member.name}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {member.email}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  <button
                    onClick={() =>
                      removeMember.mutate({ id: member._id, name: member.name })
                    }
                    className="w-full"
                  >
                    <div className="hover:text-rose-800 text-2xl flex items-center justify-center">
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
