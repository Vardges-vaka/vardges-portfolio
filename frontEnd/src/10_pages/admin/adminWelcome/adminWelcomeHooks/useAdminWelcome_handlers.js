import { useMemo, useState, useCallback } from "react";

export const useAdminWelcome_handlers = ({ states, setters, apiHelpers }) => {
  const handleActiveForm = (e) => {
    // Use currentTarget to get the button element, not the clicked child (span)
    const value = e.currentTarget.dataset.value;
    if (value) {
      setters.setActiveForm(value);
    }
  };
  return {
    handlers: {
      handleActiveForm,
    },
  };
};
