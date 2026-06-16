import PropTypes from "prop-types";
import Field_icon from "./Field_icon.jsx";
import { FIELD_SIZE_TYPES } from "./field_helpers/fieldSizeTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
  normalizeTextAlign,
  textAlignClassSuffix,
} from "./field_helpers/fieldLabelLayout.js";
import "../_styles/fieldParts/field_label.css";

const Field_label = ({
  isActive = false,
  message,
  htmlFor,
  required = false,
  className,
  baseStyle = false,
  iconProps = {},
  onHover,
  onClick,
  title,
  sizeType = "md",
  position = "top",
  inlinePosition = "before",
  textPosition = "left",
}) => {
  if (!isActive || !message) return null;

  const resolvedPosition = normalizeLabelPosition(position);
  const resolvedTextPosition = normalizeTextAlign(textPosition);

  const resolvedCntClass = [
    baseStyle && "field_label_cnt",
    baseStyle && `field_label_cnt--${sizeType}`,
    baseStyle && `field_label_cnt--${resolvedPosition}`,
    baseStyle &&
      resolvedPosition === "inline" &&
      `field_label_cnt--inline${inlinePosition}`,
    baseStyle &&
      `field_label_cnt--text${textAlignClassSuffix(resolvedTextPosition)}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedLabelClass = [
    "field_label",
    `field_label--${sizeType}`,
    `field_label--text${textAlignClassSuffix(resolvedTextPosition)}`,
    onClick && "field_label--clickable",
  ]
    .filter(Boolean)
    .join(" ");

  const labelIconProps = {
    baseStyle: true,
    sizeType,
    ...iconProps,
    inLabel: true,
  };

  const iconPosition = iconProps.position ?? "left";

  return (
    <div className={resolvedCntClass}>
      <label
        className={resolvedLabelClass}
        htmlFor={htmlFor}
        title={title}
        onClick={onClick}
        onMouseEnter={onHover}>
        {iconPosition === "left" && <Field_icon {...labelIconProps} />}
        <span className="field_label__text">
          {message}
          {required ? (
            <span className="field_label__required" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </span>
        {iconPosition === "right" && <Field_icon {...labelIconProps} />}
      </label>
    </div>
  );
};

Field_label.propTypes = {
  isActive: PropTypes.bool,
  message: PropTypes.node,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  position: PropTypes.oneOf([...LABEL_POSITIONS, "down"]),
  inlinePosition: PropTypes.oneOf(LABEL_INLINE_POSITIONS),
  textPosition: PropTypes.oneOf(LABEL_TEXT_POSITIONS),
  iconProps: PropTypes.object,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  sizeType: PropTypes.oneOf(FIELD_SIZE_TYPES),
};

Field_label.displayName = "Field_label";

export default Field_label;
