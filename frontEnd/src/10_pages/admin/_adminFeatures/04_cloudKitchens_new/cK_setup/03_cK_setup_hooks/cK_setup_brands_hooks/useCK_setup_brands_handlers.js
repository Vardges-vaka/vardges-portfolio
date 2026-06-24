import { useCallback } from "react";
import {
  setByPath,
  seedFullFromBrand,
  normalizeCuisineTagIds,
  isBrandDraftDirty,
  getChangedFieldKeys,
  pickFieldPayload,
  FIELD_API_MAP,
  BRAND_DETAIL_FIELD_LABELS,
  isBrandViewOnlyField,
} from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import {
  buildEmptyFileItem,
  buildLogoVariantTitle,
  findLogoVariantIndex,
  getOtherFileIndices,
  isBrandFilesChanged,
  prepareBrandFilesForSubmit,
  seedFilesFromBrand,
  removeLogoVariantFromItems,
  removeOtherFileFromItems,
  revokeFilePreviewUrl,
  upsertLogoVariantInItems,
  normalizeBrandFiles,
} from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import {
  DFLT_F_D_BRAND_INITIAL,
  DFLT_F_D_BRAND_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const DEFAULT_SOCIAL = {
  isActive: true,
  name: "",
  link: "",
  consoleLink: "",
  notes: "",
};

const fileItemFromPicker = (file, title = "", slotKey = "") => {
  if (!file) return buildEmptyFileItem(title);

  return {
    ...buildEmptyFileItem(title),
    title: title || file.name,
    format: slotKey || file.type || "",
    sizeIn_KB: file.size ? Math.round(file.size / 1024) : "",
    url: URL.createObjectURL(file),
    _pendingFile: file,
  };
};

const asText = (v) => (typeof v === "string" ? v : v?.value) || "";

const resetDetailState = (setters) => {
  setters.setDetailMode("read");
  setters.setEditingField(null);
  setters.setActiveOperation("viewing");
  setters.setActiveViewingType("all");
  setters.setBrandDraft(DFLT_F_D_BRAND_FULL);
  setters.setBrandDraftBaseline(null);
  setters.setBrandFilesDraft(normalizeBrandFiles());
  setters.setBrandFilesBaseline(null);
  setters.setSelectedBrand(null);
  setters.setConfirmUpdateModalOpen(false);
  setters.setConfirmUpdateMode("global");
  setters.setConfirmUpdateFieldKeys([]);
  setters.setUnsavedModalOpen(false);
  setters.setPendingNavigation(null);
};

export const useCK_setup_brands_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
  onSessionChange,
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

  const hasUnsavedDetailChanges = useCallback(
    () => isBrandDraftDirty(states),
    [states],
  );

  const seedDetailFromBrand = useCallback(
    (brand, mode = "read") => {
      const draft = seedFullFromBrand(brand);
      const files = seedFilesFromBrand(brand);
      setters.setSelectedBrand(brand);
      setters.setBrandDraft(draft);
      setters.setBrandDraftBaseline(draft);
      setters.setBrandFilesDraft(files);
      setters.setBrandFilesBaseline(files);
      setters.setDetailMode(mode);
      setters.setEditingField(null);
      setters.setActiveViewingType("one");
      setters.setActiveOperation("viewing");
    },
    [
      setters.setSelectedBrand,
      setters.setBrandDraft,
      setters.setBrandDraftBaseline,
      setters.setBrandFilesDraft,
      setters.setBrandFilesBaseline,
      setters.setDetailMode,
      setters.setEditingField,
      setters.setActiveViewingType,
      setters.setActiveOperation,
    ],
  );

  const executePendingNavigation = useCallback(
    (action) => {
      if (!action) return;

      resetDetailState(setters);
      setters.setActiveViewingType("all");

      if (action.type === "session") {
        onSessionChange?.(action.session);
        return;
      }

      if (action.type === "viewAll") return;

      if (action.type === "viewBrand") {
        seedDetailFromBrand(action.brand, action.mode || "read");
        return;
      }

      if (action.type === "addNew") {
        setters.setActiveOperation("adding");
      }
    },
    [onSessionChange, seedDetailFromBrand, setters],
  );

  const handleRequestNavigation = useCallback(
    (action) => {
      if (hasUnsavedDetailChanges()) {
        setters.setPendingNavigation(action);
        setters.setUnsavedModalOpen(true);
        return;
      }
      executePendingNavigation(action);
    },
    [
      executePendingNavigation,
      hasUnsavedDetailChanges,
      setters.setPendingNavigation,
      setters.setUnsavedModalOpen,
    ],
  );

  const handleUnsavedConfirm = useCallback(() => {
    const action = states.pendingNavigation;
    setters.setUnsavedModalOpen(false);
    setters.setPendingNavigation(null);
    // Always leave edit/update UI when discarding — even if navigation action is missing.
    resetDetailState(setters);
    executePendingNavigation(action);
  }, [
    executePendingNavigation,
    setters.setPendingNavigation,
    setters.setUnsavedModalOpen,
    states.pendingNavigation,
  ]);

  const handleUnsavedCancel = useCallback(() => {
    setters.setUnsavedModalOpen(false);
    setters.setPendingNavigation(null);
  }, [setters.setPendingNavigation, setters.setUnsavedModalOpen]);

  const handleBackToList = useCallback(() => {
    handleRequestNavigation({ type: "viewAll" });
  }, [handleRequestNavigation]);

  const handleViewBrand = useCallback(
    (brand) =>
      handleRequestNavigation({ type: "viewBrand", brand, mode: "read" }),
    [handleRequestNavigation],
  );

  const handleUpdateBrandFromList = useCallback(
    (brand) =>
      handleRequestNavigation({ type: "viewBrand", brand, mode: "editAll" }),
    [handleRequestNavigation],
  );

  const handleDeleteBrandRequest = useCallback(
    (brand) => {
      setters.setBrandToDelete(brand);
      setters.setDeleteModalOpen(true);
    },
    [setters.setBrandToDelete, setters.setDeleteModalOpen],
  );

  const handleDeleteCancel = useCallback(() => {
    setters.setDeleteModalOpen(false);
    setters.setBrandToDelete(null);
  }, [setters.setBrandToDelete, setters.setDeleteModalOpen]);

  const handleDeleteConfirm = useCallback(async () => {
    const brand = states.brandToDelete;
    const id = brand?._id;
    if (!id) {
      TOAST.error({ title: "Delete failed", message: "No brand selected" });
      return;
    }

    const res = await apiHelpers.brand_delete({ id });
    setters.setDeleteModalOpen(false);
    setters.setBrandToDelete(null);

    if (res?.success) {
      TOAST.success({
        title: "Brand deleted",
        message: res.message || "Brand deleted successfully",
      });
      if (states.selectedBrand?._id === id) {
        resetDetailState(setters);
        setters.setActiveViewingType("all");
      }
      await fetchAll();
    } else {
      TOAST.error({
        title: "Delete failed",
        message: res?.message || "Could not delete brand",
      });
    }
  }, [
    apiHelpers.brand_delete,
    fetchAll,
    setters,
    states.brandToDelete,
    states.selectedBrand,
    TOAST,
  ]);

  const handleGlobalUpdateClick = useCallback(() => {
    setters.setDetailMode("editAll");
    setters.setEditingField(null);
  }, [setters.setDetailMode, setters.setEditingField]);

  const handleGlobalCancel = useCallback(() => {
    if (states.brandDraftBaseline) {
      setters.setBrandDraft(states.brandDraftBaseline);
    }
    setters.setDetailMode("read");
    setters.setEditingField(null);
  }, [
    setters.setBrandDraft,
    setters.setDetailMode,
    setters.setEditingField,
    states.brandDraftBaseline,
  ]);

  const handleFieldUpdateClick = useCallback(
    (fieldKey) => {
      if (isBrandViewOnlyField(fieldKey)) return;
      setters.setEditingField(fieldKey);
      setters.setDetailMode("read");
    },
    [setters.setDetailMode, setters.setEditingField],
  );

  const handleFieldCancel = useCallback(() => {
    if (states.editingField === "files" && states.brandFilesBaseline) {
      setters.setBrandFilesDraft(states.brandFilesBaseline);
    } else if (states.brandDraftBaseline) {
      setters.setBrandDraft(states.brandDraftBaseline);
    }
    setters.setEditingField(null);
  }, [
    setters.setBrandDraft,
    setters.setBrandFilesDraft,
    setters.setEditingField,
    states.brandDraftBaseline,
    states.brandFilesBaseline,
    states.editingField,
  ]);

  const openConfirmUpdateModal = useCallback(
    (mode, fieldKeys) => {
      if (!fieldKeys.length) {
        TOAST.info({
          title: "No changes",
          message: "Update one or more fields before confirming.",
        });
        return;
      }
      setters.setConfirmUpdateMode(mode);
      setters.setConfirmUpdateFieldKeys(fieldKeys);
      setters.setConfirmUpdateModalOpen(true);
    },
    [
      TOAST,
      setters.setConfirmUpdateFieldKeys,
      setters.setConfirmUpdateModalOpen,
      setters.setConfirmUpdateMode,
    ],
  );

  const handleGlobalConfirmClick = useCallback(() => {
    const changed = getChangedFieldKeys(
      states.brandDraftBaseline,
      states.brandDraft,
    );
    openConfirmUpdateModal("global", changed);
  }, [
    openConfirmUpdateModal,
    states.brandDraft,
    states.brandDraftBaseline,
  ]);

  const handleFieldConfirmClick = useCallback(() => {
    const fieldKey = states.editingField;
    if (!fieldKey) return;

    if (fieldKey === "files") {
      if (
        !isBrandFilesChanged(
          states.brandFilesBaseline,
          states.brandFilesDraft,
        )
      ) {
        TOAST.info({
          title: "No changes",
          message: "Update one or more files before confirming.",
        });
        return;
      }
      openConfirmUpdateModal("field", ["files"]);
      return;
    }

    const changed = getChangedFieldKeys(
      states.brandDraftBaseline,
      states.brandDraft,
      [fieldKey],
    );
    openConfirmUpdateModal("field", changed);
  }, [
    TOAST,
    openConfirmUpdateModal,
    states.brandDraft,
    states.brandDraftBaseline,
    states.brandFilesBaseline,
    states.brandFilesDraft,
    states.editingField,
  ]);

  const handleConfirmUpdateCancel = useCallback(() => {
    setters.setConfirmUpdateModalOpen(false);
    setters.setConfirmUpdateFieldKeys([]);
  }, [setters.setConfirmUpdateFieldKeys, setters.setConfirmUpdateModalOpen]);

  const applyFieldUpdate = useCallback(
    async (fieldKey, id) => {
      const apiKey = FIELD_API_MAP[fieldKey];
      const fn = apiHelpers[apiKey];
      if (!fn) {
        return {
          success: false,
          message: `No API helper for field: ${fieldKey}`,
        };
      }

      if (fieldKey === "files") {
        return fn({
          id,
          files: prepareBrandFilesForSubmit(states.brandFilesDraft),
        });
      }

      const body = pickFieldPayload(fieldKey, states.brandDraft);
      return fn({ id, ...body });
    },
    [apiHelpers, states.brandDraft, states.brandFilesDraft],
  );

  const handleConfirmUpdateConfirm = useCallback(async () => {
    const id = states.selectedBrand?._id;
    if (!id) {
      TOAST.error({ title: "Update failed", message: "No brand selected" });
      return;
    }

    const fieldKeys = states.confirmUpdateFieldKeys;
    if (!fieldKeys.length) {
      handleConfirmUpdateCancel();
      return;
    }

    setters.setIsSaving(true);

    try {
      if (states.confirmUpdateMode === "global") {
        const res = await apiHelpers.brand_updateAll({
          id,
          ...states.brandDraft,
        });
        if (!res?.success) {
          TOAST.error({
            title: "Update failed",
            message: res?.message || "Could not update brand",
          });
          return;
        }
      } else {
        for (const fieldKey of fieldKeys) {
          const res = await applyFieldUpdate(fieldKey, id);
          if (!res?.success) {
            TOAST.error({
              title: "Update failed",
              message:
                res?.message ||
                `Could not update ${BRAND_DETAIL_FIELD_LABELS[fieldKey] || fieldKey}`,
            });
            return;
          }
        }
      }

      TOAST.success({
        title: "Brand updated",
        message: "Changes saved successfully",
      });

      const listRes = await fetchAll();
      const refreshed =
        listRes?.data?.find?.((b) => b._id === id) || states.selectedBrand;
      const nextDraft = seedFullFromBrand(refreshed);
      const nextFiles = seedFilesFromBrand(refreshed);

      setters.setSelectedBrand(refreshed);
      setters.setBrandDraft(nextDraft);
      setters.setBrandDraftBaseline(nextDraft);
      setters.setBrandFilesDraft(nextFiles);
      setters.setBrandFilesBaseline(nextFiles);
      setters.setDetailMode("read");
      setters.setEditingField(null);
      setters.setConfirmUpdateModalOpen(false);
      setters.setConfirmUpdateFieldKeys([]);
    } finally {
      setters.setIsSaving(false);
    }
  }, [
    TOAST,
    apiHelpers.brand_updateAll,
    applyFieldUpdate,
    fetchAll,
    handleConfirmUpdateCancel,
    setters,
    states.brandDraft,
    states.confirmUpdateFieldKeys,
    states.confirmUpdateMode,
    states.selectedBrand,
  ]);

  const handleAddnew = useCallback(() => {
    handleRequestNavigation({ type: "addNew" });
  }, [handleRequestNavigation]);

  const handleFormChange = useCallback(
    (name, value) => {
      setters.setBrandFormData((prev) => setByPath(prev, name, value));
    },
    [setters.setBrandFormData],
  );

  const handleDraftChange = useCallback(
    (name, value) => {
      setters.setBrandDraft((prev) => setByPath(prev, name, value));
    },
    [setters.setBrandDraft],
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

  const handleAddSocial = useCallback(() => {
    setters.setBrandDraft((prev) => ({
      ...prev,
      socials: [...(prev.socials || []), { ...DEFAULT_SOCIAL }],
    }));
  }, [setters.setBrandDraft]);

  const handleRemoveSocial = useCallback(
    (index) => {
      setters.setBrandDraft((prev) => ({
        ...prev,
        socials: (prev.socials || []).filter((_, i) => i !== index),
      }));
    },
    [setters.setBrandDraft],
  );

  const handleAddCuisineTag = useCallback(
    (tagId) => {
      if (!tagId) return;
      setters.setBrandDraft((prev) => {
        const current = normalizeCuisineTagIds(prev.cuisineTags);
        if (current.includes(tagId)) return prev;
        return { ...prev, cuisineTags: [...current, tagId] };
      });
    },
    [setters.setBrandDraft],
  );

  const handleRemoveCuisineTag = useCallback(
    (tagId) => {
      if (!tagId) return;
      setters.setBrandDraft((prev) => ({
        ...prev,
        cuisineTags: normalizeCuisineTagIds(prev.cuisineTags).filter(
          (id) => id !== tagId,
        ),
      }));
    },
    [setters.setBrandDraft],
  );

  const handleLogoVariantChange = useCallback(
    (slotKey, file) => {
      if (!file || !slotKey) return;

      setters.setBrandFilesDraft((prev) => {
        const variantTitle = buildLogoVariantTitle(slotKey);
        const nextItem = fileItemFromPicker(file, variantTitle, slotKey);

        return {
          ...prev,
          items: upsertLogoVariantInItems(prev.items || [], slotKey, nextItem),
        };
      });
    },
    [setters.setBrandFilesDraft],
  );

  const handleLogoVariantFieldChange = useCallback(
    (slotKey, path, value) => {
      if (!slotKey || !path) return;

      setters.setBrandFilesDraft((prev) => {
        const items = upsertLogoVariantInItems(prev.items || [], slotKey, {});
        const variantIndex = findLogoVariantIndex(items, slotKey);
        if (variantIndex < 0) return prev;

        items[variantIndex] = setByPath(items[variantIndex], path, value);
        return { ...prev, items };
      });
    },
    [setters.setBrandFilesDraft],
  );

  const handleOtherFileChange = useCallback(
    (otherIndex, file) => {
      if (!file) return;
      setters.setBrandFilesDraft((prev) => {
        const items = [...(prev.items || [])];
        const otherIndices = getOtherFileIndices(items);
        const targetIndex = otherIndices[otherIndex];

        if (targetIndex == null) return prev;

        items[targetIndex] = fileItemFromPicker(
          file,
          items[targetIndex]?.title || file.name,
        );
        return { ...prev, items };
      });
    },
    [setters.setBrandFilesDraft],
  );

  const handleOtherFileFieldChange = useCallback(
    (otherIndex, path, value) => {
      if (otherIndex == null || !path) return;

      setters.setBrandFilesDraft((prev) => {
        const items = [...(prev.items || [])];
        const otherIndices = getOtherFileIndices(items);
        const targetIndex = otherIndices[otherIndex];

        if (targetIndex == null) return prev;

        items[targetIndex] = setByPath(items[targetIndex], path, value);
        return { ...prev, items };
      });
    },
    [setters.setBrandFilesDraft],
  );

  const handleLogoVariantDelete = useCallback(
    (slotKey) => {
      if (!slotKey) return;

      setters.setBrandFilesDraft((prev) => {
        const items = prev.items || [];
        const variantIndex = findLogoVariantIndex(items, slotKey);
        if (variantIndex >= 0) {
          revokeFilePreviewUrl(items[variantIndex]);
        }

        return {
          ...prev,
          items: removeLogoVariantFromItems(items, slotKey),
        };
      });
    },
    [setters.setBrandFilesDraft],
  );

  const handleOtherFileDelete = useCallback(
    (otherIndex) => {
      if (otherIndex == null) return;

      setters.setBrandFilesDraft((prev) => {
        const items = prev.items || [];
        const otherIndices = getOtherFileIndices(items);
        const targetIndex = otherIndices[otherIndex];

        if (targetIndex != null) {
          revokeFilePreviewUrl(items[targetIndex]);
        }

        return {
          ...prev,
          items: removeOtherFileFromItems(items, otherIndex),
        };
      });
    },
    [setters.setBrandFilesDraft],
  );

  const handleAddOtherFiles = useCallback(
    (fileList) => {
      if (!fileList?.length) return;
      setters.setBrandFilesDraft((prev) => ({
        ...prev,
        items: [
          ...(prev.items || []),
          ...fileList.map((file) => fileItemFromPicker(file, file.name)),
        ],
      }));
    },
    [setters.setBrandFilesDraft],
  );

  const brandDisplayName = useCallback(() => {
    const fromDelete = asText(states.brandToDelete?.name);
    if (fromDelete) return fromDelete;
    const fromDraft = asText(states.brandDraft?.name);
    if (fromDraft) return fromDraft;
    return asText(states.selectedBrand?.name) || "Brand";
  }, [states.brandDraft, states.brandToDelete, states.selectedBrand]);

  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
      handleFormChange,
      handleCreateSubmit,
      handleCancelAdd,
      handleViewBrand,
      handleUpdateBrandFromList,
      handleDeleteBrandRequest,
      handleDeleteConfirm,
      handleDeleteCancel,
      handleBackToList,
      handleGlobalUpdateClick,
      handleGlobalCancel,
      handleGlobalConfirmClick,
      handleFieldUpdateClick,
      handleFieldCancel,
      handleFieldConfirmClick,
      handleDraftChange,
      handleAddSocial,
      handleRemoveSocial,
      handleAddCuisineTag,
      handleRemoveCuisineTag,
      handleLogoVariantChange,
      handleLogoVariantFieldChange,
      handleLogoVariantDelete,
      handleOtherFileChange,
      handleOtherFileFieldChange,
      handleOtherFileDelete,
      handleAddOtherFiles,
      handleConfirmUpdateConfirm,
      handleConfirmUpdateCancel,
      handleRequestNavigation,
      handleUnsavedConfirm,
      handleUnsavedCancel,
      hasUnsavedDetailChanges,
      resetDetailState: () => resetDetailState(setters),
      brandDisplayName,
    },
  };
};
