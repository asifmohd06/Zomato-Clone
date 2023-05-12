import Loading from "../Loading";
import Carousel from "./Carousel";
import NotFound from "../NotFound";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderBasic from "../HeaderBasic";
import PopupMessage from "../PopupMessage";
import CategoryNavbar from "./CategoryNavbar";
import ConfirmationModal from "./ConfirmationModal";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Drinks, Maincourse, Rice, Starter, Pizza } from "../../images/menu";

import { MdMoreVert } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import ladder from "../../images/ladder.png";
import api from "../utils/axiosInstance";
// import Rice from "../../images/menu/rice.svg";

const ClientsHome = () => {
  const [clickedCategory, setClickedCategory] = useState("Rice");
  // const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [message, setMessage] = useState({ success: "", message: "" });
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false); // for editmenu popup
  const [isConfirmationPopup, setIsConfirmationPopup] = useState(false); // for delete confirmation popup
  const [targetMenuId, setTargetMenuId] = useState(""); // for popup of editmenu  on target
  const [targetMenu, setTargetMenu] = useState(""); // for name attribute on confirmation msg
  const localToken = window.localStorage.getItem("clientToken");

  const navigate = useNavigate();

  const config = localToken
    ? { headers: { Authorization: `Bearer ${localToken}` } }
    : {};
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };
  const onSuccess = (data) => {
    setRestaurant(data?.data?.restaurant);
  };
  const onError = (error) => {
    console.log(error);
  };

  const getData = () => {
    return api.post(`/clients/restaurants`, {}, config);
  };
  const { isFetching } = useQuery("data-fetch", getData, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });

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
  const handleClickOutside = () => {
    setIsEditButtonClicked(false);
  };
  const ref = useOutsideClick(handleClickOutside);
  const handleClick = (event) => {
    event.stopPropagation();
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
      await api
        .patch(`/clients/restaurants/deletemenu`, data, config)
        .then((res) => {
          if (res.data.success) {
            setMessage({ success: true, message: res.data.message });
            setIsConfirmationPopup(false);
            setRestaurant(res.data.targetRes);
          } else {
            setMessage({ success: false, message: res.data.message });
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

  if (isFetching) {
    return <Loading />;
  }
  if (!isFetching && !restaurant) {
    return (
      <div>
        <HeaderBasic />
        <div className=" w-fit mx-auto my-[12%] font-[700] text-center text-[3rem] text-gray-500">
          <p className="">Looks lonely here</p>
          <p>
            Lets create a new &nbsp;
            <span className="text-gray-700">
              <Link to={"/addrestaurant"}>Restaurant &rarr;</Link>
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <>
        <HeaderBasic />
        <div className="bg-[#ebf9fa88] relative" onClick={handleClick}>
          <div className="max-w-[1100px] mx-5 lg:mx-auto text-left py-4 my-4">
            {isConfirmationPopup && (
              <ConfirmationModal
                props={{
                  targetMenu,
                  deleteItem,
                  confirmationPopup,
                  isConfirmationPopup,
                }}
              />
            )}
            {message.message && <PopupMessage message={message} />}
            <div className="flex justify-between border-b-2 border-gray-300">
              <p className=" text-[5rem]  font-semibold tracking-wide text-gray-700 ">
                {capitalize(restaurant.name)}
              </p>
              <div className=" flex justify-center items-end pb-4">
                <HiOutlinePencilSquare
                  size={"25px"}
                  className=" hover:cursor-pointer"
                  onClick={() => navigate(`/editrestaurant/${restaurant._id}`)}
                />
              </div>
            </div>

            <Carousel images={restaurant.images} />
            <div className=" mt-4">
              <p className="text-center text-3xl font-semibold text-gray-700 after:block after:mx-auto after:mt-2 after:h-[0.1rem] after:w-[10rem] after:bg-gray-700">
                MENU
              </p>

              <div className=" mx-auto my-5">
                {/* category navbar */}
                <CategoryNavbar
                  props={{
                    totalCategories,
                    categoryImages,
                    clickedCategory,
                    changeItemOnClick,
                  }}
                />

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
                              changeEditbutton(isEditButtonClicked, menu._id)
                            }
                          />
                          {/* more options */}
                          {isEditButtonClicked && targetMenuId === menu._id && (
                            <div
                              className=" absolute flex flex-wrap flex-col top-[50%] left-8 z-[4] w-20 h-fit px-2 py-3 bg-white rounded-md border-2 shadow-lg items-start gap-2"
                              ref={ref}
                            >
                              <p className="  hover:cursor-pointer">
                                <Link
                                  to={`/clients/restaurants/${restaurant._id}/menu/${menu._id}/edit`}
                                >
                                  Edit
                                </Link>
                              </p>
                              <p
                                onClick={() =>
                                  confirmationPopup(isConfirmationPopup, menu)
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
                {!totalCategories.length && (
                  <div className="">
                    <img
                      className=" w-[8rem] mx-auto"
                      src={ladder}
                      alt="empty"
                    />
                    <p className=" text-center text-3xl font-semibold text-gray-600 mt-4">
                      {" "}
                      <Link to={"/createmenu"}>Add a Cuisine</Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ClientsHome;
