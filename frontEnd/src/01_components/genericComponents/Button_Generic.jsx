import React from "react";
import PropTypes from "prop-types";

const Button_Generic = ({
  children,
  className = "",
  onClick,
  title,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const Button_Generic_classname = className ? className : "Button_Generic";

  return (
    <button
      className={Button_Generic_classname}
      onClick={onClick}
      title={title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}>
      {children}
    </button>
  );
};

Button_Generic.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

Button_Generic.displayName = "Button_Generic";

export default Button_Generic;
