import { forwardRef } from "react";
import PropTypes from "prop-types";
import { mapDataProps } from "../fieldParts/field_helpers/mapDataProps.js";
import "../_styles/selects/genericSelect.css";

/**
 * Low-level native `<select>` primitive for all select wrappers.
 * Pass field metadata via `data_*` props (same as GenericInput).
 */
const GenericSelect = forwardRef(function GenericSelect(allProps, ref) {
  const { dataAttributes, rest: propsAfterData } = mapDataProps(allProps);

  const {
    className,
    baseStyle = false,
    style,
    name,
    id,
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    autoFocus,
    title,
    tabIndex,
    multiple,
    size,
    onChange,
    onBlur,
    onFocus,
    children,
    ...rest
  } = propsAfterData;

  let resolvedClassName = className ?? "";

  if (baseStyle) {
    resolvedClassName = resolvedClassName
      ? `GenericSelect ${resolvedClassName}`
      : "GenericSelect";
  }

  return (
    <select
      ref={ref}
      className={resolvedClassName || undefined}
      style={style}
      name={name}
      id={id}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoFocus={autoFocus}
      title={title}
      tabIndex={tabIndex}
      multiple={multiple}
      size={size}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      {...rest}
      {...dataAttributes}>
      {children}
    </select>
  );
});

GenericSelect.propTypes = {
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  style: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  title: PropTypes.string,
  tabIndex: PropTypes.number,
  multiple: PropTypes.bool,
  size: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  children: PropTypes.node,
};

GenericSelect.displayName = "GenericSelect";

export default GenericSelect;
