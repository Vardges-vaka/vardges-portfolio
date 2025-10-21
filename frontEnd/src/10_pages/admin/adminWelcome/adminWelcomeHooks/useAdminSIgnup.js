import { useMemo, useState, useCallback, useEffect } from "react";

export const useAdminSIgnup = () => {
  const [adminSignupForm, setAdminSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    key: "",
  });

  return {
    states: {
      adminSignupForm,
    },
    setters: {
      setAdminSignupForm,
    },
    handlers: {},
  };
};
