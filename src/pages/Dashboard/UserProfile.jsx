import { useAuth } from "../../context/AuthContext";
import ProfilePlaceholder from "../../assets/images/profile-placeholder.png";
import BannerPlaceholder from "../../assets/images/banner-placeholder.png"; // Add a banner placeholder
import { Helmet } from "react-helmet-async";
import LoadingAnimation from "../../components/common/Loading/LoadingAnimation";
import useUserRole from "../../hooks/useUserRole";

const UserProfile = () => {
  const { user } = useAuth();
  const { data: role, isLoading } = useUserRole();

  if (isLoading) return <LoadingAnimation />;

  const profileData = {
    name: user?.displayName || "User",
    email: user?.email || "user@example.com",
    profilePicture: user?.photoURL || ProfilePlaceholder,
    bannerImage: BannerPlaceholder,
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-49px)] md:min-h-screen p-4">
      <Helmet>
        <title>Profile - Edifica</title>
      </Helmet>

      {/* Banner Image */}
      <div className="relative w-full h-48 md:h-72">
        <img
          src={profileData.bannerImage}
          alt="Banner"
          className="w-full h-full object-cover rounded-t-box"
        />
      </div>

      <div className="bg-base-200 p-8 rounded-b-box flex-1">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="-mt-28 z-10">
            <img
              src={profileData.profilePicture}
              alt="User Profile"
              className="w-40 h-40 rounded-full border-4 border-accent"
            />
          </div>
          <div className="flex flex-col bg-base-300 p-8 rounded-box text-center min-w-80">
            <h3 className="text-3xl font-semibold">{profileData.name}</h3>
            <p>{profileData.email}</p>
            <div>
              <strong>Role:</strong> {role || "User"}
            </div>
            <div>
              <strong>Member Since:</strong>{" "}
              {user?.metadata.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Not Available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
