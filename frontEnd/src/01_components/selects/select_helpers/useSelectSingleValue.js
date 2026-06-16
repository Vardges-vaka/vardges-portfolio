import { useState, useCallback } from "react";
import { createSelectChangeEvent } from "./selectFieldUtils.js";

/** Controlled / uncontrolled single-value state for select wrappers. */
export const useSelectSingleValue = ({
  value,
  defaultValue,
  onChange,
  name,
  id,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const resolvedValue = isControlled ? value : internalValue;

  const fireChange = useCallback(
    (newValue) => {
      if (!isControlled) setInternalValue(newValue);
      onChange?.(createSelectChangeEvent({ value: newValue, name, id }));
    },
    [isControlled, onChange, name, id],
  );

  return { isControlled, resolvedValue, fireChange, setInternalValue };
};

export default useSelectSingleValue;
