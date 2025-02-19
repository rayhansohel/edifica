import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";
import SectionTitle from "../../../../components/common/SectionTitle/SectionTitle";
import useHandleAgreement from "../../../../hooks/useHandleAgreement";
import { useQuery } from "@tanstack/react-query";

const RecentApartments = () => {
  const axiosPublic = useAxiosPublic();
  const handleAgreement = useHandleAgreement();

  // Fetch apartments data
  const {
    data: apartments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recent-apartments");
      return res.data;
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
    <section className="pb-8 md:pb-20">
      <SectionTitle title="Appartments" subtitle="Choose your dreams " />
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
