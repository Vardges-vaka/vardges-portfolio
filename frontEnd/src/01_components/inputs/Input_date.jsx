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
  DATE_INPUT_TYPES,
  getDateInputDefaultHint,
} from "./input_helpers/inputDateTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "./input_helpers/inputLabelLayout.js";
import "../_styles/inputs/input_date.css";

/**
 * Date/time picker shell — same label / hint API as Input_text.
 * Right icon only (no left icon slot). Native picker via `type` prop.
 *
 * @param {"date"|"time"|"month"|"week"|"datetime-local"} [type="date"]
 */
const Input_date = forwardRef(function Input_date(
  {
    labelProps = {},
    rightIconProps = {},
    hintsProps = {},

    className,
    baseStyle = true,
    sizeType = "md",
    type = "date",

    id: idProp,
    disabled,
    required,
    min,
    max,
    step,
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

  const hintType = hintsProps.type ?? "hint";
  const showDefaultFormatHint =
    hintsProps.isActive &&
    hintType === "hint" &&
    (hintsProps.message == null || hintsProps.message === "");

  const resolvedHintsProps = {
    ...hintsProps,
    type: hintType,
    ...(showDefaultFormatHint
      ? { message: getDateInputDefaultHint(type) }
      : {}),
  };

  const rootClass = [
    baseStyle && "input_date",
    baseStyle && `input_date--${sizeType}`,
    baseStyle && `input_date--${type.replace(":", "")}`,
    isInlineLabel && "input_date--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "input_date__fieldWrap",
    rightIconProps.isActive && "input_date__fieldWrap--withRightIcon",
    disabled && "input_date__fieldWrap--disabled",
    resolvedHintsProps.isActive &&
      resolvedHintsProps.type === "error" &&
      "input_date__fieldWrap--error",
    resolvedHintsProps.isActive &&
      resolvedHintsProps.type === "success" &&
      "input_date__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "input_date__inlineRow",
    `input_date__inlineRow--label${inlinePosition}`,
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
      <GenericInput
        ref={ref}
        type={type}
        baseStyle
        id={id}
        className="input_date__input"
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        aria-invalid={
          resolvedHintsProps.isActive && resolvedHintsProps.type === "error"
            ? true
            : undefined
        }
        aria-describedby={
          resolvedHintsProps.isActive ? hintId : undefined
        }
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
      {...resolvedHintsProps}
      textPosition={resolvedHintsProps.textPosition ?? "left"}
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

Input_date.propTypes = {
  type: PropTypes.oneOf(DATE_INPUT_TYPES),
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
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input_date.displayName = "Input_date";

export default Input_date;
