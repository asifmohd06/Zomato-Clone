import React from "react";
import logo from "../images/mainlogo.avif";
import { useLocation, Link } from "react-router-dom";

const HeaderBasic = ({ location }) => {
  return (
    <div className="w-[100%] h-[5rem] bg-[#1f1e1e] flex align-middle justify-between py-6 px-5 pr-8 ">
      <img className="w-[9rem]" src={logo} alt="" />
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
