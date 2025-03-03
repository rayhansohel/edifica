import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import LoadingAnimation from "../../../../components/common/Loading/LoadingAnimation";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Fetch only pending agreement requests
  const {
    data: requests = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["agreementRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/agreement?status=pending");
      return response.data;
    },
  });

  // Accept request mutation
  const acceptRequest = useMutation({
    mutationFn: async ({ email, id }) => {
      try {
        const response = await axiosSecure.patch(`/agreement?email=${email}`, {
          status: "done",
          approvedAt: new Date().toISOString(),
        });
  
        if (response.status !== 200) throw new Error("Agreement update failed");
  
        await axiosSecure.patch(`/users/role?email=${email}`, { role: "member" });
        await axiosPublic.patch(`/apartment/${id}`, { availability: false });
  
        return response;
      } catch (error) {
        throw new Error(error.message || "Failed to accept request");
      }
    },
    onSuccess: () => {
      toast.success("Request accepted and stored.");
      refetch();
    },
    onError: () => {
      toast.success("Request accepted and stored.");
      refetch();
    },
  });
  
  //Reject request mutation
  const rejectRequest = useMutation({
    mutationFn: async ({ email, id }) => {
      try {
        await axiosSecure.delete(`/agreement?email=${email}`);
        await axiosSecure.patch(`/users/role?email=${email}`, { role: "user" });
        await axiosPublic.patch(`/apartment/${id}`, { availability: true });
  
        return { status: 200 };
      } catch (error) {
        throw new Error(error.message || "Failed to delete agreement");
      }
    },
    onSuccess: () => {
      toast.success("Agreement deleted successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="container mx-auto w-full ">
        <div className="flex min-h-[calc(100vh-344px)] items-center justify-center">
        Error fetching agreement requests!
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <Helmet>
        <title>Agreement Requests - Edifica</title>
      </Helmet>

      <div className="bg-base-200 py-4 px-6 rounded-xl flex justify-between items-center text-accent">
        <h2 className="text-base md:text-xl font-semibold">
          Agreement Requests
        </h2>
        <h2 className="text-base md:text-xl font-semibold">
          Total Requests: <span>{requests.length}</span>
        </h2>
      </div>

      <div className="overflow-x-auto h-[calc(100vh-108px)] overflow-y-auto rounded-box bg-base-200">
        <table className="table-auto w-full border-collapse border border-base-100 rounded-lg">
          <thead className="sticky -top-[1px] bg-base-300 z-20">
            <tr className="text-base text-primary">
              <th className="border border-base-100 bg-base-300 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 w-10">
                #
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                User Name
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Email
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Floor No
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Block Name
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Rent
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Request Date
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap">
                Status
              </th>
              <th className="border border-base-100 px-6 py-3 whitespace-nowrap w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request._id}
                className="bg-base-200 hover:bg-base-300 transition-colors duration-300 text-center"
              >
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap sticky -left-[1px] z-10 bg-base-200 text-center">
                  {index + 1}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {request.userName}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {request.userEmail}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {request.floorNo}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {request.blockName}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {request.rent}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {new Date(request.requestDate).toLocaleDateString()}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  {request.status}
                </td>
                <td className="border border-base-100 px-6 py-3 whitespace-nowrap">
                  <button
                    onClick={() => acceptRequest.mutate({ email: request.userEmail, id: request.apartmentId })}
                    className="btn btn-sm btn-success mr-2"
                    disabled={request.status === "done"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectRequest.mutate({ email: request.userEmail, id: request.apartmentId })}
                    className="btn btn-sm btn-secondary"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgreementRequests;
