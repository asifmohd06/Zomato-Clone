import api from "../components/utils/axiosInstance";
import { useMutation } from "react-query";

export const useDeleteMenu = (data, localToken) => {
  console.log({ data, localToken });
  const config = {
    headers: {
      Authorization: `Bearer ${localToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return useMutation(() =>
    api.patch(`/clients/restaurants/deletemenu`, data, config)
  );
};
