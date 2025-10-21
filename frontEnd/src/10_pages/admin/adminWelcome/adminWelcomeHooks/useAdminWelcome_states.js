import { useMemo, useState, useCallback } from "react";

export const useAdminWelcome_states = () => {
  const [admin_signin_form, setAdmin_signin_form] = useState({});
  const [admin_signup_form, setAdmin_signup_form] = useState({});
  const [admin_forgotPassword_form, setAdmin_forgotPassword_form] = useState(
    {}
  );
  const [activeForm, setActiveForm] = useState("signin");

  return {
    states: {
      admin_signin_form,
      admin_signup_form,
      admin_forgotPassword_form,
      activeForm,
    },
    setters: {
      setAdmin_signin_form,
      setAdmin_signup_form,
      setAdmin_forgotPassword_form,
      setActiveForm,
    },
  };
};
