import React from "react";

const Countriesmenu = ({ countries, setCountry }) => {
  return (
    <div className="absolute z-[2] w-fit md:w-[40em] min-h-max px-4 py-4 grid grid-cols-2 md:grid-cols-4 bottom-[5em] sm:top-[-38em] md:top-[-22em] right-[-10em] sm:left-[-10em] md:left-[-30em] border bg-white rounded-md ">
      {countries.map((item, index) => {
        return (
          <div
            className="flex justify-start py-2 hover:cursor-pointer hover:bg-[#f2f2f2]"
            key={index}
            onClick={() => setCountry(item.id - 1)}
          >
            <div className="w-[46.92px] h-[30px] scale-[0.4889]">
              <img src={item.img} alt="" className=" object-cover " />
            </div>
            <div>
              <h1>{item.name}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Countriesmenu;
