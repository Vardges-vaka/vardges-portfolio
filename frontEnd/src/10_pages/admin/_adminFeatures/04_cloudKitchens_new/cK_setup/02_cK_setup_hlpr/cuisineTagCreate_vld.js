const SLUG_PATTERN = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i;

export const normalizeCuisineTagSlug = (value = "") =>
  String(value).trim().toLowerCase();

export const isCuisineTagValueTaken = (
  value,
  existingTags = [],
  excludeId = null,
) => {
  const normalized = normalizeCuisineTagSlug(value);
  if (!normalized) return false;

  return existingTags.some((tag) => {
    if (excludeId && tag?._id === excludeId) return false;
    return normalizeCuisineTagSlug(tag?.value) === normalized;
  });
};

export const validateCuisineTagCreate = (formData = {}, existingTags = []) => {
  const errors = {};
  const value = String(formData.value ?? "").trim();
  const label = String(formData.label ?? "").trim();

  if (!value) {
    errors.value = "Value (slug) is required.";
  } else if (!SLUG_PATTERN.test(value)) {
    errors.value = "Use letters, numbers, hyphens, or underscores only.";
  } else if (isCuisineTagValueTaken(value, existingTags)) {
    errors.value = "This slug is already used by another cuisine tag.";
  }

  if (!label) {
    errors.label = "Label is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    message: Object.values(errors)[0] || "",
  };
};

export const buildCuisineTagValueFieldError = (value, existingTags = []) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "";
  if (!SLUG_PATTERN.test(trimmed)) {
    return "Use letters, numbers, hyphens, or underscores only.";
  }
  if (isCuisineTagValueTaken(trimmed, existingTags)) {
    return "This slug is already used by another cuisine tag.";
  }
  return "";
};
