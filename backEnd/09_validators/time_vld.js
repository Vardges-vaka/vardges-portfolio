// "HH:mm" 24-hour time validator (what <input type="time"> emits).
// Empty is considered valid (optional field).

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export const time_vld = (value, { field = "Time" } = {}) => {
  if (value === undefined || value === null || value === "") {
    return { isValid: true, message: `${field} is empty (ok)`, sanitized: "" };
  }

  if (typeof value !== "string") {
    return { isValid: false, message: `${field} must be a string` };
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { isValid: true, message: `${field} is empty (ok)`, sanitized: "" };
  }

  if (!TIME_RE.test(trimmed)) {
    return {
      isValid: false,
      message: `${field} must be in HH:mm format (e.g. "07:00", "23:30")`,
    };
  }

  return { isValid: true, message: `${field} is valid`, sanitized: trimmed };
};
