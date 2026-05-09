import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import BRANDS_isDebug from "../brands.config.js";
import {
  useBrands_states,
  useBrands_apiHelpers,
  useBrands_handlers,
} from "./_brands_hooks.index.js";
import {
  SECTION_LAYOUT,
  EDITABLE_SECTIONS,
} from "../05_brands_cnst/_brands_cnst.index.js";
import { isSectionEmpty } from "../02_brands_helpers/_brands_helpers.index.js";

const isDebug = BRANDS_isDebug.hooks;

const bulkErrorsFor = (sectionKey, bulkFieldErrors) => {
  const out = {};
  const prefix = `${sectionKey}.`;
  for (const key of Object.keys(bulkFieldErrors ?? {})) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = bulkFieldErrors[key];
  }
  return out;
};

export const useBrands = () => {
  const { t } = useTranslation("brands");
  const { states, setters, constants } = useBrands_states();
  const { apiHelpers } = useBrands_apiHelpers();
  const { handlers } = useBrands_handlers({
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

  const selectedBrand =
    states.viewMode === "detail" && states.detailSelectedId
      ? states.brands.find((brand) => brand._id === states.detailSelectedId)
      : null;

  const logoBrand =
    (states.viewMode === "logo_view" || states.viewMode === "logo_edit") &&
    states.detailSelectedId
      ? states.brands.find((b) => b._id === states.detailSelectedId)
      : null;

  const isBulkEdit = states.detailMode === "bulkEdit";
  const sectionProps = {};

  for (const sectionKey of EDITABLE_SECTIONS) {
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
      brand: selectedBrand,
      draft,
      isEditing: isBulkEdit || states.editingSection === sectionKey,
      isBulkEdit,
      isSaving: states.isSaving,
      isCollapsed: !!states.collapsedSections?.[sectionKey] && !isBulkEdit,
      isEmpty: selectedBrand ? isSectionEmpty(selectedBrand, sectionKey) : true,
      fieldErrors: errors,
      onEditStart: () => handlers.handleSectionEditStart(sectionKey),
      onDraftChange: isBulkEdit
        ? (path, value) => handlers.handleBulkDraftChange(sectionKey, path, value)
        : handlers.handleSectionDraftChange,
      onDraftReplace: isBulkEdit
        ? (value) => handlers.handleBulkDraftReplace(sectionKey, value)
        : handlers.handleSectionDraftReplace,
      onCancel: handlers.handleSectionEditCancel,
      onSubmit: handlers.handleSectionEditSubmit,
      onToggleCollapse: () => handlers.handleToggleSectionCollapse(sectionKey),
      branchesList: states.branchesList,
      employeesList: states.employeesList,
      menusList: states.menusList,
      t,
    };
  }

  return {
    t,
    states,
    handlers,
    compProps: {
      Brands_table_props: {
        brands: states.brands,
        isLoading: states.isLoading,
        error: states.error,
        branchesList: states.branchesList,
        employeesList: states.employeesList,
        menusList: states.menusList,
        activeTooltip: states.activeTooltip,
        logoUrls: states.logoUrls,
        onShowAddForm: handlers.handleShowAddForm,
        onTooltipToggle: handlers.handleTooltipToggle,
        onTooltipClose: handlers.handleTooltipClose,
        onUpdateAll: handlers.handleUpdateAll,
        onUpdateSection: handlers.handleUpdateSection,
        onViewAll: handlers.handleViewAll,
        onGoToLogoView: handlers.handleGoToLogoView,
        onGoToLogoEdit: handlers.handleGoToLogoEdit,
        t,
      },
      Brands_logo_session_props: {
        viewMode: states.viewMode,
        brand: logoBrand,
        logoEdit: states.logoEdit,
        onBack: handlers.handleGoToTable,
        onSwitchToEdit: handlers.handleSwitchToLogoEdit,
        onSwitchToView: handlers.handleSwitchToLogoView,
        onAddType: handlers.handleLogoAddType,
        onRemoveType: handlers.handleLogoRemoveType,
        onFileSelect: handlers.handleLogoFileSelect,
        onClearFile: handlers.handleLogoClearFile,
        onProviderSelect: handlers.handleLogoProviderSelect,
        onConfirmOpen: handlers.handleLogoConfirmOpen,
        onConfirmClose: handlers.handleLogoConfirmClose,
        onUploadSubmit: handlers.handleLogoUploadSubmit,
        t,
      },
      Brands_addForm_props: {
        draft: states.addFormDraft,
        branchesList: states.branchesList,
        isSaving: states.isSaving,
        error: states.error,
        onChange: handlers.handleAddFormNameChange,
        onDraftChange: handlers.handleAddFormDraftChange,
        onBranchToggle: handlers.handleAddFormBranchToggle,
        onSubmit: handlers.handleAddFormSubmit,
        onCancel: handlers.handleCancelAddForm,
        t,
      },
      Brands_detail_props: {
        brand: selectedBrand,
        isBulkEdit,
        isSaving: states.isSaving,
        error: states.error,
        layout: SECTION_LAYOUT,
        sectionProps,
        onBack: handlers.handleGoToTable,
        onBulkSubmit: handlers.handleBulkSubmit,
        onBulkCancel: handlers.handleBulkCancel,
        onDeleteRequest: () =>
          selectedBrand && handlers.handleDeleteRequest(selectedBrand._id),
        t,
      },
      Brands_confirmModal_props: {
        isOpen: states.confirmModal.isOpen,
        sectionKey: states.confirmModal.sectionKey,
        changes: states.confirmModal.changes,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleConfirmModalConfirm,
        onCancel: handlers.handleConfirmModalCancel,
        t,
      },
      Brands_discardModal_props: {
        isOpen: states.discardModal.isOpen,
        onConfirm: handlers.handleDiscardConfirm,
        onCancel: handlers.handleDiscardCancel,
        t,
      },
      Brands_deleteModal_props: {
        isOpen: states.deleteModal.isOpen,
        brandName: states.deleteModal.brandName,
        isSaving: states.isSaving,
        error: states.error,
        onConfirm: handlers.handleDeleteConfirm,
        onCancel: handlers.handleDeleteCancel,
        t,
      },
    },
  };
};
