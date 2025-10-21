import { useMemo, useState, useCallback } from "react";

export const useAdminWelcome_handlers = ({ states, setters, apiHelpers }) => {
  const handleActiveForm = (e) => {
    setters.setActiveForm(e.target.dataset.value);
  };
  return {
    handlers: {
      handleActiveForm,
    },
  };
};
