import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import HeaderBasic from "../HeaderBasic";
import Loading from "../Loading";

const CreateMenu = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isMenuLoading, setIsMenuLoading] = useState(true);
  const [targetMenu, setTargetMenu] = useState("");
  const { id, menuId } = useParams();

  const navigate = useNavigate();
  // const baseUrl = "https://zomato06.onrender.com";
  const baseUrl = "http://localhost:5000";

  const { clientToken } = useSelector((store) => store.client);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };
  // sending data to server
  const formSubmit = async (data) => {
    const formData = new FormData();

    formData.append("menuName", data.menuName); //string
    formData.append("basePrice", data.basePrice); // number
    formData.append("minQuantity", data.minQuantity); // number
    formData.append("quantityType", data.quantityType); // string
    formData.append("type", data.vegornonveg); //string
    formData.append("category", data.category); //string

    for (const key of Object.keys(data.images)) {
      formData.append("image", data.images[key]);
    }

    id &&
      data.imagesToDelete &&
      formData.append("imagesToDelete", data.imagesToDelete);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${clientToken}`,
      },
    };
    id
      ? await axios
          .put(
            `${baseUrl}/api/clients/restaurants/${id}/editmenu/${menuId}`,
            formData,
            config
          )
          .then((res) => {
            console.log(res.data);
            if (!res.data.success) {
              return setServerError(res.data.message);
            }
            reset();
            navigate("/clients/home");
          })
          .catch((err) => {
            // console.log(err.message);
            setServerError("Something Went Wrong");
            setIsLoading(false);
          })
      : await axios
          .post(`${baseUrl}/api/restaurants/addmenu`, formData, config)
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              reset();
              navigate("/clients/home");
            } else {
              setServerError("Something Went Wrong");
              setIsLoading(false);
            }
          })
          .catch((err) => setServerError(err.message));
    setIsLoading(false);
  };

  //fetching menu data
  const getdata = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${clientToken}`,
      },
    };
    await axios
      .get(
        `${baseUrl}/api/clients/restaurants/${id}/menu/${menuId}/details`,
        config
      )
      .then((res) => {
        if (!res.data.success) {
          return setServerError(res.data.message);
        }
        const menu = res.data.targetMenu;
        setTargetMenu(res.data.targetMenu);
        setValue("vegornonveg", menu.type);
        setValue("menuName", menu.menuName);
        setValue("category", menu.category);
        setValue("basePrice", menu.basePrice);
        setValue("minQuantity", menu.minQuantity);
        setValue("quantityType", menu.quantityType);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!id) return setIsMenuLoading(false);
    getdata();
    setIsMenuLoading(false);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setServerError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [serverError]);

  const labelStyle = " tracking-wide font-[600]";
  const inputStyle =
    "bg-[#12345653]  w-full text-white tracking-wider text-md rounded-lg  border-2 border-gray-300 focus:outline-none focus:border-2 focus:border-[#123456d3]  block  p-2.5";
  const errorMsgStyle = " text-red-700 tracking-wide md:w-[30rem] ";

  return (
    <div className="   bg-menu1 bg-center bg-no-repeat bg-fixed bg-cover pb-6 min-h-[100vh]">
      {isMenuLoading ? (
        <Loading />
      ) : (
        <>
          <HeaderBasic />
          <div className="px-4">
            <div className=" max-w-[800px] min-h-[590px] py-6 px-[3rem] md:px-[5rem]  bg-gray-500  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100   mx-auto mt-8 rounded-lg shadow-lg ">
              <h1 className=" text-3xl tracking-wide text-center">
                {id ? "Edit Menu" : "Add Menu"}
              </h1>
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
                    <label htmlFor="vegornonveg" className={labelStyle}>
                      Veg or Non-Veg
                    </label>
                    <div>
                      <select
                        {...register("vegornonveg", { required: true })}
                        className={inputStyle}
                        id="vegornonveg"
                      >
                        <option>Veg</option>
                        <option>Non-veg</option>
                      </select>
                    </div>
                    {errors.vegornonveg?.type === "required" && (
                      <p>this field is required</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-2">
                  <div>
                    <label htmlFor="category" className={labelStyle}>
                      Category
                    </label>
                    <div>
                      <select
                        {...register("category", { required: true })}
                        className={inputStyle}
                        id="category"
                      >
                        <option>Starter</option>
                        <option>Main Course</option>
                        <option>Rice</option>
                        <option>Pizza</option>
                        <option>Drinks</option>
                      </select>
                    </div>
                    {errors.category?.type === "required" && (
                      <p>this field is required</p>
                    )}
                  </div>
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
                        className={inputStyle}
                        id="price"
                        {...register("basePrice", {
                          required: true,
                          pattern: /^[0-9]+(\.[0-9]+)?$/,
                        })}
                      />
                      {errors.basePrice?.type === "required" && (
                        <p className={errorMsgStyle}>Please enter a price</p>
                      )}
                      {errors.basePrice?.type === "pattern" && (
                        <p className={errorMsgStyle}>
                          Price should be a number
                        </p>
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
                  {...register("images", { required: id ? false : true })}
                />
                {errors.images?.type === "required" && (
                  <p className={errorMsgStyle}>
                    Please add an image of the menu
                  </p>
                )}
                {id && targetMenu?.images && (
                  <p className={labelStyle}>Already Uploaded Images</p>
                )}
                {id && targetMenu?.images ? (
                  <div className="flex flex-wrap gap-4 justify-start">
                    {targetMenu.images.map((image, index) => {
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-3 py-1 bg-[#363eab] text-white w-fit mx-auto rounded-md hover:bg-[#272d7c] shadow-lg my-3 ${
                    isSubmitting
                      ? "bg-gray-700"
                      : "bg-blue-500  hover:bg-blue-600"
                  }`}
                >
                  Submit
                </button>
                {serverError && (
                  <div className=" text-center text-red-700">{serverError}</div>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateMenu;
