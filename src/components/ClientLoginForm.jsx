import { useDispatch, useSelector } from "react-redux";
import {
  setClientId,
  setEmail,
  setUserName,
} from "./features/clients/clientsSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import HeaderBasic from "./HeaderBasic";
import { useNavigate } from "react-router-dom";
const ClientLoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
      .post(`${baseUrl}/api/clients/login`, data, config)
      .then((resp) => {
        if (resp.data.isAlreadyLoggedIn === true) {
          dispatch(setClientId(resp.data._doc._id));
          dispatch(setUserName(resp.data._doc.username));
          dispatch(setEmail(resp.data._doc.email));
          navigate("/");
        } else if (resp.data.isAlreadyLoggedIn === false) {
          dispatch(setClientId(resp.data._doc._id));
          dispatch(setUserName(resp.data._doc.username));
          dispatch(setEmail(resp.data._doc.email));
          navigate("/");
        } else {
          navigate("/clients/login");
        }
      })
      .catch((err) => console.log(err));
    reset();
  };
  return (
    <div className=" ">
      <HeaderBasic />
      <div className="max-w-[1100px] bg-form bg-no-repeat bg-cover bg-center mx-3 md:mx-4 lg:mx-auto py-4 px-4 rounded-md text-center tracking-wide mt-20 my-4 relative">
        <h1 className="text-center font-[700] text-4xl py-2 text-white">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="grid gap-4 py-4 justify-center"
        >
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
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-[600]  rounded-lg  text-center py-2 mx-auto w-[5rem]"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientLoginForm;
