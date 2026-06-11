import PropTypes from "prop-types";
import { INPUT_SIZE_TYPES } from "../input_helpers/inputSizeTypes.js";
import {
  HINT_TEXT_POSITIONS,
  normalizeTextAlign,
  textAlignClassSuffix,
} from "../input_helpers/inputLabelLayout.js";
import "../../_styles/inputs/input_hints.css";

const Input_hints = ({
  isActive = false,
  type = "hint",
  message,
  id,
  className,
  baseStyle = false,
  sizeType = "md",
  textPosition = "left",
}) => {
  if (!isActive || message == null || message === "") return null;

  const resolvedTextPosition = normalizeTextAlign(textPosition);

  const resolvedClassName = [
    baseStyle && "input_hints",
    baseStyle && `input_hints--${type}`,
    baseStyle && `input_hints--${sizeType}`,
    baseStyle && `input_hints--text${textAlignClassSuffix(resolvedTextPosition)}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <p
      id={id}
      className={resolvedClassName}
      role={type === "error" ? "alert" : undefined}>
      {message}
    </p>
  );
};

Input_hints.propTypes = {
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(["hint", "error", "success"]),
  message: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
};

Input_hints.displayName = "Input_hints";

export default Input_hints;
