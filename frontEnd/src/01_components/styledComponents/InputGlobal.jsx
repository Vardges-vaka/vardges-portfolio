import React from "react";
import PropTypes from "prop-types";
import { Input_Generic } from "../genericComponents/_genericComponents.index";
import IconGlobal from "./IconGlobal";
import {
  LoadingSpinner,
  FieldMessage,
} from "../stateComponents/_stateComponents.index";
import "../_styles/inputGlobal.css";

const InputGlobal = ({
  //Generic Props
  className = "",
  type = "text",
  name = "",
  placeholder = "",
  value = "",
  id = "",
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  required = false,
  disabled = false,
  readOnly = false,
  // Global Input related props
  version = "primary",
  withMessage = false,

  messageProps = {
    withHint: false,
    withSuccessMessage: false,
    withErrorMessage: false,
    withWarningMessage: false,
    message: "",
  },

  withLeftIcon = false,
  withRightIcon = false,
  withLabel = false,
  leftIconProps = {
    customStyle: false,
    className: "",
    isActive: false,
    withWrapper: false,
    type: "lucide",
    lucid: "",
    svg_src: "",
    ReactComponent: null,
    wrapperProps: {},
    version: "normal",
    iconProps: {},
  },
  rightIconProps = {
    className: "",
    isActive: false,
    withWrapper: false,
    type: "lucide",
    lucid: "",
    svg_src: "",
    ReactComponent: null,
    wrapperProps: {},
    version: "normal",
    iconProps: {},
  },
  containerProps = {},
  wrapperProps = {},
  labelProps = {
    isInline: false,
    customStyle: false,
    message: "",
  },
  // rest props
  ...props
}) => {
  let Input_classname = `GlobalInput`;

  const getInputClassname = () => {
    if (type !== "text") {
      Input_classname += ` ${type}`;
    }
    if (withLeftIcon && leftIconProps.isActive) {
      Input_classname += ` with-left-icon`;
    }
    if (withRightIcon && rightIconProps.isActive) {
      Input_classname += ` with-right-icon`;
    }
    if (withLabel) {
      Input_classname += ` with-label`;
    }
    if (withMessage) {
      Input_classname += ` with-message`;
    }
    if (className) {
      Input_classname += ` ${className}`;
    }

    console.log("Input_classname", Input_classname);

    return Input_classname;
  };
  const Label_Input_classname = `InputGlobal_label ${
    labelProps.isInline ? "inline" : ""
  } ${className ? className : ""} ${labelProps.customStyle ? "custom" : ""} `;

  const Input_Icon_classname = (side) => {
    if (side === "left") {
      return `InputGlobal_icon left ${
        leftIconProps.className ? leftIconProps.className : ""
      }`;
    } else if (side === "right") {
      return `InputGlobal_icon right ${
        rightIconProps.className ? rightIconProps.className : ""
      }`;
    }
  };

  const Input_container_classname = `InputGlobal_container ${
    withLabel && labelProps.isInline ? "inline" : ""
  } ${className ? className : ""}`;

  const wrapper_classname = `InputGlobal_wrapper ${className ? className : ""}`;
  //
  //
  const message_classname = `InputGlobal_message ${className ? className : ""}`;

  const renderInputOnly = () => {
    return (
      <Input_Generic
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        id={id}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={getInputClassname()}
        {...props}
      />
    );
  };
  console.log("messageProps", messageProps);
  return (
    <div className={Input_container_classname} {...containerProps}>
      {withLabel && (
        <label className={Label_Input_classname}>{labelProps.message}</label>
      )}
      <div className={wrapper_classname} {...wrapperProps}>
        {withLeftIcon && leftIconProps.isActive && (
          <IconGlobal
            {...leftIconProps}
            withWrapper={true}
            className={Input_Icon_classname("left")}
          />
        )}
        {renderInputOnly()}
        {withRightIcon && rightIconProps.isActive && (
          <IconGlobal
            {...rightIconProps}
            withWrapper={true}
            className={Input_Icon_classname("right")}
          />
        )}
      </div>
      {withMessage && messageProps.withHint && (
        <FieldMessage
          message={messageProps.message}
          isActive={true}
          type="hint"
          className={className}
        />
      )}
      {withMessage && messageProps.withSuccessMessage && (
        <FieldMessage
          message={messageProps.message}
          isActive={true}
          type="success"
          className={className}
        />
      )}{" "}
      {withMessage && messageProps.withErrorMessage && (
        <FieldMessage
          isActive={true}
          type="error"
          className={className}
          message={messageProps.message}
        />
      )}
      {withMessage && messageProps.withWarningMessage && (
        <FieldMessage
          message={messageProps.message}
          isActive={true}
          type="warning"
          className={message_classname}
        />
      )}
    </div>
  );
};
/*



    withSuccessMessage: false,
withErrorMessage
withWarningMessage
*/
InputGlobal.propTypes = {
  className: PropTypes.string,
  withLeftIcon: PropTypes.bool,
  withRightIcon: PropTypes.bool,
  withLabel: PropTypes.bool,
  withMessage: PropTypes.bool,
  // Props for label, leftIcon, rightIcon, message
  labelProps: PropTypes.object,
  leftIconProps: PropTypes.object,
  rightIconProps: PropTypes.object,
  messageProps: PropTypes.object,
  version: PropTypes.oneOf(["primary"]),
};

InputGlobal.displayName = "InputGlobal";

export default InputGlobal;
