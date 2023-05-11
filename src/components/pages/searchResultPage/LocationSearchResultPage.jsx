import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLocationDetail } from "../../../hooks/useGetLocationDetails";
import NotFound from "../../NotFound";
import footerlogo from "../../../images/footerlogo.avif";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Loading from "../../Loading";
import RestaurantCards from "./RestaurantCards";
import { Footer } from "../../homePage";

const LocationDetails = () => {
  const { id } = useParams();
  const [isMenuIconClicked, setIsMenuIconClicked] = useState(false);
  const { data, isError, isSuccess, isLoading, error } =
    useGetLocationDetail(id);
  if (isError) return <NotFound />; // oops page here
  if (isLoading) return <Loading />; // a new loading screen

  return (
    isSuccess && (
      <div className=" bg-[#FFFFFF] relative">
        <div className=" max-w-[1100px] mx-4 lg:mx-auto py-4 flex justify-between sm:justify-start ">
          <img
            src={footerlogo}
            alt="logo"
            className=" w-[8rem] self-center order-2 sm:order-1 "
          />
          <button
            className="sm:hidden order-1 z-10"
            onClick={() => setIsMenuIconClicked(!isMenuIconClicked)}
          >
            {!isMenuIconClicked ? (
              <GiHamburgerMenu size={"24px"} />
            ) : (
              <IoCloseSharp size={"26px"} />
            )}
          </button>
          {/* long search bar */}
          <div className=" hidden sm:order-2 sm:flex justify-center items-center border shadow-md rounded-md h-12 w-[800px] gap-2  px-3 py-2 mx-8">
            <div className="flex w-1/3 items-center gap-2">
              <HiLocationMarker
                className=" flex-shrink-0"
                color="#ff002fad"
                size={"24px"}
              />
              <input
                className=" outline-none min-w-[2em] flex-shrink-[1]"
                placeholder={isSuccess && data?.data?.restaurants?.name}
                type="text"
              />
              <IoMdArrowDropdown className=" flex-shrink-0" size={"24px"} />
            </div>
            <div className="w-[1px]  rounded-md bg-gray-300">&nbsp;</div>
            <div className="flex flex-1  items-center gap-3">
              <FiSearch color="#000000b6" size={"24px"} />
              <input
                className=" h-8 outline-none w-[100%]"
                type="text"
                placeholder="Search for a restaurant, cuisine or dish"
              />
            </div>
          </div>

          <div className="sm:flex gap-4 hidden order-3 flex-shrink-0 text-xl text-gray-500 items-center">
            <a href="">Log in</a>
            <a href="">Sign up</a>
          </div>
        </div>

        {/* short search bar */}

        <div className="sm:hidden flex flex-col gap-4 my-4">
          <div className="flex px-3 items-center w-[80%] mx-auto gap-3 border rounded-md shadow-md h-12 ">
            <HiLocationMarker
              className=" flex-shrink-0"
              color="#ff002fad"
              size={"24px"}
            />
            <input
              className=" outline-none min-w-[2em] flex-shrink-[1] w-[100%] "
              placeholder={isSuccess && data?.data?.restaurants?.name}
              type="text"
            />
            <IoMdArrowDropdown className=" flex-shrink-0" size={"24px"} />
          </div>
          <div className="flex px-3   items-center gap-3 mx-auto w-[80%] border rounded-md shadow-md h-12">
            <FiSearch color="#000000b6" size={"24px"} />
            <input
              className=" h-8 outline-none w-[100%] "
              type="text"
              placeholder="Search for a restaurant, cuisine or dish"
            />
          </div>
        </div>
        <div
          className={` absolute z-5 top-0 transition-transform duration-300 translate-x-[${
            isMenuIconClicked ? "0%" : "-100%"
          }]   sm:hidden w-[12em] h-screen border-r-2 shadow-md py-16 px-4 flex flex-col gap-4 text-gray-500 text-2xl bg-white`}
        >
          <a href="#">Log in</a>
          <a href="#">Sign up</a>
        </div>

        <div className="flex gap-4 max-w-[1100px] mx-auto mt-12">
          <div className=" w-[8rem] h-10 rounded-md shadow-md border text-gray-500 tracking-wide text-center ">
            Filters
          </div>
          {/* <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div>
          <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div>
          <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div>
          <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div> */}
        </div>
        <RestaurantCards
          city={isSuccess && data?.data?.restaurants.name}
          restaurants={data?.data?.restaurants}
        />
        <Footer />
      </div>
    )
  );
};

export default LocationDetails;
