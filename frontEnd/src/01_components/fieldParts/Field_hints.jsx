import PropTypes from "prop-types";
import { FIELD_SIZE_TYPES } from "./field_helpers/fieldSizeTypes.js";
import {
  HINT_TEXT_POSITIONS,
  normalizeTextAlign,
  textAlignClassSuffix,
} from "./field_helpers/fieldLabelLayout.js";
import "../_styles/fieldParts/field_hints.css";

const Field_hints = ({
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
    baseStyle && "field_hints",
    baseStyle && `field_hints--${type}`,
    baseStyle && `field_hints--${sizeType}`,
    baseStyle &&
      `field_hints--text${textAlignClassSuffix(resolvedTextPosition)}`,
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

Field_hints.propTypes = {
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(["hint", "error", "success"]),
  message: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(FIELD_SIZE_TYPES),
  textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
};

Field_hints.displayName = "Field_hints";

export default Field_hints;
