import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import "../_styles/inputs/input_email.css";

const Input_email = ({  }) => {
  return <input type="text" className="input_email" />;
};

Input_email.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,

};

Input_email.displayName = "Input_email";

export default Input_email;
