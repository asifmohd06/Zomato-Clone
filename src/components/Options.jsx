import React from "react";
import data from "../popularcuisines";

const Options = () => {
  return (
    <div className=" py-24 max-w-[1100px] mx-auto tracking-wide">
      <h1 className="text-4xl pb-6">Explore options near me</h1>
      <div className="flex flex-col">
        <div className="border w-[100%] rounded-md shadow px-4 py-5">
          <h1 className="text-xl tracking-wider">Popular cuisines near me</h1>
          <p className="py-3">
            {data.map((item) => {
              return (
                <span>
                  <a
                    href={`#${item}`}
                    className="tracking-wider font-light text-[1.1em] text-gray-600 px-2"
                  >
                    <span className=" text-gray-400 ">&#8226;</span> {item}
                  </a>
                  &nbsp;
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Options;
