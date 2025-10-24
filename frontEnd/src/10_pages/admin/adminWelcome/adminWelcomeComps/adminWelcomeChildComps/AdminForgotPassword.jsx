import React from "react";
import PropTypes from "prop-types";
import {
  InputGlobal,
  ButtonGlobal,
} from "../../../../../01_components/components.index.js";
import { FieldMessage } from "../../../../../01_components/stateComponents/_stateComponents.index.js";

import "./_styles/adminForgotPassword.css";

const AdminForgotPassword = ({
  onSubmit,
  onChange,
  onToggle,
  state,
  status,
  t,
}) => {
  return (
    <form
      className="adminSignin adminSignin--slideIn adminSignin--forgotPassword"
      onSubmit={onSubmit}>
      <button
        type="button"
        className="adminSignin__backButton"
        onClick={onToggle}
        disabled={status.isLoading}>
        <span className="adminSignin__backIcon">←</span>
        <span>{t("signin.backButton")}</span>
      </button>

      <div className="adminSignin__forgotTitle">
        <h3>{t("forgotPassword.title")}</h3>
        <p>{t("forgotPassword.message")}</p>
      </div>

      <InputGlobal
        type="email"
        name="forgotPasswordEmail"
        placeholder={t("email.placeholder")}
        value={state}
        onChange={onChange}
        withLabel={true}
        labelProps={{
          title: t("email.label"),
          message: t("email.message"),
        }}
        withLeftIcon={true}
        leftIconProps={{
          isActive: true,
          type: "lucide",
          lucid: "Mail",
        }}
        withMessage={false}
        disabled={status.isLoading}
      />

      {status.error && (
        <FieldMessage
          isActive={true}
          type="error"
          message={status.error}
          className="adminSignin__message"
        />
      )}

      {status.success && (
        <FieldMessage
          isActive={true}
          type="success"
          message={status.success}
          className="adminSignin__message"
        />
      )}

      <ButtonGlobal
        type="submit"
        isLoading={status.isLoading}
        disabled={status.isLoading}
        withIcon={true}
        leftIcon={{
          isActive: !status.isLoading,
          type: "lucide",
          lucid: "Send",
        }}>
        {status.isLoading
          ? t("forgotPassword.loading")
          : t("forgotPassword.button")}
      </ButtonGlobal>
    </form>
  );
};

AdminForgotPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  states: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default AdminForgotPassword;
