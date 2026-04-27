export const setByPath = (source, path, value) => {
  const keys = String(path).split(".");
  const clone = Array.isArray(source) ? source.slice() : { ...(source ?? {}) };
  let cursor = clone;

  for (let index = 0; index < keys.length - 1; index += 1) {
    const key = keys[index];
    const next = cursor[key];
    cursor[key] = Array.isArray(next) ? next.slice() : { ...(next ?? {}) };
    cursor = cursor[key];
  }

  cursor[keys[keys.length - 1]] = value;
  return clone;
};
