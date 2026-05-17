import { CUISINE_TAGS } from "./cuisineTags.js";

const byValue = Object.fromEntries(CUISINE_TAGS.map((t) => [t.value, t]));

/**
 * Build canonical `cuisineTypes` rows for mock data — every id must exist in `CUISINE_TAGS`.
 * @param {...string} valueIds
 */
export const mc = (...valueIds) =>
  valueIds
    .map((id) => byValue[id])
    .filter(Boolean)
    .map((t) => ({
      value: t.value,
      tag: t.label,
      description: t.description,
    }));
