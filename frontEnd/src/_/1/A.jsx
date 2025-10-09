import React from "react";
import { Heart, Star } from "lucide-react";

import "./A.css";

const A = () => {
  return (
    <label className="checkboxLabel" htmlFor="checkbox">
      <input id="checkbox" name="checkbox" type="checkbox" />
      <span id="bar1" className="bar"></span>
      <span id="bar2" className="bar"></span>
      <span id="bar3" className="bar"></span>
      <span id="bar4" className="bar"></span>
      <span id="bar5" className="bar"></span>
      <span id="bar6" className="bar"></span>
      <span id="bar7" className="bar"></span>
      <span id="bar8" className="bar"></span>
      <span id="nut1" className="nut"></span>
      <span id="nut2" className="nut"></span>
      <span id="nut3" className="nut"></span>
      <span id="nut4" className="nut"></span>
      <span id="nut5" className="nut"></span>
      <span id="nut6" className="nut"></span>
      <span id="nut7" className="nut"></span>
      <span id="nut8" className="nut"></span>
      <span className="cover"></span>
      <span className="cover2">
        <div className="inCover2">
          <div className="rainbow">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </span>
      <Heart className="lock"/>
      {/* <svg
        className="lock"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#2A3439"
            d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"></path>
        </g>
      </svg> */}
    </label>
  );
};

export default A;
