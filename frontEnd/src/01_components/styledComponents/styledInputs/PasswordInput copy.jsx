import React from "react";
import PropTypes from "prop-types";
import IconGlobal from "../IconGlobal.jsx";
import "../../_styles/passwordInput.css";

const PasswordInput = ({
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},

  name = "",
  placeholder = "",
  value = "",
  id = "",
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete = "off",
  min = 0,
  max = 100,

  //

  version = "primary",
  type = "signIn",
  withLabel = true,
  labelProps = {
    isInline: false,
    customStyle: false,
    title: "",
    message: "",
  },
}) => {
  const PasswordInput_container = `PasswordInput_container ${
    version !== "primary" ? version : ""
  } ${type !== "signIn" ? type : ""}`;

  const PasswordInput_inputClassname = `PasswordInput_input ${
    version !== "primary" ? version : ""
  } ${type !== "signIn" ? type : ""}`;

  const renderInputOnly = (
    InputOnly_type = "password",
    InputOnly_name = "",
    InputOnly_placeholder = "",
    InputOnly_value = "",
    InputOnly_id = "",
    InputOnly_required = false,
    InputOnly_disabled = false,
    InputOnly_readOnly = false,
    InputOnly_autoComplete = "off",
    InputOnly_min = 0,
    InputOnly_max = 100,
    InputOnly_props = {}
  ) => {
    return (
      <input
        className={PasswordInput_inputClassname}
        type="password"
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
        placeholder={placeholder}
        value={value}
        id={id}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        min={min}
        max={max}
      />
    );
  };

  const renderType_signIn = () => {
    console.log("renderType_signIn");
    return renderInputOnly(
      "password",
      name,
      placeholder,
      value,
      id,
      required,
      disabled,
      readOnly,
      autoComplete,
      min,
      max
    );
  };
  const renderType_signUp = () => {};
  const renderType_forgotPassword = () => {};
  const renderType_resetPassword = () => {};

  const render_PasswordInput = () => {
    switch (type) {
      case "signIn":
        return renderType_signIn();
      case "signUp":
        return renderType_signUp();
      case "forgotPassword":
        return renderType_forgotPassword();
      case "resetPassword":
        return renderType_resetPassword();
    }
  };

  return (
    <div className={PasswordInput_container}>
      {render_PasswordInput()}
      <input
        className={PasswordInput_inputClassname}
        type="password"
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
        placeholder={placeholder}
        value={value}
        id={id}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        min={min}
        max={max}
      />
    </div>
  );
};

PasswordInput.propTypes = {
  version: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  type: PropTypes.oneOf([
    "signIn",
    "signUp",
    "forgotPassword",
    "resetPassword",
  ]),
};

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
