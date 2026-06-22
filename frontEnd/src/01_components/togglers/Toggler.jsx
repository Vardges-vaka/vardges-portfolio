/**
 * USE CASE: Standard on/off switch (boolean toggle).
 * Same label + hints shell as inputs; supports sm / md / lg sizes.
 */
import { forwardRef, useId, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Field_label,
  Field_hints,
} from "../fieldParts/_fieldParts.index.js";
import { FIELD_SIZE_TYPES } from "../fieldParts/field_helpers/fieldSizeTypes.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "../fieldParts/field_helpers/fieldLabelLayout.js";
import "../_styles/togglers/toggler.css";

const Toggler = forwardRef(function Toggler(
  {
    labelProps = {},
    hintsProps = {},

    className,
    baseStyle = true,
    sizeType = "md",
    fullWidth = false,

    id: idProp,
    disabled,
    required,
    checked,
    defaultChecked = false,
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    ...inputProps
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleChange = useCallback(
    (e) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const describedBy = hintsProps.isActive ? hintId : undefined;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const rootClass = [
    baseStyle && "toggler",
    baseStyle && `toggler--${sizeType}`,
    isInlineLabel && "toggler--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const controlRowClass = [
    "toggler__controlRow",
    isInlineLabel && `toggler__controlRow--label${inlinePosition}`,
    fullWidth && "toggler__controlRow--fullWidth",
  ]
    .filter(Boolean)
    .join(" ");

  const switchClass = [
    "toggler__switch",
    disabled && "toggler__switch--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  const sharedSize = { sizeType };

  const labelElement = isLabelActive ? (
    <Field_label
      baseStyle
      {...sharedSize}
      {...labelProps}
      htmlFor={id}
      required={required ?? labelProps.required}
      position={isInlineLabel ? "inline" : labelPosition}
      inlinePosition={inlinePosition}
      textPosition={labelProps.textPosition ?? "left"}
    />
  ) : null;

  const switchControl = (
    <label className={switchClass} htmlFor={id}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        role="switch"
        className="toggler__input"
        name={name}
        value={value}
        checked={resolvedChecked}
        defaultChecked={undefined}
        disabled={disabled}
        required={required}
        aria-invalid={
          hintsProps.isActive && hintsProps.type === "error" ? true : undefined
        }
        aria-describedby={describedBy}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...inputProps}
      />
      <span className="toggler__track" aria-hidden="true">
        <span className="toggler__thumb" />
      </span>
    </label>
  );

  const hintsElement = (
    <Field_hints
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
        <div className={controlRowClass}>
          {inlinePosition === "before" ? labelElement : null}
          {switchControl}
          {inlinePosition === "after" ? labelElement : null}
        </div>
        {hintsElement}
      </div>
    );
  }

  return (
    <div className={rootClass}>
      {labelPosition === "top" ? labelElement : null}
      <div className={controlRowClass}>{switchControl}</div>
      {labelPosition === "bottom" ? labelElement : null}
      {hintsElement}
    </div>
  );
});

Toggler.propTypes = {
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
  hintsProps: PropTypes.shape({
    isActive: PropTypes.bool,
    type: PropTypes.oneOf(["hint", "error", "success"]),
    message: PropTypes.node,
    textPosition: PropTypes.oneOf(HINT_TEXT_POSITIONS),
    className: PropTypes.string,
  }),
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(FIELD_SIZE_TYPES),
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Toggler.displayName = "Toggler";

export default Toggler;
