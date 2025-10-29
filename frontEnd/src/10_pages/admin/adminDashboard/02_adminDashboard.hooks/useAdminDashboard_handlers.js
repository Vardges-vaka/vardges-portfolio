import { useMemo, useState, useCallback } from "react";

export const useAdminDashboard_handlers = ({
  states,
  setters,
  api_helpers,
  translations,
}) => {
  const handlePinClick = () => {
    setters.setIsPinned(!states.isPinned);
  };
  return {
    handlers: {},
  };
};
