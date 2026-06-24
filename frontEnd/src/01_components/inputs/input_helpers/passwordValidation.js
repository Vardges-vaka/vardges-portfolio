/** Password rules shared across createNew / change kinds. */

export const PASSWORD_KINDS = ["createNew", "AuthLogIn", "change"];

export const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*()_\-=+]/;

export const PASSWORD_REQUIREMENT_KEYS = [
  "minLength",
  "noSpaces",
  "uppercase",
  "lowercase",
  "number",
  "special",
];

export const PASSWORD_REQUIREMENT_LABELS = {
  minLength: "Minimum of 10 characters",
  noSpaces: "No spaces",
  uppercase: "At least one uppercase letter",
  lowercase: "At least one lowercase letter",
  number: "At least one number",
  special: "At least one of: !@#$%^&*()_-=+",
};

export const getPasswordRequirements = (password) => {
  const value = String(password ?? "");

  return {
    minLength: value.length >= 10,
    noSpaces: value.length === 0 || !/\s/.test(value),
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    special: PASSWORD_SPECIAL_REGEX.test(value),
  };
};

export const allPasswordRequirementsMet = (requirements) =>
  Object.values(requirements).every(Boolean);

export const STRENGTH_LEVELS = {
  empty: { key: "empty", label: "Not Valid", level: 0, percent: 0 },
  notValid: { key: "notValid", label: "Not Valid", level: 0, percent: 25 },
  valid: { key: "valid", label: "Valid", level: 1, percent: 50 },
  strong: { key: "strong", label: "Strong", level: 2, percent: 75 },
  unbreakable: {
    key: "unbreakable",
    label: "Unbreakable",
    level: 3,
    percent: 100,
  },
};

/** Score beyond minimum rules → Strong / Unbreakable. */
export const getPasswordStrength = (password) => {
  const value = String(password ?? "");
  if (!value) return STRENGTH_LEVELS.empty;

  const requirements = getPasswordRequirements(value);
  if (!allPasswordRequirementsMet(requirements)) {
    return STRENGTH_LEVELS.notValid;
  }

  let bonus = 0;
  if (value.length >= 14) bonus += 1;
  if (value.length >= 18) bonus += 1;
  if ((value.match(/[0-9]/g) || []).length >= 2) bonus += 1;
  if ((value.match(PASSWORD_SPECIAL_REGEX) || []).length >= 2) bonus += 1;
  if ((value.match(/[A-Z]/g) || []).length >= 2) bonus += 1;
  if ((value.match(/[a-z]/g) || []).length >= 2) bonus += 1;

  if (bonus >= 4) return STRENGTH_LEVELS.unbreakable;
  if (bonus >= 2) return STRENGTH_LEVELS.strong;
  return STRENGTH_LEVELS.valid;
};

export const getConfirmMatchStatus = (password, confirmPassword) => {
  const confirm = String(confirmPassword ?? "");
  if (!confirm) return "empty";
  return String(password ?? "") === confirm ? "match" : "mismatch";
};

export const DEFAULT_CONFIRM_HINT = "Retype or paste the above password.";

/** AuthLogIn only — password field vs API/auth key field. */
export const AUTH_LOG_IN_KIND_OF = ["password", "authKey"];

/** Four distinct default left icons by field role. */
export const PASSWORD_FIELD_ICON_ROLES = {
  authKey: {
    isActive: true,
    type: "lucide",
    lucidIcon: "KeyRound",
    decorative: true,
  },
  lock: {
    isActive: true,
    type: "lucide",
    lucidIcon: "Lock",
    decorative: true,
  },
  new: {
    isActive: true,
    type: "lucide",
    lucidIcon: "KeySquare",
    decorative: true,
  },
  confirm: {
    isActive: true,
    type: "lucide",
    lucidIcon: "Repeat2",
    decorative: true,
  },
};

export const getPasswordFieldLeftIcon = (role) =>
  PASSWORD_FIELD_ICON_ROLES[role] ?? PASSWORD_FIELD_ICON_ROLES.lock;

/** @deprecated use PASSWORD_FIELD_ICON_ROLES.lock */
export const DEFAULT_PASSWORD_LEFT_ICON = PASSWORD_FIELD_ICON_ROLES.lock;
