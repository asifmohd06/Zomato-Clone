import React from "react";
import HeaderBasic from "./HeaderBasic";

const NotFound = () => {
  return (
    <>
      <HeaderBasic />
      <div className="  text-[5rem]  font-extrabold text-gray-500 flex items-center justify-center h-[75vh] tracking-wider">
        <div>
          <p>NOT FOUND</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
