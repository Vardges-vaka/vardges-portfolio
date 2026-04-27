import {
  setByPath,
  hydrateMenuForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  computeBulkDiff,
} from "../02_menus_helpers/_menus_helpers.index.js";
import {
  SECTION_KEYS,
  EDITABLE_SECTIONS,
} from "../05_menus_cnst/_menus_cnst.index.js";
import {
  validateSection,
  validateBulk,
} from "../04_menus_vld/_menus_vld.index.js";

const sectionPayload = (sectionKey, draft) => {
  if (sectionKey === SECTION_KEYS.basic) {
    return { isActive: draft?.isActive ?? true };
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

const toggleIdInArray = (arr, id) => {
  const list = Array.isArray(arr) ? arr : [];
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
};

export const useMenus_handlers = ({
  states,
  setters,
  constants,
  apiHelpers,
  isDebug,
}) => {
  const {
    menus,
    detailSelectedId,
    detailMode,
    editingSection,
    sectionDraft,
    bulkDrafts,
    addFormName,
  } = states;

  const {
    setMenus,
    setCategoriesList,
    setBranchesList,
    setBrandsList,
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
  const {
    Menu_add,
    Menu_getAll,
    Menu_update,
    Menu_delete,
    MenuCategory_getAll,
    Branch_getAll,
    Brand_getAll,
  } = apiHelpers;

  const selectedMenu = () => menus.find((m) => m._id === detailSelectedId);

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);

    const [menusRes, catsRes, branchesRes, brandsRes] = await Promise.all([
      Menu_getAll(),
      MenuCategory_getAll(),
      Branch_getAll(),
      Brand_getAll(),
    ]);

    setIsLoading(false);

    if (menusRes.success) {
      setMenus(Array.isArray(menusRes.data) ? menusRes.data : []);
    } else {
      setError(menusRes.message);
    }

    setCategoriesList(Array.isArray(catsRes.data) ? catsRes.data : []);
    setBranchesList(Array.isArray(branchesRes.data) ? branchesRes.data : []);
    setBrandsList(Array.isArray(brandsRes.data) ? brandsRes.data : []);
  };

  const guardedNavigate = (doIt) => {
    const original = selectedMenu();
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

  const handleViewMenu = (id) => {
    setDetailSelectedId(id);
    resetDetailDrafts();
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleEditMenu = (id) => {
    const menu = menus.find((item) => item._id === id);
    if (!menu) return;

    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkFieldErrors({});
    setBulkDrafts(pickAllSectionsDraft(hydrateMenuForm(menu)));
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
      setError("Menu name (en) is required");
      return;
    }

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await Menu_add({ name: { en: trimmed } });
    setIsSaving(false);

    if (success && data) {
      setMenus((prev) => [data, ...prev]);
      setShowAddForm(false);
      setAddFormName("");
      return;
    }

    setError(message);
  };

  const handleSectionEditStart = (sectionKey) => {
    const menu = selectedMenu();
    if (!menu) return;

    setSectionDraft(pickSectionDraft(hydrateMenuForm(menu), sectionKey));
    setEditingSection(sectionKey);
    setFieldErrors({});
    setError(null);
  };

  const handleSectionEditCancel = () => {
    const dirty = sectionIsDirty(selectedMenu(), sectionDraft, editingSection);
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

  const handleIdToggle = (id) => {
    setSectionDraft((prev) => toggleIdInArray(prev, id));
  };

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection;
    const original = selectedMenu();
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

  const handleBulkIdToggle = (sectionKey, id) => {
    setBulkDrafts((prev) => ({
      ...prev,
      [sectionKey]: toggleIdInArray(prev?.[sectionKey], id),
    }));
  };

  const handleBulkCancel = () => {
    const dirty = bulkIsDirty(selectedMenu(), bulkDrafts);
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
    const original = selectedMenu();
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
    const { success, message, data } = await Menu_update(detailSelectedId, payload);
    setIsSaving(false);

    if (!success || !data) {
      setError(message || "Update failed");
      return;
    }

    setMenus((prev) =>
      prev.map((menu) => (menu._id === detailSelectedId ? data : menu)),
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
    const menu = menus.find((item) => item._id === id);
    setDeleteModal({
      isOpen: true,
      menuId: id,
      menuName: menu?.name?.en ?? "",
    });
  };

  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.menuId;
    if (!id) return;

    setIsSaving(true);
    setError(null);
    const { success, message } = await Menu_delete(id);
    setIsSaving(false);

    if (success) {
      setMenus((prev) => prev.filter((menu) => menu._id !== id));
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
      handleViewMenu,
      handleEditMenu,
      handleBackToList,
      handleShowAddForm,
      handleCancelAddForm,
      handleAddFormNameChange,
      handleAddFormSubmit,
      handleSectionEditStart,
      handleSectionEditCancel,
      handleSectionDraftChange,
      handleIdToggle,
      handleSectionEditSubmit,
      handleBulkDraftChange,
      handleBulkIdToggle,
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
