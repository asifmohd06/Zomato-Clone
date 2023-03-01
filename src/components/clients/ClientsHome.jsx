import React, { useEffect, useState } from "react";
import HeaderBasic from "../HeaderBasic";
import axios from "axios";
import { useSelector } from "react-redux";
import NotFound from "../NotFound";
import Loading from "../Loading";
import Carousel from "./Carousel";

const ClientsHome = () => {
  const baseUrl = "http://localhost:5000";
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [message, setMessage] = useState("");
  const localToken = window.localStorage.getItem("clientToken");

  const getData = async () => {
    setLoading(true);
    if (localToken) {
      const config = { headers: { Authorization: `Bearer ${localToken}` } };
      await axios
        .post(`${baseUrl}/api/clients/restaurants`, {}, config)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
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
  return (
    <div>
      <HeaderBasic />
      {loading ? (
        <Loading />
      ) : (
        <>
          {!restaurant && <NotFound />}
          {restaurant && (
            <div className="max-w-[1100px] mx-auto text-left py-4 my-4 ">
              <p className=" text-[5rem]  font-semibold tracking-wide text-gray-700 border-b-2 border-gray-300">
                {restaurant.name}
              </p>
              <div className="w-full h-[20rem] my-4 rounded-md overflow-hidden">
                <Carousel images={restaurant.images} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientsHome;
//  {
//    restaurant.images.map((image) => {
//      return (
//        <img
//          className=" h-[100%] w-[100%] object-cover object-center"
//          src={image.url}
//          alt=""
//        />
//      );
//    });
//  }
