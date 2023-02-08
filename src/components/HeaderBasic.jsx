import React from "react";
import logo from "../images/mainlogo.avif";

const HeaderBasic = () => {
  return (
    <div className="w-[100%] h-[5rem] bg-[#1f1e1e] flex align-middle py-6 px-5">
      <img className="w-[9rem]" src={logo} alt="" />
    </div>
  );
};

export default HeaderBasic;
