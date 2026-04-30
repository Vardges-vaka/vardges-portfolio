import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import BRANCHES_isDebug from "../branches.config.js";
import {
  useBranches_states,
  useBranches_apiHelpers,
  useBranches_handlers,
} from "./_branches_hooks.index.js";
import {
  SECTION_LAYOUT,
  SECTION_KEYS,
} from "../05_branches_cnst/_branches_cnst.index.js";
import { isSectionEmpty } from "../02_branches_helpers/_branches_helpers.index.js";

const isDebug = BRANCHES_isDebug.hooks;

// Picks every path in `bulkFieldErrors` that starts with this section's key,
// and strips the prefix so section components receive section-local paths.
const bulkErrorsFor = (sectionKey, bulkFieldErrors) => {
  const out = {};
  const prefix = `${sectionKey}.`;
  for (const key of Object.keys(bulkFieldErrors ?? {})) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = bulkFieldErrors[key];
  }
  return out;
};

export const useBranches = () => {
  const { t } = useTranslation("branches");

  const { states, setters, constants } = useBranches_states();
  const { apiHelpers } = useBranches_apiHelpers();
  const { handlers } = useBranches_handlers({
    states,
    setters,
    constants,
    apiHelpers,
    isDebug,
  });

  useEffect(() => {
    handlers.handleFetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedBranch =
    states.viewMode === "detail" && states.detailSelectedId
      ? states.branches.find((b) => b._id === states.detailSelectedId)
      : null;

  const isBulkEdit = states.detailMode === "bulkEdit";

  // -------- Top-level compProps --------

  const Branches_viewToggle_props = {
    viewMode: states.viewMode,
    onChange: handlers.handleSetViewMode,
    t,
  };

  const Branches_list_props = {
    branches: states.branches,
    isLoading: states.isLoading,
    isSaving: states.isSaving,
    error: states.error,
    showAddForm: states.showAddForm,
    onShowAddForm: handlers.handleShowAddForm,
    onView: handlers.handleViewBranch,
    onEdit: handlers.handleEditBranch,
    onAddFiles: handlers.handleAddFiles,
    onAddCoverage: handlers.handleAddCoverage,
    t,
  };

  const Branches_addForm_props = {
    name: states.addFormName,
    isSaving: states.isSaving,
    error: states.error,
    onChange: handlers.handleAddFormNameChange,
    onSubmit: handlers.handleAddFormSubmit,
    onCancel: handlers.handleCancelAddForm,
    t,
  };

  const Branches_mapView_props = {
    branches: states.branches,
    isLoading: states.isLoading,
    error: states.error,
    onViewBranch: handlers.handleViewBranch,
    t,
  };

  // -------- Per-section props (built for the detail view) --------

  // Build a props map keyed by section; the detail orchestrator picks the
  // ones it needs for left/right/bottom strip.
  const sectionProps = {};
  for (const sectionKey of [
    ...SECTION_LAYOUT.leftColumn,
    ...SECTION_LAYOUT.rightColumn,
  ]) {
    const draft = isBulkEdit
      ? states.bulkDrafts?.[sectionKey]
      : states.editingSection === sectionKey
      ? states.sectionDraft
      : null;

    const errors = isBulkEdit
      ? bulkErrorsFor(sectionKey, states.bulkFieldErrors)
      : states.editingSection === sectionKey
      ? states.fieldErrors
      : {};

    // Edit/Save/Cancel handlers — in bulk mode the per-section handlers are
    // inert (the master Save handles everything); in read mode they route
    // through the regular flow.
    const onDraftChange = isBulkEdit
      ? (path, value) => handlers.handleBulkDraftChange(sectionKey, path, value)
      : handlers.handleSectionDraftChange;

    const onVariableAdd = isBulkEdit
      ? handlers.handleBulkVariableAdd
      : handlers.handleSectionVariableAdd;
    const onVariableRemove = isBulkEdit
      ? handlers.handleBulkVariableRemove
      : handlers.handleSectionVariableRemove;
    const onVariableChange = isBulkEdit
      ? handlers.handleBulkVariableChange
      : handlers.handleSectionVariableChange;

    sectionProps[sectionKey] = {
      sectionKey,
      branch: selectedBranch,
      draft,
      isEditing: isBulkEdit || states.editingSection === sectionKey,
      isBulkEdit,
      isSaving: states.isSaving,
      isCollapsed: !!states.collapsedSections?.[sectionKey] && !isBulkEdit,
      isEmpty: selectedBranch ? isSectionEmpty(selectedBranch, sectionKey) : true,
      fieldErrors: errors,
      onEditStart: () => handlers.handleSectionEditStart(sectionKey),
      onDraftChange,
      onCancel: handlers.handleSectionEditCancel,
      onSubmit: handlers.handleSectionEditSubmit,
      onVariableAdd,
      onVariableRemove,
      onVariableChange,
      onToggleCollapse: () => handlers.handleToggleSectionCollapse(sectionKey),
      t,
    };

    // Location section gets the view-mode toggle wired in.
    if (sectionKey === SECTION_KEYS.location) {
      sectionProps[sectionKey].locationViewMode = states.locationViewMode;
      sectionProps[sectionKey].onLocationViewToggle = handlers.handleLocationViewToggle;
    }
  }

  const Branches_detail_props = {
    branch: selectedBranch,
    isBulkEdit,
    isSaving: states.isSaving,
    error: states.error,
    layout: SECTION_LAYOUT,
    sectionProps,
    locationViewMode: states.locationViewMode,
    onBack: handlers.handleBackToList,
    onBulkSubmit: handlers.handleBulkSubmit,
    onBulkCancel: handlers.handleBulkCancel,
    onDeleteRequest: () =>
      selectedBranch && handlers.handleDeleteRequest(selectedBranch._id),
    t,
  };

  const Branches_confirmModal_props = {
    isOpen: states.confirmModal.isOpen,
    sectionKey: states.confirmModal.sectionKey,
    changes: states.confirmModal.changes,
    isSaving: states.isSaving,
    error: states.error,
    onConfirm: handlers.handleConfirmModalConfirm,
    onCancel: handlers.handleConfirmModalCancel,
    t,
  };

  const Branches_discardModal_props = {
    isOpen: states.discardModal.isOpen,
    onConfirm: handlers.handleDiscardConfirm,
    onCancel: handlers.handleDiscardCancel,
    t,
  };

  const Branches_deleteModal_props = {
    isOpen: states.deleteModal.isOpen,
    branchName: states.deleteModal.branchName,
    isSaving: states.isSaving,
    error: states.error,
    onConfirm: handlers.handleDeleteConfirm,
    onCancel: handlers.handleDeleteCancel,
    t,
  };

  return {
    t,
    states,
    handlers,
    compProps: {
      Branches_viewToggle_props,
      Branches_list_props,
      Branches_addForm_props,
      Branches_mapView_props,
      Branches_detail_props,
      Branches_confirmModal_props,
      Branches_discardModal_props,
      Branches_deleteModal_props,
    },
  };
};
