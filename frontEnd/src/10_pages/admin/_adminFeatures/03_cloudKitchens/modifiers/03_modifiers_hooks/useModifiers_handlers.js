import {
  setByPath,
  hydrateModifierForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  computeBulkDiff,
  EMPTY_OPTION_ROW,
} from "../02_modifiers_helpers/_modifiers_helpers.index.js";
import {
  SECTION_KEYS,
  EDITABLE_SECTIONS,
} from "../05_modifiers_cnst/_modifiers_cnst.index.js";
import {
  validateSection,
  validateBulk,
} from "../04_modifiers_vld/_modifiers_vld.index.js";

const sectionPayload = (sectionKey, draft) => {
  if (sectionKey === SECTION_KEYS.basic) {
    return {
      type: draft?.type ?? "optional",
      selectionQty: draft?.selectionQty ?? "onlyOne",
      cost: draft?.cost ?? 0,
      isActive: draft?.isActive ?? true,
    };
  }

  if (sectionKey === SECTION_KEYS.name) {
    return { name: draft };
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

export const useModifiers_handlers = ({
  states,
  setters,
  constants,
  apiHelpers,
  isDebug,
}) => {
  const {
    modifiers,
    detailSelectedId,
    detailMode,
    editingSection,
    sectionDraft,
    bulkDrafts,
    addFormName,
  } = states;

  const {
    setModifiers,
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
  const { Modifier_add, Modifier_getAll, Modifier_update, Modifier_delete } = apiHelpers;

  const selectedModifier = () =>
    modifiers.find((m) => m._id === detailSelectedId);

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);
    const { success, message, data } = await Modifier_getAll();
    setIsLoading(false);

    if (success) {
      setModifiers(Array.isArray(data) ? data : []);
      return;
    }

    setError(message);
  };

  const guardedNavigate = (doIt) => {
    const original = selectedModifier();
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

  const handleViewModifier = (id) => {
    setDetailSelectedId(id);
    resetDetailDrafts();
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleEditModifier = (id) => {
    const modifier = modifiers.find((item) => item._id === id);
    if (!modifier) return;

    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkFieldErrors({});
    setBulkDrafts(pickAllSectionsDraft(hydrateModifierForm(modifier)));
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
      setError("Modifier name is required");
      return;
    }

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await Modifier_add({
      name: { en: trimmed },
    });
    setIsSaving(false);

    if (success && data) {
      setModifiers((prev) => [data, ...prev]);
      setShowAddForm(false);
      setAddFormName("");
      return;
    }

    setError(message);
  };

  const handleSectionEditStart = (sectionKey) => {
    const modifier = selectedModifier();
    if (!modifier) return;

    setSectionDraft(pickSectionDraft(hydrateModifierForm(modifier), sectionKey));
    setEditingSection(sectionKey);
    setFieldErrors({});
    setError(null);
  };

  const handleSectionEditCancel = () => {
    const dirty = sectionIsDirty(selectedModifier(), sectionDraft, editingSection);
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

  // Options array handlers — single-section mode
  const handleSectionOptionAdd = () => {
    setSectionDraft((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      JSON.parse(JSON.stringify(EMPTY_OPTION_ROW)),
    ]);
  };

  const handleSectionOptionRemove = (index) => {
    setSectionDraft((prev) =>
      (Array.isArray(prev) ? prev : []).filter((_, i) => i !== index),
    );
  };

  const handleSectionOptionChange = (index, path, value) => {
    setSectionDraft((prev) => {
      const list = Array.isArray(prev) ? prev.slice() : [];
      list[index] = setByPath(list[index] ?? {}, path, value);
      return list;
    });
  };

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection;
    const original = selectedModifier();
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

  // Options array handlers — bulk mode
  const handleBulkOptionAdd = () => {
    setBulkDrafts((prev) => ({
      ...prev,
      options: [
        ...(Array.isArray(prev?.options) ? prev.options : []),
        JSON.parse(JSON.stringify(EMPTY_OPTION_ROW)),
      ],
    }));
  };

  const handleBulkOptionRemove = (index) => {
    setBulkDrafts((prev) => ({
      ...prev,
      options: (Array.isArray(prev?.options) ? prev.options : []).filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const handleBulkOptionChange = (index, path, value) => {
    setBulkDrafts((prev) => {
      const options = Array.isArray(prev?.options) ? prev.options.slice() : [];
      options[index] = setByPath(options[index] ?? {}, path, value);
      return { ...prev, options };
    });
  };

  const handleBulkCancel = () => {
    const dirty = bulkIsDirty(selectedModifier(), bulkDrafts);
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
    const original = selectedModifier();
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
    const { success, message, data } = await Modifier_update(detailSelectedId, payload);
    setIsSaving(false);

    if (!success || !data) {
      setError(message || "Update failed");
      return;
    }

    setModifiers((prev) =>
      prev.map((m) => (m._id === detailSelectedId ? data : m)),
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
    const modifier = modifiers.find((item) => item._id === id);
    setDeleteModal({
      isOpen: true,
      modifierId: id,
      modifierName: modifier?.name?.en ?? "",
    });
  };

  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.modifierId;
    if (!id) return;

    setIsSaving(true);
    setError(null);
    const { success, message } = await Modifier_delete(id);
    setIsSaving(false);

    if (success) {
      setModifiers((prev) => prev.filter((m) => m._id !== id));
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
      handleViewModifier,
      handleEditModifier,
      handleBackToList,
      handleShowAddForm,
      handleCancelAddForm,
      handleAddFormNameChange,
      handleAddFormSubmit,
      handleSectionEditStart,
      handleSectionEditCancel,
      handleSectionDraftChange,
      handleSectionOptionAdd,
      handleSectionOptionRemove,
      handleSectionOptionChange,
      handleSectionEditSubmit,
      handleBulkDraftChange,
      handleBulkOptionAdd,
      handleBulkOptionRemove,
      handleBulkOptionChange,
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
