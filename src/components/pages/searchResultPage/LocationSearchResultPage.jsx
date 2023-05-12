import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetLocationDetail } from "../../../hooks/useGetLocationDetails";
import NotFound from "../../NotFound";
import footerlogo from "../../../images/footerlogo.avif";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Loading from "../../Loading";
import RestaurantCards from "./RestaurantCards";
import { Footer } from "../../homePage";
import SearchBarPopupMenu from "../../SearchBarPopupMenu";

import { useGetLocations } from "../../../hooks/useGetLocations";
import MainSearchBar from "./MainSearchBar";
import ShortSearchBar from "./ShortSearchBar";

const LocationDetails = () => {
  let { id } = useParams();
  const [isMenuIconClicked, setIsMenuIconClicked] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { data, isError, isSuccess, isLoading, error, refetch } =
    useGetLocationDetail(id);
  useEffect(() => {
    refetch();
  }, [id]);

  const [isDropDown, setIsDropDown] = useState(false);
  const [query, setQuery] = useState("");

  //for searchbar
  const { mutate, data: searchData } = useGetLocations(query);
  useEffect(() => mutate(), [query]);

  const handleClick = () => {
    setIsDropDown(false);
  };
  if (isError) return <NotFound />; // oops page here
  if (isLoading) return <Loading />; // a new loading screen

  return (
    isSuccess && (
      <div className=" bg-[#FFFFFF] relative ">
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

          {/* main search bar */}
          {!isSmallScreen && (
            <MainSearchBar
              {...{
                isSuccess,
                data,
                setIsDropDown,
                query,
                setQuery,
                handleClick,
                searchData,
                isDropDown,
                SearchBarPopupMenu,
              }}
            />
          )}

          <div className="sm:flex gap-4 hidden order-3 flex-shrink-0 text-xl text-gray-500 items-center">
            <a href="">Log in</a>
            <a href="">Sign up</a>
          </div>
        </div>

        {/* short search bar */}

        {isSmallScreen && (
          <ShortSearchBar
            {...{
              isSuccess,
              data,
              setIsDropDown,
              query,
              setQuery,
              handleClick,
              searchData,
              isDropDown,
              SearchBarPopupMenu,
            }}
          />
        )}

        {/* sidebar */}

        <div
          className={` absolute z-5 top-0 transition-transform duration-300 translate-x-[${
            isMenuIconClicked ? "0%" : "-100%"
          }]   sm:hidden w-[12em] h-screen border-r-2 shadow-md py-16 px-4 flex flex-col gap-4 text-gray-500 text-2xl bg-white`}
        >
          <a href="#">Log in</a>
          <a href="#">Sign up</a>
        </div>

        {/* filter options */}

        <div className="flex gap-4 max-w-[1100px] mx-4 lg:mx-auto mt-12">
          <div className=" w-[8rem] h-10 rounded-md shadow-md border text-gray-500 tracking-wide text-center ">
            Filters
          </div>
          {/* <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div>
          <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div>
          <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div>
          <div className=" w-[8rem] h-10 rounded-md shadow-md border"></div> */}
        </div>

        {/* cards */}

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
