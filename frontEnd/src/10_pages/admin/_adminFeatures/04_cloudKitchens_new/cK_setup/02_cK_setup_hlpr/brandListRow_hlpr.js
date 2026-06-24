import { splitBrandFileItems } from "./brandFiles_hlpr.js";

export const asBrandText = (value) =>
  (typeof value === "string" ? value : value?.value) || "";

export const getBrandDisplayName = (brand = {}) =>
  asBrandText(brand.name) || "Untitled brand";

export const getBrandNameInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?";

export const getBrandListLogoItem = (brand = {}) => {
  const { displayLogoItem } = splitBrandFileItems(brand.files?.items ?? []);
  return displayLogoItem;
};

export const countBrandAttachedFiles = (brand = {}) => {
  const items = brand.files?.items ?? [];
  return items.filter((item) => Boolean(item?.url)).length;
};

export const getBrandListRowStats = (brand = {}) => ({
  files: countBrandAttachedFiles(brand),
  employees: brand.employees?.length ?? 0,
  socials: brand.socials?.length ?? 0,
  integrations: brand.integrations?.length ?? 0,
  branches: brand.branches?.length ?? 0,
  menus: brand.menus?.length ?? 0,
  competitors: brand.competitors?.length ?? 0,
  equipments: brand.equipments?.length ?? 0,
  siblings: brand.siblings?.length ?? 0,
});

export const BRAND_LIST_TABLE_COLUMNS = [
  { key: "index", label: "#", align: "center" },
  { key: "logo", label: "Logo", align: "center" },
  { key: "name", label: "Name", align: "left" },
  { key: "files", label: "Files", align: "center" },
  { key: "employees", label: "Employees", align: "center" },
  { key: "socials", label: "Socials", align: "center" },
  { key: "integrations", label: "Integrations", align: "center" },
  { key: "branches", label: "Branches", align: "center" },
  { key: "menus", label: "Menus", align: "center" },
  { key: "competitors", label: "Competitors", align: "center" },
  { key: "equipments", label: "Equipments", align: "center" },
  { key: "siblings", label: "Siblings", align: "center" },
  { key: "actions", label: "Actions", align: "right" },
];
