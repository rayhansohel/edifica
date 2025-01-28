import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { MdOutlineDeleteForever } from "react-icons/md";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users from the database
  const {
    data: users = [],
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  useEffect(() => {
    if (isError) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
    }
  }, [isError, error]);

  // Handle change user role
  const changeUserRole = useMutation({
    mutationFn: async ({ id, value, name }) => {
      await axiosSecure.patch(`/users/role/${id}`, { role: value });
      return name;
    },
    onSuccess: (name) => {
      refetch();
      toast.success(`${name}'s role updated successfully.`);
    },
    onError: () => {
      toast.error("Failed to update user role.");
    },
  });

  // Handle delete user
  const deleteUser = useMutation({
    mutationFn: async ({ id, name }) => {
      await axiosSecure.delete(`/users/${id}`);
      return name;
    },
    onSuccess: (name) => {
      refetch();
      toast.success(`${name} deleted successfully.`);
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <Helmet>
        <title>Manage User - Edifica</title>
      </Helmet>
      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <h2 className="text-xl font-semibold">
          Total User: <span>{users.length}</span>
        </h2>
      </div>
      <div className="overflow-x-auto max-h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-200">
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
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Role
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap w-20">
                Change Role
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap w-10">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="bg-base-200 hover:bg-base-300 transition-colors duration-300"
              >
                {/* Sticky First Column */}
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 bg-base-200 text-center">
                  {index + 1}
                </td>
                {/* Other columns */}
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {user.role}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      changeUserRole.mutate({
                        id: user._id,
                        value: e.target.value,
                        name: user.name,
                      })
                    }
                    className="select select-sm bg-base-100 rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                    <option value="owner">Owner</option>
                  </select>
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  <button
                    onClick={() =>
                      deleteUser.mutate({ id: user._id, name: user.name })
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

export default ManageUser;
