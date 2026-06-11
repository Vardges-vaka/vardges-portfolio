import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import {
  DFLT_F_D_BRAND_INITIAL,
  DFLT_F_D_BRAND_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const asText = (v) => (typeof v === "string" ? v : v?.value) || "";
const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const DEFAULT_SOCIAL = {
  isActive: true,
  name: "",
  link: "",
  consoleLink: "",
  notes: "",
};

// Seed the full-edit form from an existing brand doc, defending against the
// legacy shape (name/tagline as objects, socials as an object not an array).
const seedFullFromBrand = (brand = {}) => ({
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
});

export const useCK_setup_brands_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const fetchAll = useCallback(async () => {
    const res = await apiHelpers.brand_getAll();
    if (res?.success) setters.setBrands(res.data || []);
    return res;
  }, [apiHelpers.brand_getAll, setters.setBrands]);

  const handleinitialfetch = useCallback(async () => {
    const res = await fetchAll();
    if (res?.success) {
      TOAST.success({
        title: "Brands Loaded",
        message: res.message || "Brands fetched successfully",
      });
    } else {
      TOAST.error({
        title: "Failed to load brands",
        message: res?.message || "Could not fetch brands",
      });
    }
  }, [fetchAll, TOAST]);

  const handleAddnew = useCallback(async () => {
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);

  // ── Initial create ──────────────────────────────────────
  const handleFormChange = useCallback(
    (name, value) => {
      setters.setBrandFormData((prev) => setByPath(prev, name, value));
    },
    [setters.setBrandFormData],
  );

  const handleCreateSubmit = useCallback(async () => {
    const res = await apiHelpers.brand_create(states.brandFormData);
    if (res?.success) {
      TOAST.success({
        title: "Brand Created",
        message: res.message || "Brand created successfully",
      });
      setters.setBrandFormData(DFLT_F_D_BRAND_INITIAL);
      setters.setActiveOperation("viewing");
      await fetchAll();
    } else {
      TOAST.error({
        title: "Create failed",
        message: res?.message || "Could not create brand",
      });
    }
  }, [
    apiHelpers.brand_create,
    states.brandFormData,
    setters.setBrandFormData,
    setters.setActiveOperation,
    TOAST,
    fetchAll,
  ]);

  const handleCancelAdd = useCallback(() => {
    setters.setBrandFormData(DFLT_F_D_BRAND_INITIAL);
    setters.setActiveOperation("viewing");
  }, [setters.setBrandFormData, setters.setActiveOperation]);

  // ── Full edit ("continue building") ─────────────────────
  const handleEditFull = useCallback(
    (brand) => {
      setters.setSelectedBrand(brand);
      setters.setBrandFormData_full(seedFullFromBrand(brand));
      setters.setActiveOperation("updating");
    },
    [
      setters.setSelectedBrand,
      setters.setBrandFormData_full,
      setters.setActiveOperation,
    ],
  );

  const handleFullFormChange = useCallback(
    (name, value) => {
      setters.setBrandFormData_full((prev) => setByPath(prev, name, value));
    },
    [setters.setBrandFormData_full],
  );

  const handleAddSocial = useCallback(() => {
    setters.setBrandFormData_full((prev) => ({
      ...prev,
      socials: [...(prev.socials || []), { ...DEFAULT_SOCIAL }],
    }));
  }, [setters.setBrandFormData_full]);

  const handleRemoveSocial = useCallback(
    (index) => {
      setters.setBrandFormData_full((prev) => ({
        ...prev,
        socials: (prev.socials || []).filter((_, i) => i !== index),
      }));
    },
    [setters.setBrandFormData_full],
  );

  const handleUpdateSubmit = useCallback(async () => {
    const id = states.selectedBrand?._id;
    if (!id) {
      TOAST.error({ title: "Update failed", message: "No brand selected" });
      return;
    }
    const res = await apiHelpers.brand_updateAll({
      id,
      ...states.brandFormData_full,
    });
    if (res?.success) {
      TOAST.success({
        title: "Brand Updated",
        message: res.message || "Brand updated successfully",
      });
      setters.setBrandFormData_full(DFLT_F_D_BRAND_FULL);
      setters.setSelectedBrand(null);
      setters.setActiveOperation("viewing");
      await fetchAll();
    } else {
      TOAST.error({
        title: "Update failed",
        message: res?.message || "Could not update brand",
      });
    }
  }, [
    apiHelpers.brand_updateAll,
    states.selectedBrand,
    states.brandFormData_full,
    setters.setBrandFormData_full,
    setters.setSelectedBrand,
    setters.setActiveOperation,
    TOAST,
    fetchAll,
  ]);

  const handleCancelFull = useCallback(() => {
    setters.setBrandFormData_full(DFLT_F_D_BRAND_FULL);
    setters.setSelectedBrand(null);
    setters.setActiveOperation("viewing");
  }, [
    setters.setBrandFormData_full,
    setters.setSelectedBrand,
    setters.setActiveOperation,
  ]);

  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
      handleFormChange,
      handleCreateSubmit,
      handleCancelAdd,
      handleEditFull,
      handleFullFormChange,
      handleAddSocial,
      handleRemoveSocial,
      handleUpdateSubmit,
      handleCancelFull,
    },
  };
};
