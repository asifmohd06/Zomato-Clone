import { useQuery } from "react-query";
import axios from "axios";

export const useResDetailForm = (id) => {
  return useQuery(
    "res-detail-form",
    () => axios.get(`http://localhost:5000/api/clients/editrestaurant/${id}`),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );
};
