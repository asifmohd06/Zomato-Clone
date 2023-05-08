import { useMutation } from "react-query";
import axios from "axios";

export const useGetLocations = (query) => {
  // const baseUrl = "http://localhost:5000";
  const baseUrl = "https://zomato06.onrender.com";

  return useMutation(() =>
    axios.post(`${baseUrl}/api/users/cities`, { query })
  );
};
