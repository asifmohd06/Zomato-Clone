import axios from "axios";
import HeaderBasic from "./HeaderBasic";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setClientToken,
  setEmail,
  setUserName,
} from "./features/clients/clientsSlice";

const ClientLoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverError, setserverError] = useState("");

  const errorMsgStyle = " text-red-700 tracking-wide w-[20rem] md:w-[25rem] ";

  const baseUrl = process.env.BASE_URL;

  const submitForm = async (data) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(`${baseUrl}/api/clients/login`, data, config)
      .then((resp) => {
        if (resp.data.isAlreadyLoggedIn === false) {
          window.localStorage.setItem("clientToken", resp.data.token);
          dispatch(setClientToken(resp.data.token));
          dispatch(setUserName(resp.data.username));
          dispatch(setEmail(resp.data.email));
          reset();
          navigate("/");
        } else {
          navigate("/clients/login");
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setserverError(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [serverError]);
  return (
    <div className="bg-formBg3 bg-no-repeat bg-cover  bg-center min-h-[100vh] pb-2">
      <HeaderBasic location={"loginPage"} />
      <div className="px-4">
        <div className="max-w-[600px] min-h-[505px]  py-3 px-[5rem]   bg-[#b1b1b1] bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-30 border border-gray-100   mx-auto mt-8 rounded-lg shadow-lg ">
          <h1 className="text-3xl text-center mt-12 font-semibold tracking-wider">
            SIGN IN
          </h1>
          <div className="mt-8">
            <form
              onSubmit={handleSubmit(submitForm)}
              className="grid gap-3 mt-10 justify-center"
            >
              <div className="relative z-0 w-full mt-8 group">
                <input
                  type="text"
                  className="  peer block py-2.5  h-[3rem] px-4 w-[20rem] md:w-[25rem]  text-md text-gray-300 bg-transparent border-[#dddddd] border-b-2  focus:border-b-[2px] focus:border-[#ffffff]  appearance-none    focus:outline-none focus:ring-0 autofill:bg-none  "
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

                <label className=" absolute top-1 left-3 text-[23px] text-[#ffffff] font-[550]  duration-300 transform -translate-y-10 -translate-x-0 scale-75  -z-10 origin-[0]  peer-focus:text-[23px] peer-focus:font-[550]  peer-focus:left-3 peer-focus:-top-3 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  User Name
                </label>
              </div>
              <div className="relative z-0 w-full mt-8 group">
                <input
                  type="password"
                  className=" peer block py-2.5  h-[3rem] px-4 w-[20rem] md:w-[25rem]  text-md text-gray-400 bg-transparent border-[#d3d3d3] border-b-2  focus:border-b-[2px] focus:border-[#ffffff]  appearance-none    focus:outline-none focus:ring-0 autofill:bg-none"
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
                <label className="absolute top-1 left-3 text-[23px] text-[#ffffff] font-[550]  duration-300 transform -translate-y-10 -translate-x-0 scale-75  -z-10 origin-[0]  peer-focus:text-[23px] peer-focus:font-[550]  peer-focus:left-3 peer-focus:-top-3 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-[600]  rounded-lg  text-center py-2 mx-auto w-[5rem]"
              >
                SIGN IN
              </button>
              <p className=" text-[#f8f8f8] text-center mt-5">
                Don't have an account ?{" "}
                <Link
                  to={"/clients/register"}
                  className="border-b-[1px] border-[#ffffff] pb-[3px] hover:text-[#79b1ff] hover:border-[#79b1ff]"
                >
                  Sign up
                </Link>
              </p>
              {serverError && (
                <section className=" w-[20rem] px-2  md:w-[25rem] py-4 bg-[#f48484b3]  rounded-lg border-[1px] tracking-wide font-[600] text-red-900 border-red-700 flex items-center justify-center">
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

export default ClientLoginForm;
