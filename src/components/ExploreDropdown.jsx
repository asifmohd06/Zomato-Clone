import React, { useState } from "react";
import { DropDownArrow } from "../icons";

const ExploreDropdown = ({ data }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className="border w-[100%] rounded-md shadow px-4 py-5 relative hover:cursor-pointer  "
      onClick={() => setIsClicked(!isClicked)}
    >
      <h1 className="text-xl tracking-wider hover:cursor-pointer">
        {data.title}
      </h1>

      {isClicked && (
        <p className="py-3">
          {data.values.map((item, index) => {
            return (
              <span key={index}>
                <a
                  href={`#${item}`}
                  className="tracking-wider font-light text-[1.1em] text-gray-500 px-2 hover:text-gray-900"
                >
                  <span className=" text-gray-400 ">&#8226;</span> {item}
                </a>
                &nbsp;
              </span>
            );
          })}
        </p>
      )}
      <DropDownArrow isClicked={isClicked} />
    </div>
  );
};

export default ExploreDropdown;
