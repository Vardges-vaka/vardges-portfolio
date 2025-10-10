import React from "react";
import { Heart, Star } from "lucide-react";

import "./A.css";

const A = () => {
  return (
    <div className="toggle-container">
      <input className="toggle-input" type="checkbox" />
      <div className="toggle-handle-wrapper">
        <div className="toggle-handle">
          <div className="toggle-handle-knob"></div>
          <div className="toggle-handle-bar-wrapper">
            <div className="toggle-handle-bar"></div>
          </div>
        </div>
      </div>
      <div className="toggle-base">
        {/* <div className="toggle-base-inside"></div> */}
      </div>
    </div>
  );
};

export default A;
