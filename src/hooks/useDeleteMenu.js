import axios from "axios";
import { useMutation } from "react-query";
const baseUrl = "http://localhost:5000";

export const useDeleteMenu = (data, localToken) => {
  console.log({ data, localToken });
  const config = {
    headers: {
      Authorization: `Bearer ${localToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return useMutation(() =>
    axios.patch(`${baseUrl}/api/clients/restaurants/deletemenu`, data, config)
  );
};
