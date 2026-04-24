// Loose phone validator. Intentionally permissive: we just want to reject
// obvious garbage ("hello", "<script>", etc.) so `tel:` / `wa.me` / `t.me`
// launcher links never receive junk.
//
// Accepts: +, digits, spaces, dashes, parentheses, dots. 6–20 chars total.
// Optional: when `value` is empty/undefined we treat it as valid (the field
// is optional at the schema level).

const PHONE_RE = /^\+?[0-9\s\-().]{6,20}$/;

export const phone_vld = (value, { field = "Phone" } = {}) => {
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

  if (!PHONE_RE.test(trimmed)) {
    return {
      isValid: false,
      message: `${field} format is invalid (use + and digits, 6–20 chars)`,
    };
  }

  return { isValid: true, message: `${field} is valid`, sanitized: trimmed };
};
