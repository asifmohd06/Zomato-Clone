import React from "react";
import { useForm } from "react-hook-form";
import logo from "../images/mainlogo.avif";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const errorMsgStyle = " text-red-400 tracking-wide md:w-[30rem] ";
  const inputStyle = `px-3 md:w-[30rem]  rounded-lg min-h-[2.5rem]`;

  const submitForm = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className=" ">
      <div className="w-[100%] h-[5rem] bg-[#1f1e1e] flex align-middle py-6 px-5">
        <img className="w-[9rem]" src={logo} alt="" />
      </div>
      <div className="max-w-[1100px] bg-form bg-no-repeat bg-cover bg-center mx-3 md:mx-4 lg:mx-auto py-4 px-4 rounded-md text-center tracking-wide mt-20 my-4 relative">
        <h1 className="text-center font-[700] text-4xl py-2 text-white">
          Register
        </h1>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="grid gap-4 py-4 justify-center"
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
            type="text"
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
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
