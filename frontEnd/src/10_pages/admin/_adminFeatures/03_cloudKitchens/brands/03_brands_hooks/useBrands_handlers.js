import {
  setByPath,
  hydrateBrandForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  computeBulkDiff,
  EMPTY_EMAIL_ROW,
} from "../02_brands_helpers/_brands_helpers.index.js";
import {
  SECTION_KEYS,
  EDITABLE_SECTIONS,
} from "../05_brands_cnst/_brands_cnst.index.js";
import {
  validateSection,
  validateBulk,
} from "../04_brands_vld/_brands_vld.index.js";

const sectionPayload = (sectionKey, draft) => {
  if (sectionKey === SECTION_KEYS.basic) {
    return {
      name: (draft?.name ?? "").trim(),
      tagline: draft?.tagline ?? "",
      isActive: draft?.isActive ?? true,
    };
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

export const useBrands_handlers = ({
  states,
  setters,
  constants,
  apiHelpers,
  isDebug,
}) => {
  const {
    brands,
    detailSelectedId,
    detailMode,
    editingSection,
    sectionDraft,
    bulkDrafts,
    addFormName,
  } = states;

  const {
    setBrands,
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
  const { Brand_add, Brand_getAll, Brand_update, Brand_delete } = apiHelpers;

  const selectedBrand = () => brands.find((brand) => brand._id === detailSelectedId);

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);
    const { success, message, data } = await Brand_getAll();
    setIsLoading(false);

    if (success) {
      setBrands(Array.isArray(data) ? data : []);
      return;
    }

    setError(message);
  };

  const guardedNavigate = (doIt) => {
    const original = selectedBrand();
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

  const handleViewBrand = (id) => {
    setDetailSelectedId(id);
    resetDetailDrafts();
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleEditBrand = (id) => {
    const brand = brands.find((item) => item._id === id);
    if (!brand) return;

    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkFieldErrors({});
    setBulkDrafts(pickAllSectionsDraft(hydrateBrandForm(brand)));
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

  const handleAddLogo = (id) => {
    isDebug && console.log("[Brands] TODO: Add Logo flow for", id);
  };

  const handleAddFiles = (id) => {
    isDebug && console.log("[Brands] TODO: Add Files flow for", id);
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
      setError("Brand name must be at least 2 characters");
      return;
    }

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await Brand_add({ name: trimmed });
    setIsSaving(false);

    if (success && data) {
      setBrands((prev) => [data, ...prev]);
      setShowAddForm(false);
      setAddFormName("");
      return;
    }

    setError(message);
  };

  const handleSectionEditStart = (sectionKey) => {
    const brand = selectedBrand();
    if (!brand) return;

    setSectionDraft(pickSectionDraft(hydrateBrandForm(brand), sectionKey));
    setEditingSection(sectionKey);
    setFieldErrors({});
    setError(null);
  };

  const handleSectionEditCancel = () => {
    const dirty = sectionIsDirty(selectedBrand(), sectionDraft, editingSection);
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

  const handleSectionEmailAdd = () => {
    setSectionDraft((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { ...EMPTY_EMAIL_ROW },
    ]);
  };

  const handleSectionEmailRemove = (index) => {
    setSectionDraft((prev) =>
      (Array.isArray(prev) ? prev : []).filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const handleSectionEmailChange = (index, field, value) => {
    setSectionDraft((prev) => {
      const list = Array.isArray(prev) ? prev.slice() : [];
      list[index] = { ...(list[index] ?? {}), [field]: value };
      return list;
    });
  };

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection;
    const original = selectedBrand();
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

  const handleBulkEmailAdd = () => {
    setBulkDrafts((prev) => ({
      ...prev,
      emails: [...(Array.isArray(prev?.emails) ? prev.emails : []), { ...EMPTY_EMAIL_ROW }],
    }));
  };

  const handleBulkEmailRemove = (index) => {
    setBulkDrafts((prev) => ({
      ...prev,
      emails: (Array.isArray(prev?.emails) ? prev.emails : []).filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const handleBulkEmailChange = (index, field, value) => {
    setBulkDrafts((prev) => {
      const emails = Array.isArray(prev?.emails) ? prev.emails.slice() : [];
      emails[index] = { ...(emails[index] ?? {}), [field]: value };
      return { ...prev, emails };
    });
  };

  const handleBulkCancel = () => {
    const dirty = bulkIsDirty(selectedBrand(), bulkDrafts);
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
    const original = selectedBrand();
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
    const { success, message, data } = await Brand_update(detailSelectedId, payload);
    setIsSaving(false);

    if (!success || !data) {
      setError(message || "Update failed");
      return;
    }

    setBrands((prev) =>
      prev.map((brand) => (brand._id === detailSelectedId ? data : brand)),
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
    const brand = brands.find((item) => item._id === id);
    setDeleteModal({
      isOpen: true,
      brandId: id,
      brandName: brand?.name ?? "",
    });
  };

  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.brandId;
    if (!id) return;

    setIsSaving(true);
    setError(null);
    const { success, message } = await Brand_delete(id);
    setIsSaving(false);

    if (success) {
      setBrands((prev) => prev.filter((brand) => brand._id !== id));
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
      handleViewBrand,
      handleEditBrand,
      handleBackToList,
      handleAddLogo,
      handleAddFiles,
      handleShowAddForm,
      handleCancelAddForm,
      handleAddFormNameChange,
      handleAddFormSubmit,
      handleSectionEditStart,
      handleSectionEditCancel,
      handleSectionDraftChange,
      handleSectionEmailAdd,
      handleSectionEmailRemove,
      handleSectionEmailChange,
      handleSectionEditSubmit,
      handleBulkDraftChange,
      handleBulkEmailAdd,
      handleBulkEmailRemove,
      handleBulkEmailChange,
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
