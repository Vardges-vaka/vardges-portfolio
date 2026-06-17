import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import { DFLT_F_D_CUISINE_TAG } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

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

  const handleFetchCatalog = useCallback(async () => fetchAll(), [fetchAll]);

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
    return res;
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

  // ── Inline row update (viewAll catalog) ─────────────────
  const handleInlineUpdateSubmit = useCallback(
    async (tagId, formData) => {
      if (!tagId) {
        TOAST.error({ title: "Update failed", message: "No tag selected" });
        return false;
      }
      const res = await apiHelpers.cuisTag_updateAll({
        id: tagId,
        ...formData,
      });
      if (res?.success) {
        TOAST.success({
          title: "Cuisine Tag Updated",
          message: res.message || "Updated successfully",
        });
        await fetchAll();
        return true;
      }
      TOAST.error({
        title: "Update failed",
        message: res?.message || "Could not update",
      });
      return false;
    },
    [apiHelpers.cuisTag_updateAll, TOAST, fetchAll],
  );

  const buildTagUpdatePayload = useCallback((tag, overrides = {}) => {
    return {
      value: tag?.value ?? "",
      label: tag?.label ?? "",
      description: tag?.description ?? "",
      kind: tag?.kind ?? "",
      source: tag?.source ?? "",
      platforms: Array.isArray(tag?.platforms) ? tag.platforms : [],
      ...overrides,
    };
  }, []);

  const handleAddTagField = useCallback(
    async (tagId, field, value) => {
      const tag = states.cuisineTags.find((item) => item?._id === tagId);
      if (!tag?._id) {
        TOAST.error({ title: "Update failed", message: "Tag not found" });
        return false;
      }

      const overrides =
        field === "description"
          ? { description: value }
          : field === "source"
            ? { source: value }
            : field === "platforms"
              ? { platforms: value }
              : {};

      const res = await apiHelpers.cuisTag_updateAll({
        id: tagId,
        ...buildTagUpdatePayload(tag, overrides),
      });

      if (res?.success) {
        TOAST.success({
          title: "Cuisine Tag Updated",
          message: res.message || "Field saved successfully",
        });
        await fetchAll();
        return true;
      }

      TOAST.error({
        title: "Update failed",
        message: res?.message || "Could not save field",
      });
      return false;
    },
    [
      apiHelpers.cuisTag_updateAll,
      buildTagUpdatePayload,
      states.cuisineTags,
      TOAST,
      fetchAll,
    ],
  );

  return {
    handlers: {
      handleinitialfetch,
      handleFetchCatalog,
      handleAddnew,
      handleFormChange,
      handleCreateSubmit,
      handleCancelAdd,
      handleInlineUpdateSubmit,
      handleAddTagField,
    },
  };
};
