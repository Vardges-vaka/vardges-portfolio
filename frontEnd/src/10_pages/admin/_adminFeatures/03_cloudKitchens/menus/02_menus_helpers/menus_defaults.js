export const EMPTY_MENU_FORM = {
  name: { en: "", ru: "", ar: "" },
  categories: [],
  branches: [],
  brands: [],
  isActive: true,
};

export const hydrateMenuForm = (menu) => ({
  name: {
    en: menu?.name?.en ?? "",
    ru: menu?.name?.ru ?? "",
    ar: menu?.name?.ar ?? "",
  },
  categories: Array.isArray(menu?.categories)
    ? menu.categories.map((c) => (typeof c === "string" ? c : c?._id))
    : [],
  branches: Array.isArray(menu?.branches)
    ? menu.branches.map((b) => (typeof b === "string" ? b : b?._id))
    : [],
  brands: Array.isArray(menu?.brands)
    ? menu.brands.map((b) => (typeof b === "string" ? b : b?._id))
    : [],
  isActive: menu?.isActive ?? true,
});

export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") {
    return { isActive: hydrated.isActive };
  }
  if (sectionKey === "name") {
    return { ...hydrated.name };
  }
  return hydrated[sectionKey];
};

export const pickAllSectionsDraft = (hydrated) => ({
  basic: { isActive: hydrated.isActive },
  name: { ...hydrated.name },
  categories: hydrated.categories,
  branches: hydrated.branches,
  brands: hydrated.brands,
});

const isDeeplyEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isDeeplyEmpty);
  return false;
};

export const isSectionEmpty = (menu, sectionKey) => {
  if (!menu) return true;
  if (sectionKey === "basic") {
    return menu.isActive === undefined;
  }
  if (sectionKey === "name") {
    return isDeeplyEmpty(menu.name);
  }
  return isDeeplyEmpty(menu?.[sectionKey]);
};
