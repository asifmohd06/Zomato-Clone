import { useMutation } from "react-query";
import api from "../components/utils/axiosInstance";

export const useGetLocations = (query) => {
  return useMutation(() => api.post(`/users/cities`, { query }));
};
