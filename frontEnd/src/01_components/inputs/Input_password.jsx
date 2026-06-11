import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
  Input_pswStrenght,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import "../_styles/inputs/input_password.css";

const Input_password = ({}) => {
  return <input type="text" className="input_password" />;
};

Input_password.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input_password.displayName = "Input_password";

export default Input_password;
