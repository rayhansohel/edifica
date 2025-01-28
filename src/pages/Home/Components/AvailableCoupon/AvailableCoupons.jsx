import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import SectionTitle from "../../../../components/common/SectionTitle/SectionTitle";
import toast from "react-hot-toast";

const AvailableCoupons = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: coupons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableCoupons"],
    queryFn: async () => {
      const response = await axiosPublic.get("/coupons");
      return response.data.filter((coupon) => coupon.available);
    },
  });

  const handleCopy = (couponCode) => {
    navigator.clipboard.writeText(couponCode)
      .then(() => {
        toast.success("Coupon code copied!")
      })
      .catch((err) => {
        toast.error("Failed to copy coupon code!");
        console.error(err);
      });
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return null;
  }

  return (
    <section className="pb-8 md:pb-20">
      <SectionTitle
        title="Coupons"
        subtitle="Save more"
      />
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-base-200 p-6 rounded-box hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center justify-between">
                  <span>{coupon.code}</span>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="btn btn-sm btn-accent"
                  >
                    Copy
                  </button>
                </h3>
                <p className="mb-4">{coupon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-accent">
                    {coupon.discount}% OFF
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No available coupons at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AvailableCoupons;
