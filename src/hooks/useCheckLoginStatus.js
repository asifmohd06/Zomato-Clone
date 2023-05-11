import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setUserName,
  setClientToken,
  resetUser,
} from "../components/features/clients/clientsSlice";
import api from "../components/utils/axiosInstance";

export const useCheckLoginStatus = (localToken) => {
  const dispatch = useDispatch();
  const config = { headers: { Authorization: `Bearer ${localToken}` } };
  const resp = useQuery(
    "check-login-status",
    async () => {
      let response;
      response = await api.get(`/clients/auth`, config);
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
