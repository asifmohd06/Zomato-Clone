import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setClientToken,
  setEmail,
  setUserName,
} from "../features/clients/clientsSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderBasic from "../HeaderBasic";
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

  const inputStyle =
    " peer block py-2.5  h-[3rem] px-4 w-[20rem] md:w-[25rem]  text-md text-gray-100 bg-transparent border-[#dddddd] border-b-2  focus:border-b-[2px] focus:border-[#ffffff]  appearance-none    focus:outline-none focus:ring-0 autofill:bg-none ";
  const labelStyle =
    "absolute top-1 left-3 text-[23px] text-[#ffffff] font-[550]  duration-300 transform -translate-y-10 -translate-x-0 scale-75  -z-10 origin-[0]  peer-focus:text-[23px] peer-focus:font-[550]  peer-focus:left-3 peer-focus:-top-3 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

  const errorMsgStyle = " text-red-700 tracking-wide w-[20rem] md:w-[25rem] ";

  // const baseUrl = "https://zomato06.onrender.com";
  const baseUrl = "http://localhost:5000";

  const submitForm = async (data) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(`${baseUrl}/api/clients/register`, data, config)
      .then((res) => {
        if (res.data.success) {
          dispatch(setClientToken(res.data.token));
          dispatch(setUserName(res.data.username));
          dispatch(setEmail(res.data.email));
          window.localStorage.setItem("clientToken", res.data.token);
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
    <div className=" bg-formBg5 bg-no-repeat bg-cover bg-center min-h-[100vh] pb-3">
      <HeaderBasic location={"registerPage"} />
      <div className="px-4">
        <div className="max-w-[600px] min-h-[550px]  bg-gray-500  bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 border border-gray-100  mx-auto py-4 px-4 rounded-md text-center tracking-wide mt-8 mb-2  relative">
          <div className="mt-8">
            <h1 className="text-center font-[700] text-4xl py-2 text-white">
              SIGN UP
            </h1>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="grid gap-4  mt-4 justify-center"
            >
              <div className="relative z-0 w-full mt-8 group">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder=""
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />

                {errors.email?.type === "required" && (
                  <p className={errorMsgStyle}>email is required</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className={errorMsgStyle}>email is not valid</p>
                )}
                <label className={labelStyle}>Email</label>
              </div>

              <div className="relative z-0 w-full mt-8 group">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder=" "
                  {...register("username", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$/,
                  })}
                />

                {errors.username?.type === "required" && (
                  <p className={errorMsgStyle}>Username is required</p>
                )}
                {errors.username?.type === "pattern" && (
                  <p className={errorMsgStyle}>
                    username should be a combination of alphanumeric characters
                  </p>
                )}
                <label htmlFor="ggg" className={labelStyle}>
                  User Name
                </label>
              </div>
              <div className="relative z-0 w-full mt-8 group">
                <input
                  type="password"
                  className={inputStyle}
                  placeholder=" "
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                  })}
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
                <label className={labelStyle}>Password</label>
              </div>

              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-[600]  rounded-lg  text-center py-2 mx-auto w-[5rem]"
              >
                SUBMIT
              </button>
              {serverError && (
                <section className=" px-2 w-[20rem] md:w-[25rem] py-4 bg-[#f4848481]  rounded-lg border-[1px] tracking-wide font-[600] text-red-900 border-red-700 flex items-center justify-center">
                  <p>{serverError}</p>
                </section>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
