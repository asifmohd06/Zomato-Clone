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

  const { restaurantId } = useSelector((store) => store.form);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
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
      },
    };

    await axios
      .post(
        `${baseUrl}/api/restaurants/${restaurantId}/addmenu`,
        formData,
        config
      )
      .then((res) => {
        console.log("success");
        reset();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const inputStyle = "max-w-[20rem] h-10 rounded-lg outline-slate-500 px-3";

  return (
    <>
      <HeaderBasic />
      <div className=" max-w-[1100px] py-6 px-4 bg-[#ff000022] text-center mx-auto my-8 rounded-lg shadow-lg border-2">
        <h1 className=" text-3xl tracking-wide">Add Menu</h1>
        <form
          className="flex flex-col gap-3 my-3"
          onSubmit={handleSubmit(formSubmit)}
        >
          <label htmlFor="name">Menu Name</label>
          <div>
            <input
              type="text"
              className={inputStyle}
              id="name"
              {...register("menuName", { required: true })}
            />
          </div>
          <label htmlFor="city">Quantity Type</label>
          <div>
            <input
              type="radio"
              id="portion"
              value="Portion"
              {...register("quantityType")}
            />
            <label htmlFor="portion">portion</label>
            <input
              type="radio"
              id="full"
              value="Full"
              {...register("quantityType")}
            />
            <label htmlFor="full">Full</label>
          </div>
          <label htmlFor="category">Category</label>
          <div>
            <input
              type="radio"
              id="veg"
              value="Veg"
              {...register("category", { required: true })}
            />
            <label htmlFor="Non-veg">Veg</label>
            <input
              type="radio"
              id="non-veg"
              value="Non-veg"
              {...register("category", { required: true })}
            />
            <label htmlFor="non-veg">Veg</label>
          </div>
          <label htmlFor="name">Minimum Quantity</label>
          <div>
            <input
              type="number"
              className={inputStyle}
              id="name"
              {...register("minQuantity", { required: true })}
            />
          </div>
          <label htmlFor="name">Base Price</label>
          <div>
            <input
              type="number"
              className={inputStyle}
              id="name"
              {...register("basePrice", { required: true })}
            />
          </div>
          <label htmlFor="images">Images</label>
          <input
            type="file"
            multiple
            id="images"
            className="mx-auto"
            {...register("images", { required: true })}
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white w-fit mx-auto rounded-md hover:bg-blue-600 shadow-lg my-3"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateMenu;
