import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setUserName,
  setClientToken,
  resetUser,
} from "../components/features/clients/clientsSlice";

// const baseUrl = "https://zomato06.onrender.com";
const baseUrl = "http://localhost:5000";

export const useCheckLoginStatus = (localToken) => {
  const dispatch = useDispatch();
  // const localToken = window.localStorage.getItem("clientToken");
  const config = { headers: { Authorization: `Bearer ${localToken}` } };
  const resp = useQuery(
    "check-login-status",
    async () => {
      let response;
      response = await axios.get(`${baseUrl}/api/clients/auth`, config);
      return response;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  if (resp.isFetched && resp.data.data.success) {
    dispatch(setClientToken(localToken));
    dispatch(setUserName(resp.data.data.username));
    dispatch(setEmail(resp.data.data.email));
  }
  return resp;
};
