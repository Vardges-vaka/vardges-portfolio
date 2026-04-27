const EMPTY_ACTIVE_TIMINGS = {
  isAlwaysActive: true,
  windows: [],
};

export const EMPTY_MENU_CATEGORY_FORM = {
  name: { en: "", ru: "", ar: "" },
  menuItems: [],
  activeTimings: { ...EMPTY_ACTIVE_TIMINGS, windows: [] },
  isActive: true,
};

export const hydrateMenuCategoryForm = (cat) => ({
  name: {
    en: cat?.name?.en ?? "",
    ru: cat?.name?.ru ?? "",
    ar: cat?.name?.ar ?? "",
  },
  menuItems: Array.isArray(cat?.menuItems) ? cat.menuItems : [],
  activeTimings: {
    isAlwaysActive: cat?.activeTimings?.isAlwaysActive ?? true,
    windows: Array.isArray(cat?.activeTimings?.windows)
      ? cat.activeTimings.windows.map((w) => ({
          label: w?.label ?? "",
          from: w?.from ?? "",
          to: w?.to ?? "",
        }))
      : [],
  },
  isActive: cat?.isActive ?? true,
});

export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") {
    return {
      isActive: hydrated.isActive,
      activeTimings: hydrated.activeTimings,
    };
  }
  if (sectionKey === "name") {
    return { ...hydrated.name };
  }
  if (sectionKey === "items") {
    return [...hydrated.menuItems];
  }
  return hydrated[sectionKey];
};

export const pickAllSectionsDraft = (hydrated) => ({
  basic: {
    isActive: hydrated.isActive,
    activeTimings: hydrated.activeTimings,
  },
  name: { ...hydrated.name },
  items: [...hydrated.menuItems],
});

const isDeeplyEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isDeeplyEmpty);
  return false;
};

export const isSectionEmpty = (cat, sectionKey) => {
  if (!cat) return true;
  if (sectionKey === "basic") {
    return cat.isActive === undefined && isDeeplyEmpty(cat.activeTimings);
  }
  if (sectionKey === "name") return isDeeplyEmpty(cat.name);
  if (sectionKey === "items") return !Array.isArray(cat.menuItems) || cat.menuItems.length === 0;
  return isDeeplyEmpty(cat?.[sectionKey]);
};
