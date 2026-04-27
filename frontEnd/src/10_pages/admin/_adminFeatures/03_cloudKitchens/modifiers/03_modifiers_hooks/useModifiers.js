import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MODIFIERS_isDebug from "../modifiers.config.js";
import {
  useModifiers_states,
  useModifiers_apiHelpers,
  useModifiers_handlers,
} from "./_modifiers_hooks.index.js";
import {
  SECTION_LAYOUT,
  SECTION_KEYS,
} from "../05_modifiers_cnst/_modifiers_cnst.index.js";
import { isSectionEmpty } from "../02_modifiers_helpers/_modifiers_helpers.index.js";

const isDebug = MODIFIERS_isDebug.hooks;

const bulkErrorsFor = (sectionKey, bulkFieldErrors) => {
  const out = {};
  const prefix = `${sectionKey}.`;
  for (const key of Object.keys(bulkFieldErrors ?? {})) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = bulkFieldErrors[key];
  }
  return out;
};

export const useModifiers = () => {
  const { t } = useTranslation("modifiers");
  const { states, setters, constants } = useModifiers_states();
  const { apiHelpers } = useModifiers_apiHelpers();
  const { handlers } = useModifiers_handlers({
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

  const selectedModifier =
    states.viewMode === "detail" && states.detailSelectedId
      ? states.modifiers.find((m) => m._id === states.detailSelectedId)
      : null;

  const isBulkEdit = states.detailMode === "bulkEdit";
  const sectionProps = {};

  for (const sectionKey of [
    SECTION_KEYS.basic,
    SECTION_KEYS.name,
    SECTION_KEYS.descriptions,
    SECTION_KEYS.options,
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

    sectionProps[sectionKey] = {
      sectionKey,
      modifier: selectedModifier,
      draft,
      isEditing: isBulkEdit || states.editingSection === sectionKey,
      isBulkEdit,
      isSaving: states.isSaving,
      isCollapsed: !!states.collapsedSections?.[sectionKey] && !isBulkEdit,
      isEmpty: selectedModifier ? isSectionEmpty(selectedModifier, sectionKey) : true,
      fieldErrors: errors,
      onEditStart: () => handlers.handleSectionEditStart(sectionKey),
      onDraftChange: isBulkEdit
        ? (path, value) => handlers.handleBulkDraftChange(sectionKey, path, value)
        : handlers.handleSectionDraftChange,
      onOptionAdd: isBulkEdit
        ? handlers.handleBulkOptionAdd
        : handlers.handleSectionOptionAdd,
      onOptionRemove: isBulkEdit
        ? handlers.handleBulkOptionRemove
        : handlers.handleSectionOptionRemove,
      onOptionChange: isBulkEdit
        ? handlers.handleBulkOptionChange
        : handlers.handleSectionOptionChange,
      onCancel: handlers.handleSectionEditCancel,
      onSubmit: handlers.handleSectionEditSubmit,
      onToggleCollapse: () => handlers.handleToggleSectionCollapse(sectionKey),
      t,
    };
  }

  return {
    t,
    states,
    handlers,
    compProps: {
      Modifiers_viewToggle_props: {
        viewMode: states.viewMode,
        onChange: handlers.handleSetViewMode,
        t,
      },
      Modifiers_list_props: {
        modifiers: states.modifiers,
        isLoading: states.isLoading,
        error: states.error,
        onShowAddForm: handlers.handleShowAddForm,
        onView: handlers.handleViewModifier,
        onEdit: handlers.handleEditModifier,
        t,
      },
      Modifiers_addForm_props: {
        name: states.addFormName,
        isSaving: states.isSaving,
        error: states.error,
        onChange: handlers.handleAddFormNameChange,
        onSubmit: handlers.handleAddFormSubmit,
        onCancel: handlers.handleCancelAddForm,
        t,
      },
      Modifiers_tablePlaceholder_props: { t },
      Modifiers_detail_props: {
        modifier: selectedModifier,
        isBulkEdit,
        isSaving: states.isSaving,
        error: states.error,
        layout: SECTION_LAYOUT,
        sectionProps,
        onBack: handlers.handleBackToList,
        onBulkSubmit: handlers.handleBulkSubmit,
        onBulkCancel: handlers.handleBulkCancel,
        onDeleteRequest: () =>
          selectedModifier && handlers.handleDeleteRequest(selectedModifier._id),
        t,
      },
      Modifiers_confirmModal_props: {
        isOpen: states.confirmModal.isOpen,
        sectionKey: states.confirmModal.sectionKey,
        changes: states.confirmModal.changes,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleConfirmModalConfirm,
        onCancel: handlers.handleConfirmModalCancel,
        t,
      },
      Modifiers_discardModal_props: {
        isOpen: states.discardModal.isOpen,
        onConfirm: handlers.handleDiscardConfirm,
        onCancel: handlers.handleDiscardCancel,
        t,
      },
      Modifiers_deleteModal_props: {
        isOpen: states.deleteModal.isOpen,
        modifierName: states.deleteModal.modifierName,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleDeleteConfirm,
        onCancel: handlers.handleDeleteCancel,
        t,
      },
    },
  };
};
