import { useQuery } from "react-query";
import api from "../components/utils/axiosInstance";

export const useGetLocationDetail = (id) => {
  return useQuery("get-location-detail", () => api.get(`/users/city/${id}`), {
    refetchOnWindowFocus: false,
  });
};
