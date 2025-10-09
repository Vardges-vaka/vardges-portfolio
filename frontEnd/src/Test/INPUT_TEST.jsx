import React from "react";
import { useState } from "react";
import { InputGlobal } from "../01_components/components.index";
import "./INPUT_TEST.css";
import { ButtonGlobal } from "../01_components/components.index.js";

const INPUT_TEST = () => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const handleBlur = () => {
    console.log("blur");
    setValue(`${value} blur`);
    setFocus(!focus);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleFocus = (e) => {
    console.log("focus");
    // setValue(`${value} focus`);
    setFocus(!focus);
  };
  const errorMessage = "This is an error message";
  const successMessage = "This is a success message";
  const warningMessage = "This is a warning message";
  const hintMessage = "This is a hint message";
  const messageProps_hint = {
    withHint: true,
    message: hintMessage,
  };
  const messageProps_success = {
    withSuccessMessage: true,
    message: successMessage,
  };
  const messageProps_error = {
    withErrorMessage: true,
    message: errorMessage,
  };
  const messageProps_warning = {
    withWarningMessage: true,
    message: warningMessage,
  };
  /*
  withMessage = {true},

  messageProps = {
    withHint: false,
    withSuccessMessage: false,
    withErrorMessage: false,
    withWarningMessage: false,
    hint: {
      isActive: false,
      message: "",
      version: "normal",
      withIcon: false,
      iconPosition: "",
      iconProps: {},
    },








    success: {
      isActive: false,
      message: "",
      type: "success",
      version: "",
      withIcon: false,
      iconPosition: "",
      iconProps: {},
    },
    error: {
      isActive: false,
      message: "",
      type: "error",
      version: "",
      withIcon: false,
      iconPosition: "",
      iconProps: {},
    },
    warning: {
      isActive: false,
      message: "",
      type: "warning",
      version: "",
      withIcon: false,
      iconPosition: "",
      iconProps: {},
    },
  },




  */
  return (
    <div className="InputTest_container">
      <InputGlobal
        type="number"
        withLeftIcon={true}
        withRightIcon={true}
        withLabel={true}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        labelProps={{
          isInline: false,
          customStyle: false,
          message: "Input with hint message and Both Icons",
        }}
        leftIconProps={{ isActive: true, type: "lucide", lucid: "Moon" }}
        rightIconProps={{
          isActive: true,
          type: "lucide",
          lucid: "Sun",
          iconProps: {
            onClick: (e) => console.log("clicked", e),
            title: "heyThere baby",
          },
        }}
        withMessage={true}
        messageProps={messageProps_hint}
      />
      <InputGlobal
        type="text"
        withLeftIcon={true}
        withRightIcon={true}
        withLabel={true}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        labelProps={{
          isInline: false,
          customStyle: false,
          message: "Input with success message and Both Icons",
        }}
        leftIconProps={{ isActive: true, type: "lucide", lucid: "Moon" }}
        rightIconProps={{ isActive: true, type: "lucide", lucid: "Sun" }}
        withMessage={true}
        messageProps={messageProps_success}
      />
      <InputGlobal
        type="text"
        withLeftIcon={true}
        withRightIcon={true}
        withLabel={true}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        labelProps={{
          isInline: false,
          customStyle: false,
          message: "Input with error message and Both Icons",
        }}
        leftIconProps={{ isActive: true, type: "lucide", lucid: "Moon" }}
        rightIconProps={{ isActive: true, type: "lucide", lucid: "Sun" }}
        withMessage={true}
        messageProps={messageProps_error}
      />
      <InputGlobal
        type="text"
        withLeftIcon={true}
        withRightIcon={true}
        withLabel={true}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        labelProps={{
          isInline: false,
          customStyle: false,
          message: "Input with warning message and Both Icons",
        }}
        leftIconProps={{ isActive: true, type: "lucide", lucid: "Moon" }}
        rightIconProps={{ isActive: true, type: "lucide", lucid: "Sun" }}
        withMessage={true}
        messageProps={messageProps_warning}
      />
      {/* <InputGlobal
        type="text"
        withLeftIcon={true}
        withRightIcon={true}
        withLabel={true}
        withMessage={false}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={true}
        placeholder="Disabled Input"
        labelProps={{
          isInline: false,
          customStyle: false,
          message: "Hey thetre",
        }}
        leftIconProps={{ isActive: true, type: "lucide", lucid: "User" }}
        rightIconProps={{ isActive: true, type: "lucide", lucid: "Eye" }}
      /> */}
      <ButtonGlobal
        version={"normal"}
        // onClick={() => setSpecificTheme("dark")}
        withIcon
        leftIcon={{
          isActive: true,
          type: "lucide",
          lucid: "Moon",
        }}>
        Dark Theme
      </ButtonGlobal>
      {/* {value} */}
      {focus ? "focused" : "not focused"}
    </div>

    // <p>InputTest</p>
  );
};

export default INPUT_TEST;
