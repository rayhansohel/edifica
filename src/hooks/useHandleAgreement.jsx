import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const useHandleAgreement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAgreement = async (apartment) => {
    if (user && user.email) {
      const agreement = {
        userName: user.displayName,
        userEmail: user.email,
        floorNo: apartment.floorNo,
        blockName: apartment.blockName,
        apartmentNo: apartment.apartmentNo,
        rent: apartment.rent,
        apartmentId: apartment._id,
        status: "Pending",
        requestDate: new Date().toISOString(),
      };

      try {
        const response = await axiosSecure.post("/agreement", agreement);
        console.log(response);
        toast.success("Agreement request submitted successfully.");
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Failed to submit agreement. Please try again.");
        }
      }
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return handleAgreement;
};

export default useHandleAgreement;
