import React from "react";

const RestauranrCards = ({ city, restaurants }) => {
  return (
    <div className=" max-w-[1100px] mx-4 lg:mx-auto mt-6 mb-12">
      <header>
        <h1 className=" text-[2rem] font-[550] text text-gray-800 tracking-wide">
          Delivery Restaurants in {city}{" "}
        </h1>
      </header>
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 mt-9">
        {restaurants?.restaurants?.map((restaurant) => {
          return (
            <div
              className=" flex flex-col p-3 gap-2 hover:shadow-lg border border-transparent hover:border hover:border-gray-200 hover:rounded-xl"
              key={restaurant._id}
            >
              <div className="rounded-md overflow-hidden h-[16rem]">
                <img
                  className=" object-cover object-cente r w-full h-full"
                  src={
                    restaurant.menu[0]?.images[0]?.url
                      ? restaurant.menu[0]?.images[0]?.url
                      : restaurant.images[0].url
                  }
                  alt={restaurants.name + " image"}
                />
              </div>
              <div className="w-full h-[1.5px] bg-[#000000af] opacity-20 mt-3"></div>
              <div className=" flex justify-between">
                <p className=" text-xl text-gray-800 font-[550] tracking-wider">
                  {restaurant.name.charAt(0).toUpperCase() +
                    restaurant.name.slice(1)}
                </p>
                <div className="  h-6 px-1 rounded-md text-sm bg-green-600 text-white text-center font-semibold">
                  4.0&nbsp;
                  <span className=" text-white text-[15px] text-center">
                    &#9733;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestauranrCards;
