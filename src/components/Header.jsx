import React from "react";
import background from "../images/background.avif";
import logo from "../images/mainlogo.avif";

const Header = () => {
  return (
    <section className="w-[100%]  text-white  min-h-[27rem] relative">
      <div className=" absolute w-[100%] h-[100%] overflow-hidden z-[-2]">
        <img
          src={background}
          alt=""
          className=" object-cover w-[100%] h-[100%]"
        />
      </div>
      <nav className="mx-auto">
        <div className=" hidden md:flex justify-end  pr-[10em] pt-2 pb-4">
          <ul className="pt-5 flex mr-0 gap-6 text-center text-[1.25rem]">
            <li>Investor relations</li>
            <li>Add Restaurant</li>
            <li>Login</li>
            <li>Signup</li>
          </ul>
        </div>
      </nav>
      <div className="pt-24 md:pt-6 text-center">
        <img src={logo} alt="" className=" w-[18em] mx-auto" />
        <h2 className="mt-8 text-2xl md:text-4xl tracking-wider">
          Discover the best food & drinks in Kollam
        </h2>
        <div className="mt-8 w-fit mx-auto flex px-4">
          <input
            type="text"
            placeholder="Location"
            className=" rounded-l-md h-12 md:w-[23em] pl-6  outline-none"
          />
          <input
            type="text"
            className="rounded-r-md h-12 md:w-[23em] outline-none"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
