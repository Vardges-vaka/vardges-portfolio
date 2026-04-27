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

export const computeBulkDiff = (originalItem, bulkPayload) => {
  const out = [];
  for (const key of Object.keys(bulkPayload ?? {})) {
    walk(key, originalItem?.[key], bulkPayload[key], out);
  }
  return out;
};

export const computeSectionDiff = (originalItem, updatedPayload, sectionKey) => {
  const out = [];
  if (sectionKey === "basic") {
    for (const key of ["cost", "sellingPrice", "isActive"]) {
      if (!scalarEq(originalItem?.[key], updatedPayload?.[key])) {
        out.push({
          field: key,
          from: normalize(originalItem?.[key]),
          to: normalize(updatedPayload?.[key]),
        });
      }
    }
    walk("activeTimings", originalItem?.activeTimings, updatedPayload?.activeTimings, out);
    return out;
  }

  if (sectionKey === "name") {
    walk("name", originalItem?.name, updatedPayload?.name, out);
    return out;
  }

  if (sectionKey === "modifiers") {
    walk("modifiers", originalItem?.modifiers, updatedPayload?.modifiers, out);
    return out;
  }

  walk(sectionKey, originalItem?.[sectionKey], updatedPayload?.[sectionKey], out);
  return out;
};
