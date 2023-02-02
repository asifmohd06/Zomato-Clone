import React, { useState } from "react";
import { cities } from "../data";
import { toggleSearchbar } from "./features/header/headerSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "./features/user/userSlice";

const SearchBarPopupMenu = () => {
  const dispatch = useDispatch();
  const data = cities.values;
  const setCityandClose = (e) => {
    dispatch(setCity(e.target.textContent));
    dispatch(toggleSearchbar());
  };
  return (
    <div className="w-[20em] h-[13em] bg-white border-2 rounded-md absolute top-[3.5em] flex flex-col overflow-y-auto z-[2]">
      {data.map((city, index) => [
        <div
          className=" border-b-2 tracking-wide text-gray-500 hover:bg-[#F8F8F8] cursor-pointer text-left px-6"
          onClick={(e) => setCityandClose(e)}
          key={index}
        >
          <h2 className="py-4 ">{city}</h2>
        </div>,
      ])}
    </div>
  );
};

export default SearchBarPopupMenu;
