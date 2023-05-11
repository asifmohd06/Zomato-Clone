import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import HeaderBasic from "../HeaderBasic";
import axios from "axios";
import { useResDetailForm } from "../../hooks/useResDetailForm";
import { useCreateRestaurant } from "../../hooks/useCreateRestaurant";
import { useEditRestaurant } from "../../hooks/useEditRestaurant";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const RestaurantCreateForm = () => {
  const navigate = useNavigate();
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState("");
  let [color, setColor] = useState("#ffffff");

  // const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { clientToken } = useSelector((store) => store.client);
  let images = [];
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const getdata = async () => {
    await api
      .get(`/clients/editrestaurant/${id}`)
      .then((res) => {
        if (!res.data.success) {
          return setServerError(res.data.message);
        }
        setRestaurant(res?.data?.restaurant);
        setValue("name", res?.data?.restaurant?.name);
        setValue("city", res?.data?.restaurant?.city);
        setValue("category", res?.data?.restaurant?.category);
        images = [...res?.data?.restaurant?.images];
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!id) return setIsDetailsLoading(false);
    getdata();
    setIsDetailsLoading(false);
  }, []);

  /******************/

  useEffect(() => {
    //for showing server error message
    const timeOut = setTimeout(() => {
      setServerError(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [serverError]);

  //********for Creating new restaurant********//

  const onError = () => {
    setServerError("oops ! Something went wrong");
  };
  const { formSubmit } = useCreateRestaurant(clientToken, onError);

  const editRes = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name); //string
    formData.append("city", data.city); //string
    formData.append("category", data.category); //string
    formData.append("imagesToDelete", data.imagesToDelete);

    for (const key of Object.keys(data.image)) {
      formData.append("image", data.image[key]);
    }

    await api.post(`/clients/editrestaurant/${id}`, formData).then((res) => {
      if (res.data.success) {
        navigate("/clients/home");
      } else {
        setServerError(res.data.message);
      }
    });
  };

  //*****************//

  const submitForm = (data) => {
    // const func = id ? editFormSubmit : formSubmit;
    formSubmit(data).then((result) => {
      if (result?.data?.success) {
        navigate("/clients/home");
      } else {
        setServerError(result?.data?.message);
      }
    });
  };
  //***************//

  const inputStyle =
    "bg-[#12345653]  w-full text-white tracking-wider text-md rounded-lg  border-2 border-gray-300 focus:outline-none focus:border-2 focus:border-[#123456d3]  block  p-2.5";

  const labelStyle = " tracking-wide font-[600]";
  const errorMsgStyle = " text-red-700 tracking-wide";

  return (
    <div className=" bg-menu1 bg-center bg-no-repeat bg-fixed bg-cover min-h-[100vh] pb-4">
      <HeaderBasic />
      <div className=" px-4">
        <div className=" max-w-[800px] min-h-[600px] px-[3rem] md:px-[5rem]  bg-gray-500  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100   mx-auto mt-8 rounded-lg shadow-lg ">
          <h1 className=" text-3xl text-center mt-6 font-semibold tracking-wider">
            {id ? "Edit Restaurant" : "Create Restaurant"}
          </h1>
          <form
            className="grid grid-cols-2 gap-3 mt-4"
            onSubmit={handleSubmit(id ? editRes : submitForm)}
          >
            <div className=" col-span-2">
              <label htmlFor="name" className={labelStyle}>
                Name
              </label>
              <div>
                <input
                  type="text"
                  className={inputStyle}
                  {...register("name", {
                    required: true,
                    pattern: /^[a-zA-Z0-9]{2,20}$/,
                  })}
                />
                {errors.name?.type === "required" && (
                  <p className={errorMsgStyle}>Name is required</p>
                )}
                {errors.name?.type === "pattern" && (
                  <p className={errorMsgStyle}>
                    Minimum 2 and upto 20 characters,special characters not
                    allowed
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <label htmlFor="city" className={labelStyle}>
                City
              </label>
              <div>
                <input
                  type="text"
                  className={inputStyle}
                  id="city"
                  {...register("city", {
                    required: true,
                    pattern: /^[a-zA-Z0-9]{2,20}$/,
                  })}
                />
                {errors.city?.type === "required" && (
                  <p className={errorMsgStyle}>This field is required</p>
                )}
                {errors.city?.type === "pattern" && (
                  <p className={errorMsgStyle}>
                    City name should be alphabetic only,minimum 2 characters
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <label htmlFor="category" className={labelStyle}>
                Category
              </label>
              <div>
                <input
                  type="text"
                  className={inputStyle}
                  id="category"
                  {...register("category", {
                    required: true,
                    pattern: /^[a-zA-Z]{2,20}$/,
                  })}
                />
                {errors.category?.type === "required" && (
                  <p className={errorMsgStyle}>This field is required</p>
                )}
                {errors.category?.type === "pattern" && (
                  <p className={errorMsgStyle}>
                    Category name should be alphabetic only,minimum 2 characters
                  </p>
                )}
              </div>
            </div>
            <div className=" col-span-2">
              <label htmlFor="images" className={labelStyle}>
                Images
              </label>
              <div className="">
                <input
                  type="file"
                  multiple
                  id="images"
                  className=" file:bg-[#12345653] file:h-full file:rounded-l-md file:rounded-r-none file:border-0 file:px-4 file:text-gray-300 text-white file:hover:bg-[#0a1b2d93] block text-sm w-full h-11   border-2 border-gray-300 focus:outline-none focus:border-2  rounded-lg cursor-pointer bg-[#12345653]    mx-auto"
                  {...register("image", { required: id ? false : true })}
                />

                <p className=" text-gray-700"> minimum 3 images</p>
                {errors.image?.type === "required" && (
                  <p className={errorMsgStyle}>Select atleast 3 images</p>
                )}
              </div>
            </div>
            {id && !isDetailsLoading && restaurant?.images?.length > 0 ? (
              <div className="col-span-2 flex flex-wrap gap-4 justify-start">
                {restaurant?.images.map((image, index) => {
                  return (
                    <div
                      className="w-[8rem] h-[10rem] rounded-lg overflow-hidden "
                      key={index}
                    >
                      <img
                        src={image.url}
                        alt={image.fileName}
                        className="w-[8rem] h-[8rem] object-cover"
                      />
                      <div className="bg-[#b81d1d] grid grid-cols-4 h-[2rem]">
                        <input
                          type="checkbox"
                          id={image._id}
                          value={image._id}
                          className="w-4 mx-auto my-auto "
                          {...register("imagesToDelete")}
                        />
                        <label
                          className="py-1.5 text-white pl-2 my-auto tracking-wide col-span-3"
                          htmlFor={image._id}
                        >
                          Delete
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <div
              className={`${
                isSubmitting && "hidden"
              } col-span-2 flex justify-center gap-12 mx-auto`}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={` px-3 py-1 text-white w-fit mx-auto rounded-md  shadow-lg my-3 outline-none  ${
                  isSubmitting
                    ? "bg-gray-500"
                    : "bg-blue-500  hover:bg-blue-600"
                } `}
              >
                Submit
              </button>
              {id && (
                <button
                  onClick={() => console.log("clicked")}
                  disabled={isSubmitting}
                  className={` px-3 py-1 text-white w-fit mx-auto rounded-md  shadow-lg my-3 outline-none  ${
                    isSubmitting
                      ? "bg-gray-700"
                      : "bg-red-600  hover:bg-red-700"
                  } `}
                >
                  Delete
                </button>
              )}
            </div>
            <ClipLoader
              color={color}
              loading={isSubmitting}
              // cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
              className=" col-span-2 mx-auto my-8"
            />

            {serverError && (
              <section className=" col-span-2  w-[15rem] mx-auto px-2 md:w-[30rem] py-4 bg-[#f4848481]  rounded-lg border-[1px] tracking-wide font-[600] text-red-900 border-red-700 flex justify-center text-center mb-4">
                <p>{serverError}</p>
              </section>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCreateForm;
