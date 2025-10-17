import React from "react";
import PropTypes from "prop-types";
import { Button_Generic } from "../genericComponents/_genericComponents.index";
import IconGlobal from "./IconGlobal";
import { LoadingSpinner } from "../stateComponents/_stateComponents.index";
import "../_styles/buttonGlobal.css";

const ButtonGlobal = ({
  children,
  className = "",
  //   icon related props
  withIcon = false,
  version = "primary", // primary, secondary, tertiary
  leftIcon = {
    isActive: false,
    withWrapper: false,
    type: "lucide",
    lucid: "",
    svg_src: "",
    ReactComponent: null,
    wrapperProps: {},
    iconProps: {},
  },
  rightIcon = {
    isActive: false,
    withWrapper: false,
    type: "lucide",
    lucid: "",
    svg_src: "",
    ReactComponent: null,
    wrapperProps: {},
    iconProps: {},
  },
  // div related props
  withParentContainer = false,
  withWrapper = false,
  wrapperProps = {},
  parentContainerProps = {},
  isLoading = false,
  // rest props
  ...props
}) => {
  const Button_classname = `ButtonGlobal ${
    version !== "primary" ? version : ""
  } ${className ? className : ""}`;

  const ParentContainer_classname = `ButtonGlobal_container ${
    version !== "primary" ? version : ""
  } ${className ? className : ""}`;

  const wrapper_classname = `ButtonGlobal_wrapper ${
    className ? className : ""
  }`;

  const icon_classname = (side) => {
    return `ButtonGlobal_Icon ${side} ${version !== "primary" ? version : ""} ${
      className ? className : ""
    }`;
  };

  const renderBtnOnly = () => {
    return (
      <>
        {isLoading ? (
          <LoadingSpinner
            className={className}
            version={version}
            isActive={isLoading}
          />
        ) : (
          <>
            {withIcon && leftIcon.isActive && (
              <IconGlobal
                {...leftIcon}
                version={version}
                className={icon_classname("left")} //.IconGlobal_Icon.ButtonGlobal_Icon
              />
            )}
            {children}
            {withIcon && rightIcon.isActive && (
              <IconGlobal
                {...rightIcon}
                version={version}
                className={icon_classname("right")}
              />
            )}
          </>
        )}
      </>
    );
  };
  const renderButton = () => {
    return !withWrapper ? (
      <Button_Generic className={Button_classname} {...props}>
        {renderBtnOnly()}
      </Button_Generic>
    ) : (
      <div className={wrapper_classname} {...wrapperProps}>
        <Button_Generic className={Button_classname} {...props}>
          {renderBtnOnly()}
        </Button_Generic>
      </div>
    );
  };

  return (
    <>
      {withParentContainer ? (
        <div className={ParentContainer_classname} {...parentContainerProps}>
          {renderButton()}
        </div>
      ) : (
        <>{renderButton()}</>
      )}
    </>
  );
};

ButtonGlobal.propTypes = {
  // Core props
  children: PropTypes.node, // Not always required (onlyIcon mode)
  className: PropTypes.string,

  // Icon behavior props
  withIcon: PropTypes.bool,

  // Visual version
  version: PropTypes.oneOf(["primary", "secondary", "tertiary"]),

  // Icon configuration objects
  leftIcon: PropTypes.shape({
    isActive: PropTypes.bool,
    withWrapper: PropTypes.bool,
    type: PropTypes.oneOf(["lucide", "svg", "component"]),
    lucid: PropTypes.string, // Lucide icon name
    svg_src: PropTypes.string, // SVG source URL
    ReactComponent: PropTypes.elementType, // React component
    wrapperProps: PropTypes.object, // Props for wrapper div
    iconProps: PropTypes.object, // Props passed to icon element
  }),

  rightIcon: PropTypes.shape({
    isActive: PropTypes.bool,
    withWrapper: PropTypes.bool,
    type: PropTypes.oneOf(["lucide", "svg", "component"]),
    lucid: PropTypes.string, // Lucide icon name
    svg_src: PropTypes.string, // SVG source URL
    ReactComponent: PropTypes.elementType, // React component
    wrapperProps: PropTypes.object, // Props for wrapper div
    iconProps: PropTypes.object, // Props passed to icon element
  }),

  // Container and wrapper props
  withParentContainer: PropTypes.bool,
  withWrapper: PropTypes.bool,
  wrapperProps: PropTypes.object,
  parentContainerProps: PropTypes.object,

  // Loading state
  isLoading: PropTypes.bool,

  // Standard button props that get passed through
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

ButtonGlobal.displayName = "ButtonGlobal";

export default ButtonGlobal;
