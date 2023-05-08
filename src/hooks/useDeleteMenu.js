import axios from "axios";
import { useMutation } from "react-query";
// const baseUrl = "http://localhost:5000";
const baseUrl = "https://zomato06.onrender.com";

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
