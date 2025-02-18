import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/common/SectionTitle/SectionTitle";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useHandleAgreement from "../../hooks/useHandleAgreement";
import LoadingAnimation from "../../components/common/Loading/LoadingAnimation";

const Apartment = () => {
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const axiosPublic = useAxiosPublic();
  const handleAgreement = useHandleAgreement();

  // Fetch apartments data
  const {
    data: apartments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["apartments", rentRange, currentPage, sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/apartments?minRent=${rentRange.min}&maxRent=${rentRange.max}&page=${currentPage}&limit=12&sort=${sortOrder}`
      );
      setTotalPages(Math.ceil(res.data.total / 12));
      return res.data.apartments;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error)
    return (
      <div className="flex items-center justify-center">
        Error loading apartments.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6 md:py-20">
      <Helmet>
        <title>Apartment - Edifica</title>
      </Helmet>
      <SectionTitle
        title="All Apartments"
        subtitle="Choose your Dream Apartment"
      />

      <div className="md:flex justify-between items-center">
        {/* Rent Range Search */}
        <div className="my-6 flex justify-center gap-4">
          <input
            type="number"
            placeholder="Min Rent"
            value={rentRange.min}
            onChange={(e) =>
              setRentRange({ ...rentRange, min: +e.target.value })
            }
            className="input input-sm border border-base-300 bg-base-200 rounded-md px-3 py-2 w-24"
          />
          <input
            type="number"
            placeholder="Max Rent"
            value={rentRange.max}
            onChange={(e) =>
              setRentRange({ ...rentRange, max: +e.target.value })
            }
            className="input input-sm border border-base-300 bg-base-200 rounded-md px-3 py-2 w-24"
          />
          <button
            onClick={() => setRentRange({ min: 0, max: 10000 })}
            className="btn btn-sm btn-primary"
          >
            Clear
          </button>
        </div>

        {/* Sort By Price */}
        <div className="my-6 flex justify-center gap-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-sm border border-base-300 bg-base-200 rounded-md px-4 w-72"
          >
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Apartments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {apartments?.map((apartment) => (
          <div
            key={apartment.id}
            className="border border-base-300 rounded-box overflow-hidden hover:bg-base-200"
          >
            <img
              src={apartment.image}
              alt={`Apartment ${apartment.apartmentNo}`}
              className="w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Apartment {apartment.apartmentNo}
              </h2>
              <p className="mb-2">Floor No. {apartment.floorNo}</p>
              <p className="mb-2">Block {apartment.blockName}</p>
              <h3 className="mb-4">{apartment.rent} $</h3>
              <button
                onClick={() => handleAgreement(apartment)}
                className={`btn btn-sm ${
                  apartment.availability === "rented"
                    ? "btn-disabled"
                    : "btn-accent"
                }`}
                disabled={apartment.availability === "rented"}
              >
                {apartment.availability === "rented"
                  ? "Already Rented"
                  : "Apply for Agreement"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="btn btn-sm btn-accent"
        >
          <GrFormPrevious />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="btn btn-sm btn-accent"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default Apartment;
