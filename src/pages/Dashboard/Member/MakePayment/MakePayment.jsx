import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/AuthContext";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";

const MakePayment = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [agreement, setAgreement] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

  // Fetch user agreement details
  useEffect(() => {
    if (!user?.email) return; // Ensure email exists before making the API call

    axiosPublic
      .get(`/agreement/${user.email}`)
      .then(({ data }) => {
        if (data) {
          setAgreement(data);
        } else {
          toast.error("No agreement data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching agreement:", error);
        toast.error("Failed to fetch agreement data.");
      });
  }, [user?.email]);

  // Apply Coupon Handler
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code.");
      return;
    }
    setIsApplyingCoupon(true);

    try {
      const { data } = await axiosPublic.post("/coupons/validate", { couponCode });

      if (data.valid) {
        const discountAmount = (agreement.rent * data.discount) / 100;
        setDiscount(discountAmount);
        toast.success(`Coupon applied! Discount: ${data.discount}%`);
      } else {
        toast.error("Invalid or expired coupon.");
        setDiscount(0);
      }
    } catch (error) {
      toast.error("Error applying coupon.");
      console.error(error);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Handle Payment
  const handlePayment = async () => {
    if (!selectedMonth || !selectedYear) {
      toast.error("Please select a month and year.");
      return;
    }

    const finalAmount = agreement.rent - discount;
    const paymentData = {
      email: agreement.userEmail,
      floor: agreement.floorNo,
      blockName: agreement.blockName,
      apartmentNo: agreement.apartmentNo,
      rent: agreement.rent,
      discount,
      finalAmount,
      month: selectedMonth,
      year: selectedYear,
      couponCode: discount > 0 ? couponCode : null,
    };

    try {
      const { data } = await axiosPublic.post("/payments/process", paymentData);
      if (data.success) {
        toast.success("Payment successful!");
        navigate("/dashboard/payment-history");
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error processing payment.");
      console.error(error);
    }
  };

  // Show Loading Animation if agreement data is not loaded
  if (!agreement) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 min-h-[calc(100vh-49px)] md:min-h-screen">
      <Helmet>
        <title>Make Payment - Edifica</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-xl font-semibold">Make Payment</h2>
      </div>

      <div className="w-full min-h-[calc(100vh-108px)] flex justify-center items-center rounded-box bg-base-200 p-6">
        <div className="w-full sm:max-w-2xl bg-base-300 p-6 rounded-box">
          {agreement ? (
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Email and Apartment No */}
              <div className="flex gap-6 flex-col sm:flex-row w-full mb-6">
                <div className="w-full">
                  <label>Email</label>
                  <input
                    type="text"
                    value={agreement.userEmail}
                    readOnly
                    className="input input-sm w-full mt-2 rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label>Apartment No</label>
                  <input
                    type="text"
                    value={agreement.apartmentNo}
                    readOnly
                    className="input input-sm w-full mt-2 rounded-md"
                  />
                </div>
              </div>

              {/* Floor and Block Name */}
              <div className="flex gap-6 flex-col sm:flex-row w-full mb-6">
                <div className="w-full">
                  <label>Floor</label>
                  <input
                    type="text"
                    value={agreement.floorNo}
                    readOnly
                    className="input input-sm w-full mt-2 rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label>Block Name</label>
                  <input
                    type="text"
                    value={agreement.blockName}
                    readOnly
                    className="input input-sm w-full mt-2 rounded-md"
                  />
                </div>
              </div>

              {/* Rent, Month, and Year */}
              <div className="flex gap-6 flex-col sm:flex-row w-full mb-6">
                <div className="w-full">
                  <label>Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="input input-sm w-full mt-2 rounded-md"
                  >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label>Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="input input-sm w-full mt-2 rounded-md"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Coupon Code and Amount */}
              <div className="flex gap-6 flex-col sm:flex-row w-full mb-6">
                <div className="w-full">
                  <label>Rent</label>
                  <input
                    type="text"
                    value={`$${agreement.rent}`}
                    readOnly
                    className="input input-sm w-full mt-2 rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label>Coupon Code</label>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="input input-sm flex-grow rounded-md"
                    />
                    <button
                      type="button"
                      className="btn btn-sm w-20 btn-primary"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon}
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
              {/* Amount and submit*/}
              <div className="flex gap-6 flex-col sm:flex-row w-full mb-6 items-end">
                <div className="w-full">
                  <label>Final Amount</label>
                  <input
                    type="text"
                    value={`$${agreement.rent - discount}`}
                    readOnly
                    className="input input-sm w-full mt-2 text-accent rounded-md"
                  />
                </div>

                <div className="w-full">
                  <button
                    type="button"
                    className="btn btn-sm w-full btn-accent"
                    onClick={handlePayment}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-center">
              <LoadingAnimation />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
