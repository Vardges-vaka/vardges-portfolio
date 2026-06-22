const OBJECT_ID_PATTERN = /^[a-f0-9]{24}$/i;

export const resolveAuditUserName = (ref) => {
  if (!ref) return "—";

  if (typeof ref === "string") {
    return OBJECT_ID_PATTERN.test(ref) ? "—" : ref;
  }

  if (typeof ref === "object") {
    return ref.name || ref.email || "—";
  }

  return "—";
};

export const hasAuditUserName = (ref) => resolveAuditUserName(ref) !== "—";

export const formatAuditDate = (value) => {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString();
};

export const isCuisineTagDeleted = (tag) => Boolean(tag?.isDeleted);
