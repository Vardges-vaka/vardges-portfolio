import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../menus.config.js";
import {
  useMenus_states,
  useMenus_apiHelpers,
  useMenus_handlers,
} from "./_menus_hooks.index.js";
import {
  SECTION_LAYOUT,
  SECTION_KEYS,
} from "../05_menus_cnst/_menus_cnst.index.js";
import { isSectionEmpty } from "../02_menus_helpers/_menus_helpers.index.js";

const isDebug = MENUS_isDebug.hooks;

const bulkErrorsFor = (sectionKey, bulkFieldErrors) => {
  const out = {};
  const prefix = `${sectionKey}.`;
  for (const key of Object.keys(bulkFieldErrors ?? {})) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = bulkFieldErrors[key];
  }
  return out;
};

export const useMenus = () => {
  const { t } = useTranslation("menus");
  const { states, setters, constants } = useMenus_states();
  const { apiHelpers } = useMenus_apiHelpers();
  const { handlers } = useMenus_handlers({
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

  const selectedMenu =
    states.viewMode === "detail" && states.detailSelectedId
      ? states.menus.find((menu) => menu._id === states.detailSelectedId)
      : null;

  const isBulkEdit = states.detailMode === "bulkEdit";
  const sectionProps = {};

  for (const sectionKey of [
    SECTION_KEYS.basic,
    SECTION_KEYS.name,
    SECTION_KEYS.categories,
    SECTION_KEYS.branches,
    SECTION_KEYS.brands,
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
      menu: selectedMenu,
      draft,
      isEditing: isBulkEdit || states.editingSection === sectionKey,
      isBulkEdit,
      isSaving: states.isSaving,
      isCollapsed: !!states.collapsedSections?.[sectionKey] && !isBulkEdit,
      isEmpty: selectedMenu ? isSectionEmpty(selectedMenu, sectionKey) : true,
      fieldErrors: errors,
      categoriesList: states.categoriesList,
      branchesList: states.branchesList,
      brandsList: states.brandsList,
      onEditStart: () => handlers.handleSectionEditStart(sectionKey),
      onDraftChange: isBulkEdit
        ? (path, value) => handlers.handleBulkDraftChange(sectionKey, path, value)
        : handlers.handleSectionDraftChange,
      onIdToggle: isBulkEdit
        ? (id) => handlers.handleBulkIdToggle(sectionKey, id)
        : handlers.handleIdToggle,
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
      Menus_viewToggle_props: {
        viewMode: states.viewMode,
        onChange: handlers.handleSetViewMode,
        t,
      },
      Menus_list_props: {
        menus: states.menus,
        isLoading: states.isLoading,
        error: states.error,
        onShowAddForm: handlers.handleShowAddForm,
        onView: handlers.handleViewMenu,
        onEdit: handlers.handleEditMenu,
        t,
      },
      Menus_addForm_props: {
        name: states.addFormName,
        isSaving: states.isSaving,
        error: states.error,
        onChange: handlers.handleAddFormNameChange,
        onSubmit: handlers.handleAddFormSubmit,
        onCancel: handlers.handleCancelAddForm,
        t,
      },
      Menus_tablePlaceholder_props: { t },
      Menus_detail_props: {
        menu: selectedMenu,
        isBulkEdit,
        isSaving: states.isSaving,
        error: states.error,
        layout: SECTION_LAYOUT,
        sectionProps,
        onBack: handlers.handleBackToList,
        onBulkSubmit: handlers.handleBulkSubmit,
        onBulkCancel: handlers.handleBulkCancel,
        onDeleteRequest: () =>
          selectedMenu && handlers.handleDeleteRequest(selectedMenu._id),
        t,
      },
      Menus_confirmModal_props: {
        isOpen: states.confirmModal.isOpen,
        sectionKey: states.confirmModal.sectionKey,
        changes: states.confirmModal.changes,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleConfirmModalConfirm,
        onCancel: handlers.handleConfirmModalCancel,
        t,
      },
      Menus_discardModal_props: {
        isOpen: states.discardModal.isOpen,
        onConfirm: handlers.handleDiscardConfirm,
        onCancel: handlers.handleDiscardCancel,
        t,
      },
      Menus_deleteModal_props: {
        isOpen: states.deleteModal.isOpen,
        menuName: states.deleteModal.menuName,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleDeleteConfirm,
        onCancel: handlers.handleDeleteCancel,
        t,
      },
    },
  };
};
