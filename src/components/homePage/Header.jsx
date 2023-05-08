import logo from "../../images/mainlogo.avif";
import background from "../../images/background.avif";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBarPopupMenu from "../SearchBarPopupMenu";
import { useSelector, useDispatch } from "react-redux";
import { useGetLocations } from "../../hooks/useGetLocations";
import { useLogoutClient } from "../../hooks/useLogoutClient";
import { location, locationDropdownArrow, Searchicon } from "../../icons";
import { resetUser, setClientToken } from "../features/clients/clientsSlice";
//react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { city } = useSelector((store) => store.user);
  const [isDropDown, setIsDropDown] = useState(false);
  // const [message, setMessage] = useState(false);
  const { userName, clientToken } = useSelector((store) => store.client);

  const navigate = useNavigate();
  const handleClick = () => {
    setIsDropDown(false);
  };

  //for searchbar
  const { mutate, data } = useGetLocations(query);
  useEffect(() => mutate(), [query]);

  //for logout
  const onLogoutSuccess = () => {
    toast.success("Logged out Successfully ", {
      position: toast.POSITION.TOP_CENTER,
    }); // setMessage({ success: true, message: "Successfully Logged Out" });
    dispatch(resetUser());
    dispatch(setClientToken(""));
  };
  const onLogouterror = () => {
    toast.error("Oops, Something went wrong !", {
      position: toast.POSITION.TOP_CENTER,
    });
    // setMessage({ success: false, message: "Oops Something went wrong !" });
    navigate("/");
  };
  const { mutate: logout, isSuccess } = useLogoutClient(
    clientToken,
    onLogoutSuccess,
    onLogouterror
  );

  return (
    <div className="w-[100%]  text-white  min-h-[27rem] relative">
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
            {clientToken ? (
              <>
                <Link to={"/clients/home"}>Client Home</Link>
                <li>{userName}</li>{" "}
                <li className=" hover:cursor-pointer" onClick={() => logout()}>
                  Logout
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/clients/login"}>Sign in</Link>
                </li>
                <li>
                  <Link to={"/clients/register"}>Sign up</Link>
                </li>
              </>
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
            onClick={() => {
              setIsDropDown(true);
            }}
          >
            {location}
            <input
              type="text"
              placeholder="Location"
              className=" h-12 w-[25vw] md:w-[10em] pl-4  outline-none text-gray-600"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
          {isDropDown && (
            <SearchBarPopupMenu
              handleClick={handleClick}
              setIsDropDown={setIsDropDown}
              data={data}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
