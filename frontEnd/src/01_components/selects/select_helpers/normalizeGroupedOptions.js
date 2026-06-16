import { normalizeSelectOptions } from "./normalizeSelectOptions.js";

/**
 * Flatten grouped options into a single list (keeps groupLabel on each item).
 */
export const normalizeGroupedOptions = (
  groups = [],
  {
    optionValueKey = "value",
    optionLabelKey = "label",
    groupLabelKey = "label",
    optionsKey = "options",
    optionsType = "textOnly",
  } = {},
) => {
  const flat = [];

  groups.forEach((group) => {
    const groupLabel = group[groupLabelKey] ?? "";
    const items = group[optionsKey] ?? [];

    normalizeSelectOptions(items, {
      optionValueKey,
      optionLabelKey,
      optionsType,
    }).forEach((opt) => {
      flat.push({ ...opt, groupLabel });
    });
  });

  return flat;
};

export default normalizeGroupedOptions;
