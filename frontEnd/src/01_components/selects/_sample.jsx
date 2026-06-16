import { forwardRef, useId, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {} from "./select_helpers/_select_helpers.index.js";
import GenericSelect from "./GenericSelect.jsx";
import "../_styles/selects/select_xxxx.css";

const Select_xxxx = forwardRef(function Select_x(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},
    lengthProps = {},
  },
  ref,
) {
  return <div className="select_xxxx">Select_x</div>;
});

Select_xxxx.propTypes = {
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.object,
  lengthProps: PropTypes.object,
};

Select_xxxx.displayName = "Select_xxxx";

export default Select_xxxx;
