import axios from "axios";
import { useMutation } from "react-query";

const baseUrl = "http://localhost:5000";

export const useLogoutClient = (clientToken, onSuccess, onError) => {
  const config = {
    headers: {
      Authorization: `Bearer ${clientToken}`,
    },
  };
  return useMutation(
    () => {
      axios.post(`${baseUrl}/api/clients/logout`, {}, config);
    },
    { onSuccess, onError }
  );
};
