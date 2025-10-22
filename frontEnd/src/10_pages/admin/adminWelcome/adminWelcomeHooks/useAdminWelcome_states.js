import { useMemo, useState, useCallback } from "react";

export const useAdminWelcome_states = () => {
  const [activeForm, setActiveForm] = useState("signin");

  return {
    states: {
      activeForm,
    },
    setters: {
      setActiveForm,
    },
  };
};
