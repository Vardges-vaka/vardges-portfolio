import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import "../_styles/inputs/input_date.css";

const Input_date = ({}) => {
  return <input type="text" className="input_date" />;
};

Input_date.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input_date.displayName = "Input_date";

export default Input_date;
