import React, { useState } from "react";
import { DropDownArrow } from "../icons";

const CitiesDropdown = ({ data }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className="border w-[100%] rounded-md shadow px-4 py-5 relative  "
      onClick={() => setIsClicked(!isClicked)}
    >
      <h1 className="text-xl tracking-wider hover:cursor-pointer">
        {data.title}
      </h1>

      {isClicked && (
        <div className="grid grid-cols-3 md:grid-cols-5 py-4 gap-2">
          {data.values.map((item) => {
            return (
              <a
                href={`#${item}`}
                className="tracking-wider font-light text-[1em] text-gray-500 px-2 hover:text-gray-900"
              >
                {item}
              </a>
            );
          })}
        </div>
      )}
      <DropDownArrow isClicked={isClicked} />
    </div>
  );
};

export default CitiesDropdown;
