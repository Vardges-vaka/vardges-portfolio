import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import "../_styles/inputs/input_tel.css";

const Input_tel = ({  }) => {
  return <input type="text" className="input_tel" />;
};

Input_tel.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input_tel.displayName = "Input_tel";

export default Input_tel;
