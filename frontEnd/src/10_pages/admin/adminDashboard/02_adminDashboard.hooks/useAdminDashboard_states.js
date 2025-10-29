import { useMemo, useState, useCallback } from "react";

export const useAdminDashboard_states = () => {
  const [isPinned, setIsPinned] = useState(false);
  return {
    states: {
      isPinned,
    },
    setters: {
      setIsPinned,
    },
  };
};
