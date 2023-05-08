import React from "react";

const CategoryNavbar = ({ props }) => {
  const {
    changeItemOnClick,
    totalCategories,
    categoryImages,
    clickedCategory,
  } = props;
  return (
    <div className="flex flex-wrap  px-4  justify-center md:gap-2  py-6  mx-auto bg-white shadow-md rounded-md">
      {totalCategories.map((category, index) => {
        return (
          <div
            className={` px-4 py-4 hover:cursor-pointer`}
            key={index}
            onClick={() => changeItemOnClick(category)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                changeItemOnClick(category);
              }
            }}
            tabIndex={5}
          >
            <img
              className="h-[2rem] md:h-[4rem] mx-auto"
              src={categoryImages[category.toLowerCase().split(" ").join("")]}
              alt="category"
            />
            <p
              className={`  text-center font-semibold after:${
                clickedCategory === `${category}` ? "block" : "hidden"
              } after:mx-auto after:mt-2 after:h-[0.1rem] after:w-[100%] after:bg-red-400 `}
            >
              {category}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryNavbar;
