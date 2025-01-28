import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import useAxiosPublic from "./useAxiosPublic";

const useUserRole = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const email = user?.email;

  return useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      const response = await axiosPublic.post(`/users/role/${email}`);
      return response.data;
    },
    enabled: !!email,
  });
};

export default useUserRole;
