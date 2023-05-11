import { useMutation } from "react-query";
import api from "../components/utils/axiosInstance";

export const useLogoutClient = (clientToken, onSuccess, onError) => {
  const config = {
    headers: {
      Authorization: `Bearer ${clientToken}`,
    },
  };
  return useMutation(
    () => {
      api.post(`/clients/logout`, {}, config);
    },
    { onSuccess, onError }
  );
};
