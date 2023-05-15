import { useQuery } from "react-query";
import api from "../components/utils/axiosInstance";

export const useDeleteRes = (id, onDeleteResSuccess, onDeleteResError) => {
  const response = useQuery(
    "delete-restaurant",
    async () => await api.delete(`/clients/restaurants/delete/${id}`),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: onDeleteResSuccess,
      onError: onDeleteResError,
    }
  );

  return response;
};
