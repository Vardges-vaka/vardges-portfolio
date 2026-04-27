import {
  setByPath,
  hydrateEmployeeForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  computeBulkDiff,
  EMPTY_LEAVE_PERIOD_ROW,
  EMPTY_CERT_ROW,
  EMPTY_UNIFORM_ISSUE_ROW,
} from "../02_employees_helpers/_employees_helpers.index.js";
import { EDITABLE_SECTIONS, SECTION_KEYS } from "../05_employees_cnst/_employees_cnst.index.js";
import { validateSection, validateBulk } from "../04_employees_vld/_employees_vld.index.js";

const sectionPayload = (sectionKey, draft, original = {}) => {
  if (sectionKey === SECTION_KEYS.basic || sectionKey === SECTION_KEYS.status || sectionKey === SECTION_KEYS.assignment) return { ...draft };
  if (sectionKey === SECTION_KEYS.leaves) return { annualLeaves: draft.annualLeaves, publicHolidaysBalance: draft.publicHolidaysBalance };
  if (sectionKey === SECTION_KEYS.legal) return { legal: { ...(original.legal ?? {}), ...draft } };
  return { [sectionKey]: draft };
};

const sectionIsDirty = (original, draft, sectionKey) => {
  if (!draft) return false;
  return computeSectionDiff(original, sectionPayload(sectionKey, draft, original), sectionKey).length > 0;
};

export const useEmployees_handlers = ({ states, setters, constants, apiHelpers, isDebug }) => {
  const { employees, detailSelectedId, detailMode, editingSection, sectionDraft, bulkDrafts, addFormFirstName, addFormLastName } = states;
  const {
    setEmployees, setBranchesList, setBrandsList, setViewMode, setDetailMode,
    setDetailSelectedId, setCollapsedSections, setEditingSection, setSectionDraft,
    setFieldErrors, setBulkDrafts, setBulkFieldErrors, setShowAddForm,
    setAddFormFirstName, setAddFormLastName, setConfirmModal, setDiscardModal,
    setDeleteModal, setIsLoading, setIsSaving, setError,
  } = setters;
  const { EMPTY_CONFIRM_MODAL, EMPTY_DISCARD_MODAL, EMPTY_DELETE_MODAL } = constants;
  const { Employee_add, Employee_getAll, Employee_update, Employee_delete, fetchBranchesSafe, fetchBrandsSafe } = apiHelpers;

  const selectedEmployee = () => employees.find((employee) => employee._id === detailSelectedId);

  const resetDrafts = () => {
    setEditingSection(null); setSectionDraft({}); setFieldErrors({});
    setBulkDrafts({}); setBulkFieldErrors({}); setDetailMode("read");
  };

  const bulkIsDirty = (original, drafts) => Object.keys(drafts ?? {}).some((key) => sectionIsDirty(original, drafts[key], key));

  const guardedNavigate = (doIt) => {
    const original = selectedEmployee();
    const readDirty = detailMode === "read" && editingSection && sectionIsDirty(original, sectionDraft, editingSection);
    const bulkDirty = detailMode === "bulkEdit" && bulkIsDirty(original, bulkDrafts);
    if (readDirty || bulkDirty) {
      setDiscardModal({ isOpen: true, onConfirm: doIt });
      return;
    }
    doIt();
  };

  const handleFetchAll = async () => {
    setIsLoading(true); setError(null);
    const [employeesResult, branches, brands] = await Promise.all([
      Employee_getAll(), fetchBranchesSafe(), fetchBrandsSafe(),
    ]);
    setBranchesList(branches); setBrandsList(brands); setIsLoading(false);
    if (employeesResult.success) setEmployees(Array.isArray(employeesResult.data) ? employeesResult.data : []);
    else setError(employeesResult.message);
  };

  const handleSetViewMode = (mode) => {
    if (mode === "detail") return;
    guardedNavigate(() => { resetDrafts(); setViewMode(mode); });
  };
  const handleViewEmployee = (id) => {
    setDetailSelectedId(id); resetDrafts(); setCollapsedSections({}); setViewMode("detail");
  };
  const handleEditEmployee = (id) => {
    const employee = employees.find((item) => item._id === id);
    if (!employee) return;
    setDetailSelectedId(id); setEditingSection(null); setSectionDraft({});
    setFieldErrors({}); setBulkFieldErrors({});
    setBulkDrafts(pickAllSectionsDraft(hydrateEmployeeForm(employee)));
    setDetailMode("bulkEdit"); setCollapsedSections({}); setViewMode("detail");
  };
  const handleBackToList = () => guardedNavigate(() => {
    setViewMode("list"); setDetailSelectedId(null); resetDrafts(); setError(null);
  });

  const handleShowAddForm = () => { setAddFormFirstName(""); setAddFormLastName(""); setError(null); setShowAddForm(true); };
  const handleCancelAddForm = () => { setShowAddForm(false); setAddFormFirstName(""); setAddFormLastName(""); setError(null); };
  const handleAddFormSubmit = async () => {
    const firstName = addFormFirstName.trim(); const lastName = addFormLastName.trim();
    if (firstName.length < 2 || lastName.length < 2) { setError("First and last name are required"); return; }
    setIsSaving(true); setError(null);
    const result = await Employee_add({ firstName, lastName });
    setIsSaving(false);
    if (result.success && result.data) {
      setEmployees((prev) => [result.data, ...prev]); handleCancelAddForm(); return;
    }
    setError(result.message);
  };

  const handleAddFiles = (id) => isDebug && console.log("[Employees] TODO: Add Files", id);
  const handleAddImages = (id) => isDebug && console.log("[Employees] TODO: Add Images", id);

  const handleSectionEditStart = (sectionKey) => {
    const employee = selectedEmployee(); if (!employee) return;
    setSectionDraft(pickSectionDraft(hydrateEmployeeForm(employee), sectionKey));
    setEditingSection(sectionKey); setFieldErrors({}); setError(null);
  };
  const handleSectionEditCancel = () => {
    const clear = () => { setEditingSection(null); setSectionDraft({}); setFieldErrors({}); setError(null); };
    if (sectionIsDirty(selectedEmployee(), sectionDraft, editingSection)) setDiscardModal({ isOpen: true, onConfirm: clear });
    else clear();
  };
  const handleSectionDraftChange = (path, value) => {
    setSectionDraft((prev) => {
      const next = setByPath(prev, path, value);
      if ((path === "isResigned" || path === "isTerminated") && value === true) next.isActive = false;
      return next;
    });
  };
  const handleBulkDraftChange = (sectionKey, path, value) => {
    setBulkDrafts((prev) => {
      const nextSection = setByPath(prev?.[sectionKey] ?? {}, path, value);
      if (sectionKey === SECTION_KEYS.status && (path === "isResigned" || path === "isTerminated") && value === true) nextSection.isActive = false;
      return { ...prev, [sectionKey]: nextSection };
    });
  };

  const arrayUpdate = (setter, path, fallbackRow, action, index, field, value) => setter((prev) => {
    const list = path ? path.split(".").reduce((acc, key) => acc?.[key], prev) ?? [] : prev;
    let nextList = Array.isArray(list) ? list.slice() : [];
    if (action === "add") nextList = [...nextList, { ...fallbackRow }];
    if (action === "remove") nextList = nextList.filter((_, i) => i !== index);
    if (action === "change") nextList[index] = { ...(nextList[index] ?? {}), [field]: value };
    if (!path) return nextList;
    return setByPath(prev, path, nextList);
  });
  const handleSectionArray = (path, fallbackRow, action, index, field, value) => arrayUpdate(setSectionDraft, path, fallbackRow, action, index, field, value);
  const handleBulkArray = (sectionKey, path, fallbackRow, action, index, field, value) => setBulkDrafts((prev) => {
    const section = prev?.[sectionKey] ?? {};
    const list = path ? path.split(".").reduce((acc, key) => acc?.[key], section) ?? [] : section;
    let nextList = Array.isArray(list) ? list.slice() : [];
    if (action === "add") nextList = [...nextList, { ...fallbackRow }];
    if (action === "remove") nextList = nextList.filter((_, i) => i !== index);
    if (action === "change") nextList[index] = { ...(nextList[index] ?? {}), [field]: value };
    if (!path) return { ...prev, [sectionKey]: nextList };
    return { ...prev, [sectionKey]: setByPath(section, path, nextList) };
  });
  const handleWorkingBranchChange = (value) => handleSectionDraftChange("workingBranch", value);
  const handleBulkWorkingBranchChange = (value) => handleBulkDraftChange(SECTION_KEYS.assignment, "workingBranch", value);
  const handleAssociatedBrandsToggle = (brandId) => setSectionDraft((prev) => {
    const current = Array.isArray(prev.associatedBrands) ? prev.associatedBrands : [];
    return { ...prev, associatedBrands: current.includes(brandId) ? current.filter((id) => id !== brandId) : [...current, brandId] };
  });
  const handleBulkAssociatedBrandsToggle = (brandId) => setBulkDrafts((prev) => {
    const assignment = prev?.assignment ?? {};
    const current = Array.isArray(assignment.associatedBrands) ? assignment.associatedBrands : [];
    return {
      ...prev,
      assignment: {
        ...assignment,
        associatedBrands: current.includes(brandId)
          ? current.filter((id) => id !== brandId)
          : [...current, brandId],
      },
    };
  });

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection; const original = selectedEmployee(); if (!sectionKey || !original) return;
    const validation = validateSection(sectionKey, sectionDraft);
    if (!validation.ok) { setFieldErrors(validation.errors); setError("Please fix the highlighted fields"); return; }
    const payload = sectionPayload(sectionKey, sectionDraft, original);
    const changes = computeSectionDiff(original, payload, sectionKey);
    if (changes.length === 0) { setEditingSection(null); setSectionDraft({}); return; }
    setConfirmModal({ isOpen: true, sectionKey, changes, payload });
  };

  const handleBulkSubmit = () => {
    const original = selectedEmployee(); if (!original) return;
    const validation = validateBulk(bulkDrafts);
    if (!validation.ok) { setBulkFieldErrors(validation.errors); setError("Please fix the highlighted fields"); return; }
    const payload = {};
    for (const sectionKey of EDITABLE_SECTIONS) {
      const draft = bulkDrafts?.[sectionKey];
      if (draft && sectionIsDirty(original, draft, sectionKey)) Object.assign(payload, sectionPayload(sectionKey, draft, original));
    }
    const changes = computeBulkDiff(original, payload);
    if (changes.length === 0) { setBulkDrafts({}); setDetailMode("read"); return; }
    setConfirmModal({ isOpen: true, sectionKey: "bulk", changes, payload });
  };
  const handleBulkCancel = () => {
    const clear = () => { setBulkDrafts({}); setBulkFieldErrors({}); setDetailMode("read"); setError(null); };
    if (bulkIsDirty(selectedEmployee(), bulkDrafts)) setDiscardModal({ isOpen: true, onConfirm: clear });
    else clear();
  };

  const handleConfirmModalConfirm = async () => {
    const { payload, sectionKey } = states.confirmModal;
    if (!payload || !detailSelectedId) return;
    setIsSaving(true); setError(null);
    const result = await Employee_update(detailSelectedId, payload);
    setIsSaving(false);
    if (!result.success || !result.data) { setError(result.message || "Update failed"); return; }
    setEmployees((prev) => prev.map((employee) => employee._id === detailSelectedId ? result.data : employee));
    setConfirmModal(EMPTY_CONFIRM_MODAL);
    if (sectionKey === "bulk") { setBulkDrafts({}); setBulkFieldErrors({}); setDetailMode("read"); }
    else { setEditingSection(null); setSectionDraft({}); setFieldErrors({}); }
  };

  const handleDeleteRequest = (id) => {
    const employee = employees.find((item) => item._id === id);
    setDeleteModal({ isOpen: true, employeeId: id, employeeName: `${employee?.firstName ?? ""} ${employee?.lastName ?? ""}`.trim() });
  };
  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.employeeId; if (!id) return;
    setIsSaving(true); const result = await Employee_delete(id); setIsSaving(false);
    if (result.success) { setEmployees((prev) => prev.filter((employee) => employee._id !== id)); setDeleteModal(EMPTY_DELETE_MODAL); setViewMode("list"); setDetailSelectedId(null); resetDrafts(); }
    else setError(result.message);
  };

  return { handlers: {
    handleFetchAll, handleSetViewMode, handleViewEmployee, handleEditEmployee, handleBackToList,
    handleShowAddForm, handleCancelAddForm, handleAddFormSubmit, handleAddFiles, handleAddImages,
    handleAddFormFirstNameChange: setAddFormFirstName, handleAddFormLastNameChange: setAddFormLastName,
    handleSectionEditStart, handleSectionEditCancel, handleSectionDraftChange, handleBulkDraftChange,
    handleWorkingBranchChange, handleBulkWorkingBranchChange, handleAssociatedBrandsToggle, handleBulkAssociatedBrandsToggle, handleSectionEditSubmit, handleBulkSubmit, handleBulkCancel,
    handleLeaveDateAdd: () => handleSectionArray("annualLeaves.used.dates", EMPTY_LEAVE_PERIOD_ROW, "add"),
    handleLeaveDateRemove: (index) => handleSectionArray("annualLeaves.used.dates", EMPTY_LEAVE_PERIOD_ROW, "remove", index),
    handleLeaveDateChange: (index, field, value) => handleSectionArray("annualLeaves.used.dates", EMPTY_LEAVE_PERIOD_ROW, "change", index, field, value),
    handleCertificationAdd: () => handleSectionArray("", EMPTY_CERT_ROW, "add"),
    handleCertificationRemove: (index) => handleSectionArray("", EMPTY_CERT_ROW, "remove", index),
    handleCertificationChange: (index, field, value) => handleSectionArray("", EMPTY_CERT_ROW, "change", index, field, value),
    handleUniformIssueAdd: () => handleSectionArray("issued", EMPTY_UNIFORM_ISSUE_ROW, "add"),
    handleUniformIssueRemove: (index) => handleSectionArray("issued", EMPTY_UNIFORM_ISSUE_ROW, "remove", index),
    handleUniformIssueChange: (index, field, value) => handleSectionArray("issued", EMPTY_UNIFORM_ISSUE_ROW, "change", index, field, value),
    handleBulkLeaveDateAdd: () => handleBulkArray("leaves", "annualLeaves.used.dates", EMPTY_LEAVE_PERIOD_ROW, "add"),
    handleBulkLeaveDateRemove: (index) => handleBulkArray("leaves", "annualLeaves.used.dates", EMPTY_LEAVE_PERIOD_ROW, "remove", index),
    handleBulkLeaveDateChange: (index, field, value) => handleBulkArray("leaves", "annualLeaves.used.dates", EMPTY_LEAVE_PERIOD_ROW, "change", index, field, value),
    handleBulkCertificationAdd: () => handleBulkArray("certifications", "", EMPTY_CERT_ROW, "add"),
    handleBulkCertificationRemove: (index) => handleBulkArray("certifications", "", EMPTY_CERT_ROW, "remove", index),
    handleBulkCertificationChange: (index, field, value) => handleBulkArray("certifications", "", EMPTY_CERT_ROW, "change", index, field, value),
    handleBulkUniformIssueAdd: () => handleBulkArray("uniform", "issued", EMPTY_UNIFORM_ISSUE_ROW, "add"),
    handleBulkUniformIssueRemove: (index) => handleBulkArray("uniform", "issued", EMPTY_UNIFORM_ISSUE_ROW, "remove", index),
    handleBulkUniformIssueChange: (index, field, value) => handleBulkArray("uniform", "issued", EMPTY_UNIFORM_ISSUE_ROW, "change", index, field, value),
    handleConfirmModalConfirm, handleConfirmModalCancel: () => setConfirmModal(EMPTY_CONFIRM_MODAL),
    handleDeleteRequest, handleDeleteConfirm, handleDeleteCancel: () => setDeleteModal(EMPTY_DELETE_MODAL),
    handleDiscardConfirm: () => { const fn = states.discardModal.onConfirm; setDiscardModal(EMPTY_DISCARD_MODAL); if (typeof fn === "function") fn(); },
    handleDiscardCancel: () => setDiscardModal(EMPTY_DISCARD_MODAL),
    handleToggleSectionCollapse: (key) => setCollapsedSections((prev) => ({ ...prev, [key]: !prev?.[key] })),
  } };
};
