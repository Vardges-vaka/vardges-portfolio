import { useCallback } from "react";

export const useDailySales_handlers = (states, setters, apiHelpers) => {
  const handleSample = useCallback(() => {
    setters.setSampleState("new value");
  }, [setters]);

  return { handlers: { handleSample } };
};
