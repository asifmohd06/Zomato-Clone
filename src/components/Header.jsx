import React, { useEffect } from "react";
import background from "../images/background.avif";
import logo from "../images/mainlogo.avif";
import { location, locationDropdownArrow, Searchicon } from "../icons";
import SearchBarPopupMenu from "./SearchBarPopupMenu";
import { useSelector, useDispatch } from "react-redux";
import { toggleSearchbar } from "./features/header/headerSlice";
import {
  setClientId,
  setEmail,
  setUserName,
  resetUser,
} from "./features/clients/clientsSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { isSearchbarOpen } = useSelector((store) => store.header);
  const { city } = useSelector((store) => store.user);
  const { userName, clientId } = useSelector((store) => store.client);

  const baseUrl = "https://zomato06.onrender.com";
  const navigate = useNavigate();

  const logout = async () => {
    axios.defaults.withCredentials = true;
    console.log("clicked");
    const config = {
      withCredentials: true,
    };
    console.log("before axios");
    await axios
      .post(`${baseUrl}/api/clients/logout`, config)
      .then((resp) => {
        console.log("called");
        console.log(resp);
        if (resp.data.logout === "success") {
          dispatch(setClientId(""));
          dispatch(setEmail(""));
          dispatch(setUserName(""));
        }
        navigate("/");
      })
      .catch((err) => console.log(err));
    console.log("after axios");
  };

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
            <li>
              <Link to={"/addrestaurant"}>Add Restaurant</Link>
            </li>
            {clientId ? (
              <>
                <li>{userName}</li>{" "}
                <li className=" hover:cursor-pointer" onClick={() => logout()}>
                  Logout
                </li>
              </>
            ) : (
              <li>
                <Link to={"/clients/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="pt-24 md:pt-6 text-center">
        <img src={logo} alt="" className=" w-[18em] mx-auto" />
        <h2 className="mt-8 text-2xl md:text-4xl tracking-wider">
          Discover the best food & drinks in <span>{city}</span>
        </h2>
        <div className="mt-8 w-fit mx-auto flex px-4 relative">
          <div
            className="relative px-6 bg-white  rounded-l-md"
            onClick={() => dispatch(toggleSearchbar())}
          >
            {location}
            <input
              type="text"
              placeholder="Location"
              className=" h-12 w-[25vw] md:w-[10em] pl-4  outline-none"
            />
            {locationDropdownArrow}
          </div>
          <div className="bg-white h-12 flex">
            <div className="h-[1.5em] w-[1.6px] bg-[#a0a0a0] my-auto"></div>
          </div>

          <div className="relative px-6 bg-white rounded-r-md">
            {Searchicon}
            <input
              type="text"
              placeholder="Serach for restaurant, cuisine or a dish"
              className=" h-12 w-[25vw] md:w-[23em] outline-none pl-4"
            />
          </div>
          {isSearchbarOpen && <SearchBarPopupMenu />}
        </div>
      </div>
    </section>
  );
};

export default Header;
