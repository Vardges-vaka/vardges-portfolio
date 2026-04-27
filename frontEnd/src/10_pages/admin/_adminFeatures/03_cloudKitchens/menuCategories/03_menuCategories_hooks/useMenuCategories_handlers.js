import {
  setByPath,
  hydrateMenuCategoryForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  computeBulkDiff,
} from "../02_menuCategories_helpers/_menuCategories_helpers.index.js";
import {
  SECTION_KEYS,
  EDITABLE_SECTIONS,
} from "../05_menuCategories_cnst/_menuCategories_cnst.index.js";
import {
  validateSection,
  validateBulk,
} from "../04_menuCategories_vld/_menuCategories_vld.index.js";

const sectionPayload = (sectionKey, draft) => {
  if (sectionKey === SECTION_KEYS.basic) {
    return {
      isActive: draft?.isActive ?? true,
      activeTimings: draft?.activeTimings ?? { isAlwaysActive: true, windows: [] },
    };
  }
  if (sectionKey === SECTION_KEYS.name) {
    return { name: draft };
  }
  if (sectionKey === SECTION_KEYS.items) {
    return { menuItems: Array.isArray(draft) ? draft : [] };
  }
  return { [sectionKey]: draft };
};

const sectionIsDirty = (original, draft, sectionKey) => {
  if (!draft) return false;
  return computeSectionDiff(original, sectionPayload(sectionKey, draft), sectionKey).length > 0;
};

const bulkIsDirty = (original, bulkDrafts) => {
  for (const sectionKey of Object.keys(bulkDrafts ?? {})) {
    if (sectionIsDirty(original, bulkDrafts[sectionKey], sectionKey)) return true;
  }
  return false;
};

export const useMenuCategories_handlers = ({
  states,
  setters,
  constants,
  apiHelpers,
  isDebug,
}) => {
  const {
    menuCategories,
    detailSelectedId,
    detailMode,
    editingSection,
    sectionDraft,
    bulkDrafts,
    addFormName,
  } = states;

  const {
    setMenuCategories,
    setMenuItemsList,
    setViewMode,
    setDetailMode,
    setDetailSelectedId,
    setCollapsedSections,
    setEditingSection,
    setSectionDraft,
    setFieldErrors,
    setBulkDrafts,
    setBulkFieldErrors,
    setShowAddForm,
    setAddFormName,
    setConfirmModal,
    setDiscardModal,
    setDeleteModal,
    setIsLoading,
    setIsSaving,
    setError,
  } = setters;

  const { EMPTY_CONFIRM_MODAL, EMPTY_DISCARD_MODAL, EMPTY_DELETE_MODAL } =
    constants;
  const { MenuCategory_add, MenuCategory_getAll, MenuCategory_update, MenuCategory_delete, MenuItem_getAll } = apiHelpers;

  const selectedCategory = () =>
    menuCategories.find((cat) => cat._id === detailSelectedId);

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);
    const { success, message, data } = await MenuCategory_getAll();
    setIsLoading(false);

    if (success) {
      setMenuCategories(Array.isArray(data) ? data : []);
      return;
    }

    setError(message);
  };

  const handleFetchMenuItems = async () => {
    const { success, data } = await MenuItem_getAll();
    if (success) {
      setMenuItemsList(Array.isArray(data) ? data : []);
    }
  };

  const guardedNavigate = (doIt) => {
    const original = selectedCategory();
    const readDirty =
      detailMode === "read" &&
      editingSection &&
      sectionIsDirty(original, sectionDraft, editingSection);
    const bulkDirty = detailMode === "bulkEdit" && bulkIsDirty(original, bulkDrafts);

    if (readDirty || bulkDirty) {
      setDiscardModal({ isOpen: true, onConfirm: doIt });
      return;
    }

    doIt();
  };

  const resetDetailDrafts = () => {
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkDrafts({});
    setBulkFieldErrors({});
    setDetailMode("read");
  };

  const handleSetViewMode = (mode) => {
    if (mode === "detail") return;
    guardedNavigate(() => {
      resetDetailDrafts();
      setViewMode(mode);
    });
  };

  const handleViewCategory = (id) => {
    setDetailSelectedId(id);
    resetDetailDrafts();
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleEditCategory = (id) => {
    const cat = menuCategories.find((item) => item._id === id);
    if (!cat) return;

    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkFieldErrors({});
    setBulkDrafts(pickAllSectionsDraft(hydrateMenuCategoryForm(cat)));
    setDetailMode("bulkEdit");
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleBackToList = () => {
    guardedNavigate(() => {
      setViewMode("list");
      setDetailSelectedId(null);
      resetDetailDrafts();
      setError(null);
    });
  };

  const handleShowAddForm = () => {
    setAddFormName("");
    setError(null);
    setShowAddForm(true);
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);
    setAddFormName("");
    setError(null);
  };

  const handleAddFormNameChange = (value) => setAddFormName(value);

  const handleAddFormSubmit = async () => {
    const trimmed = (addFormName ?? "").trim();
    if (trimmed.length < 2) {
      setError("Category name must be at least 2 characters");
      return;
    }

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await MenuCategory_add({
      name: { en: trimmed },
    });
    setIsSaving(false);

    if (success && data) {
      setMenuCategories((prev) => [data, ...prev]);
      setShowAddForm(false);
      setAddFormName("");
      return;
    }

    setError(message);
  };

  const handleSectionEditStart = (sectionKey) => {
    const cat = selectedCategory();
    if (!cat) return;

    setSectionDraft(pickSectionDraft(hydrateMenuCategoryForm(cat), sectionKey));
    setEditingSection(sectionKey);
    setFieldErrors({});
    setError(null);
  };

  const handleSectionEditCancel = () => {
    const dirty = sectionIsDirty(selectedCategory(), sectionDraft, editingSection);
    const clear = () => {
      setEditingSection(null);
      setSectionDraft({});
      setFieldErrors({});
      setError(null);
    };

    if (dirty) {
      setDiscardModal({ isOpen: true, onConfirm: clear });
      return;
    }

    clear();
  };

  const handleSectionDraftChange = (path, value) => {
    setSectionDraft((prev) => setByPath(prev, path, value));
  };

  // activeTimings window handlers
  const handleSectionWindowAdd = () => {
    setSectionDraft((prev) => ({
      ...prev,
      activeTimings: {
        ...(prev?.activeTimings ?? {}),
        windows: [
          ...(prev?.activeTimings?.windows ?? []),
          { label: "", from: "", to: "" },
        ],
      },
    }));
  };

  const handleSectionWindowRemove = (index) => {
    setSectionDraft((prev) => ({
      ...prev,
      activeTimings: {
        ...(prev?.activeTimings ?? {}),
        windows: (prev?.activeTimings?.windows ?? []).filter(
          (_, i) => i !== index,
        ),
      },
    }));
  };

  const handleSectionWindowChange = (index, field, value) => {
    setSectionDraft((prev) => {
      const windows = (prev?.activeTimings?.windows ?? []).slice();
      windows[index] = { ...(windows[index] ?? {}), [field]: value };
      return {
        ...prev,
        activeTimings: { ...(prev?.activeTimings ?? {}), windows },
      };
    });
  };

  // items array handler — toggle ObjectIds
  const handleSectionItemToggle = (itemId) => {
    setSectionDraft((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      const exists = list.some(
        (id) => String(id) === String(itemId) || String(id?._id) === String(itemId),
      );
      return exists
        ? list.filter(
            (id) => String(id) !== String(itemId) && String(id?._id) !== String(itemId),
          )
        : [...list, itemId];
    });
  };

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection;
    const original = selectedCategory();
    if (!sectionKey || !original) return;

    const validation = validateSection(sectionKey, sectionDraft);
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setError("Please fix the highlighted fields");
      return;
    }

    setFieldErrors({});
    const payload = sectionPayload(sectionKey, sectionDraft);
    const changes = computeSectionDiff(original, payload, sectionKey);

    if (changes.length === 0) {
      setEditingSection(null);
      setSectionDraft({});
      return;
    }

    setConfirmModal({ isOpen: true, sectionKey, changes, payload });
  };

  const handleBulkDraftChange = (sectionKey, path, value) => {
    setBulkDrafts((prev) => ({
      ...prev,
      [sectionKey]: setByPath(prev?.[sectionKey] ?? {}, path, value),
    }));
  };

  const handleBulkWindowAdd = () => {
    setBulkDrafts((prev) => {
      const basic = prev?.basic ?? {};
      const timings = basic.activeTimings ?? {};
      return {
        ...prev,
        basic: {
          ...basic,
          activeTimings: {
            ...timings,
            windows: [...(timings.windows ?? []), { label: "", from: "", to: "" }],
          },
        },
      };
    });
  };

  const handleBulkWindowRemove = (index) => {
    setBulkDrafts((prev) => {
      const basic = prev?.basic ?? {};
      const timings = basic.activeTimings ?? {};
      return {
        ...prev,
        basic: {
          ...basic,
          activeTimings: {
            ...timings,
            windows: (timings.windows ?? []).filter((_, i) => i !== index),
          },
        },
      };
    });
  };

  const handleBulkWindowChange = (index, field, value) => {
    setBulkDrafts((prev) => {
      const basic = prev?.basic ?? {};
      const timings = basic.activeTimings ?? {};
      const windows = (timings.windows ?? []).slice();
      windows[index] = { ...(windows[index] ?? {}), [field]: value };
      return {
        ...prev,
        basic: {
          ...basic,
          activeTimings: { ...timings, windows },
        },
      };
    });
  };

  const handleBulkItemToggle = (itemId) => {
    setBulkDrafts((prev) => {
      const list = Array.isArray(prev?.items) ? prev.items : [];
      const exists = list.some(
        (id) => String(id) === String(itemId) || String(id?._id) === String(itemId),
      );
      return {
        ...prev,
        items: exists
          ? list.filter(
              (id) => String(id) !== String(itemId) && String(id?._id) !== String(itemId),
            )
          : [...list, itemId],
      };
    });
  };

  const handleBulkCancel = () => {
    const dirty = bulkIsDirty(selectedCategory(), bulkDrafts);
    const clear = () => {
      setBulkDrafts({});
      setBulkFieldErrors({});
      setDetailMode("read");
      setError(null);
    };

    if (dirty) {
      setDiscardModal({ isOpen: true, onConfirm: clear });
      return;
    }

    clear();
  };

  const handleBulkSubmit = () => {
    const original = selectedCategory();
    if (!original) return;

    const validation = validateBulk(bulkDrafts);
    if (!validation.ok) {
      setBulkFieldErrors(validation.errors);
      setError("Please fix the highlighted fields");
      return;
    }

    setBulkFieldErrors({});
    const payload = {};

    for (const sectionKey of EDITABLE_SECTIONS) {
      const draft = bulkDrafts?.[sectionKey];
      if (!draft || !sectionIsDirty(original, draft, sectionKey)) continue;

      Object.assign(payload, sectionPayload(sectionKey, draft));
    }

    const changes = computeBulkDiff(original, payload);
    if (changes.length === 0) {
      setBulkDrafts({});
      setDetailMode("read");
      return;
    }

    setConfirmModal({ isOpen: true, sectionKey: "bulk", changes, payload });
  };

  const handleConfirmModalCancel = () => setConfirmModal(EMPTY_CONFIRM_MODAL);

  const handleConfirmModalConfirm = async () => {
    const { payload, sectionKey } = states.confirmModal;
    if (!payload || !detailSelectedId) return;

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await MenuCategory_update(detailSelectedId, payload);
    setIsSaving(false);

    if (!success || !data) {
      setError(message || "Update failed");
      return;
    }

    setMenuCategories((prev) =>
      prev.map((cat) => (cat._id === detailSelectedId ? data : cat)),
    );
    setConfirmModal(EMPTY_CONFIRM_MODAL);

    if (sectionKey === "bulk") {
      setBulkDrafts({});
      setBulkFieldErrors({});
      setDetailMode("read");
      return;
    }

    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
  };

  const handleDeleteRequest = (id) => {
    const cat = menuCategories.find((item) => item._id === id);
    setDeleteModal({
      isOpen: true,
      categoryId: id,
      categoryName: cat?.name?.en ?? "",
    });
  };

  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.categoryId;
    if (!id) return;

    setIsSaving(true);
    setError(null);
    const { success, message } = await MenuCategory_delete(id);
    setIsSaving(false);

    if (success) {
      setMenuCategories((prev) => prev.filter((cat) => cat._id !== id));
      setDeleteModal(EMPTY_DELETE_MODAL);
      setViewMode("list");
      setDetailSelectedId(null);
      resetDetailDrafts();
      return;
    }

    setError(message);
  };

  const handleDeleteCancel = () => setDeleteModal(EMPTY_DELETE_MODAL);

  const handleDiscardConfirm = () => {
    const fn = states.discardModal.onConfirm;
    setDiscardModal(EMPTY_DISCARD_MODAL);
    if (typeof fn === "function") fn();
  };

  const handleDiscardCancel = () => setDiscardModal(EMPTY_DISCARD_MODAL);

  const handleToggleSectionCollapse = (sectionKey) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey],
    }));
  };

  return {
    handlers: {
      handleFetchAll,
      handleFetchMenuItems,
      handleSetViewMode,
      handleViewCategory,
      handleEditCategory,
      handleBackToList,
      handleShowAddForm,
      handleCancelAddForm,
      handleAddFormNameChange,
      handleAddFormSubmit,
      handleSectionEditStart,
      handleSectionEditCancel,
      handleSectionDraftChange,
      handleSectionWindowAdd,
      handleSectionWindowRemove,
      handleSectionWindowChange,
      handleSectionItemToggle,
      handleSectionEditSubmit,
      handleBulkDraftChange,
      handleBulkWindowAdd,
      handleBulkWindowRemove,
      handleBulkWindowChange,
      handleBulkItemToggle,
      handleBulkCancel,
      handleBulkSubmit,
      handleConfirmModalCancel,
      handleConfirmModalConfirm,
      handleDeleteRequest,
      handleDeleteConfirm,
      handleDeleteCancel,
      handleDiscardConfirm,
      handleDiscardCancel,
      handleToggleSectionCollapse,
    },
  };
};
