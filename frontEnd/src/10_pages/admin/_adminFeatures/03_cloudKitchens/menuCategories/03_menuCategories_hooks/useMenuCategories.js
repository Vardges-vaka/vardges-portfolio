import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MENUCATEGORIES_isDebug from "../menuCategories.config.js";
import {
  useMenuCategories_states,
  useMenuCategories_apiHelpers,
  useMenuCategories_handlers,
} from "./_menuCategories_hooks.index.js";
import {
  SECTION_LAYOUT,
  SECTION_KEYS,
} from "../05_menuCategories_cnst/_menuCategories_cnst.index.js";
import { isSectionEmpty } from "../02_menuCategories_helpers/_menuCategories_helpers.index.js";

const isDebug = MENUCATEGORIES_isDebug.hooks;

const bulkErrorsFor = (sectionKey, bulkFieldErrors) => {
  const out = {};
  const prefix = `${sectionKey}.`;
  for (const key of Object.keys(bulkFieldErrors ?? {})) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = bulkFieldErrors[key];
  }
  return out;
};

export const useMenuCategories = () => {
  const { t } = useTranslation("menuCategories");
  const { states, setters, constants } = useMenuCategories_states();
  const { apiHelpers } = useMenuCategories_apiHelpers();
  const { handlers } = useMenuCategories_handlers({
    states,
    setters,
    constants,
    apiHelpers,
    isDebug,
  });

  useEffect(() => {
    handlers.handleFetchAll();
    handlers.handleFetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCategory =
    states.viewMode === "detail" && states.detailSelectedId
      ? states.menuCategories.find((cat) => cat._id === states.detailSelectedId)
      : null;

  const isBulkEdit = states.detailMode === "bulkEdit";
  const sectionProps = {};

  for (const sectionKey of [
    SECTION_KEYS.basic,
    SECTION_KEYS.name,
    SECTION_KEYS.items,
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
      category: selectedCategory,
      draft,
      isEditing: isBulkEdit || states.editingSection === sectionKey,
      isBulkEdit,
      isSaving: states.isSaving,
      isCollapsed: !!states.collapsedSections?.[sectionKey] && !isBulkEdit,
      isEmpty: selectedCategory ? isSectionEmpty(selectedCategory, sectionKey) : true,
      fieldErrors: errors,
      menuItemsList: states.menuItemsList,
      onEditStart: () => handlers.handleSectionEditStart(sectionKey),
      onDraftChange: isBulkEdit
        ? (path, value) => handlers.handleBulkDraftChange(sectionKey, path, value)
        : handlers.handleSectionDraftChange,
      onWindowAdd: isBulkEdit
        ? handlers.handleBulkWindowAdd
        : handlers.handleSectionWindowAdd,
      onWindowRemove: isBulkEdit
        ? handlers.handleBulkWindowRemove
        : handlers.handleSectionWindowRemove,
      onWindowChange: isBulkEdit
        ? handlers.handleBulkWindowChange
        : handlers.handleSectionWindowChange,
      onItemToggle: isBulkEdit
        ? handlers.handleBulkItemToggle
        : handlers.handleSectionItemToggle,
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
      MenuCategories_viewToggle_props: {
        viewMode: states.viewMode,
        onChange: handlers.handleSetViewMode,
        t,
      },
      MenuCategories_list_props: {
        menuCategories: states.menuCategories,
        isLoading: states.isLoading,
        error: states.error,
        onShowAddForm: handlers.handleShowAddForm,
        onView: handlers.handleViewCategory,
        onEdit: handlers.handleEditCategory,
        t,
      },
      MenuCategories_addForm_props: {
        name: states.addFormName,
        isSaving: states.isSaving,
        error: states.error,
        onChange: handlers.handleAddFormNameChange,
        onSubmit: handlers.handleAddFormSubmit,
        onCancel: handlers.handleCancelAddForm,
        t,
      },
      MenuCategories_tablePlaceholder_props: { t },
      MenuCategories_detail_props: {
        category: selectedCategory,
        isBulkEdit,
        isSaving: states.isSaving,
        error: states.error,
        layout: SECTION_LAYOUT,
        sectionProps,
        onBack: handlers.handleBackToList,
        onBulkSubmit: handlers.handleBulkSubmit,
        onBulkCancel: handlers.handleBulkCancel,
        onDeleteRequest: () =>
          selectedCategory && handlers.handleDeleteRequest(selectedCategory._id),
        t,
      },
      MenuCategories_confirmModal_props: {
        isOpen: states.confirmModal.isOpen,
        sectionKey: states.confirmModal.sectionKey,
        changes: states.confirmModal.changes,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleConfirmModalConfirm,
        onCancel: handlers.handleConfirmModalCancel,
        t,
      },
      MenuCategories_discardModal_props: {
        isOpen: states.discardModal.isOpen,
        onConfirm: handlers.handleDiscardConfirm,
        onCancel: handlers.handleDiscardCancel,
        t,
      },
      MenuCategories_deleteModal_props: {
        isOpen: states.deleteModal.isOpen,
        categoryName: states.deleteModal.categoryName,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleDeleteConfirm,
        onCancel: handlers.handleDeleteCancel,
        t,
      },
    },
  };
};
