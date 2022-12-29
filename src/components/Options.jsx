import React from "react";
import { cuisines, restaurants, cities } from "../data";
import CitiesDropdown from "./CitiesDropdown";
import ExploreDropdown from "./ExploreDropdown";

const Options = () => {
  return (
    <div className=" py-20 mx-4 max-w-[1100px] lg:mx-auto tracking-wide ">
      <h1 className="text-4xl pb-6">Explore options near me</h1>
      <div className="flex flex-col gap-9">
        <ExploreDropdown data={cuisines} />
        <ExploreDropdown data={restaurants} />
        <CitiesDropdown data={cities} />
      </div>
    </div>
  );
};

export default Options;
