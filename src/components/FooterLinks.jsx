import React from "react";
import { linkedin, twitter, insta, youtube, facebook } from "../icons";
import playstore from "../images/playstore.webp";
import appstore from "../images/appstore.webp";

const FooterLinks = () => {
  return (
    <div className="  grid grid-cols-2 sm:grid-cols-5 gap-3 py-6 border-b-2 border-slate-300">
      <div>
        <h2 className="text-xl font-medium tracking-wider">About Zomato</h2>
        <ul className="text-gray-700 font-light tracking-wide">
          <li>Who We Are</li>
          <li>Blog</li>
          <li>Work With Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-medium tracking-wider">Zomaverse</h2>

        <ul className="text-gray-700 font-light tracking-wide">
          <li>Zomato</li>
          <li>Blinkit</li>
          <li>Feeding India</li>
          <li>Zomaland</li>
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-medium tracking-wider">
            For Restaurants
          </h2>

          <ul className="text-gray-700 font-light tracking-wide">
            <li>Partner With Us</li>
            <li>Apps For You</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-medium tracking-wider">
            For Enterprises
          </h2>
          <ul className="text-gray-700 font-light tracking-wide">
            <li>Zomato For Work</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium tracking-wider">Learn More</h2>

        <ul className="text-gray-700 font-light tracking-wide">
          <li>Privacy</li>
          <li>Security</li>
          <li>Terms</li>
          <li>Sitemap</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-medium tracking-wider">Social Links</h2>

        <ul className="text-gray-700 font-light tracking-wide flex gap-2 py-2">
          <li>{linkedin}</li>
          <li>{insta}</li>
          <li>{twitter}</li>
          <li>{youtube}</li>
          <li>{facebook}</li>
        </ul>
        <div className="w-[68%] flex flex-col gap-2">
          <img src={appstore} alt="" />
          <img src={playstore} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
