import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import HeaderBasic from "./HeaderBasic";

const CreateMenu = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const baseUrl = process.env.BASE_URL;
  const { clientToken } = useSelector((store) => store.client);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };

  const check = () => {
    if (!errors) setIsLoading(true);
  };

  const formSubmit = async (data) => {
    const formData = new FormData();

    formData.append("menuName", data.menuName); //string
    formData.append("basePrice", data.basePrice); // number
    formData.append("minQuantity", data.minQuantity); // number
    formData.append("quantityType", data.quantityType); // string

    formData.append("type", data.category);
    for (const key of Object.keys(data.images)) {
      formData.append("image", data.images[key]);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${clientToken}`,
      },
    };
    await axios
      .post(`${baseUrl}/api/restaurants/addmenu`, formData, config)
      .then((res) => {
        console.log("success");
        reset();
        navigate("/");
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const labelStyle = " tracking-wide font-[600]";
  const inputStyle =
    "bg-[#12345653]  w-full text-white tracking-wider text-md rounded-lg  border-2 border-gray-300 focus:outline-none focus:border-2 focus:border-[#123456d3]  block  p-2.5";
  const errorMsgStyle = " text-red-700 tracking-wide md:w-[30rem] ";

  return (
    <div className="   bg-menu1 bg-center bg-no-repeat bg-fixed bg-cover pb-6 md:pb-0  md:h-[100vh]">
      <HeaderBasic />
      <div className="px-4">
        <div className=" max-w-[800px] min-h-[590px] py-6 px-[3rem] md:px-[5rem]  bg-gray-500  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100   mx-auto mt-8 rounded-lg shadow-lg ">
          <h1 className=" text-3xl tracking-wide text-center">Add Menu</h1>
          <form
            className="flex flex-col  gap-3 mt-3"
            onSubmit={handleSubmit(formSubmit)}
          >
            <label htmlFor="name" className={labelStyle}>
              Menu Name
            </label>
            <div>
              <input
                type="text"
                className={inputStyle}
                id="name"
                {...register("menuName", { required: true })}
              />
              {errors.menuName?.type === "required" && (
                <p className={errorMsgStyle}>Name is required</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex flex-col gap-3">
                <label htmlFor="type" className={labelStyle}>
                  Quantity Type
                </label>
                <div>
                  <select
                    {...register("quantityType", { required: true })}
                    id="type"
                    className={inputStyle}
                  >
                    <option>Full</option>
                    <option>Portion</option>
                  </select>
                </div>
                {errors.quantityType?.type === "required" && (
                  <p>this field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="category" className={labelStyle}>
                  Category
                </label>
                <div>
                  <select
                    {...register("category", { required: true })}
                    className={inputStyle}
                    id="category"
                  >
                    <option>Veg</option>
                    <option>Non veg</option>
                  </select>
                </div>
                {errors.category?.type === "required" && (
                  <p>this field is required</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <label htmlFor="min" className={labelStyle}>
                  Minimum Quantity
                </label>
                <div>
                  <input
                    type="number"
                    className={inputStyle}
                    id="min"
                    {...register("minQuantity", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors.minQuantity?.type === "required" && (
                    <p className={errorMsgStyle}>Enter Minimum quantity</p>
                  )}
                  {errors.minQuantity?.type === "pattern" && (
                    <p className={errorMsgStyle}>
                      Minimum quantity should be a number
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="price" className={labelStyle}>
                  Base Price
                </label>
                <div>
                  <input
                    type="number"
                    className={inputStyle}
                    id="price"
                    {...register("basePrice", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors.price?.type === "required" && (
                    <p>Please enter a price</p>
                  )}
                  {errors.price?.type === "pattern" && (
                    <p>Price should be a number</p>
                  )}
                </div>
              </div>
            </div>
            <label htmlFor="images" className={labelStyle}>
              Images
            </label>
            <input
              type="file"
              multiple
              id="images"
              className=" file:bg-[#12345653] file:h-full file:rounded-l-md file:rounded-r-none file:border-0 file:px-4 file:text-gray-300 text-white file:hover:bg-[#0a1b2d93] block text-sm w-full h-11   border-2 border-gray-300 focus:outline-none focus:border-2  rounded-lg cursor-pointer bg-[#12345653]    mx-auto"
              {...register("images", { required: true })}
            />
            <button
              type="submit"
              disabled={isLoading}
              onClick={() => check()}
              className={`px-3 py-1 bg-[#363eab] text-white w-fit mx-auto rounded-md hover:bg-[#272d7c] shadow-lg my-3 ${
                isLoading ? "bg-gray-500" : "bg-blue-500  hover:bg-blue-600"
              }`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
