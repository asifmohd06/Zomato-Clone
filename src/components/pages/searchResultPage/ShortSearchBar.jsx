import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const ShortSearchBar = ({
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
    <div className="mx-4 lg:mx-auto sm:hidden flex flex-col gap-4 my-4">
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
            top={"3.5em"}
            marginTop={"10em"}
          />
        )}

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
  );
};

export default ShortSearchBar;
