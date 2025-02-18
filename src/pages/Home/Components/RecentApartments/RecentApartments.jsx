import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";
import SectionTitle from "../../../../components/common/SectionTitle/SectionTitle";

const RecentApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/featured-apartments")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setApartments(res.data);
        } else {
          setError("Unexpected response format");
        }
      })
      .catch((err) => {
        console.error("Error fetching apartments:", err);
        setError("Failed to load apartments");
      })
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) return <LoadingAnimation />;

  if (error)
    return (
      <div className="container mx-auto w-full ">
        <div className="flex min-h-[calc(100vh-344px)] items-center justify-center">
          Error loading apartments.
        </div>
      </div>
    );

  return (
    <section className="pb-8 md:pb-20">
      <SectionTitle
        title="Featured Appartments"
        subtitle="Choose your dreams "
      />
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {apartments?.map((apartment) => (
            <div
              key={apartment.id}
              className="border border-base-300 rounded-box overflow-hidden hover:bg-base-200 transition-colors duration-600"
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
                <p>{apartment.rent}$</p>
                <button
                  onClick={() => handleAgreement(apartment)}
                  className={`btn btn-sm mt-4 ${
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
      </div>
    </section>
  );
};

export default RecentApartments;
