/* eslint-disable no-unused-vars */
import { useAuth } from "../../../../context/AuthContext";
import ProfilePlaceholder from "../../../../assets/images/profile-placeholder.png";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch agreement details from the server
  const { data: agreementData, isLoading } = useQuery({
    queryKey: ["userAgreement", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/agreement/${user?.email}`);
        return res.data;
      } catch (error) {
        return null;
      }
    },
    enabled: !!user?.email,
  });

  // Default profile data
  const profileData = {
    name: user?.displayName || "User",
    email: user?.email || "user@example.com",
    profilePicture: user?.photoURL || ProfilePlaceholder,
    agreementStatus: agreementData?.status || "Not Available",
    agreementDate: agreementData?.approvedAt
      ? new Date(agreementData.approvedAt).toLocaleDateString()
      : "Not Available",
    apartmentInfo: {
      floor: agreementData?.floorNo || "Not Available",
      block: agreementData?.blockName || "Not Available",
      roomNo: agreementData?.apartmentNo || "Not Available",
    },
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-col min-h-[calc(100vh-49px)] md:min-h-screen space-y-4 p-4">
      <Helmet>
        <title>Dashboard - Edifica</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-4 items-center bg-base-200 px-8 py-4 rounded-box md:col-span-2">
          <img
            src={profileData.profilePicture}
            alt="User Profile"
            className="w-24 h-24 rounded-full border border-base-300"
          />
          <div className="flex flex-col">
            <h3 className="text-2xl font-medium">{profileData.name}</h3>
            <h3>{profileData.email}</h3>
          </div>
        </div>

        <div className="bg-base-200 px-8 py-4 rounded-box col-span-1">
          <h3 className="text-lg font-semibold mb-2">Agreement Information</h3>
          <h3>
            Accept Status:{" "}
            <span className="text-accent">{profileData.agreementStatus}</span>
          </h3>
          <h3>
            Accept Date:{" "}
            <span className="text-accent">{profileData.agreementDate}</span>
          </h3>
        </div>

        <div className="bg-base-200 px-8 py-4 rounded-box col-span-1">
          <h3 className="text-lg font-semibold mb-2">Apartment Information</h3>
          <h3>
            Floor:{" "}
            <span className="text-accent">
              {profileData.apartmentInfo.floor}
            </span>
          </h3>
          <h3>
            Block:{" "}
            <span className="text-accent">
              {profileData.apartmentInfo.block}
            </span>
          </h3>
          <h3>
            Room:{" "}
            <span className="text-accent">
              {profileData.apartmentInfo.roomNo}
            </span>
          </h3>
        </div>
      </div>

      <div className="bg-base-200 rounded-box flex flex-col items-center justify-center p-8 text-center flex-grow">
        {agreementData ? (
          agreementData.status?.toLowerCase() === "pending" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-warning">
                Your request received for an Apartment Booking.
              </h3>
              <h3>
                Thank you for your patience. We will get back to you shortly.
              </h3>
            </div>
          ) : agreementData.status?.toLowerCase() === "done" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-success">
                Congratulations! We are glad to have you with us.
              </h3>
              <h3>
                Welcome to your new apartment! We are delighted to have you with
                us.
              </h3>
            </div>
          ) : null
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-error">
              No agreement found.
            </h3>
            <h3>Please choose an apartment and request for agreement.</h3>
            <button
              onClick={() => navigate("/apartment")}
              className="btn btn-sm btn-accent"
            >
              Go to Apartments Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
