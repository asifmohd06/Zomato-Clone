import { useQuery } from "react-query";
import axios from "axios";

export const useGetLocationDetail = (id) => {
  return useQuery(
    "get-location-detail",
    () => axios.get(`https://zomato06.onrender.com/api/users/city/${id}`),
    { refetchOnWindowFocus: false }
  );
};
