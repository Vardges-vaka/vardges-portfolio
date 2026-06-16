import PropTypes from "prop-types";
import {
  Field_label,
  Field_icon,
  Field_hints,
} from "../../fieldParts/_fieldParts.index.js";
import { SELECT_SIZE_TYPES } from "../select_helpers/SELECT_SIZE_TYPES.js";
import {
  LABEL_INLINE_POSITIONS,
  LABEL_POSITIONS,
  HINT_TEXT_POSITIONS,
  LABEL_TEXT_POSITIONS,
  normalizeLabelPosition,
} from "../../fieldParts/field_helpers/fieldLabelLayout.js";
import { DEFAULT_CHEVRON } from "../select_helpers/selectFieldUtils.js";
import "../../_styles/selects/select_field.css";

/**
 * Shared label + field row + hints shell for all Select_* components.
 */
const Select_fieldShell = ({
  variantClass = "",
  sizeType = "md",
  baseStyle = true,
  className,
  labelProps = {},
  leftIconProps = {},
  rightIconProps = {},
  hintsProps = {},
  disabled,
  required,
  id,
  isOpen = false,
  isRich = false,
  children,
}) => {
  const hintId = `${id}-hint`;

  const labelPosition = normalizeLabelPosition(labelProps.position);
  const inlinePosition = labelProps.inlinePosition ?? "before";
  const isLabelActive = Boolean(labelProps.isActive && labelProps.message);
  const isInlineLabel = isLabelActive && labelPosition === "inline";

  const resolvedRightIcon = rightIconProps.isActive
    ? rightIconProps
    : DEFAULT_CHEVRON;

  const rootClass = [
    baseStyle && "select_field",
    baseStyle && variantClass,
    baseStyle && `select_field--${sizeType}`,
    isInlineLabel && "select_field--labelInline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldWrapClass = [
    "select_field__fieldWrap",
    leftIconProps.isActive && "select_field__fieldWrap--withLeftIcon",
    "select_field__fieldWrap--withRightIcon",
    isRich && "select_field__fieldWrap--rich",
    isOpen && "select_field__fieldWrap--open",
    disabled && "select_field__fieldWrap--disabled",
    hintsProps.isActive &&
      hintsProps.type === "error" &&
      "select_field__fieldWrap--error",
    hintsProps.isActive &&
      hintsProps.type === "success" &&
      "select_field__fieldWrap--success",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineRowClass = [
    "select_field__inlineRow",
    `select_field__inlineRow--label${inlinePosition}`,
  ].join(" ");

  const sharedSize = { sizeType };

  const labelElement = isLabelActive ? (
    <Field_label
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
      <Field_icon baseStyle {...sharedSize} {...leftIconProps} />
      <div className="select_field__control">{children}</div>
      <Field_icon baseStyle {...sharedSize} {...resolvedRightIcon} />
    </div>
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
};

Select_fieldShell.propTypes = {
  variantClass: PropTypes.string,
  sizeType: PropTypes.oneOf(SELECT_SIZE_TYPES),
  baseStyle: PropTypes.bool,
  className: PropTypes.string,
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.object,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  isRich: PropTypes.bool,
  children: PropTypes.node,
};

Select_fieldShell.displayName = "Select_fieldShell";

export default Select_fieldShell;

export { LABEL_INLINE_POSITIONS, LABEL_POSITIONS, HINT_TEXT_POSITIONS, LABEL_TEXT_POSITIONS };
