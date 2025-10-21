import { useMemo, useState, useCallback, useEffect } from "react";

export const useAdminSIgnin = () => {
  const [adminSigninForm, setAdminSigninForm] = useState({
    email: "",
    password: "",
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);

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
      handleSignin: () => {
        console.log("handleSignin");
      },
    },
  };
};
