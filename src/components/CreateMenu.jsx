import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateMenu = () => {
  const [type, setType] = useState("");
  const [menuName, setMenuName] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [minQuantity, setMinQuantity] = useState(0);
  const [quantityType, setQuantityType] = useState("");

  const { restaurantId } = useSelector((store) => store.form);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";
  let menuImages = [];
  const images = [];

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };
  const handleQuantityType = (e) => {
    setQuantityType(capitalize(e.target.value));
  };

  const handleImages = (e) => {
    menuImages = [];
    const length = e.target.files.length;
    for (let i = 0; i < length; i++) {
      menuImages.push(e.target.files[i]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("menuName", menuName);
    formData.append("basePrice", basePrice);
    formData.append("minQuantity", minQuantity);
    formData.append("quantityType", quantityType);

    formData.append("type", type);
    menuImages.forEach((file) => {
      formData.append("image", file);
    });

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
      })
      .catch((err) => console.log(err));

    navigate("/");
  };

  const inputStyle = "max-w-[20rem] h-10 rounded-lg outline-slate-500 px-3";

  return (
    <div className=" max-w-[1100px] py-6 px-4 bg-[#ff000022] text-center mx-auto my-24 rounded-lg shadow-lg border-2">
      <h1 className=" text-3xl tracking-wide">Add Menu</h1>
      <form className="flex flex-col gap-3 my-3" onSubmit={handleSubmit}>
        <label htmlFor="name">Menu Name</label>
        <div>
          <input
            type="text"
            className={inputStyle}
            id="name"
            required
            onChange={(e) => setMenuName(capitalize(e.target.value))}
            value={menuName}
          />
        </div>
        <label htmlFor="city">Quantity Type</label>
        <div>
          <input
            name="quantitytype"
            type="radio"
            id="portion"
            value="Portion"
            onChange={handleQuantityType}
          />
          <label htmlFor="portion">portion</label>
          <input
            name="quantitytype"
            type="radio"
            id="full"
            value="Full"
            onChange={handleQuantityType}
          />
          <label htmlFor="full">Full</label>
        </div>
        <label htmlFor="category">Category</label>
        <div>
          <input
            type="radio"
            name="category"
            id="veg"
            required
            onChange={(e) => setType(capitalize(e.target.value))}
            value="Veg"
          />
          <label htmlFor="Non-veg">Veg</label>
          <input
            type="radio"
            name="category"
            id="non-veg"
            required
            onChange={(e) => setType(capitalize(e.target.value))}
            value="Non-veg"
          />
          <label htmlFor="non-veg">Veg</label>
        </div>
        <label htmlFor="name">Minimum Quantity</label>
        <div>
          <input
            type="number"
            className={inputStyle}
            id="name"
            required
            onChange={(e) => setMinQuantity(capitalize(e.target.value))}
            value={minQuantity}
          />
        </div>
        <label htmlFor="name">Base Price</label>
        <div>
          <input
            type="number"
            className={inputStyle}
            id="name"
            required
            onChange={(e) => setBasePrice(e.target.value)}
            value={basePrice}
          />
        </div>
        <label htmlFor="images">Images</label>
        <input
          type="file"
          multiple
          id="images"
          className="mx-auto"
          required
          onChange={handleImages}
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white w-fit mx-auto rounded-md hover:bg-blue-600 shadow-lg my-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMenu;
