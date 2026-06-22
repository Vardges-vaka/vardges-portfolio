import { useCallback } from "react";
import {
  setByPath,
  validateCuisineTagCreate,
  buildCuisineTagValueFieldError,
} from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import { DFLT_F_D_CUISINE_TAG_FULL } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const EMPTY_FORM_ERRORS = {};

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
    setters.setCuisineTagFormData(DFLT_F_D_CUISINE_TAG_FULL);
    setters.setCuisineTagFormErrors(EMPTY_FORM_ERRORS);
    setters.setActiveOperation("adding");
  }, [
    setters.setActiveOperation,
    setters.setCuisineTagFormData,
    setters.setCuisineTagFormErrors,
  ]);

  const handleFormChange = useCallback(
    (name, value) => {
      setters.setCuisineTagFormData((prev) => setByPath(prev, name, value));
      setters.setCuisineTagFormErrors((prev) => {
        const next = { ...prev };

        if (name === "value") {
          const valueError = buildCuisineTagValueFieldError(
            value,
            states.cuisineTags,
          );
          if (valueError) next.value = valueError;
          else delete next.value;
          return next;
        }

        if (next[name]) {
          delete next[name];
        }
        return next;
      });
    },
    [setters.setCuisineTagFormData, setters.setCuisineTagFormErrors, states.cuisineTags],
  );

  const handleCreateSubmit = useCallback(async () => {
    const validation = validateCuisineTagCreate(
      states.cuisineTagFormData,
      states.cuisineTags,
    );

    if (!validation.isValid) {
      setters.setCuisineTagFormErrors(validation.errors);
      TOAST.error({
        title: "Could not create cuisine tag",
        message: validation.message || "Fix the highlighted fields and try again.",
      });
      return;
    }

    const res = await apiHelpers.cuisTag_create(states.cuisineTagFormData);
    if (res?.success) {
      TOAST.success({
        title: "Cuisine Tag Created",
        message: res.message || "Created successfully",
      });
      setters.setCuisineTagFormData(DFLT_F_D_CUISINE_TAG_FULL);
      setters.setCuisineTagFormErrors(EMPTY_FORM_ERRORS);
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
    states.cuisineTags,
    setters.setCuisineTagFormData,
    setters.setCuisineTagFormErrors,
    setters.setActiveOperation,
    TOAST,
    fetchAll,
  ]);

  const handleCancelAdd = useCallback(() => {
    setters.setCuisineTagFormData(DFLT_F_D_CUISINE_TAG_FULL);
    setters.setCuisineTagFormErrors(EMPTY_FORM_ERRORS);
    setters.setActiveOperation("viewing");
  }, [
    setters.setCuisineTagFormData,
    setters.setCuisineTagFormErrors,
    setters.setActiveOperation,
  ]);

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
      isActive: tag?.isActive !== false,
      ...overrides,
    };
  }, []);

  const handleToggleActive = useCallback(
    async (tag, nextActive) => {
      if (!tag?._id) {
        TOAST.error({ title: "Update failed", message: "Tag not found" });
        return false;
      }

      const res = await apiHelpers.cuisTag_updateAll({
        id: tag._id,
        ...buildTagUpdatePayload(tag, { isActive: nextActive }),
      });

      if (res?.success) {
        TOAST.success({
          title: nextActive ? "Tag activated" : "Tag deactivated",
          message: res.message || "Status updated successfully",
        });
        await fetchAll();
        return true;
      }

      TOAST.error({
        title: "Update failed",
        message: res?.message || "Could not update status",
      });
      return false;
    },
    [apiHelpers.cuisTag_updateAll, buildTagUpdatePayload, TOAST, fetchAll],
  );

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
      handleToggleActive,
    },
  };
};
