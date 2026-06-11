import { forwardRef, useId } from "react";
import PropTypes from "prop-types";
import {
  Input_label,
  Input_icon,
  Input_hints,
} from "./input_childComps/_input_childComps.index.js";
import GenericInput from "./GenericInput.jsx";
import { INPUT_SIZE_TYPES } from "./input_helpers/inputSizeTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "./input_helpers/inputLabelLayout.js";
import "../_styles/inputs/input_text.css";

const Input_text = forwardRef(function Input_text(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},

    className,
    baseStyle = true,
    sizeType = "md",

    id: idProp,
    disabled,
    required,
    ...inputProps
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const rootClass = [
    baseStyle && "input_text",
    baseStyle && `input_text--${sizeType}`,
    isInlineLabel && "input_text--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "input_text__fieldWrap",
    leftIconProps.isActive && "input_text__fieldWrap--withLeftIcon",
    rightIconProps.isActive && "input_text__fieldWrap--withRightIcon",
    disabled && "input_text__fieldWrap--disabled",
    hintsProps.isActive &&
      hintsProps.type === "error" &&
      "input_text__fieldWrap--error",
    hintsProps.isActive &&
      hintsProps.type === "success" &&
      "input_text__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "input_text__inlineRow",
    `input_text__inlineRow--label${inlinePosition}`,
  ].join(" ");

  const sharedSize = { sizeType };

  const labelElement = isLabelActive ? (
    <Input_label
      baseStyle
      {...sharedSize}
      {...labelProps}
      htmlFor={labelProps.htmlFor ?? id}
      required={required ?? labelProps.required}
      position={labelPosition}
      inlinePosition={inlinePosition}
      textPosition={labelProps.textPosition ?? "left"}
    />
  ) : null;

  const fieldRow = (
    <div className={fieldWrapClass}>
      <Input_icon baseStyle {...sharedSize} {...leftIconProps} />

      <GenericInput
        ref={ref}
        type="text"
        baseStyle
        id={id}
        className="input_text__input"
        disabled={disabled}
        required={required}
        aria-invalid={
          hintsProps.isActive && hintsProps.type === "error" ? true : undefined
        }
        aria-describedby={hintsProps.isActive ? hintId : undefined}
        {...inputProps}
      />

      <Input_icon baseStyle {...sharedSize} {...rightIconProps} />
    </div>
  );

  const hintsElement = (
    <Input_hints
      baseStyle
      id={hintId}
      {...sharedSize}
      {...hintsProps}
      textPosition={hintsProps.textPosition ?? "left"}
    />
  );

  if (isInlineLabel) {
    return (
      <div className={rootClass}>
        <div className={inlineRowClass}>
          {inlinePosition === "before" ? labelElement : null}
          {fieldRow}
          {inlinePosition === "after" ? labelElement : null}
        </div>
        {hintsElement}
      </div>
    );
  }

  return (
    <div className={rootClass}>
      {labelPosition === "top" ? labelElement : null}
      {fieldRow}
      {labelPosition === "bottom" ? labelElement : null}
      {hintsElement}
    </div>
  );
});

Input_text.propTypes = {
  labelProps: PropTypes.shape({
    isActive: PropTypes.bool,
    message: PropTypes.node,
    htmlFor: PropTypes.string,
    required: PropTypes.bool,
    position: PropTypes.oneOf([...LABEL_POSITIONS, "down"]),
    inlinePosition: PropTypes.oneOf(LABEL_INLINE_POSITIONS),
    textPosition: PropTypes.oneOf(LABEL_TEXT_POSITIONS),
    className: PropTypes.string,
    iconProps: PropTypes.object,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    title: PropTypes.string,
  }),
  leftIconProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["lucide", "svg"]),
    lucidIcon: PropTypes.string,
    svg_src: PropTypes.string,
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
  }),
  rightIconProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["lucide", "svg"]),
    lucidIcon: PropTypes.string,
    svg_src: PropTypes.string,
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
  }),
  hintsProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["hint", "error", "success"]),
    message: PropTypes.node,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input_text.displayName = "Input_text";

export default Input_text;
