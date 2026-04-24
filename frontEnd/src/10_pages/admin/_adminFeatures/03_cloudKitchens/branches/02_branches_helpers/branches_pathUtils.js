// Tiny path utilities for working with deeply nested form state.
// We intentionally avoid pulling in a dependency like lodash.

// Accepts "a.b.c" string OR array ["a","b","c"]; returns [..] tokens.
const toTokens = (path) =>
  Array.isArray(path) ? path : String(path).split(".");

// Read a nested value. Returns undefined for any missing link in the chain.
export const getByPath = (obj, path) => {
  if (obj == null) return undefined;
  const tokens = toTokens(path);
  let cursor = obj;
  for (const key of tokens) {
    if (cursor == null) return undefined;
    cursor = cursor[key];
  }
  return cursor;
};

// Immutable-style deep set. Returns a NEW object/array with the path written.
// Array indices inside the path (numeric tokens) are handled by cloning the
// array at that step — this keeps React state updates predictable.
export const setByPath = (obj, path, value) => {
  const tokens = toTokens(path);
  if (tokens.length === 0) return value;

  const [head, ...rest] = tokens;
  const isArrayIndex = /^\d+$/.test(head);
  const base = obj == null ? (isArrayIndex ? [] : {}) : obj;

  if (rest.length === 0) {
    if (Array.isArray(base)) {
      const next = base.slice();
      next[Number(head)] = value;
      return next;
    }
    return { ...base, [head]: value };
  }

  const child = base != null ? base[head] : undefined;
  const updatedChild = setByPath(child, rest, value);

  if (Array.isArray(base)) {
    const next = base.slice();
    next[Number(head)] = updatedChild;
    return next;
  }
  return { ...base, [head]: updatedChild };
};
