import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MENUITEMS_isDebug from "../menuItems.config.js";
import {
  useMenuItems_states,
  useMenuItems_apiHelpers,
  useMenuItems_handlers,
} from "./_menuItems_hooks.index.js";
import {
  SECTION_LAYOUT,
  SECTION_KEYS,
} from "../05_menuItems_cnst/_menuItems_cnst.index.js";
import { isSectionEmpty } from "../02_menuItems_helpers/_menuItems_helpers.index.js";

const isDebug = MENUITEMS_isDebug.hooks;

const bulkErrorsFor = (sectionKey, bulkFieldErrors) => {
  const out = {};
  const prefix = `${sectionKey}.`;
  for (const key of Object.keys(bulkFieldErrors ?? {})) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = bulkFieldErrors[key];
  }
  return out;
};

export const useMenuItems = () => {
  const { t } = useTranslation("menuItems");
  const { states, setters, constants } = useMenuItems_states();
  const { apiHelpers } = useMenuItems_apiHelpers();
  const { handlers } = useMenuItems_handlers({
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

  const selectedItem =
    states.viewMode === "detail" && states.detailSelectedId
      ? states.menuItems.find((item) => item._id === states.detailSelectedId)
      : null;

  const isBulkEdit = states.detailMode === "bulkEdit";
  const sectionProps = {};

  for (const sectionKey of [
    SECTION_KEYS.basic,
    SECTION_KEYS.name,
    SECTION_KEYS.modifiers,
    SECTION_KEYS.descriptions,
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
      menuItem: selectedItem,
      draft,
      isEditing: isBulkEdit || states.editingSection === sectionKey,
      isBulkEdit,
      isSaving: states.isSaving,
      isCollapsed: !!states.collapsedSections?.[sectionKey] && !isBulkEdit,
      isEmpty: selectedItem ? isSectionEmpty(selectedItem, sectionKey) : true,
      fieldErrors: errors,
      modifiersList: states.modifiersList,
      onEditStart: () => handlers.handleSectionEditStart(sectionKey),
      onDraftChange: isBulkEdit
        ? (path, value) => handlers.handleBulkDraftChange(sectionKey, path, value)
        : handlers.handleSectionDraftChange,
      onModifierToggle: isBulkEdit
        ? handlers.handleBulkModifierToggle
        : handlers.handleModifierToggle,
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
      MenuItems_viewToggle_props: {
        viewMode: states.viewMode,
        onChange: handlers.handleSetViewMode,
        t,
      },
      MenuItems_list_props: {
        menuItems: states.menuItems,
        isLoading: states.isLoading,
        error: states.error,
        onShowAddForm: handlers.handleShowAddForm,
        onView: handlers.handleViewItem,
        onEdit: handlers.handleEditItem,
        t,
      },
      MenuItems_addForm_props: {
        name: states.addFormName,
        isSaving: states.isSaving,
        error: states.error,
        onChange: handlers.handleAddFormNameChange,
        onSubmit: handlers.handleAddFormSubmit,
        onCancel: handlers.handleCancelAddForm,
        t,
      },
      MenuItems_tablePlaceholder_props: { t },
      MenuItems_detail_props: {
        menuItem: selectedItem,
        isBulkEdit,
        isSaving: states.isSaving,
        error: states.error,
        layout: SECTION_LAYOUT,
        sectionProps,
        onBack: handlers.handleBackToList,
        onBulkSubmit: handlers.handleBulkSubmit,
        onBulkCancel: handlers.handleBulkCancel,
        onDeleteRequest: () =>
          selectedItem && handlers.handleDeleteRequest(selectedItem._id),
        t,
      },
      MenuItems_confirmModal_props: {
        isOpen: states.confirmModal.isOpen,
        sectionKey: states.confirmModal.sectionKey,
        changes: states.confirmModal.changes,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleConfirmModalConfirm,
        onCancel: handlers.handleConfirmModalCancel,
        t,
      },
      MenuItems_discardModal_props: {
        isOpen: states.discardModal.isOpen,
        onConfirm: handlers.handleDiscardConfirm,
        onCancel: handlers.handleDiscardCancel,
        t,
      },
      MenuItems_deleteModal_props: {
        isOpen: states.deleteModal.isOpen,
        menuItemName: states.deleteModal.menuItemName,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleDeleteConfirm,
        onCancel: handlers.handleDeleteCancel,
        t,
      },
    },
  };
};
