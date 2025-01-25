import { useAuth } from "../../../context/AuthContext";
import ProfilePlaceholder from "../../../assets/images/profile-placeholder.png";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/animations/Loading.json";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch agreement details from the server
  const {
    data: agreementData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userAgreement", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreement/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Default profile data
  const profileData = {
    name: user?.displayName || "User",
    email: user?.email || "user@example.com",
    profilePicture: user?.photoURL || ProfilePlaceholder,
    agreementStatus: agreementData?.status || "None",
    agreementDate: agreementData?.date || "None",
    apartmentInfo: {
      floor: agreementData?.floorNo || "None",
      block: agreementData?.blockName || "None",
      roomNo: agreementData?.apartmentNo || "None",
    },
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie animationData={loadingAnimation} className="w-20" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error loading profile. Please try again later.
      </div>
    );

  return (
    <div className="space-y-4">
      <Helmet>
        <title>Profile - Edifica</title>
      </Helmet>

      <div className="bg-base-200 p-4 rounded-xl">
        <h2 className="text-xl font-semibold text-accent text-center">
          My Profile
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="flex gap-4 bg-base-200 p-4 rounded-box lg:col-span-2 xl:col-span-1">
          <img
            src={profileData.profilePicture}
            alt="User Profile"
            className="w-24 h-24 rounded-xl border border-base-300"
          />
          <div>
            <h3 className="text-2xl font-medium">{profileData.name}</h3>
            <p>{profileData.email}</p>
          </div>
        </div>

        <div className="bg-base-200 p-4 rounded-box col-span-1">
          <h3 className="text-lg font-semibold mb-2">Agreement Information</h3>
          <p>Accept Status: {profileData.agreementStatus}</p>
          <p>Accept Date: {profileData.agreementDate}</p>
        </div>

        <div className="bg-base-200 p-4 rounded-box col-span-1">
          <h3 className="text-lg font-semibold mb-2">Apartment Information</h3>
          <ul>
            <li className="opacity-70">
              Floor: {profileData.apartmentInfo.floor}
            </li>
            <li className="opacity-70">
              Block: {profileData.apartmentInfo.block}
            </li>
            <li className="opacity-70">
              Room No: {profileData.apartmentInfo.roomNo}
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-base-200 rounded-box min-h-[calc(100vh-252px)] flex items-center justify-center">
        <h3>No Notice Available!</h3>
      </div>
    </div>
  );
};

export default MyProfile;
