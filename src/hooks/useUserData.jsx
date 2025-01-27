import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [axiosSecure]);

  return { users, loading, error };
};

export default useUserData;
