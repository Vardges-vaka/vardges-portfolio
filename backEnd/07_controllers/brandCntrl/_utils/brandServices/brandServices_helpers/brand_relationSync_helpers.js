import { Branch, Brand, Employee, Menu } from "../../../../../06_models/_models.index.js";

const normalizeIds = (ids) =>
  (Array.isArray(ids) ? ids : [])
    .filter(Boolean)
    .map((id) => String(id));

const uniqueIds = (ids) => [...new Set(normalizeIds(ids))];

const diffIds = (fromIds, toIds) => {
  const from = new Set(normalizeIds(fromIds));
  const to = new Set(normalizeIds(toIds));
  return {
    add: [...to].filter((id) => !from.has(id)),
    remove: [...from].filter((id) => !to.has(id)),
  };
};

export const brandPopulate = (query) =>
  query
    .populate("employees", "firstName lastName contact.email isActive")
    .populate("branches", "name location operations brands")
    .populate("menu", "name isActive")
    .sort({ createdAt: -1 });

export const populateBrandById = (id) =>
  Brand.findById(id)
    .populate("employees", "firstName lastName contact.email isActive")
    .populate("branches", "name location operations brands")
    .populate("menu", "name isActive");

export const flattenForSet = (source, prefix = "", out = {}) => {
  for (const [key, value] of Object.entries(source ?? {})) {
    const path = prefix ? `${prefix}.${key}` : key;
    const shouldDescend =
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date);

    if (shouldDescend) {
      flattenForSet(value, path, out);
    } else {
      out[path] = value;
    }
  }
  return out;
};

export const syncBrandBranches = async (brandId, previousBranchIds, nextBranchIds) => {
  const brand = String(brandId);
  const { add, remove } = diffIds(previousBranchIds, nextBranchIds);
  if (add.length > 0) {
    await Branch.updateMany({ _id: { $in: add } }, { $addToSet: { brands: brand } });
  }
  if (remove.length > 0) {
    await Branch.updateMany({ _id: { $in: remove } }, { $pull: { brands: brand } });
  }
};

export const syncBrandEmployees = async (
  brandId,
  previousEmployeeIds,
  nextEmployeeIds,
) => {
  const brand = String(brandId);
  const { add, remove } = diffIds(previousEmployeeIds, nextEmployeeIds);
  if (add.length > 0) {
    await Employee.updateMany(
      { _id: { $in: add } },
      { $addToSet: { associatedBrands: brand } },
    );
  }
  if (remove.length > 0) {
    await Employee.updateMany(
      { _id: { $in: remove } },
      { $pull: { associatedBrands: brand } },
    );
  }
};

export const syncBrandMenu = async (brandId, previousMenuId, nextMenuId) => {
  const brand = String(brandId);
  const prev = previousMenuId ? String(previousMenuId) : null;
  const next = nextMenuId ? String(nextMenuId) : null;
  if (prev && prev !== next) {
    await Menu.findByIdAndUpdate(prev, { $pull: { brands: brand } });
  }
  if (next) {
    await Menu.findByIdAndUpdate(next, { $addToSet: { brands: brand } });
  }
};

export const syncBranchBrands = async (branchId, previousBrandIds, nextBrandIds) => {
  const branch = String(branchId);
  const { add, remove } = diffIds(previousBrandIds, nextBrandIds);
  if (add.length > 0) {
    await Brand.updateMany({ _id: { $in: add } }, { $addToSet: { branches: branch } });
  }
  if (remove.length > 0) {
    await Brand.updateMany({ _id: { $in: remove } }, { $pull: { branches: branch } });
  }
};

export const syncEmployeeAssociatedBrands = async (
  employeeId,
  previousBrandIds,
  nextBrandIds,
) => {
  const employee = String(employeeId);
  const { add, remove } = diffIds(previousBrandIds, nextBrandIds);
  if (add.length > 0) {
    await Brand.updateMany(
      { _id: { $in: add } },
      { $addToSet: { employees: employee } },
    );
  }
  if (remove.length > 0) {
    await Brand.updateMany(
      { _id: { $in: remove } },
      { $pull: { employees: employee } },
    );
  }
};

export const syncMenuBrandRefs = async (menuId, previousBrandIds, nextBrandIds) => {
  const menu = String(menuId);
  const { add, remove } = diffIds(previousBrandIds, nextBrandIds);
  if (add.length > 0) {
    await Brand.updateMany({ _id: { $in: add } }, { $set: { menu } });
  }
  if (remove.length > 0) {
    await Brand.updateMany({ _id: { $in: remove }, menu }, { $set: { menu: null } });
  }
};

export const syncBrandRelations = async ({ brandId, previousBrand, nextBrand, fields }) => {
  if (Object.prototype.hasOwnProperty.call(fields, "branches")) {
    await syncBrandBranches(brandId, previousBrand?.branches, nextBrand?.branches);
  }
  if (Object.prototype.hasOwnProperty.call(fields, "employees")) {
    await syncBrandEmployees(brandId, previousBrand?.employees, nextBrand?.employees);
  }
  if (Object.prototype.hasOwnProperty.call(fields, "menu")) {
    await syncBrandMenu(brandId, previousBrand?.menu, nextBrand?.menu);
  }
};

export const normalizeRefArray = uniqueIds;
