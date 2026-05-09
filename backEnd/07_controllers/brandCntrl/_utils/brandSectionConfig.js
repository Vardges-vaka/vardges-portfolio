export const BRAND_SECTION_CONFIG = {
  name: { key: "name", path: "name", type: "object", clearable: false },
  tagline: { key: "tagline", path: "tagline", type: "object", clearable: true },
  files: { key: "files", path: "files", type: "object", clearable: true },
  socials: { key: "socials", path: "socials", type: "object", clearable: true },
  website: { key: "website", path: "socials.website", type: "object", clearable: true },
  otherSocials: {
    key: "otherSocials",
    path: "socials.others",
    type: "array",
    clearable: true,
    itemRoutes: true,
  },
  inventoryIntegrations: {
    key: "inventoryIntegrations",
    path: "inventoryIntegrations",
    type: "array",
    clearable: true,
    itemRoutes: true,
  },
  salesIntegration: {
    key: "salesIntegration",
    path: "salesIntegration",
    type: "object",
    clearable: true,
  },
  legal: { key: "legal", path: "legal", type: "object", clearable: true },
  isActive: {
    key: "isActive",
    path: "isActive",
    type: "scalar",
    clearable: true,
    clearValue: true,
  },
  employees: {
    key: "employees",
    path: "employees",
    type: "refArray",
    clearable: true,
    relationOnly: true,
  },
  equipments: {
    key: "equipments",
    path: "equipments",
    type: "refArray",
    clearable: true,
  },
  branches: {
    key: "branches",
    path: "branches",
    type: "refArray",
    clearable: true,
    relationOnly: true,
  },
  menu: { key: "menu", path: "menu", type: "ref", clearable: true },
  competitors: {
    key: "competitors",
    path: "competitors",
    type: "refArray",
    clearable: true,
  },
};

export const getBrandSectionConfig = (sectionKey) =>
  BRAND_SECTION_CONFIG[sectionKey] ?? null;

export const getByPath = (source, path) => {
  const parts = String(path).split(".");
  let cursor = source;
  for (const part of parts) {
    if (cursor === undefined || cursor === null) return undefined;
    cursor = cursor[part];
  }
  return cursor;
};

export const setByPath = (target, path, value) => {
  const parts = String(path).split(".");
  let cursor = target;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    if (!cursor[part] || typeof cursor[part] !== "object") cursor[part] = {};
    cursor = cursor[part];
  }
  cursor[parts[parts.length - 1]] = value;
  return target;
};

export const clearValueForSection = (config) => {
  if (!config.clearable) return undefined;
  if (Object.prototype.hasOwnProperty.call(config, "clearValue")) {
    return config.clearValue;
  }
  if (config.type === "array" || config.type === "refArray") return [];
  if (config.type === "ref") return null;
  return {};
};
