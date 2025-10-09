import React from "react";
import "./G.css";

const G = () => {
  return (
    <label className="cosmic-toggle">
      <input className="toggle" type="checkbox" />
      <div className="slider">
        <div className="cosmos"></div>
        <div className="energy-line"></div>
        <div className="energy-line"></div>
        <div className="energy-line"></div>
        <div className="toggle-orb">
          <div className="inner-orb"></div>
          <div className="ring"></div>
        </div>
        <div className="particles">
          <div style={{ "--angle": "30deg" }} className="particle"></div>
          <div style={{ "--angle": "60deg" }} className="particle"></div>
          <div style={{ "--angle": "90deg" }} className="particle"></div>
          <div style={{ "--angle": "120deg" }} className="particle"></div>
          <div style={{ "--angle": "150deg" }} className="particle"></div>
          <div style={{ "--angle": "180deg" }} className="particle"></div>
        </div>
      </div>
    </label>
  );
};

export default G;
