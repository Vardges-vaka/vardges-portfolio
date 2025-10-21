import React from "react";
import PropTypes from "prop-types";
import "../_styles/selectGlobal.css";

const SelectGlobal = () => {
  return (
    <div>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </div>
  );
};
SelectGlobal.propTypes = {};

SelectGlobal.displayName = "SelectGlobal";
export default SelectGlobal;
