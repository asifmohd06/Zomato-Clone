import React, { useState } from "react";
import footerLogo from "../images/footerlogo.avif";
import { Countrydropdown } from "../icons";
import countries from "../images/countries";
import Countriesmenu from "./Countriesmenu";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [country, setCountry] = useState(5);
  return (
    <section className="bg-[#F8F8F8] py-[3em]">
      <div className="max-w-[1100px] mx-4 lg:mx-auto ">
        <div className="flex justify-between">
          <img src={footerLogo} alt="" className="scale-[0.65] ml-[-2em] " />
          <div className="flex gap-2">
            <div
              className="min-w-[8em] min-h-11  border-2 rounded-md grid grid-cols-2 justify-center  py-2 px-2  pr-6 relative hover:cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen && (
                <Countriesmenu countries={countries} setCountry={setCountry} />
              )}
              <div className="w-[46.92px] h-[30px]   relative  scale-[0.6]">
                <img
                  src={countries[country].img}
                  alt=""
                  className="absolute max-w-[1173px] h-[30px] "
                />
              </div>

              <div className=" pl-0">
                <p>{countries[country].name}</p>
              </div>
              <Countrydropdown />
            </div>
            <div className="w-[7em] min-h-11 border-2 rounded-md"></div>
          </div>
        </div>
        <FooterLinks />
        <p className="py-2 text-[0.85em] font-light tracking-wide text-gray-500">
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks are
          properties of their respective owners. 2008-2022 © Zomato™ Ltd. All
          rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
