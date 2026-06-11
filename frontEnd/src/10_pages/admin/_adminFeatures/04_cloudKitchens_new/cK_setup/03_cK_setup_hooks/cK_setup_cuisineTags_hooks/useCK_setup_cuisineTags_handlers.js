import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import {
  DFLT_F_D_CUISINE_TAG,
  DFLT_F_D_CUISINE_TAG_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);

const seedFullFromTag = (tag = {}) => ({
  ...DFLT_F_D_CUISINE_TAG_FULL,
  value: tag.value || "",
  label: tag.label || "",
  description: tag.description || "",
  kind: tag.kind || "",
  source: tag.source || "",
  platforms: Array.isArray(tag.platforms) ? tag.platforms : [],
});

export const useCK_setup_cuisineTags_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const fetchAll = useCallback(async () => {
    const res = await apiHelpers.cuisTag_getAll();
    if (res?.success) setters.setCuisineTags(res.data || []);
    return res;
  }, [apiHelpers.cuisTag_getAll, setters.setCuisineTags]);

  const handleinitialfetch = useCallback(async () => {
    const res = await fetchAll();
    if (res?.success) {
      TOAST.success({
        title: "Cuisine Tags Loaded",
        message: res.message || "Fetched successfully",
      });
    } else {
      TOAST.error({
        title: "Failed to load cuisine tags",
        message: res?.message || "Could not fetch",
      });
    }
  }, [fetchAll, TOAST]);

  const handleAddnew = useCallback(async () => {
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);

  // ── Initial create ──────────────────────────────────────
  const handleFormChange = useCallback(
    (name, value) => {
      setters.setCuisineTagFormData((prev) => setByPath(prev, name, value));
    },
    [setters.setCuisineTagFormData],
  );

  const handleCreateSubmit = useCallback(async () => {
    const res = await apiHelpers.cuisTag_create(states.cuisineTagFormData);
    if (res?.success) {
      TOAST.success({
        title: "Cuisine Tag Created",
        message: res.message || "Created successfully",
      });
      setters.setCuisineTagFormData(DFLT_F_D_CUISINE_TAG);
      setters.setActiveOperation("viewing");
      await fetchAll();
    } else {
      TOAST.error({
        title: "Create failed",
        message: res?.message || "Could not create",
      });
    }
  }, [
    apiHelpers.cuisTag_create,
    states.cuisineTagFormData,
    setters.setCuisineTagFormData,
    setters.setActiveOperation,
    TOAST,
    fetchAll,
  ]);

  const handleCancelAdd = useCallback(() => {
    setters.setCuisineTagFormData(DFLT_F_D_CUISINE_TAG);
    setters.setActiveOperation("viewing");
  }, [setters.setCuisineTagFormData, setters.setActiveOperation]);

  // ── Full edit ───────────────────────────────────────────
  const handleEditFull = useCallback(
    (tag) => {
      setters.setSelectedCuisineTag(tag);
      setters.setCuisineTagFormData_full(seedFullFromTag(tag));
      setters.setActiveOperation("updating");
    },
    [
      setters.setSelectedCuisineTag,
      setters.setCuisineTagFormData_full,
      setters.setActiveOperation,
    ],
  );

  const handleFullFormChange = useCallback(
    (name, value) => {
      setters.setCuisineTagFormData_full((prev) => setByPath(prev, name, value));
    },
    [setters.setCuisineTagFormData_full],
  );

  const handleUpdateSubmit = useCallback(async () => {
    const id = states.selectedCuisineTag?._id;
    if (!id) {
      TOAST.error({ title: "Update failed", message: "No tag selected" });
      return;
    }
    const res = await apiHelpers.cuisTag_updateAll({
      id,
      ...states.cuisineTagFormData_full,
    });
    if (res?.success) {
      TOAST.success({
        title: "Cuisine Tag Updated",
        message: res.message || "Updated successfully",
      });
      setters.setCuisineTagFormData_full(DFLT_F_D_CUISINE_TAG_FULL);
      setters.setSelectedCuisineTag(null);
      setters.setActiveOperation("viewing");
      await fetchAll();
    } else {
      TOAST.error({
        title: "Update failed",
        message: res?.message || "Could not update",
      });
    }
  }, [
    apiHelpers.cuisTag_updateAll,
    states.selectedCuisineTag,
    states.cuisineTagFormData_full,
    setters.setCuisineTagFormData_full,
    setters.setSelectedCuisineTag,
    setters.setActiveOperation,
    TOAST,
    fetchAll,
  ]);

  const handleCancelFull = useCallback(() => {
    setters.setCuisineTagFormData_full(DFLT_F_D_CUISINE_TAG_FULL);
    setters.setSelectedCuisineTag(null);
    setters.setActiveOperation("viewing");
  }, [
    setters.setCuisineTagFormData_full,
    setters.setSelectedCuisineTag,
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
      handleUpdateSubmit,
      handleCancelFull,
    },
  };
};
