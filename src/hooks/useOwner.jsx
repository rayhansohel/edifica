import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "../context/AuthContext";

const useOwner = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isOwner, isPending: isOwnerLoading } = useQuery({
        queryKey: [user?.email, 'isOwner'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            console.log('Checking if user is owner:', user);
            const res = await axiosSecure.get(`/users/owner/${user.email}`);
            return res.data?.owner;
        }
    });
    return [isOwner, isOwnerLoading];
};

export default useOwner;
