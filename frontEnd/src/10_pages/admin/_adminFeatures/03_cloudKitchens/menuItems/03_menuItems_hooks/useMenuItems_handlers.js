import {
  setByPath,
  hydrateMenuItemForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  computeBulkDiff,
} from "../02_menuItems_helpers/_menuItems_helpers.index.js";
import {
  SECTION_KEYS,
  EDITABLE_SECTIONS,
} from "../05_menuItems_cnst/_menuItems_cnst.index.js";
import {
  validateSection,
  validateBulk,
} from "../04_menuItems_vld/_menuItems_vld.index.js";

const sectionPayload = (sectionKey, draft) => {
  if (sectionKey === SECTION_KEYS.basic) {
    return {
      cost: draft?.cost ?? 0,
      sellingPrice: draft?.sellingPrice ?? 0,
      isActive: draft?.isActive ?? true,
      activeTimings: draft?.activeTimings,
    };
  }
  if (sectionKey === SECTION_KEYS.name) return { name: draft };
  if (sectionKey === SECTION_KEYS.modifiers) return { modifiers: draft };
  if (sectionKey === SECTION_KEYS.descriptions) return { descriptions: draft };
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

export const useMenuItems_handlers = ({
  states,
  setters,
  constants,
  apiHelpers,
  isDebug,
}) => {
  const {
    menuItems,
    detailSelectedId,
    detailMode,
    editingSection,
    sectionDraft,
    bulkDrafts,
    addFormName,
  } = states;

  const {
    setMenuItems,
    setModifiersList,
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

  const { EMPTY_CONFIRM_MODAL, EMPTY_DISCARD_MODAL, EMPTY_DELETE_MODAL } = constants;
  const { MenuItem_add, MenuItem_getAll, MenuItem_update, MenuItem_delete, Modifier_getAll } = apiHelpers;

  const selectedItem = () => menuItems.find((item) => item._id === detailSelectedId);

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);

    const [itemsRes, modsRes] = await Promise.all([
      MenuItem_getAll(),
      Modifier_getAll(),
    ]);

    setIsLoading(false);

    if (itemsRes.success) {
      setMenuItems(Array.isArray(itemsRes.data) ? itemsRes.data : []);
    } else {
      setError(itemsRes.message);
    }

    setModifiersList(Array.isArray(modsRes) ? modsRes : []);
  };

  const guardedNavigate = (doIt) => {
    const original = selectedItem();
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

  const handleViewItem = (id) => {
    setDetailSelectedId(id);
    resetDetailDrafts();
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleEditItem = (id) => {
    const item = menuItems.find((i) => i._id === id);
    if (!item) return;

    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkFieldErrors({});
    setBulkDrafts(pickAllSectionsDraft(hydrateMenuItemForm(item)));
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
    if (trimmed.length < 1) {
      setError("Menu item name is required");
      return;
    }

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await MenuItem_add({ name: { en: trimmed } });
    setIsSaving(false);

    if (success && data) {
      setMenuItems((prev) => [data, ...prev]);
      setShowAddForm(false);
      setAddFormName("");
      return;
    }
    setError(message);
  };

  const handleSectionEditStart = (sectionKey) => {
    const item = selectedItem();
    if (!item) return;

    setSectionDraft(pickSectionDraft(hydrateMenuItemForm(item), sectionKey));
    setEditingSection(sectionKey);
    setFieldErrors({});
    setError(null);
  };

  const handleSectionEditCancel = () => {
    const dirty = sectionIsDirty(selectedItem(), sectionDraft, editingSection);
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

  // Modifiers section: toggle an ObjectId in/out of the array
  const handleModifierToggle = (modId) => {
    setSectionDraft((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      return arr.includes(modId) ? arr.filter((id) => id !== modId) : [...arr, modId];
    });
  };

  const handleBulkModifierToggle = (modId) => {
    setBulkDrafts((prev) => {
      const arr = Array.isArray(prev?.modifiers) ? prev.modifiers : [];
      const next = arr.includes(modId) ? arr.filter((id) => id !== modId) : [...arr, modId];
      return { ...prev, modifiers: next };
    });
  };

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection;
    const original = selectedItem();
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

  const handleBulkCancel = () => {
    const dirty = bulkIsDirty(selectedItem(), bulkDrafts);
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
    const original = selectedItem();
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
    const { success, message, data } = await MenuItem_update(detailSelectedId, payload);
    setIsSaving(false);

    if (!success || !data) {
      setError(message || "Update failed");
      return;
    }

    setMenuItems((prev) =>
      prev.map((item) => (item._id === detailSelectedId ? data : item)),
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
    const item = menuItems.find((i) => i._id === id);
    setDeleteModal({
      isOpen: true,
      menuItemId: id,
      menuItemName: item?.name?.en ?? "",
    });
  };

  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.menuItemId;
    if (!id) return;

    setIsSaving(true);
    setError(null);
    const { success, message } = await MenuItem_delete(id);
    setIsSaving(false);

    if (success) {
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
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
      handleSetViewMode,
      handleViewItem,
      handleEditItem,
      handleBackToList,
      handleShowAddForm,
      handleCancelAddForm,
      handleAddFormNameChange,
      handleAddFormSubmit,
      handleSectionEditStart,
      handleSectionEditCancel,
      handleSectionDraftChange,
      handleModifierToggle,
      handleBulkModifierToggle,
      handleSectionEditSubmit,
      handleBulkDraftChange,
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
