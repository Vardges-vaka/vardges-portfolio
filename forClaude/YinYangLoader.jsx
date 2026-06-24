import React from "react";
import "../_styles/yinYangLoader.css";

const YinYangLoader = () => {
  return (
    <div className="YinYangLoader_container">
      <div className="YinYangLoader">
        <div className="YinYangLoader_dot white"></div>
        <div className="YinYangLoader_dot black"></div>
      </div>
    </div>
  );
};

export default YinYangLoader;
