import { useQuery } from "react-query";
import axios from "axios";

export const useGetLocationDetail = (id) => {
  return useQuery(
    "get-location-detail",
    () => axios.get(`http://localhost:5000/api/users/city/${id}`),
    { refetchOnWindowFocus: false }
  );
};
