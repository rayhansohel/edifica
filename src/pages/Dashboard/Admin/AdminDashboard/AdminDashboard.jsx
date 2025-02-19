import { useAuth } from "../../../../context/AuthContext";
import ProfilePlaceholder from "../../../../assets/images/profile-placeholder.png";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUsers from "../../../../hooks/useUsers";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Default profile data
  const profileData = {
    name: user?.displayName || "User",
    email: user?.email || "user@example.com",
    profilePicture: user?.photoURL || ProfilePlaceholder,
  };

  // Use the custom hook to fetch users
  const { users } = useUsers();

  // Filter members by their role 'member'
  const members = users?.filter((user) => user.role === "member") || [];

  // Fetch all apartments
  const { data: apartments } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const response = await axiosPublic.get("/all-apartments");
      return response.data;
    },
  });

  // Calculate available rooms percentage
  // Calculate available rooms percentage
  const availableRooms = apartments?.filter(
    (apartment) => apartment.availability === true
  ).length;
  const totalRooms = apartments?.length;
  const availablePercentage =
    totalRooms > 0 ? (availableRooms / totalRooms) * 100 : 0;

  // Percentage of agreements (assuming availability false means rented)
  const agreementsDone = apartments?.filter(
    (apartment) => apartment.availability === false
  ).length;
  const agreementPercentage =
    totalRooms > 0 ? (agreementsDone / totalRooms) * 100 : 0;

  return (
    <div className="flex flex-col min-h-[calc(100vh-49px)] md:min-h-screen space-y-4 p-4">
      <Helmet>
        <title>Dashboard - Edifica</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
        <div className="flex gap-4 flex-col items-center justify-center text-center bg-base-200 p-4 rounded-box min-h-40">
          <img
            src={profileData.profilePicture}
            alt="User Profile"
            className="w-32 h-32 rounded-full border border-base-300"
          />
          <div className="flex flex-col">
            <h3 className="text-2xl font-medium">{profileData.name}</h3>
            <h3>{profileData.email}</h3>
          </div>
        </div>

        <div className="bg-base-200 p-4 rounded-box min-h-40 flex gap-4 flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Total Rooms</h3>
          <h1 className="text-3xl text-accent">{totalRooms}</h1>
        </div>

        <div className="bg-base-200 p-4 rounded-box min-h-40 flex gap-4 flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Available Rooms</h3>
          <h1 className="text-3xl text-accent">
            {availablePercentage.toFixed(2)}%
          </h1>
        </div>

        <div className="bg-base-200 p-4 rounded-box min-h-40 flex gap-4 flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Agreement Done</h3>
          <h1 className="text-3xl text-accent">
            {agreementPercentage.toFixed(2)}%
          </h1>
        </div>

        <div className="bg-base-200 p-4 rounded-box min-h-40 flex gap-4 flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <h1 className="text-3xl text-accent">{users?.length || 0}</h1>
        </div>

        <div className="bg-base-200 p-4 rounded-box min-h-40 flex gap-4 flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-2">Total Members</h3>
          <h1 className="text-3xl text-accent">{members?.length || 0}</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
