import React from "react";
import PropTypes from "prop-types";
const Select_Generic = ({
  className = "",
  name,
  options,
  onChange,
  onBlur,
  onFocus,
}) => {
  const Select_Generic_classname = className ? className : "Select_Generic";
  return (
    <select
      className={Select_Generic_classname}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select_Generic.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Select_Generic.displayName = "Select_Generic";

export default Select_Generic;
