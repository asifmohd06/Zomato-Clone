import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setClientId,
  setEmail,
  setUserName,
} from "./features/clients/clientsSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderBasic from "./HeaderBasic";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [serverError, setserverError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMsgStyle = " text-red-400 tracking-wide md:w-[30rem] ";
  const inputStyle = `px-3 md:w-[30rem]  rounded-lg min-h-[2.5rem]`;

  const baseUrl = "http://127.0.0.1:5000";

  const submitForm = async (data) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(`${baseUrl}/api/clients/register`, data, config)
      .then((res) => {
        if (res.data.success) {
          dispatch(setClientId(res.data._id));
          dispatch(setUserName(res.data.username));
          dispatch(setEmail(res.data.email));
          reset();
          navigate("/");
        } else {
          setserverError(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setserverError(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [serverError]);

  return (
    <div>
      <HeaderBasic location={"registerPage"} />
      <div className="max-w-[800px] min-h-[590px]  bg-form bg-no-repeat bg-cover bg-center mx-3 md:mx-4 lg:mx-auto py-4 px-4 rounded-md text-center tracking-wide mt-8 mb-2  relative">
        <h1 className="text-center font-[700] text-4xl py-2 text-white">
          SIGN UP
        </h1>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="grid gap-4  mt-12 justify-center"
        >
          <label id="email" className="text-xl font-[600] text-white">
            Enter Mail Id
          </label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            className={inputStyle}
          />
          {errors.email?.type === "required" && (
            <p className={errorMsgStyle}>email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className={errorMsgStyle}>email is not valid</p>
          )}
          <label id="username" className="text-xl font-[600] text-white">
            Enter Username
          </label>
          <input
            autoComplete="new-password"
            type="text"
            {...register("username", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/,
            })}
            className={inputStyle}
          />
          {errors.username?.type === "required" && (
            <p className={errorMsgStyle}>Username is required</p>
          )}
          {errors.username?.type === "pattern" && (
            <p className={errorMsgStyle}>
              username should be a combination of alphanumeric characters
            </p>
          )}
          <label id="password" className="text-xl font-[600] text-white">
            Enter Password
          </label>
          <input
            autoComplete="new-password"
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
            })}
            className={inputStyle}
          />
          {errors.password?.type === "required" && (
            <p className={errorMsgStyle}>Password is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className={errorMsgStyle}>
              Password should be a combination of minimum 8 alphanumeric
              characters
            </p>
          )}
          <button
            type="submit"
            className=" py-2 mx-auto w-[5rem] bg-[#3176e4] text-white rounded-lg"
          >
            SUBMIT
          </button>
          {serverError && (
            <section className=" w-[15rem] px-2 md:w-[30rem] py-4 bg-[#F48484]  rounded-lg border-[1px] tracking-wide font-[600] text-red-900 border-red-700 flex items-center justify-center">
              <p>{serverError}</p>
            </section>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
