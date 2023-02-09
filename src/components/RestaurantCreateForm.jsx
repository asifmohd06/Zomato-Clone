import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCityName, saveRestaurantId } from "./features/Form/formSlice";
import { useForm } from "react-hook-form";
import logo from "../images/mainlogo.avif";
import HeaderBasic from "./HeaderBasic";

const RestaurantCreateForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const baseUrl = "http://127.0.0.1:5000";

  const dispatch = useDispatch();

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name); //string
    formData.append("city", data.city); //string
    formData.append("category", data.category); //string

    for (const key of Object.keys(data.image)) {
      formData.append("image", data.image[key]);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post(`${baseUrl}/api/restaurants/add`, formData, config)
      .then((res) => {
        dispatch(saveCityName(res.data));
        dispatch(saveRestaurantId(res.data));
        navigate("/createmenu");
      })
      .catch((err) => console.log(err));
    reset();
  };

  const inputStyle =
    "w-[20rem] md:w-[30rem] h-10 rounded-lg outline-slate-500 px-3";

  return (
    <div>
      <HeaderBasic />
      <div className=" max-w-[1100px]  py-6 px-4 bg-[#4d429852] text-center lg:mx-auto mx-8 my-24 rounded-lg shadow-lg border-2">
        <h1 className=" text-3xl tracking-wide">Create Restaurant</h1>
        <form
          className="flex flex-col gap-3 my-3"
          onSubmit={handleSubmit(formSubmit)}
        >
          <label htmlFor="name">Name</label>
          <div>
            <input type="text" className={inputStyle} {...register("name")} />
          </div>
          <label htmlFor="city">City</label>
          <div>
            <input
              type="text"
              className={inputStyle}
              id="city"
              {...register("city")}
            />
          </div>
          <label htmlFor="category">Category</label>
          <div>
            <input
              type="text"
              className={inputStyle}
              id="category"
              {...register("category")}
            />
          </div>
          <label htmlFor="images">Images</label>
          <div>
            <input
              type="file"
              multiple
              id="images"
              className="max-w-[22rem]  h-10 rounded-lg outline-slate-500 px-3"
              {...register("image")}
            />
          </div>

          <button
            type="submit"
            className={`px-3 py-1 text-white w-fit mx-auto rounded-md  shadow-lg my-3 bg-blue-500  hover:bg-blue-600`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantCreateForm;
