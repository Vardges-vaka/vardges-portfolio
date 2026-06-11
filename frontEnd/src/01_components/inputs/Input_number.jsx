import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import "../_styles/inputs/input_number.css";

const Input_number = ({}) => {
  return <input type="text" className="input_number" />;
};

Input_number.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input_number.displayName = "Input_number";

export default Input_number;
