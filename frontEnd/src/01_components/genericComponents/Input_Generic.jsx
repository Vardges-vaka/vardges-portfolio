import React from "react";
import PropTypes from "prop-types";

const Input_Generic = ({
  className = "",
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  id,
  required,
  disabled,
  readOnly,
  autoComplete,
  min,
  max,
  pattern,
  autoFocus,
  ...props
}) => {
  const Input_Generic_classname = className ? className : "Input_Generic";

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={Input_Generic_classname}
      id={id}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      autoComplete={autoComplete}
      min={min}
      max={max}
      pattern={pattern}
      autoFocus={autoFocus}
      {...props}
    />
  );
};

Input_Generic.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Input_Generic.displayName = "Input_Generic";

export default Input_Generic;
