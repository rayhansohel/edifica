import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../../../context/AuthContext";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const email = user?.email;

  const { data: payments = [], } = useQuery({
    queryKey: ['payments', email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/payments/${email}`);
      return Array.isArray(response.data) ? response.data : [];
    },
    enabled: !!email, 
  });



  return (
    <div className="p-4 flex flex-col gap-4 min-h-[calc(100vh-49px)] md:min-h-screen">
      <Helmet>
        <title>Payment History - Edifica</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-base md:text-xl font-semibold">Payment History</h2>
        <h2 className="text-base md:text-xl font-semibold">
          Total Payments: <span>{payments.length}</span>
        </h2>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-200">
        <div className="bg-base-300">
          <table className="table w-full border-collapse border border-base-100 rounded-lg text-center">
            <thead className="sticky -top-[1px] bg-base-300 z-20">
              <tr className="text-base text-primary">
                <th className="border border-base-100 bg-base-300 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 w-10">
                  #
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  Apartment No
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  Month
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  Rent
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  Discount
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  Final Amount
                </th>
                <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className="bg-base-200 hover:bg-base-300 transition-colors duration-300"
                >
                  <td className="border border-base-100 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 bg-base-200 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                    {payment.apartmentNo}
                  </td>
                  <td className="border border-base-100 px-6 py-3">
                    {payment.month}, {payment.year}
                  </td>
                  <td className="border border-base-100 px-6 py-3">
                    ${payment.rent}
                  </td>
                  <td className="border border-base-100 px-6 py-3">
                    {payment.discount ? `$${payment.discount}` : "N/A"}
                  </td>
                  <td className="border border-base-100 px-6 py-3">
                    ${payment.finalAmount}
                  </td>
                  <td className="border border-base-100 px-6 py-3">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
