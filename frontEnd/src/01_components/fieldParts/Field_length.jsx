import PropTypes from "prop-types";
import { FIELD_SIZE_TYPES } from "./field_helpers/fieldSizeTypes.js";
import {
  HINT_TEXT_POSITIONS,
  normalizeTextAlign,
  textAlignClassSuffix,
} from "./field_helpers/fieldLabelLayout.js";
import "../_styles/fieldParts/field_length.css";

const Field_length = ({
  isActive = false,
  current = 0,
  max,
  id,
  className,
  baseStyle = false,
  sizeType = "md",
  placement = "footer",
  textPosition = "right",
}) => {
  if (!isActive || max == null) return null;

  const resolvedTextPosition = normalizeTextAlign(textPosition);
  const atLimit = current >= max;
  const nearLimit = !atLimit && current >= Math.floor(max * 0.9);
  const resolvedPlacement = placement === "inline" ? "inline" : "footer";

  const resolvedClassName = [
    baseStyle && "field_length",
    baseStyle && `field_length--${sizeType}`,
    baseStyle && `field_length--${resolvedPlacement}`,
    baseStyle &&
      resolvedPlacement === "footer" &&
      `field_length--text${textAlignClassSuffix(resolvedTextPosition)}`,
    atLimit && "field_length--atLimit",
    nearLimit && "field_length--nearLimit",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      id={id}
      className={resolvedClassName}
      aria-live="polite"
      aria-atomic="true">
      {current}/{max}
    </span>
  );
};

Field_length.propTypes = {
  isActive: PropTypes.bool,
  current: PropTypes.number,
  max: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(FIELD_SIZE_TYPES),
  placement: PropTypes.oneOf(["footer", "inline"]),
  textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
};

Field_length.displayName = "Field_length";

export default Field_length;
