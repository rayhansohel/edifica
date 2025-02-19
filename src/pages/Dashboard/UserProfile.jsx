import { useAuth } from "../../context/AuthContext";
import ProfilePlaceholder from "../../assets/images/profile-placeholder.png";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/common/Loading/LoadingAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch user details from the server
  const { data: userDetails, isLoading, isError } = useQuery({
    queryKey: ["userDetails", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/userDetails/${user?.email}`);
        return res.data;
      } catch (error) {
        throw new Error("Error fetching user details");
      }
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingAnimation />;
  if (isError) return <div>Error loading user profile. Please try again later.</div>;

  const profileData = {
    name: user?.displayName || "User",
    email: user?.email || "user@example.com",
    phone: userDetails?.phone || "Not Available",
    address: userDetails?.address || "Not Available",
    profilePicture: user?.photoURL || ProfilePlaceholder,
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-49px)] md:min-h-screen space-y-4 p-4">
      <Helmet>
        <title>Profile - Edifica</title>
      </Helmet>
      <div className="bg-base-200 p-8 rounded-box shadow-md">
        <div className="flex gap-6 items-center">
          <img
            src={profileData.profilePicture}
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-accent"
          />
          <div className="flex flex-col">
            <h3 className="text-3xl font-semibold">{profileData.name}</h3>
            <h3 className="text-lg text-gray-500">{profileData.email}</h3>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <div className="flex justify-between">
            <div className="text-lg">
              <strong>Phone:</strong> {profileData.phone}
            </div>
            <div className="text-lg">
              <strong>Address:</strong> {profileData.address}
            </div>
          </div>
        </div>

        {/* Additional information section (if needed) */}
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">Additional Information</h3>
          <div className="flex justify-between">
            <div className="text-lg">
              <strong>Member Since:</strong> {user?.metadata.creationTime || "Not Available"}
            </div>
            <div className="text-lg">
              <strong>Role:</strong> {user?.role || "User"}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/edit-profile")}
          className="btn btn-accent"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

