import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import "../_styles/inputs/input_url.css";

const Input_url = ({}) => {
  return <input type="text" className="input_url" />;
};

Input_url.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input_url.displayName = "Input_url";

export default Input_url;
