import React, { useState } from "react";
import { cities } from "../data";

const SearchBarPopupMenu = ({ setIsSearchbarOpen }) => {
  const [data, setData] = useState(cities.values);
  const [city, setCity] = useState("kollam");
  return (
    <div className="w-[20em] h-[13em] bg-white border-2 rounded-md absolute top-[3.5em] flex flex-col overflow-y-auto z-[2]">
      {data.map((city, index) => [
        <div
          className=" border-b-2 tracking-wide text-gray-500 hover:bg-[#F8F8F8] cursor-pointer text-left px-6"
          onClick={(e) => (
            setCity(e.target.textContent), setIsSearchbarOpen(false)
          )}
          key={index}
        >
          <h2 className="py-4 ">{city}</h2>
        </div>,
      ])}
    </div>
  );
};

export default SearchBarPopupMenu;
