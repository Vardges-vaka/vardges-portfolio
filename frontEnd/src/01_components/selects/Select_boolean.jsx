/**
 * USE CASE: Yes / No (or tri-state: unset) boolean fields.
 * Maps to string values for forms — no checkbox styling, compact select UX.
 */
import {
  forwardRef,
  useId,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { Select_fieldShell } from "./select_childComps/_select_childComps.index.js";
import { Select_nativeControl } from "./select_childComps/Select_controls.jsx";
import {
  SELECT_SIZE_TYPES,
  useSelectSingleValue,
} from "./select_helpers/_select_helpers.index.js";
import "../_styles/selects/select_boolean.css";

const Select_boolean = forwardRef(function Select_boolean(
  {
    labelProps = {},
    leftIconProps = {},
    rightIconProps = {},
    hintsProps = {},

    triState = false,
    trueValue = "true",
    falseValue = "false",
    emptyValue = "",
    trueLabel = "Yes",
    falseLabel = "No",
    emptyLabel = "— not set —",
    placeholder = "— select —",

    className,
    baseStyle = true,
    sizeType = "md",

    id: idProp,
    disabled,
    required,
    value,
    defaultValue,
    name,
    onChange,
    onBlur,
    onFocus,
    ...selectProps
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = `${id}-hint`;

  const normalizedOptions = useMemo(() => {
    const opts = [
      { value: trueValue, label: trueLabel, ariaLabel: trueLabel },
      { value: falseValue, label: falseLabel, ariaLabel: falseLabel },
    ];

    if (triState) {
      return [
        {
          value: emptyValue,
          label: emptyLabel,
          ariaLabel: emptyLabel,
        },
        ...opts,
      ];
    }

    return opts;
  }, [
    triState,
    trueValue,
    falseValue,
    emptyValue,
    trueLabel,
    falseLabel,
    emptyLabel,
  ]);

  const { isControlled, resolvedValue, setInternalValue } = useSelectSingleValue(
    { value, defaultValue, onChange, name, id },
  );

  const sharedFieldA11y = {
    id,
    name,
    disabled,
    required,
    "aria-invalid":
      hintsProps.isActive && hintsProps.type === "error" ? true : undefined,
    "aria-describedby": hintsProps.isActive ? hintId : undefined,
  };

  return (
    <Select_fieldShell
      variantClass="select_boolean"
      sizeType={sizeType}
      baseStyle={baseStyle}
      className={className}
      labelProps={labelProps}
      leftIconProps={leftIconProps}
      rightIconProps={rightIconProps}
      hintsProps={hintsProps}
      disabled={disabled}
      required={required}
      id={id}
      isRich={false}>
    <Select_nativeControl
      refProp={ref}
      id={id}
      name={name}
      disabled={disabled}
      required={required}
      resolvedValue={resolvedValue}
      placeholder={triState ? emptyLabel : placeholder}
      placeholderValue={emptyValue}
      hidePlaceholder={triState}
      normalizedOptions={normalizedOptions}
        isControlled={isControlled}
        setInternalValue={setInternalValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        sharedFieldA11y={sharedFieldA11y}
        selectProps={selectProps}
      />
    </Select_fieldShell>
  );
});

Select_boolean.propTypes = {
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  hintsProps: PropTypes.object,
  triState: PropTypes.bool,
  trueValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  falseValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  emptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
  emptyLabel: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(SELECT_SIZE_TYPES),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Select_boolean.displayName = "Select_boolean";

export default Select_boolean;
