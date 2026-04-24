// Date validator. Accepts:
//   - empty string / null / undefined (optional)
//   - Date instance
//   - ISO / "YYYY-MM-DD" strings that Date can parse
//
// Returns a canonical Date on success via `sanitized` so Mongoose saves a
// proper Date rather than a possibly-ambiguous string.

export const date_vld = (value, { field = "Date" } = {}) => {
  if (value === undefined || value === null || value === "") {
    return { isValid: true, message: `${field} is empty (ok)`, sanitized: null };
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return { isValid: false, message: `${field} is an invalid Date` };
    }
    return { isValid: true, message: `${field} is valid`, sanitized: value };
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return { isValid: false, message: `${field} must be a date or ISO string` };
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return {
      isValid: false,
      message: `${field} could not be parsed as a date`,
    };
  }

  return { isValid: true, message: `${field} is valid`, sanitized: d };
};
