// Immutable nested setter for dotted field paths.
// setByPath({a:{b:1}}, "a.b", 2) -> {a:{b:2}}  (new objects along the path)
export const setByPath = (obj, path, value) => {
  const keys = path.split(".");
  const next = Array.isArray(obj) ? [...obj] : { ...obj };
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const child = cursor[key];
    cursor[key] = Array.isArray(child)
      ? [...child]
      : { ...(child ?? {}) };
    cursor = cursor[key];
  }
  cursor[keys[keys.length - 1]] = value;
  return next;
};
