import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";
import { Helmet } from "react-helmet-async";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponData, setCouponData] = useState({
    code: "",
    discount: "",
    description: "",
  });

  const {
    data: coupons = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await axiosSecure.get("/coupons");
      return response.data;
    },
  });

  const addCoupon = useMutation({
    mutationFn: async (newCoupon) => {
      const response = await axiosSecure.post("/coupons", newCoupon);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Coupon added successfully!");
      refetch();
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Failed to add coupon.");
    },
  });

  const toggleAvailability = useMutation({
    mutationFn: async ({ id, available }) => {
      const response = await axiosSecure.patch(`/coupons/${id}`, { available });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Coupon availability updated!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update coupon availability.");
    },
  });

  const deleteCoupon = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/coupons/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Coupon deleted successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete coupon.");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCoupon.mutate(couponData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleAvailability = (id, available) => {
    toggleAvailability.mutate({ id, available });
  };

  const handleDeleteCoupon = (id) => {
    deleteCoupon.mutate(id);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="container mx-auto w-full ">
        <div className="flex min-h-[calc(100vh-344px)] items-center justify-center">
          Error fetching coupons!
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <Helmet>
        <title>Manage Coupons - Edifica</title>
      </Helmet>

      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-xl font-semibold">Manage Coupons</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-sm btn-accent"
        >
          Add Coupon
        </button>
      </div>

      <div className="overflow-x-auto h-[calc(100vh-112px)] overflow-y-auto rounded-box bg-base-200">
        <table className="table-auto w-full border-collapse border border-base-100 rounded-lg text-center">
          <thead className="sticky -top-[1px] bg-base-300 z-20">
            <tr className="text-base text-primary">
              <th className="border border-base-100 bg-base-300 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 w-10">
                #
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Coupon Code
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Discount
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Description
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Availability
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr
                key={coupon._id}
                className={`bg-base-200 hover:bg-base-300 transition-colors duration-300 ${
                  !coupon.available && "text-secondary"
                }`}
              >
                <td className="border border-base-100 bg-base-200 px-6 py-3 sticky -left-[1px] z-10">
                  {index + 1}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {coupon.code}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {coupon.discount} %
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {coupon.description}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {coupon.available ? "Active" : "Inactive"}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  <button
                    onClick={() =>
                      handleToggleAvailability(coupon._id, !coupon.available)
                    }
                    className={`btn btn-sm min-w-24 ${
                      coupon.available ? "btn-accent" : "btn-secondary"
                    }`}
                  >
                    {coupon.available ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(coupon._id)}
                    className="btn btn-sm btn-secondary ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-200 p-6 rounded-box shadow w-96">
            <h3 className="text-xl text-center mb-4">Add New Coupon</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="code" className="block">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  onChange={handleInputChange}
                  required
                  className="input input-sm rounded-md w-full mt-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="discount" className="block">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  onChange={handleInputChange}
                  required
                  className="input input-sm rounded-md w-full mt-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block">
                  Coupon Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleInputChange}
                  required
                  className="textarea rounded-md w-full mt-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-accent">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
