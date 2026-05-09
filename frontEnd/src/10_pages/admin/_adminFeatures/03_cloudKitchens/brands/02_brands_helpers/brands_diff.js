import { hydrateBrandForm } from "./brands_defaults.js";

const normalize = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  return value;
};

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const scalarEq = (a, b) => normalize(a) === normalize(b);

const walk = (prefix, fromTree, toTree, out) => {
  if (Array.isArray(fromTree) || Array.isArray(toTree)) {
    const fromArr = Array.isArray(fromTree) ? fromTree : [];
    const toArr = Array.isArray(toTree) ? toTree : [];

    if (fromArr.length !== toArr.length) {
      out.push({
        field: prefix,
        from: `${fromArr.length} item(s)`,
        to: `${toArr.length} item(s)`,
      });
      return;
    }

    for (let index = 0; index < toArr.length; index += 1) {
      walk(`${prefix}[${index}]`, fromArr[index], toArr[index], out);
    }
    return;
  }

  if (isObject(toTree) || isObject(fromTree)) {
    const keys = new Set([
      ...Object.keys(fromTree ?? {}),
      ...Object.keys(toTree ?? {}),
    ]);
    for (const key of keys) {
      walk(prefix ? `${prefix}.${key}` : key, fromTree?.[key], toTree?.[key], out);
    }
    return;
  }

  if (!scalarEq(fromTree, toTree)) {
    out.push({ field: prefix, from: normalize(fromTree), to: normalize(toTree) });
  }
};

export const computeBulkDiff = (originalBrand, bulkPayload) => {
  const out = [];
  for (const key of Object.keys(bulkPayload ?? {})) {
    walk(key, originalBrand?.[key], bulkPayload[key], out);
  }
  return out;
};

export const computeSectionDiff = (originalBrand, updatedPayload, sectionKey) => {
  const out = [];

  const hydrated = hydrateBrandForm(originalBrand);
  const originalSection =
    sectionKey === "basic"
      ? {
          name: hydrated.name,
          tagline: hydrated.tagline,
          isActive: hydrated.isActive,
        }
      : hydrated?.[sectionKey];

  const updatedSection =
    sectionKey === "basic"
      ? {
          name: updatedPayload?.name,
          tagline: updatedPayload?.tagline,
          isActive: updatedPayload?.isActive,
        }
      : updatedPayload?.[sectionKey];

  walk(sectionKey, originalSection, updatedSection, out);
  return out;
};
