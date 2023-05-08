import React from "react";
import orderimg from "../../images/orderonline.avif";
import { rightArrow } from "../../icons";

const Hero = () => {
  return (
    <section className="max-w-[1100px] lg:mx-auto flex flex-col justify-between min-h-[36rem]  py-16 mx-4">
      <div className="w-[50%] border border-gray-300  rounded-[1em] h-[15em] md:h-[15rem] pb-3 transition-transform duration-300 hover:scale-[1.04]">
        <div className=" w-[100%] h-[70%] flex rounded-t-[1em] overflow-hidden ">
          <img src={orderimg} alt="" className=" object-cover  w-[100%]" />
        </div>
        <div className="px-4 pt-3">
          <h1 className="text-sm md:text-xl tracking-wider font-semibold text-gray-700">
            Order Online
          </h1>
          <p className="text-gray-600 text-sm md:text-lg">
            Stay home and order to your doorstep
          </p>
        </div>
      </div>

      <div className=" pb-6 pt-6">
        <h1 className="text-[1.75em] sm:text-4xl tracking-wide text-gray-700">
          Popular localities in and around{" "}
          <span className=" font-medium text-gray-900">Kollam</span>
        </h1>
      </div>

      <div className=" grid sm:grid-cols-3 gap-3 ">
        <div className="border-[1px]  rounded-lg py-3 px-3 shadow-sm hover:shadow-md relative">
          {rightArrow}
          <h2 className=" text-[1em] md:text-xl tracking-wide pb-1">
            Kollam Locality
          </h2>
          <p className="md:text-lg text-gray-600">350 places</p>
        </div>
        <div className="border-[1px]  rounded-lg py-3 px-3 shadow-sm  hover:shadow-md relative">
          {rightArrow}
          <h2 className=" text-[1em] md:text-xl tracking-wide pb-1">
            Varkala Locality
          </h2>
          <p className="md:text-lg text-gray-600">37 places</p>
        </div>
        <div className="border-[1px]  rounded-lg py-3 px-3 shadow-sm  hover:shadow-md relative">
          {rightArrow}
          <h2 className=" text-[1em] md:text-xl tracking-wide pb-1">
            Chathannoor Locality
          </h2>
          <p className="md:text-lg text-gray-600">7 places</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
