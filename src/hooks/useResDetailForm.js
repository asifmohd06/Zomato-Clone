import { useQuery } from "react-query";
import axios from "axios";

export const useResDetailForm = (id) => {
  return useQuery(
    "res-detail-form",
    () =>
      axios.get(
        `https://zomato06.onrender.com/api/clients/editrestaurant/${id}`
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );
};
