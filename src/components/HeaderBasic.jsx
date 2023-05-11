import React from "react";
import logo from "../images/mainlogo.avif";
import { Link } from "react-router-dom";

const HeaderBasic = ({ location }) => {
  return (
    <div className="sticky top-0 z-20 py-4 bg-[#1f1e1e] flex items-center justify-between  pl-5 pr-8 ">
      <Link to={"/"}>
        <img className="w-[9rem]" src={logo} alt="" tabIndex={1} />
      </Link>
      <ul>
        <li className=" text-white text-2xl tracking-wide">
          <Link
            to={
              location === "loginPage"
                ? "/clients/register"
                : location === "registerPage"
                ? "/clients/login"
                : "/"
            }
            tabIndex={2}
          >
            {location === "loginPage"
              ? "Register"
              : location === "registerPage"
              ? "Login"
              : "Home"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderBasic;
