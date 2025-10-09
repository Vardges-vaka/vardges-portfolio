import React from "react";
import PropTypes from "prop-types";
import * as LucideIcons from "lucide-react";
import "../_styles/iconGlobal.css";

const IconGlobal = ({
  className = "",
  isActive = false,
  withWrapper = false,
  type = "lucide",
  lucid = "",
  svg_src = "",
  ReactComponent = null,
  wrapperProps = {},
  version,
  iconProps = {},
}) => {
  if (!isActive) {
    return null;
  }


  
  const icon_classname = className
    ? `IconGlobal_Icon ${version ? version : ""} ${className}`
    : `IconGlobal_Icon ${version ? version : ""}`;

  const icon_wrapperclassname = className
    ? `IconGlobal_Icon_wrapper ${version ? version : ""} ${className}`
    : `IconGlobal_Icon_wrapper ${version ? version : ""}`;

  const renderOnlyIcon = () => {
    if (type === "lucide") {
      const Component = LucideIcons[lucid];
      return <Component {...iconProps} className={icon_classname} />;
    } else if (type === "svg") {
      return <img src={svg_src} {...iconProps} className={icon_classname} />;
    } else if (type === "component") {
      return <ReactComponent {...iconProps} className={icon_classname} />;
    }
  };

  return (
    <>
      {withWrapper ? (
        <div className={icon_wrapperclassname} {...wrapperProps}>
          {renderOnlyIcon()}
        </div>
      ) : (
        <>{renderOnlyIcon()}</>
      )}
    </>
  );
};

IconGlobal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  withWrapper: PropTypes.bool,
  type: PropTypes.oneOf(["lucide", "svg", "component"]),
  lucid: PropTypes.string, // Lucide icon name
  svg_src: PropTypes.string, // SVG source URL
  ReactComponent: PropTypes.elementType, // React component
  wrapperProps: PropTypes.object, // Props for wrapper div
  iconProps: PropTypes.object, // Props for icon
  version: PropTypes.oneOf(["normal", "primary", "secondary", "light", "dark"]),
};

IconGlobal.displayName = "IconGlobal";

export default IconGlobal;
