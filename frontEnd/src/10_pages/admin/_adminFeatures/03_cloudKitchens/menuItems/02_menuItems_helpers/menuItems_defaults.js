const EMPTY_LOCALIZED = { en: "", ru: "", ar: "" };

const EMPTY_DESCRIPTION_BUNDLE = {
  aggregators: { ...EMPTY_LOCALIZED },
  website: { ...EMPTY_LOCALIZED },
  google: { ...EMPTY_LOCALIZED },
};

const EMPTY_IMAGES = {
  aggregators: "",
  website: "",
  google: "",
  original: "",
  icon: "",
};

const EMPTY_ACTIVE_TIMINGS = {
  isAlwaysActive: true,
  windows: [],
};

export const EMPTY_MENU_ITEM_FORM = {
  name: { ...EMPTY_LOCALIZED },
  descriptions: {
    aggregators: { ...EMPTY_LOCALIZED },
    website: { ...EMPTY_LOCALIZED },
    google: { ...EMPTY_LOCALIZED },
  },
  cost: 0,
  sellingPrice: 0,
  images: { ...EMPTY_IMAGES },
  recipeFile: "",
  ingredients: [],
  modifiers: [],
  activeTimings: { ...EMPTY_ACTIVE_TIMINGS },
  isActive: true,
};

export const hydrateMenuItemForm = (item) => ({
  name: {
    en: item?.name?.en ?? "",
    ru: item?.name?.ru ?? "",
    ar: item?.name?.ar ?? "",
  },
  descriptions: {
    aggregators: {
      en: item?.descriptions?.aggregators?.en ?? "",
      ru: item?.descriptions?.aggregators?.ru ?? "",
      ar: item?.descriptions?.aggregators?.ar ?? "",
    },
    website: {
      en: item?.descriptions?.website?.en ?? "",
      ru: item?.descriptions?.website?.ru ?? "",
      ar: item?.descriptions?.website?.ar ?? "",
    },
    google: {
      en: item?.descriptions?.google?.en ?? "",
      ru: item?.descriptions?.google?.ru ?? "",
      ar: item?.descriptions?.google?.ar ?? "",
    },
  },
  cost: item?.cost ?? 0,
  sellingPrice: item?.sellingPrice ?? 0,
  images: {
    aggregators: item?.images?.aggregators ?? "",
    website: item?.images?.website ?? "",
    google: item?.images?.google ?? "",
    original: item?.images?.original ?? "",
    icon: item?.images?.icon ?? "",
  },
  recipeFile: item?.recipeFile ?? "",
  ingredients: Array.isArray(item?.ingredients)
    ? item.ingredients.map((ing) => (typeof ing === "string" ? ing : ing?._id ?? ""))
    : [],
  modifiers: Array.isArray(item?.modifiers)
    ? item.modifiers.map((mod) => (typeof mod === "string" ? mod : mod?._id ?? ""))
    : [],
  activeTimings: {
    isAlwaysActive: item?.activeTimings?.isAlwaysActive ?? true,
    windows: Array.isArray(item?.activeTimings?.windows)
      ? item.activeTimings.windows.map((w) => ({
          label: w?.label ?? "",
          from: w?.from ?? "",
          to: w?.to ?? "",
        }))
      : [],
  },
  isActive: item?.isActive ?? true,
});

export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") {
    return {
      cost: hydrated.cost,
      sellingPrice: hydrated.sellingPrice,
      isActive: hydrated.isActive,
      activeTimings: hydrated.activeTimings,
    };
  }
  if (sectionKey === "name") return hydrated.name;
  if (sectionKey === "modifiers") return hydrated.modifiers;
  if (sectionKey === "descriptions") return hydrated.descriptions;
  return hydrated[sectionKey];
};

export const pickAllSectionsDraft = (hydrated) => ({
  basic: {
    cost: hydrated.cost,
    sellingPrice: hydrated.sellingPrice,
    isActive: hydrated.isActive,
    activeTimings: hydrated.activeTimings,
  },
  name: hydrated.name,
  modifiers: hydrated.modifiers,
  descriptions: hydrated.descriptions,
});

const isDeeplyEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isDeeplyEmpty);
  return false;
};

export const isSectionEmpty = (item, sectionKey) => {
  if (!item) return true;
  if (sectionKey === "basic") {
    return (
      (item.cost === undefined || item.cost === 0) &&
      (item.sellingPrice === undefined || item.sellingPrice === 0) &&
      item.isActive === undefined
    );
  }
  if (sectionKey === "name") return isDeeplyEmpty(item?.name);
  if (sectionKey === "modifiers") return !item?.modifiers?.length;
  if (sectionKey === "descriptions") return isDeeplyEmpty(item?.descriptions);
  return isDeeplyEmpty(item?.[sectionKey]);
};
