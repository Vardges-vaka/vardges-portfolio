import {
  DFLT_F_D_BRAND_FULL,
} from "../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const asText = (v) => (typeof v === "string" ? v : v?.value) || "";
const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);

const DEFAULT_SOCIAL = {
  isActive: true,
  name: "",
  link: "",
  consoleLink: "",
  notes: "",
};

export const normalizeCuisineTagIds = (tags = []) =>
  (Array.isArray(tags) ? tags : [])
    .map((tag) => (typeof tag === "string" ? tag : tag?._id))
    .filter(Boolean);

export const seedFullFromBrand = (brand = {}) => ({
  ...DFLT_F_D_BRAND_FULL,
  name: asText(brand.name),
  tagline: {
    value: asText(brand.tagline),
    translations: {
      ...DFLT_F_D_BRAND_FULL.tagline.translations,
      ...(isPlainObj(brand.tagline?.translations)
        ? brand.tagline.translations
        : {}),
    },
  },
  description: {
    ...DFLT_F_D_BRAND_FULL.description,
    ...(isPlainObj(brand.description) ? brand.description : {}),
  },
  priceRange: brand.priceRange || "",
  registeredIn: {
    ...DFLT_F_D_BRAND_FULL.registeredIn,
    ...(isPlainObj(brand.registeredIn) ? brand.registeredIn : {}),
  },
  socials:
    Array.isArray(brand.socials) && brand.socials.length
      ? brand.socials
      : [{ ...DEFAULT_SOCIAL }],
  cuisineTags: normalizeCuisineTagIds(brand.cuisineTags),
  website: brand.website ?? DFLT_F_D_BRAND_FULL.website,
  contracts: Array.isArray(brand.contracts) ? brand.contracts : [],
  integrations: Array.isArray(brand.integrations) ? brand.integrations : [],
  siblings: Array.isArray(brand.siblings) ? brand.siblings : [],
  employees: Array.isArray(brand.employees) ? brand.employees : [],
  equipments: Array.isArray(brand.equipments) ? brand.equipments : [],
  branches: Array.isArray(brand.branches) ? brand.branches : [],
  menus: Array.isArray(brand.menus) ? brand.menus : [],
  competitors: Array.isArray(brand.competitors) ? brand.competitors : [],
});

export const BRAND_DETAIL_FIELD_LABELS = {
  files: "Files",
  basic: "Basics",
  registeredIn: "Registered in",
  socials: "Socials",
  cuisineTags: "Cuisine tags",
  contracts: "Contracts",
  integrations: "Integrations",
  siblings: "Siblings",
  employees: "Employees",
  equipments: "Equipments",
  branches: "Branches",
  menus: "Menus",
  competitors: "Competitors",
};

export const BRAND_DETAIL_FIELD_KEYS = Object.keys(BRAND_DETAIL_FIELD_LABELS);

// Linked entities — display only on brand detail; edited elsewhere.
export const BRAND_VIEW_ONLY_FIELD_KEYS = [
  "cuisineTags",
  "contracts",
  "competitors",
  "employees",
  "equipments",
  "branches",
  "menus",
];

export const isBrandViewOnlyField = (fieldKey) =>
  BRAND_VIEW_ONLY_FIELD_KEYS.includes(fieldKey);

export const buildBrandFieldStates = (
  brandDraft,
  cuisineTags,
  cuisineTagsFieldState = {},
) => ({
  values: brandDraft,
  cuisineTags,
  ...cuisineTagsFieldState,
});

export const buildBrandFieldHandlers = (handlers) => ({
  onChange: handlers.onDraftChange,
  onAddSocial: handlers.onAddSocial,
  onRemoveSocial: handlers.onRemoveSocial,
  onAddCuisineTag: handlers.onAddCuisineTag,
  onRemoveCuisineTag: handlers.onRemoveCuisineTag,
});

const pickBasic = (draft) => ({
  name: draft.name,
  tagline: draft.tagline,
  description: draft.description,
  priceRange: draft.priceRange,
});

export const pickFieldPayload = (fieldKey, draft) => {
  switch (fieldKey) {
    case "basic":
      return pickBasic(draft);
    case "registeredIn":
      return { registeredIn: draft.registeredIn };
    case "socials":
      return { socials: draft.socials };
    case "cuisineTags":
      return { cuisineTags: normalizeCuisineTagIds(draft.cuisineTags) };
    case "contracts":
      return { contracts: draft.contracts };
    case "integrations":
      return { integrations: draft.integrations };
    case "siblings":
      return { siblings: draft.siblings };
    case "employees":
      return { employees: draft.employees };
    case "equipments":
      return { equipments: draft.equipments };
    case "branches":
      return { branches: draft.branches };
    case "menus":
      return { menus: draft.menus };
    case "competitors":
      return { competitors: draft.competitors };
    default:
      return {};
  }
};

export const FIELD_API_MAP = {
  files: "brand_update_files",
  basic: "brand_updateAll",
  registeredIn: "brand_update_registeredIn",
  socials: "brand_update_socials",
  cuisineTags: "brand_update_cuisineTags",
  contracts: "brand_update_contracts",
  integrations: "brand_update_integrations",
  siblings: "brand_update_siblings",
  employees: "brand_update_employees",
  equipments: "brand_update_equipments",
  branches: "brand_update_branches",
  menus: "brand_update_menus",
  competitors: "brand_update_competitors",
};

const stableStringify = (value) => JSON.stringify(value ?? null);

export const isFieldChanged = (fieldKey, baseline, draft) =>
  stableStringify(pickFieldPayload(fieldKey, baseline)) !==
  stableStringify(pickFieldPayload(fieldKey, draft));

export const getChangedFieldKeys = (baseline, draft, keys = BRAND_DETAIL_FIELD_KEYS) =>
  keys
    .filter((key) => key !== "files")
    .filter((key) => !isBrandViewOnlyField(key))
    .filter((key) => isFieldChanged(key, baseline, draft));

export const isBrandDraftDirty = ({ detailMode, editingField }) =>
  detailMode === "editAll" || Boolean(editingField);
