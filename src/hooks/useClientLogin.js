import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setClientToken,
  setEmail,
  setUserName,
} from "../components/features/clients/clientsSlice";
import { useMemo } from "react";
//react toast
import { toast } from "react-toastify";

export const useClientLogin = (setServerError, reset) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = "http://localhost:5000";
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const { mutate, data, isSuccess } = useMutation((data) =>
    axios.post(`${baseUrl}/api/clients/login`, data, config)
  );

  const submitForm = (data) => {
    mutate(data);
  };
  useMemo(() => {
    if (isSuccess && data?.data?.success) {
      window.localStorage.setItem("clientToken", data?.data?.token);
      dispatch(setClientToken(data?.data?.token));
      dispatch(setUserName(data?.data?.username));
      dispatch(setEmail(data?.data?.email));
      reset();
      toast.success(`Welcome back ${data?.data?.username}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    } else if (isSuccess && !data?.data?.success) {
      console.log("failed");
      setServerError(data?.data?.error);
    }
  }, [isSuccess]);
  return { submitForm };
};
