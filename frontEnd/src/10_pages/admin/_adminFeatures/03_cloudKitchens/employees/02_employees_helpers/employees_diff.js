const normalize = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return value.slice(0, 10);
  if (typeof value === "object" && value?._id) return value._id;
  return value;
};

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const scalarEq = (a, b) => normalize(a) === normalize(b);

const walk = (prefix, fromTree, toTree, out) => {
  if (Array.isArray(fromTree) || Array.isArray(toTree)) {
    const fromArr = Array.isArray(fromTree) ? fromTree : [];
    const toArr = Array.isArray(toTree) ? toTree : [];
    if (fromArr.length !== toArr.length) {
      out.push({ field: prefix, from: `${fromArr.length} item(s)`, to: `${toArr.length} item(s)` });
      return;
    }
    for (let index = 0; index < toArr.length; index += 1) walk(`${prefix}[${index}]`, fromArr[index], toArr[index], out);
    return;
  }
  if (isObject(fromTree) || isObject(toTree)) {
    const keys = new Set([...Object.keys(fromTree ?? {}), ...Object.keys(toTree ?? {})]);
    for (const key of keys) walk(prefix ? `${prefix}.${key}` : key, fromTree?.[key], toTree?.[key], out);
    return;
  }
  if (!scalarEq(fromTree, toTree)) out.push({ field: prefix, from: normalize(fromTree), to: normalize(toTree) });
};

export const computeBulkDiff = (original, payload) => {
  const out = [];
  for (const key of Object.keys(payload ?? {})) walk(key, original?.[key], payload[key], out);
  return out;
};

export const computeSectionDiff = (original, payload) => computeBulkDiff(original, payload);
