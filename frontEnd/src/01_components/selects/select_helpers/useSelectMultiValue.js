import { useState, useCallback, useMemo } from "react";
import {
  createSelectChangeEvent,
  parseMultiValue,
  joinMultiValue,
} from "./selectFieldUtils.js";

/** Controlled / uncontrolled multi-value state (array or comma string). */
export const useSelectMultiValue = ({
  value,
  defaultValue,
  onChange,
  name,
  id,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(() =>
    parseMultiValue(defaultValue ?? []),
  );

  const resolvedValues = useMemo(
    () => (isControlled ? parseMultiValue(value) : internalValue),
    [isControlled, value, internalValue],
  );

  const fireChange = useCallback(
    (nextValues) => {
      const normalized = parseMultiValue(nextValues);
      if (!isControlled) setInternalValue(normalized);
      onChange?.(
        createSelectChangeEvent({
          value: joinMultiValue(normalized),
          name,
          id,
        }),
      );
    },
    [isControlled, onChange, name, id],
  );

  const toggleValue = useCallback(
    (optionValue) => {
      const key = String(optionValue);
      const next = resolvedValues.some((v) => String(v) === key)
        ? resolvedValues.filter((v) => String(v) !== key)
        : [...resolvedValues, key];
      fireChange(next);
    },
    [resolvedValues, fireChange],
  );

  return { isControlled, resolvedValues, fireChange, toggleValue };
};

export default useSelectMultiValue;
