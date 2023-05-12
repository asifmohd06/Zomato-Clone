import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const MainSearchBar = ({
  isSuccess,
  data,
  setIsDropDown,
  query,
  setQuery,
  handleClick,
  searchData,
  isDropDown,
  SearchBarPopupMenu,
}) => {
  return (
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
          onClick={() => {
            setIsDropDown(true);
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isDropDown && (
          <SearchBarPopupMenu
            handleClick={handleClick}
            setIsDropDown={setIsDropDown}
            data={searchData}
            top={"4.5em"}
            marginTop={"0"}
          />
        )}
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
  );
};

export default MainSearchBar;
