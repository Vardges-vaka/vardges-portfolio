import {
  setByPath,
  hydrateBranchForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  computeBulkDiff,
  EMPTY_VARIABLE_COST_ROW,
} from "../02_branches_helpers/_branches_helpers.index.js";
import {
  SECTION_KEYS,
  SECTION_PAYLOAD_KEY,
  EDITABLE_SECTIONS,
} from "../05_branches_cnst/_branches_cnst.index.js";
import {
  validateSection,
  validateBulk,
} from "../04_branches_vld/_branches_vld.index.js";

// Helper — a section has pending edits iff ANY path in its draft differs from
// the matching slice on the original branch. Reuses the diff engine.
const sectionIsDirty = (original, draft, sectionKey) => {
  if (!draft) return false;
  const payload =
    sectionKey === SECTION_KEYS.basic || sectionKey === SECTION_KEYS.notes
      ? draft
      : { [SECTION_PAYLOAD_KEY[sectionKey]]: { ...(original?.[sectionKey] ?? {}), ...draft } };
  return computeSectionDiff(original, payload, sectionKey).length > 0;
};

// Returns true when the bulk drafts contain any dirty section.
const bulkIsDirty = (original, bulkDrafts) => {
  if (!bulkDrafts) return false;
  for (const sectionKey of Object.keys(bulkDrafts)) {
    if (sectionIsDirty(original, bulkDrafts[sectionKey], sectionKey)) {
      return true;
    }
  }
  return false;
};

export const useBranches_handlers = ({
  states,
  setters,
  constants,
  apiHelpers,
  isDebug,
}) => {
  const {
    branches,
    detailSelectedId,
    detailMode,
    editingSection,
    sectionDraft,
    bulkDrafts,
    addFormName,
  } = states;

  const {
    setBranches,
    setViewMode,
    setDetailMode,
    setDetailSelectedId,
    setLocationViewMode,
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

  const { Branch_add, Branch_getAll, Branch_update, Branch_delete } =
    apiHelpers;

  // -------- Data fetch --------

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);
    const { success, message, data } = await Branch_getAll();
    setIsLoading(false);
    if (success) {
      setBranches(Array.isArray(data) ? data : []);
    } else {
      setError(message);
    }
  };

  // -------- Core dirty-aware navigation --------

  // Used by every back / cancel path. `doIt` runs immediately when the state
  // is clean; otherwise the discard modal gates the action.
  const guardedNavigate = (doIt) => {
    const original = branches.find((b) => b._id === detailSelectedId);
    const isReadDirty =
      detailMode === "read" && editingSection && sectionIsDirty(original, sectionDraft, editingSection);
    const isBulkDirty = detailMode === "bulkEdit" && bulkIsDirty(original, bulkDrafts);
    if (isReadDirty || isBulkDirty) {
      setDiscardModal({ isOpen: true, onConfirm: doIt });
      return;
    }
    doIt();
  };

  // -------- View-mode handlers --------

  const handleSetViewMode = (mode) => {
    if (mode === "detail") {
      // Only allowed via explicit view/edit actions below.
      setViewMode("detail");
      return;
    }
    // Leaving detail view clears per-section + bulk drafts.
    guardedNavigate(() => {
      setEditingSection(null);
      setSectionDraft({});
      setBulkDrafts({});
      setFieldErrors({});
      setBulkFieldErrors({});
      setDetailMode("read");
      setViewMode(mode);
    });
  };

  // Opens detail in read mode. All sections start readonly.
  const handleViewBranch = (id) => {
    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setBulkDrafts({});
    setFieldErrors({});
    setBulkFieldErrors({});
    setDetailMode("read");
    setViewMode("detail");
    setCollapsedSections({});
    setLocationViewMode("list");
  };

  // Opens detail in bulk edit mode with every editable section seeded with a draft.
  const handleEditBranch = (id) => {
    const branch = branches.find((b) => b._id === id);
    if (!branch) return;
    const hydrated = hydrateBranchForm(branch);
    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setBulkDrafts(pickAllSectionsDraft(hydrated));
    setFieldErrors({});
    setBulkFieldErrors({});
    setDetailMode("bulkEdit");
    setViewMode("detail");
    setCollapsedSections({});
    setLocationViewMode("list");
  };

  const handleBackToList = () => {
    guardedNavigate(() => {
      setViewMode("list");
      setDetailSelectedId(null);
      setEditingSection(null);
      setSectionDraft({});
      setBulkDrafts({});
      setFieldErrors({});
      setBulkFieldErrors({});
      setDetailMode("read");
      setError(null);
    });
  };

  // -------- List-item actions --------

  const handleDeleteRequest = (id) => {
    const branch = branches.find((b) => b._id === id);
    setDeleteModal({
      isOpen: true,
      branchId: id,
      branchName: branch?.name ?? "",
    });
  };

  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.branchId;
    if (!id) return;
    setIsSaving(true);
    setError(null);
    const { success, message } = await Branch_delete(id);
    setIsSaving(false);
    if (success) {
      setBranches((prev) => prev.filter((b) => b._id !== id));
      setDeleteModal(EMPTY_DELETE_MODAL);
      if (detailSelectedId === id) {
        setViewMode("list");
        setDetailSelectedId(null);
        setEditingSection(null);
        setSectionDraft({});
        setBulkDrafts({});
        setDetailMode("read");
      }
    } else {
      setError(message);
    }
  };

  const handleDeleteCancel = () => setDeleteModal(EMPTY_DELETE_MODAL);

  // Placeholders for future flows.
  const handleAddFiles = (id) => {
    isDebug && console.log("[Branches] TODO: Add Files flow for", id);
  };
  const handleAddCoverage = (id) => {
    isDebug && console.log("[Branches] TODO: Add Coverage flow for", id);
  };

  // -------- Add-form handlers --------

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
    if (!trimmed) {
      setError("Branch name is required");
      return;
    }
    setIsSaving(true);
    setError(null);
    const { success, message, data } = await Branch_add({ name: trimmed });
    setIsSaving(false);
    if (success && data) {
      setBranches((prev) => [data, ...prev]);
      setShowAddForm(false);
      setAddFormName("");
    } else {
      setError(message);
    }
  };

  // -------- Per-section edit handlers (read mode) --------

  const handleSectionEditStart = (sectionKey) => {
    const branch = branches.find((b) => b._id === detailSelectedId);
    if (!branch) return;
    const hydrated = hydrateBranchForm(branch);
    setSectionDraft(pickSectionDraft(hydrated, sectionKey));
    setEditingSection(sectionKey);
    setFieldErrors({});
    setError(null);
  };

  const handleSectionEditCancel = () => {
    const original = branches.find((b) => b._id === detailSelectedId);
    const isDirty = sectionIsDirty(original, sectionDraft, editingSection);
    const clear = () => {
      setEditingSection(null);
      setSectionDraft({});
      setFieldErrors({});
      setError(null);
    };
    if (isDirty) {
      setDiscardModal({ isOpen: true, onConfirm: clear });
      return;
    }
    clear();
  };

  const handleSectionDraftChange = (path, value) => {
    setSectionDraft((prev) => setByPath(prev, path, value));
  };

  const handleSectionVariableAdd = () => {
    setSectionDraft((prev) => {
      const list = Array.isArray(prev?.variable) ? prev.variable : [];
      return { ...prev, variable: [...list, { ...EMPTY_VARIABLE_COST_ROW }] };
    });
  };

  const handleSectionVariableRemove = (index) => {
    setSectionDraft((prev) => {
      const list = Array.isArray(prev?.variable) ? prev.variable : [];
      return { ...prev, variable: list.filter((_, i) => i !== index) };
    });
  };

  const handleSectionVariableChange = (index, field, value) => {
    setSectionDraft((prev) => {
      const list = Array.isArray(prev?.variable) ? prev.variable.slice() : [];
      list[index] = { ...(list[index] ?? {}), [field]: value };
      return { ...prev, variable: list };
    });
  };

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection;
    if (!sectionKey) return;
    const original = branches.find((b) => b._id === detailSelectedId);
    if (!original) return;

    // --- client-side validation first ---
    const vr = validateSection(sectionKey, sectionDraft);
    if (!vr.ok) {
      setFieldErrors(vr.errors);
      setError("Please fix the highlighted fields");
      return;
    }
    setFieldErrors({});

    // --- build payload ---
    let payload;
    if (sectionKey === SECTION_KEYS.basic) {
      payload = { name: (sectionDraft?.name ?? "").trim() };
      if (!payload.name) {
        setFieldErrors({ name: "required" });
        return;
      }
    } else if (sectionKey === SECTION_KEYS.notes) {
      payload = { notes: sectionDraft?.notes ?? "" };
    } else {
      const existingSubdoc = original?.[sectionKey] ?? {};
      const draftSubdoc = sectionDraft ?? {};
      payload = {
        [SECTION_PAYLOAD_KEY[sectionKey]]: {
          ...existingSubdoc,
          ...draftSubdoc,
        },
      };
    }

    const changes = computeSectionDiff(original, payload, sectionKey);
    if (changes.length === 0) {
      setEditingSection(null);
      setSectionDraft({});
      return;
    }

    setConfirmModal({ isOpen: true, sectionKey, changes, payload });
  };

  // -------- Bulk edit handlers --------

  const handleBulkDraftChange = (sectionKey, path, value) => {
    setBulkDrafts((prev) => ({
      ...prev,
      [sectionKey]: setByPath(prev?.[sectionKey] ?? {}, path, value),
    }));
  };

  const handleBulkVariableAdd = () => {
    setBulkDrafts((prev) => {
      const current = prev?.costs ?? {};
      const list = Array.isArray(current?.variable) ? current.variable : [];
      return {
        ...prev,
        costs: { ...current, variable: [...list, { ...EMPTY_VARIABLE_COST_ROW }] },
      };
    });
  };

  const handleBulkVariableRemove = (index) => {
    setBulkDrafts((prev) => {
      const current = prev?.costs ?? {};
      const list = Array.isArray(current?.variable) ? current.variable : [];
      return {
        ...prev,
        costs: { ...current, variable: list.filter((_, i) => i !== index) },
      };
    });
  };

  const handleBulkVariableChange = (index, field, value) => {
    setBulkDrafts((prev) => {
      const current = prev?.costs ?? {};
      const list = Array.isArray(current?.variable) ? current.variable.slice() : [];
      list[index] = { ...(list[index] ?? {}), [field]: value };
      return { ...prev, costs: { ...current, variable: list } };
    });
  };

  const handleBulkCancel = () => {
    const original = branches.find((b) => b._id === detailSelectedId);
    const dirty = bulkIsDirty(original, bulkDrafts);
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
    const original = branches.find((b) => b._id === detailSelectedId);
    if (!original) return;

    // client validate
    const vr = validateBulk(bulkDrafts);
    if (!vr.ok) {
      setBulkFieldErrors(vr.errors);
      setError("Please fix the highlighted fields");
      return;
    }
    setBulkFieldErrors({});

    // Assemble a SINGLE payload containing only dirty sections. For subdoc
    // sections we spread the existing subdoc so hidden fields (e.g.
    // contract.file, images) survive. For name/notes we just carry the scalar.
    const payload = {};
    for (const sectionKey of EDITABLE_SECTIONS) {
      const draft = bulkDrafts?.[sectionKey];
      if (!draft) continue;
      if (!sectionIsDirty(original, draft, sectionKey)) continue;

      if (sectionKey === SECTION_KEYS.basic) {
        payload.name = (draft.name ?? "").trim();
        if (!payload.name) {
          setBulkFieldErrors({ "basic.name": "required" });
          return;
        }
      } else if (sectionKey === SECTION_KEYS.notes) {
        payload.notes = draft.notes ?? "";
      } else {
        payload[SECTION_PAYLOAD_KEY[sectionKey]] = {
          ...(original?.[sectionKey] ?? {}),
          ...draft,
        };
      }
    }

    const changes = computeBulkDiff(original, payload);
    if (changes.length === 0) {
      // Nothing actually changed; exit bulk mode cleanly.
      setBulkDrafts({});
      setDetailMode("read");
      return;
    }

    setConfirmModal({ isOpen: true, sectionKey: "bulk", changes, payload });
  };

  // -------- Confirm modal --------

  const handleConfirmModalCancel = () => setConfirmModal(EMPTY_CONFIRM_MODAL);

  const handleConfirmModalConfirm = async () => {
    const { payload, sectionKey } = states.confirmModal;
    if (!payload || !detailSelectedId) return;

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await Branch_update(detailSelectedId, payload);
    setIsSaving(false);

    if (!success || !data) {
      setError(message || "Update failed");
      return;
    }

    setBranches((prev) =>
      prev.map((b) => (b._id === detailSelectedId ? data : b)),
    );
    setConfirmModal(EMPTY_CONFIRM_MODAL);

    if (sectionKey === "bulk") {
      setBulkDrafts({});
      setBulkFieldErrors({});
      setDetailMode("read");
    } else {
      setEditingSection(null);
      setSectionDraft({});
      setFieldErrors({});
    }
  };

  // -------- Discard modal --------

  const handleDiscardConfirm = () => {
    const fn = states.discardModal.onConfirm;
    setDiscardModal(EMPTY_DISCARD_MODAL);
    if (typeof fn === "function") fn();
  };
  const handleDiscardCancel = () => setDiscardModal(EMPTY_DISCARD_MODAL);

  // -------- Misc --------

  const handleLocationViewToggle = (mode) => setLocationViewMode(mode);

  const handleToggleSectionCollapse = (sectionKey) => {
    setCollapsedSections((prev) => ({ ...prev, [sectionKey]: !prev?.[sectionKey] }));
  };

  return {
    handlers: {
      // data
      handleFetchAll,
      // view-mode
      handleSetViewMode,
      handleViewBranch,
      handleEditBranch,
      handleBackToList,
      // list-item actions
      handleDeleteRequest,
      handleDeleteConfirm,
      handleDeleteCancel,
      handleAddFiles,
      handleAddCoverage,
      // add-form
      handleShowAddForm,
      handleCancelAddForm,
      handleAddFormNameChange,
      handleAddFormSubmit,
      // per-section edit (read mode)
      handleSectionEditStart,
      handleSectionEditCancel,
      handleSectionDraftChange,
      handleSectionVariableAdd,
      handleSectionVariableRemove,
      handleSectionVariableChange,
      handleSectionEditSubmit,
      // bulk edit
      handleBulkDraftChange,
      handleBulkVariableAdd,
      handleBulkVariableRemove,
      handleBulkVariableChange,
      handleBulkCancel,
      handleBulkSubmit,
      // confirm modal
      handleConfirmModalCancel,
      handleConfirmModalConfirm,
      // discard modal
      handleDiscardConfirm,
      handleDiscardCancel,
      // misc
      handleLocationViewToggle,
      handleToggleSectionCollapse,
    },
  };
};
