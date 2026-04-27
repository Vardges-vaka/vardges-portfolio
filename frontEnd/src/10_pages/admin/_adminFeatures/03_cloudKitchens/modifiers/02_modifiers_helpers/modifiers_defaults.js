const EMPTY_LOCALIZED = { en: "", ru: "", ar: "", hy: "" };

const EMPTY_DESCRIPTIONS = {
  aggregators: { ...EMPTY_LOCALIZED },
  website: { ...EMPTY_LOCALIZED },
  google: { ...EMPTY_LOCALIZED },
};

export const EMPTY_OPTION_ROW = {
  name: { ...EMPTY_LOCALIZED },
  descriptions: JSON.parse(JSON.stringify(EMPTY_DESCRIPTIONS)),
  cost: 0,
  sellingPrice: 0,
  isActive: true,
};

export const EMPTY_MODIFIER_FORM = {
  name: { ...EMPTY_LOCALIZED },
  descriptions: JSON.parse(JSON.stringify(EMPTY_DESCRIPTIONS)),
  type: "optional",
  selectionQty: "onlyOne",
  cost: 0,
  options: [],
  isActive: true,
};

const hydrateLocalized = (obj) => ({
  en: obj?.en ?? "",
  ru: obj?.ru ?? "",
  ar: obj?.ar ?? "",
  hy: obj?.hy ?? "",
});

const hydrateDescriptions = (obj) => ({
  aggregators: hydrateLocalized(obj?.aggregators),
  website: hydrateLocalized(obj?.website),
  google: hydrateLocalized(obj?.google),
});

const hydrateOption = (opt) => ({
  _id: opt?._id ?? undefined,
  name: hydrateLocalized(opt?.name),
  descriptions: hydrateDescriptions(opt?.descriptions),
  cost: opt?.cost ?? 0,
  sellingPrice: opt?.sellingPrice ?? 0,
  isActive: opt?.isActive ?? true,
});

export const hydrateModifierForm = (modifier) => ({
  name: hydrateLocalized(modifier?.name),
  descriptions: hydrateDescriptions(modifier?.descriptions),
  type: modifier?.type ?? "optional",
  selectionQty: modifier?.selectionQty ?? "onlyOne",
  cost: modifier?.cost ?? 0,
  options: Array.isArray(modifier?.options)
    ? modifier.options.map(hydrateOption)
    : [],
  isActive: modifier?.isActive ?? true,
});

export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") {
    return {
      type: hydrated.type,
      selectionQty: hydrated.selectionQty,
      cost: hydrated.cost,
      isActive: hydrated.isActive,
    };
  }
  if (sectionKey === "name") return { ...hydrated.name };
  if (sectionKey === "descriptions") {
    return JSON.parse(JSON.stringify(hydrated.descriptions));
  }
  if (sectionKey === "options") {
    return hydrated.options.map((opt) => ({ ...opt }));
  }
  return hydrated[sectionKey];
};

export const pickAllSectionsDraft = (hydrated) => ({
  basic: {
    type: hydrated.type,
    selectionQty: hydrated.selectionQty,
    cost: hydrated.cost,
    isActive: hydrated.isActive,
  },
  name: { ...hydrated.name },
  descriptions: JSON.parse(JSON.stringify(hydrated.descriptions)),
  options: hydrated.options.map((opt) => JSON.parse(JSON.stringify(opt))),
});

const isDeeplyEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isDeeplyEmpty);
  return false;
};

export const isSectionEmpty = (modifier, sectionKey) => {
  if (!modifier) return true;
  if (sectionKey === "basic") {
    return (
      !modifier.type &&
      !modifier.selectionQty &&
      modifier.cost === undefined &&
      modifier.isActive === undefined
    );
  }
  if (sectionKey === "name") return isDeeplyEmpty(modifier.name);
  if (sectionKey === "descriptions") return isDeeplyEmpty(modifier.descriptions);
  if (sectionKey === "options") {
    return !Array.isArray(modifier.options) || modifier.options.length === 0;
  }
  return isDeeplyEmpty(modifier?.[sectionKey]);
};
