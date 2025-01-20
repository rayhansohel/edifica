import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SectionTitle from "../../components/common/SectionTitle/SectionTitle";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/Loading.json";

const Apartment = () => {
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch apartments data
  const { data: apartments, error, isLoading } = useQuery({
    queryKey: ["apartments", rentRange, currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/apartments?minRent=${rentRange.min}&maxRent=${rentRange.max}&page=${currentPage}&limit=8`
      );
      setTotalPages(Math.ceil(res.data.total / 8));
      return res.data.apartments;
    },
    refetchOnWindowFocus: false,
  });

  const handleAgreement = async (apartment) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth/login", { state: { from: location }, replace: true });
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const payload = {
        userName: userInfo.name,
        userEmail: userInfo.email,
        floorNo: apartment.floorNo,
        blockName: apartment.blockName,
        apartmentNo: apartment.apartmentNo,
        rent: apartment.rent,
        status: "pending",
      };

      const response = await axios.post(
        "http://localhost:5000/api/agreements",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Agreement request submitted successfully!");
      } else {
        toast.error("Error submitting agreement. Please try again.");
      }
    } catch (error) {
      toast.error(
        
        error.response?.data?.message || "Error submitting agreement. Please try again."
      );
    }
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Clear rent range
  const handleClearSearch = () => {
    setRentRange({ min: 0, max: 10000 });
  };

  if (isLoading)
    return (
      <div className="container mx-auto w-full">
        <div className="flex min-h-[calc(100vh-344px)] items-center justify-center">
        <Lottie animationData={loadingAnimation} className="w-32" />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto w-full ">
        <div className="flex min-h-[calc(100vh-344px)] items-center justify-center">
          Error loading apartments.
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6 md:py-20">
      <Helmet>
        <title>Apartment- Edifica</title>
      </Helmet>

      <SectionTitle
        title="All Apartments"
        subtitle="Choose your Dream Apartment"
      />

      {/* Rent Range Search */}
      <div className="my-4">
        <h3 className="text-lg text-center mb-2">Filter by Rent</h3>
        <div className="flex items-center justify-center gap-4">
          <div className="space-x-2">
            <label htmlFor="minRent" className="text-sm mb-2">
              Min
            </label>
            <input
              type="number"
              placeholder="Min Rent"
              value={rentRange.min}
              onChange={(e) =>
                setRentRange({ ...rentRange, min: +e.target.value }) 
              }
              className="input-sm border border-base-300 bg-base-200 rounded-lg px-3 py-2 w-24"
            />
          </div>
          <div className="space-x-2">
            <label htmlFor="minRent" className="text-sm mb-2">
              Max
            </label>
            <input
              type="number"
              placeholder="Max Rent"
              value={rentRange.max}
              onChange={(e) =>
                setRentRange({ ...rentRange, max: +e.target.value }) // Ensure max is a number
              }
              className="input-sm border border-base-300 bg-base-200 rounded-lg px-3 py-2 w-24"
            />
          </div>
          <button onClick={handleClearSearch} className="btn btn-sm btn-primary">
            Clear
          </button>
        </div>
      </div>

      {/* Apartments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {apartments?.map((apartment) => (
          <div
            key={apartment.id}
            className="border border-base-300 rounded-badge overflow-hidden"
          >
            <img
              src={apartment.image}
              alt={`Apartment ${apartment.apartmentNo}`}
              className="w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">
                Apartment {apartment.apartmentNo}
              </h2>
              <p>Floor: {apartment.floorNo}</p>
              <p>Block: {apartment.blockName}</p>
              <p>Rent: ${apartment.rent}</p>
              <button
                onClick={() => handleAgreement(apartment)}
                className="btn btn-sm btn-accent mt-4"
              >
                Apply for Agreement
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn btn-sm btn-accent"
        >
          <GrFormPrevious />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-accent"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default Apartment;
