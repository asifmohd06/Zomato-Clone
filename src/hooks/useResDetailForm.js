import { useQuery } from "react-query";
import api from "../components/utils/axiosInstance";

export const useResDetailForm = (id) => {
  return useQuery(
    "res-detail-form",
    () => api.get(`/clients/editrestaurant/${id}`),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );
};
