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

export const computeBulkDiff = (original, bulkPayload) => {
  const out = [];
  for (const key of Object.keys(bulkPayload ?? {})) {
    walk(key, original?.[key], bulkPayload[key], out);
  }
  return out;
};

export const computeSectionDiff = (original, updatedPayload, sectionKey) => {
  const out = [];

  if (sectionKey === "basic") {
    if (!scalarEq(original?.isActive, updatedPayload?.isActive)) {
      out.push({
        field: "isActive",
        from: normalize(original?.isActive),
        to: normalize(updatedPayload?.isActive),
      });
    }
    walk("activeTimings", original?.activeTimings, updatedPayload?.activeTimings, out);
    return out;
  }

  if (sectionKey === "name") {
    walk("name", original?.name, updatedPayload?.name, out);
    return out;
  }

  if (sectionKey === "items") {
    const fromIds = (original?.menuItems ?? []).map((i) => (typeof i === "object" ? i._id : i));
    const toIds = updatedPayload?.menuItems ?? [];
    if (JSON.stringify(fromIds) !== JSON.stringify(toIds)) {
      out.push({
        field: "menuItems",
        from: `${fromIds.length} item(s)`,
        to: `${toIds.length} item(s)`,
      });
    }
    return out;
  }

  walk(sectionKey, original?.[sectionKey], updatedPayload?.[sectionKey], out);
  return out;
};
