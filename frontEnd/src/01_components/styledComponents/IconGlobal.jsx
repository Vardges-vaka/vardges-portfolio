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
  version = "primary",
  iconProps = {},
}) => {
  if (!isActive) {
    return null;
  }
// 
  const icon_classname = className
    ? `IconGlobal_Icon ${version !== "primary" ? version : ""} ${className}`
    : `IconGlobal_Icon ${version !== "primary" ? version : ""}`;

  const icon_wrapperclassname = className
    ? `IconGlobal_Icon_wrapper ${
        version !== "primary" ? version : ""
      } ${className}`
    : `IconGlobal_Icon_wrapper ${version !== "primary" ? version : ""}`;

  const renderOnlyIcon = () => {
    if (type === "lucide") {
      const Component = LucideIcons[lucid];
      // Handle case where Lucide icon doesn't exist
      if (!Component) {
        console.warn(
          `IconGlobal: Lucide icon "${lucid}" not found. Available icons:`,
          Object.keys(LucideIcons).slice(0, 10)
        );
        return (
          <span className={icon_classname} title={`Icon "${lucid}" not found`}>
            ❓
          </span>
        );
      }
      console.log("Component returning Lucide Icon", Component);
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
  version: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};

IconGlobal.displayName = "IconGlobal";

export default IconGlobal;
