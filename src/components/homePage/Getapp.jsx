import React, { useState } from "react";
import phone from "../../images/getapp.avif";
import playstore from "../../images/playstore.webp";
import appstore from "../../images/appstore.webp";

// #FFFBF7
const Getapp = () => {
  const [contact, setContact] = useState(true);
  return (
    <section className="py-24  bg-[#FFFBF7] text-center md:text-left">
      <div className="max-w-[960px] grid sm:grid-cols-3 mx-4 md:mx-auto">
        <div className="hidden sm:flex">
          <img src={phone} alt="" className=" object-contain" />
        </div>
        <div className=" col-span-2 ">
          <h1 className="text-3xl md:text-[3em] font-semibold tracking-wide pb-3">
            Get the Zomato app
          </h1>
          <p className="tracking-wide text-gray-700 pb-3">
            We will send you a link, open it on your phone to download the app
          </p>
          <form action="" className="pb-3">
            <div className="pb-3">
              <input
                type="radio"
                name="contact"
                id="email"
                onClick={() => setContact(true)}
              />{" "}
              <label htmlFor="email" className="tracking-wide font-light">
                Email
              </label>{" "}
              <input
                type="radio"
                name="contact"
                id="phone"
                onClick={() => setContact(false)}
              />{" "}
              <label htmlFor="phone" className="tracking-wide font-light">
                Phone
              </label>
            </div>
            {!contact ? (
              <div className="rounded-sm">
                <input
                  type="option"
                  className="w-12 outline-none h-12 border rounded-r-[0] border-r-0 rounded-lg pl-3"
                  placeholder="+91"
                />
                <input
                  type="text"
                  className="outline-none h-12 p-3  border rounded-l-[0] rounded-lg px-3 border-l-0"
                  placeholder="type here..."
                />
                <button className="bg-[#E04546] mt-3 px-8 py-3 rounded-md ml-3 text-[#FFFBF7] hover:bg-[#E03546]">
                  Share App Link
                </button>
              </div>
            ) : (
              <div className="rounded-sm">
                <input
                  type="option"
                  className="w-[17.1em] outline-none h-12 border rounded-lg px-3"
                  placeholder="Enter your email"
                />
                <button className="bg-[#E04546] mt-3 px-8 py-3 rounded-md ml-3 text-[#FFFBF7] hover:bg-[#E03546]">
                  Share App Link
                </button>
              </div>
            )}
          </form>
          <h2 className="text-gray-500 pb-3">Download app from</h2>
          <div className="flex gap-2 justify-center md:justify-start">
            <a href="https://www.playstore.com" className="w-[10em]">
              <img src={playstore} alt="" className="" />
            </a>
            <a href="https://www.playstore.com" className="w-[10em]">
              <img src={appstore} alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Getapp;
