import React, { useEffect, useState } from "react";
import HeaderBasic from "../HeaderBasic";
import axios from "axios";
import { useSelector } from "react-redux";
import NotFound from "../NotFound";
import Loading from "../Loading";
import Carousel from "./Carousel";
import { Drinks, Maincourse, Rice, Starter, Pizza } from "../../images/menu";
import { Link } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";
// import Rice from "../../images/menu/rice.svg";

const ClientsHome = () => {
  const [clickedCategory, setClickedCategory] = useState("Rice");
  const baseUrl = "http://localhost:5000";
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false); // for editmenu popup
  const [isConfirmationPopup, setIsConfirmationPopup] = useState(false); // for delete confirmation popup
  const [targetMenuId, setTargetMenuId] = useState(""); // for popup of editmenu  on target
  const [targetMenu, setTargetMenu] = useState(""); // for name attribute on confirmation msg
  const localToken = window.localStorage.getItem("clientToken");

  const getData = async () => {
    setLoading(true);
    if (localToken) {
      const config = { headers: { Authorization: `Bearer ${localToken}` } };
      await axios
        .post(`${baseUrl}/api/clients/restaurants`, {}, config)
        .then((res) => {
          if (res.data.success) {
            setRestaurant(res.data.restaurant);
          } else {
            setMessage("Add a Restaurant");
          }
        })
        .catch((err) => console.log(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const changeItemOnClick = (category) => {
    setClickedCategory(category);
  };
  const changeEditbutton = (value, id) => {
    setTargetMenuId(id);
    setIsEditButtonClicked(!value);
  };
  const confirmationPopup = (value, menu = null) => {
    setIsEditButtonClicked(false);
    setTargetMenu(menu);
    setIsConfirmationPopup(!value);
  };

  const deleteItem = async (id) => {
    if (localToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${localToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const data = { id: restaurant._id, menuId: id };
      await axios
        .patch(`${baseUrl}/api/clients/restaurants/deletemenu`, data, config)
        .then((res) => {
          if (res.data.success) {
            setMessage(res.data.message);
            setIsConfirmationPopup(false);
          } else {
            setMessage(res.data.message);
            setIsConfirmationPopup(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const currentCategoryMenu = restaurant?.menu?.filter(
    (item) => item.category === clickedCategory
  );
  const totalCategories = [
    ...new Set(restaurant?.menu?.map((item) => item.category)),
  ];
  const categoryImages = {
    drinks: Drinks,
    maincourse: Maincourse,
    rice: Rice,
    starter: Starter,
    pizza: Pizza,
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!restaurant && <NotFound />}
          {restaurant && (
            <>
              <HeaderBasic />
              <div className="bg-[#ebf9fa88] relative">
                <div className="max-w-[1100px] mx-5 lg:mx-auto text-left py-4 my-4">
                  {isConfirmationPopup && (
                    <div className="fixed flex justify-center items-center z-10 top-0 bottom-0 my-auto left-0 right-0 mx-auto  bg-[#0000005a] ">
                      <div className="flex  flex-col place-content-between w-[20rem] h-[15rem] mobile:w-[30rem] mobile:h-[15rem] p-4 text-center bg-white shadow-lg border-2 border-[#ff0000d4] rounded-lg">
                        <div className="py-4">
                          <p className=" tracking-wide text-base mobile:text-xl font-semibold pb-5">
                            Are you sure you want to delete this item ?
                          </p>
                          <p className=" text-sm mobile:text-lg tracking-wide ">
                            {`'${targetMenu.menuName}'`}
                          </p>
                        </div>

                        <div className=" flex gap-4 justify-center py-4">
                          <button
                            className="px-4 py-2 bg-[#ff0000d4] text-white rounded-md"
                            onClick={() => deleteItem(targetMenu._id)}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              confirmationPopup(isConfirmationPopup);
                            }}
                            className="px-4 py-2 bg-white border-2 border-[#ff0000d4] rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {message && (
                    <div className=" fixed z-[2] shadow-lg flex justify-center items-center left-0 right-0 mx-auto top-20 w-fit min-h-[3rem] p-3 bg-white rounded-md border-2 border-[#ff0000]">
                      <p>{message}</p>
                    </div>
                  )}
                  <p className=" text-[5rem]  font-semibold tracking-wide text-gray-700 border-b-2 border-gray-300">
                    {restaurant.name}
                  </p>
                  <Carousel images={restaurant.images} />
                  <div className=" mt-4">
                    <p className="text-center text-3xl font-semibold text-gray-700 after:block after:mx-auto after:mt-2 after:h-[0.1rem] after:w-[10rem] after:bg-gray-700">
                      MENU
                    </p>
                    <div className=" mx-auto my-5">
                      {/* category navbar */}
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
                                src={
                                  categoryImages[
                                    category.toLowerCase().split(" ").join("")
                                  ]
                                }
                                alt="category"
                              />
                              <p
                                className={`  text-center font-semibold after:${
                                  clickedCategory === `${category}`
                                    ? "block"
                                    : "hidden"
                                } after:mx-auto after:mt-2 after:h-[0.1rem] after:w-[100%] after:bg-red-400 `}
                              >
                                {category}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* menu items */}
                      <div className="grid xsmall:grid-cols-2 mobile:grid-cols-1  my-12 gap-y-8">
                        {currentCategoryMenu?.map((menu, index) => {
                          return (
                            <div
                              key={index}
                              tabIndex={6}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                }
                              }}
                              className="relative grid gap-2  mobile:gap-0 mobile:grid-cols-7 w-[10rem] mobile:w-[85%] h-fit mobile:h-[5rem] border-[1px] border-gray-300 rounded-md mobile:rounded-full   mx-auto  text-center  bg-white   text-gray-700  hover:scale-[1.01]  hover:z-[3]  duration-300 shadow-md pb-2 mobile:pb-0"
                            >
                              <div className="h-[8rem] mobile:h-[100%] mobile:w-[5rem] border-2 border-gray-400 my-auto rounded-md mobile:rounded-full overflow-hidden object-center ">
                                <img
                                  src={
                                    menu.images.length > 0
                                      ? menu.images[0].url
                                      : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                                  }
                                  className=" h-[100%] w-[100%] object-cover bg-white "
                                  alt=""
                                />
                              </div>

                              <p className=" text-sm md:text-lg mobile:ml-0  mobile:col-span-2  font-medium my-auto">
                                {menu.menuName}
                              </p>
                              <p className=" text-sm md:text-lg  font-medium my-auto">
                                &#8377;&nbsp;{menu.basePrice}
                              </p>

                              <p className=" text-sm md:text-lg  font-medium my-auto">
                                Edit
                              </p>
                              <div className=" relative text-center max-w-[1.5rem] flex align-middle">
                                <MdMoreVert
                                  style={{ fontSize: "30px" }}
                                  className="  my-auto"
                                  onClick={() =>
                                    changeEditbutton(
                                      isEditButtonClicked,
                                      menu._id
                                    )
                                  }
                                />
                                {isEditButtonClicked &&
                                  targetMenuId === menu._id && (
                                    <div className=" absolute flex flex-wrap flex-col top-[50%] left-8 z-[4] w-20 h-fit px-2 py-3 bg-white rounded-md border-2 shadow-lg items-start gap-2">
                                      {/* text-sm md:text-lg font-medium my-auto */}
                                      <p className="  hover:cursor-pointer">
                                        <a
                                          href={`/clients/restaurants/${restaurant._id}/menu/${menu._id}/edit`}
                                        >
                                          Edit
                                        </a>
                                      </p>
                                      <p
                                        onClick={() =>
                                          confirmationPopup(
                                            isConfirmationPopup,
                                            menu
                                          )
                                        }
                                        className=" hover:cursor-pointer"
                                      >
                                        Delete
                                      </p>
                                    </div>
                                  )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClientsHome;
