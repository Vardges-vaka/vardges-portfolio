import { useMemo, useState, useCallback, useEffect } from "react";

export const useAdminSignin = () => {
  const [adminSigninForm, setAdminSigninForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSignin_submit = () => {};
  const handleSignin_change = (e) => {
    setAdminSigninForm({ ...adminSigninForm, [e.target.name]: e.target.value });
  };

  return {
    states: {
      adminSigninForm,
      isForgotPassword,
    },
    setters: {
      setAdminSigninForm,
      setIsForgotPassword,
    },
    handlers: {
      handleSignin_submit,
      handleSignin_change,
    },
  };
};
