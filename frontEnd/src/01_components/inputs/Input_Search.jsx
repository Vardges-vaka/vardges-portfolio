import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import "../_styles/inputs/input_search.css";

const Input_search = ({}) => {
  return <input type="text" className="input_search" />;
};

Input_search.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input_search.displayName = "Input_search";

export default Input_search;
