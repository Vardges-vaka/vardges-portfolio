import React, { useState } from "react";
import {
  InputGlobal,
  IconGlobal,
  ButtonGlobal,
  SelectGlobal,
  PasswordInput,
  CheckboxGlobal,
} from "../../../01_components/components.index.js";
import { useTranslation } from "react-i18next";
import "./styles/journey.css";

const Journey = ({ variant = "full" }) => {
  const { i18n, t } = useTranslation("journey");
  const Journey_classname = `Journey ${variant === "full" ? "full" : "short"}`;

  // Password state management for all three types
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpPasswords, setSignUpPasswords] = useState({
    new: "",
    confirm: "",
  });
  const [changePasswords, setChangePasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Visibility state for each input type
  const [visibility, setVisibility] = useState({
    signIn: false,
    signUpNew: false,
    signUpConfirm: false,
    changeCurrent: false,
    changeNew: false,
    changeConfirm: false,
  });

  // Handlers for Sign In type
  const handleSignInPasswordChange = (e) => {
    setSignInPassword(e.target.value);
  };

  const toggleSignInVisibility = () => {
    setVisibility((prev) => ({ ...prev, signIn: !prev.signIn }));
  };

  // Handlers for Sign Up type
  const handleSignUpNewChange = (e) => {
    setSignUpPasswords((prev) => ({ ...prev, new: e.target.value }));
  };

  const handleSignUpConfirmChange = (e) => {
    setSignUpPasswords((prev) => ({ ...prev, confirm: e.target.value }));
  };

  const toggleSignUpNewVisibility = () => {
    setVisibility((prev) => ({ ...prev, signUpNew: !prev.signUpNew }));
  };

  const toggleSignUpConfirmVisibility = () => {
    setVisibility((prev) => ({ ...prev, signUpConfirm: !prev.signUpConfirm }));
  };

  // Handlers for Change Password type
  const handleChangeCurrentChange = (e) => {
    setChangePasswords((prev) => ({ ...prev, current: e.target.value }));
  };

  const handleChangeNewChange = (e) => {
    setChangePasswords((prev) => ({ ...prev, new: e.target.value }));
  };

  const handleChangeConfirmChange = (e) => {
    setChangePasswords((prev) => ({ ...prev, confirm: e.target.value }));
  };

  const toggleChangeCurrentVisibility = () => {
    setVisibility((prev) => ({ ...prev, changeCurrent: !prev.changeCurrent }));
  };

  const toggleChangeNewVisibility = () => {
    setVisibility((prev) => ({ ...prev, changeNew: !prev.changeNew }));
  };

  const toggleChangeConfirmVisibility = () => {
    setVisibility((prev) => ({ ...prev, changeConfirm: !prev.changeConfirm }));
  };

  // State for basic functionality testing
  const [basicText, setBasicText] = useState("");

  // Handler functions for basic tests
  const handleBasicChange = (e) => {
    console.log("Basic input changed:", e.target.value);
    setBasicText(e.target.value);
  };

  return (
    <div className={Journey_classname}>
      <h1>PasswordInput Component Testing Suite</h1>

      {/* Password Input Testing Section */}
      <section className="password-testing-section">
        <h2>Password Input - All Types</h2>

        {/* Sign In Type */}
        <div className="password-input-container">
          <h3>1. Sign In Type (Single Password Input)</h3>
          <PasswordInput
            type="signIn"
            currentPassword={signInPassword}
            onPasswordChange={handleSignInPasswordChange}
            currentVisible={visibility.signIn}
            onCurrentVisibleToggle={toggleSignInVisibility}
            version="primary"
          />
        </div>

        {/* Sign Up Type */}
        <div className="password-input-container">
          <h3>2. Sign Up Type (New + Confirm with Requirements)</h3>
          <PasswordInput
            type="signUp"
            newPassword={signUpPasswords.new}
            confirmPassword={signUpPasswords.confirm}
            onNewChange={handleSignUpNewChange}
            onConfirmChange={handleSignUpConfirmChange}
            newVisible={visibility.signUpNew}
            confirmVisible={visibility.signUpConfirm}
            onNewVisibleToggle={toggleSignUpNewVisibility}
            onConfirmVisibleToggle={toggleSignUpConfirmVisibility}
            version="primary"
            showValidation={true}
          />
        </div>

        {/* Change Password Type */}
        <div className="password-input-container">
          <h3>3. Change Password Type (Current + New + Confirm)</h3>
          <PasswordInput
            type="change"
            currentPassword={changePasswords.current}
            newPassword={changePasswords.new}
            confirmPassword={changePasswords.confirm}
            onCurrentChange={handleChangeCurrentChange}
            onNewChange={handleChangeNewChange}
            onConfirmChange={handleChangeConfirmChange}
            currentVisible={visibility.changeCurrent}
            newVisible={visibility.changeNew}
            confirmVisible={visibility.changeConfirm}
            onCurrentVisibleToggle={toggleChangeCurrentVisibility}
            onNewVisibleToggle={toggleChangeNewVisibility}
            onConfirmVisibleToggle={toggleChangeConfirmVisibility}
            version="primary"
            showValidation={true}
          />
          <div className="debug-values">
            <p>Current password: "{changePasswords.current}"</p>
            <p>New password: "{changePasswords.new}"</p>
            <p>Confirm password: "{changePasswords.confirm}"</p>
            <p>
              Match:{" "}
              {changePasswords.new === changePasswords.confirm ? "✓" : "✗"}
            </p>
          </div>
        </div>
      </section>

      {/* Debug Section - Check console for any icon warnings */}
      {/* <div className="debug-section A">
        <h1>Primary H1</h1>
        <h2>Primary H2</h2>
        <h3>Primary H3</h3>
        <label htmlFor="">Primary Title</label>
        <p>Primary Text</p>
      </div>

      <div className="debug-section B">
        <h1>Secondary H1</h1>
        <h2>Secondary H2</h2>
        <h3>Secondary H3</h3>
        <label htmlFor="">Secondary Title</label>
        <p>Secondary Text</p>
      </div>

      <div className="debug-section C">
        <h1>Tertiary H1</h1>
        <h2>Tertiary H2</h2>
        <h3>Tertiary H3</h3>
        <label htmlFor="">Tertiary Title</label>
        <p>Tertiary Text</p>
      </div> */}

      {/* Phase 1: Basic Functionality Testing */}
      <section>
        <h2>Phase 1: Basic Functionality Testing</h2>
        <div>
          <h3>1.1 Basic Text Input</h3>
          <InputGlobal
            version="primary"
            placeholder="Enter some text..."
            value={basicText}
            onChange={handleBasicChange}
            name="basicText"
            id="basic-text-input"
            withLabel={true}
            labelProps={{
              isInline: false,
              customStyle: false,
              message: "This is a label",
              title: "This is a title for the label",
            }}
            withMessage={true}
            withLeftIcon={true}
            leftIconProps={{
              isActive: true,
              type: "lucide",
              lucid: "Mail",
            }}
            messageProps={{
              withHint: true,
              withSuccessMessage: true,
              withErrorMessage: true,
              withWarningMessage: true,
              // message: "This is a hint message",
              hintMessage: "This is a hint message",
              successMessage: "This is a success message",
              errorMessage: "This is an error message",
              warningMessage: "This is a warning message",
            }}
          />

          <p>Current value: "{basicText}"</p>
        </div>
        <div>
          Primary
          <IconGlobal
            type="lucide"
            isActive={true}
            lucid="User"
            version="primary"
            // className="trial"
          />
          Secondary
          <IconGlobal
            type="lucide"
            isActive={true}
            lucid="User"
            version="secondary"
            // className="trial"
          />
          tertially
          <IconGlobal
            type="lucide"
            isActive={true}
            lucid="User"
            version="tertiary"
            // className="trial"
          />
        </div>

        <div className="button-row">
          <div className="button-row-item">
            <p>With both icons (PRIMARY)</p>
            <ButtonGlobal
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
              children="Confirm"
              withIcon={true}
              rightIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
            />
          </div>
          <div className="button-row-item">
            <p>With both icons (SECONDARY)</p>
            <ButtonGlobal
              version="secondary" // primary, secondary, tertiary
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
              children="Cancel"
              withIcon={true}
              rightIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
            />
          </div>
          <div className="button-row-item">
            <p>With both icons (TERTIARY)</p>
            <ButtonGlobal
              version="tertiary" // primary, secondary, tertiary
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
              // children="Request"
              withIcon={true}
              // rightIcon={{
              //   isActive: true,
              //   type: "lucide",
              //   lucid: "User",
              // }}
            />
          </div>

          <div className="button-row-item">
            <p>Only Text</p>
            <ButtonGlobal children="Click me" />
          </div>
          <div className="button-row-item">
            <p>With left icon</p>
            <ButtonGlobal
              children="Click me"
              withIcon={true}
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
            />
          </div>
          <div className="button-row-item">
            <p>With right icon</p>
            <ButtonGlobal
              children="Click me"
              withIcon={true}
              rightIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
            />
          </div>

          <div className="button-row-item">
            <p>Onlyicon</p>
            <ButtonGlobal
              withIcon={true}
              rightIcon={{
                isActive: true,
                type: "lucide",
                lucid: "User",
              }}
            />
          </div>
        </div>
        {/* <div style={{ marginBottom: "20px" }}>
          <h3>1.5 Basic IconGlobal Tests</h3>
          <div className="icon-row">
            <span>Lucide Icons: </span>
            <IconGlobal
              isActive={true}
              type="lucide"
              lucid="User"
              version="normal"
            />
            <IconGlobal
              isActive={true}
              type="lucide"
              lucid="Mail"
              version="primary"
            />
            <IconGlobal
              isActive={true}
              type="lucide"
              lucid="Lock"
              version="secondary"
            />
            <IconGlobal
              isActive={true}
              type="lucide"
              lucid="Search"
              version="light"
            />
            <IconGlobal
              isActive={true}
              type="lucide"
              lucid="Settings"
              version="dark"
            />
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Journey;
