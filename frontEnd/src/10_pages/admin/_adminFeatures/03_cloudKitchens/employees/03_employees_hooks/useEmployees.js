import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import EMPLOYEES_isDebug from "../employees.config.js";
import { SECTION_KEYS, SECTION_LAYOUT } from "../05_employees_cnst/_employees_cnst.index.js";
import { isSectionEmpty } from "../02_employees_helpers/_employees_helpers.index.js";
import { useEmployees_states, useEmployees_apiHelpers, useEmployees_handlers } from "./_employees_hooks.index.js";

const bulkErrorsFor = (sectionKey, errors) => {
  const out = {};
  const prefix = `${sectionKey}.`;
  for (const key of Object.keys(errors ?? {})) if (key.startsWith(prefix)) out[key.slice(prefix.length)] = errors[key];
  return out;
};

export const useEmployees = () => {
  const { t } = useTranslation("employees");
  const { states, setters, constants } = useEmployees_states();
  const { apiHelpers } = useEmployees_apiHelpers();
  const { handlers } = useEmployees_handlers({ states, setters, constants, apiHelpers, isDebug: EMPLOYEES_isDebug.hooks });

  useEffect(() => {
    handlers.handleFetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedEmployee = states.viewMode === "detail" && states.detailSelectedId
    ? states.employees.find((employee) => employee._id === states.detailSelectedId)
    : null;
  const isBulkEdit = states.detailMode === "bulkEdit";
  const sectionProps = {};

  for (const sectionKey of Object.values(SECTION_KEYS)) {
    sectionProps[sectionKey] = {
      sectionKey,
      employee: selectedEmployee,
      draft: isBulkEdit ? states.bulkDrafts?.[sectionKey] : states.editingSection === sectionKey ? states.sectionDraft : null,
      isEditing: isBulkEdit || states.editingSection === sectionKey,
      isBulkEdit,
      isSaving: states.isSaving,
      isCollapsed: !!states.collapsedSections?.[sectionKey] && !isBulkEdit,
      isEmpty: selectedEmployee ? isSectionEmpty(selectedEmployee, sectionKey) : true,
      fieldErrors: isBulkEdit ? bulkErrorsFor(sectionKey, states.bulkFieldErrors) : states.editingSection === sectionKey ? states.fieldErrors : {},
      branchesList: states.branchesList,
      brandsList: states.brandsList,
      onEditStart: () => handlers.handleSectionEditStart(sectionKey),
      onDraftChange: isBulkEdit ? (path, value) => handlers.handleBulkDraftChange(sectionKey, path, value) : handlers.handleSectionDraftChange,
      onCancel: handlers.handleSectionEditCancel,
      onSubmit: handlers.handleSectionEditSubmit,
      onToggleCollapse: () => handlers.handleToggleSectionCollapse(sectionKey),
      onWorkingBranchChange: isBulkEdit
        ? handlers.handleBulkWorkingBranchChange
        : handlers.handleWorkingBranchChange,
      onAssociatedBrandsToggle: isBulkEdit
        ? handlers.handleBulkAssociatedBrandsToggle
        : handlers.handleAssociatedBrandsToggle,
      handlers,
      t,
    };
  }

  return {
    t,
    states,
    handlers,
    compProps: {
      Employees_viewToggle_props: { viewMode: states.viewMode, onChange: handlers.handleSetViewMode, t },
      Employees_list_props: {
        employees: states.employees, isLoading: states.isLoading, error: states.error,
        onShowAddForm: handlers.handleShowAddForm, onView: handlers.handleViewEmployee,
        onEdit: handlers.handleEditEmployee, onAddFiles: handlers.handleAddFiles,
        onAddImages: handlers.handleAddImages, t,
      },
      Employees_addForm_props: {
        firstName: states.addFormFirstName, lastName: states.addFormLastName,
        isSaving: states.isSaving, error: states.error,
        onFirstNameChange: handlers.handleAddFormFirstNameChange,
        onLastNameChange: handlers.handleAddFormLastNameChange,
        onSubmit: handlers.handleAddFormSubmit, onCancel: handlers.handleCancelAddForm, t,
      },
      Employees_tablePlaceholder_props: { t },
      Employees_detail_props: {
        employee: selectedEmployee, isBulkEdit, isSaving: states.isSaving, error: states.error,
        layout: SECTION_LAYOUT, sectionProps, onBack: handlers.handleBackToList,
        onBulkSubmit: handlers.handleBulkSubmit, onBulkCancel: handlers.handleBulkCancel,
        onDeleteRequest: () => selectedEmployee && handlers.handleDeleteRequest(selectedEmployee._id), t,
      },
      Employees_confirmModal_props: {
        isOpen: states.confirmModal.isOpen, changes: states.confirmModal.changes,
        isSaving: states.isSaving, error: states.error,
        onConfirm: handlers.handleConfirmModalConfirm, onCancel: handlers.handleConfirmModalCancel, t,
      },
      Employees_discardModal_props: {
        isOpen: states.discardModal.isOpen, onConfirm: handlers.handleDiscardConfirm,
        onCancel: handlers.handleDiscardCancel, t,
      },
      Employees_deleteModal_props: {
        isOpen: states.deleteModal.isOpen, employeeName: states.deleteModal.employeeName,
        isSaving: states.isSaving, error: states.error,
        onConfirm: handlers.handleDeleteConfirm, onCancel: handlers.handleDeleteCancel, t,
      },
    },
  };
};
