import PropTypes from "prop-types";
import Input_icon from "./Input_icon.jsx";
import { INPUT_SIZE_TYPES } from "../input_helpers/inputSizeTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
  normalizeTextAlign,
  textAlignClassSuffix,
} from "../input_helpers/inputLabelLayout.js";
import "../../_styles/inputs/input_label.css";

const Input_label = ({
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
    baseStyle && "input_label_cnt",
    baseStyle && `input_label_cnt--${sizeType}`,
    baseStyle && `input_label_cnt--${resolvedPosition}`,
    baseStyle &&
      resolvedPosition === "inline" &&
      `input_label_cnt--inline${inlinePosition}`,
    baseStyle &&
      `input_label_cnt--text${textAlignClassSuffix(resolvedTextPosition)}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedLabelClass = [
    "input_label",
    `input_label--${sizeType}`,
    `input_label--text${textAlignClassSuffix(resolvedTextPosition)}`,
    onClick && "input_label--clickable",
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
        {iconPosition === "left" && <Input_icon {...labelIconProps} />}
        <span className="input_label__text">
          {message}
          {required ? (
            <span className="input_label__required" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </span>
        {iconPosition === "right" && <Input_icon {...labelIconProps} />}
      </label>
    </div>
  );
};

Input_label.propTypes = {
  isActive: PropTypes.bool,
  message: PropTypes.node,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  position: PropTypes.oneOf([...LABEL_POSITIONS, "down"]),
  inlinePosition: PropTypes.oneOf(LABEL_INLINE_POSITIONS),
  textPosition: PropTypes.oneOf(LABEL_TEXT_POSITIONS),
  iconProps: PropTypes.shape({
    isActive: PropTypes.bool,
    position: PropTypes.oneOf(["left", "right"]),
    type: PropTypes.oneOf(["lucide", "svg"]),
    lucidIcon: PropTypes.string,
    svg_src: PropTypes.string,
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
    baseStyle: PropTypes.bool,
    sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  }),
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
};

Input_label.displayName = "Input_label";

export default Input_label;
