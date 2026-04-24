// Produces a human-readable diff between the original branch doc and a
// section-level update payload, used to populate the confirmation modal.
//
// Input  : (originalBranch, updatedPayload, sectionKey)
//          - updatedPayload is shaped as { [sectionKey]: ... } OR { name }/{ notes }
// Output : Array<{ field, from, to }>
//          `field` is a dotted path rooted at the section (e.g. "contact.manager.phone").

// "YYYY-MM-DD" sniff — avoids false-positive diffs between a Date/ISO-string
// original and a draft date-input string.
const YMD_RE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

// Normalizes values for equality + display.
// - Dates and full ISO timestamps are collapsed to "YYYY-MM-DD" (aligns with <input type="date">).
// - Empty string / null / undefined are treated as the same "unset" value.
// - Numeric strings are coerced to numbers so "10" and 10 compare equal.
const normalize = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  if (value instanceof Date) {
    const iso = value.toISOString();
    return iso.slice(0, 10);
  }
  if (typeof value === "string") {
    if (YMD_RE.test(value)) return value;
    if (ISO_DATE_RE.test(value)) return value.slice(0, 10);
    // Numeric-looking string → coerce to number so "10" === 10
    if (value !== "" && !Number.isNaN(Number(value))) {
      const n = Number(value);
      if (String(n) === value.trim()) return n;
    }
    return value;
  }
  return value;
};

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// Returns true when two scalar (or normalized) values are equal.
const scalarEq = (a, b) => normalize(a) === normalize(b);

// Walks two aligned trees and pushes {field,from,to} for each leaf diff.
const walk = (prefix, fromTree, toTree, out) => {
  // Array branch — treated as a coarse "n items vs m items" row PLUS per-row
  // diffs when lengths match. Good enough for the variable costs list.
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
    for (let i = 0; i < toArr.length; i += 1) {
      walk(`${prefix}[${i}]`, fromArr[i], toArr[i], out);
    }
    return;
  }

  // Object branch — descend into every key of the update (toTree is the SOT).
  if (isObject(toTree) || isObject(fromTree)) {
    const keys = new Set([
      ...Object.keys(fromTree ?? {}),
      ...Object.keys(toTree ?? {}),
    ]);
    for (const key of keys) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      walk(nextPrefix, fromTree?.[key], toTree?.[key], out);
    }
    return;
  }

  // Scalar leaf
  if (!scalarEq(fromTree, toTree)) {
    out.push({ field: prefix, from: normalize(fromTree), to: normalize(toTree) });
  }
};

// Diffs a multi-section bulk payload and prefixes each field with its section
// name (e.g. "contact.manager.phone") so the confirm modal can group them.
// `bulkPayload` shape: { name?, location?, contact?, ..., notes? }.
export const computeBulkDiff = (originalBranch, bulkPayload) => {
  const out = [];
  for (const key of Object.keys(bulkPayload ?? {})) {
    // Scalar shortcuts: "name" → diff against originalBranch.name.
    if (key === "name") {
      if (!scalarEq(originalBranch?.name, bulkPayload.name)) {
        out.push({
          field: "name",
          from: normalize(originalBranch?.name),
          to: normalize(bulkPayload.name),
        });
      }
      continue;
    }
    if (key === "notes") {
      if (!scalarEq(originalBranch?.notes, bulkPayload.notes)) {
        out.push({
          field: "notes",
          from: normalize(originalBranch?.notes),
          to: normalize(bulkPayload.notes),
        });
      }
      continue;
    }
    // Subdoc — reuse walk() with the key as the path prefix.
    walk(key, originalBranch?.[key], bulkPayload[key], out);
  }
  return out;
};

// Main entry. For scalar sections (basic/notes) the payload is { name }/{ notes }
// and we diff the scalar directly against the original branch document.
export const computeSectionDiff = (originalBranch, updatedPayload, sectionKey) => {
  const out = [];

  if (sectionKey === "basic") {
    if (!scalarEq(originalBranch?.name, updatedPayload?.name)) {
      out.push({
        field: "name",
        from: normalize(originalBranch?.name),
        to: normalize(updatedPayload?.name),
      });
    }
    return out;
  }

  if (sectionKey === "notes") {
    if (!scalarEq(originalBranch?.notes, updatedPayload?.notes)) {
      out.push({
        field: "notes",
        from: normalize(originalBranch?.notes),
        to: normalize(updatedPayload?.notes),
      });
    }
    return out;
  }

  // Subdoc sections: diff the section subtree and prefix every field accordingly.
  walk(sectionKey, originalBranch?.[sectionKey], updatedPayload?.[sectionKey], out);
  return out;
};
