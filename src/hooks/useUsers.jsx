import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60, 
  });


  refetch();

  return {
    users: data,
    isError,
    error,
    refetch,
  };
};

export default useUsers;

