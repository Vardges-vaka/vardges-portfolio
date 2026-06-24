import { BRAND_DETAIL_FIELD_LABELS } from "../brandDetail_helpers.js";

export const brands_propsComposer = (states, handlers, t, cuisineTags) => {
  const stp_empty_brand_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };

  const stp_brands_viewOne_props = {
    states: {
      brand: states.selectedBrand,
      brandDraft: states.brandDraft,
      brandFilesDraft: states.brandFilesDraft,
      detailMode: states.detailMode,
      editingField: states.editingField,
      confirmUpdateModalOpen: states.confirmUpdateModalOpen,
      confirmUpdateLabels: states.confirmUpdateFieldKeys.map(
        (key) => BRAND_DETAIL_FIELD_LABELS[key] || key,
      ),
      isSaving: states.isSaving,
      cuisineTags: cuisineTags,
      linkedCuisineTags: states.selectedBrand?.cuisineTags ?? [],
    },
    handlers: {
      onBackToList: handlers.handleBackToList,
      onGlobalUpdate: handlers.handleGlobalUpdateClick,
      onGlobalCancel: handlers.handleGlobalCancel,
      onGlobalConfirm: handlers.handleGlobalConfirmClick,
      onFieldUpdate: handlers.handleFieldUpdateClick,
      onFieldCancel: handlers.handleFieldCancel,
      onFieldConfirm: handlers.handleFieldConfirmClick,
      onDraftChange: handlers.handleDraftChange,
      onAddSocial: handlers.handleAddSocial,
      onRemoveSocial: handlers.handleRemoveSocial,
      onAddCuisineTag: handlers.handleAddCuisineTag,
      onRemoveCuisineTag: handlers.handleRemoveCuisineTag,
      onLogoVariantChange: handlers.handleLogoVariantChange,
      onLogoVariantFieldChange: handlers.handleLogoVariantFieldChange,
      onLogoVariantDelete: handlers.handleLogoVariantDelete,
      onOtherFileChange: handlers.handleOtherFileChange,
      onOtherFileFieldChange: handlers.handleOtherFileFieldChange,
      onOtherFileDelete: handlers.handleOtherFileDelete,
      onAddOtherFiles: handlers.handleAddOtherFiles,
      onConfirmUpdateConfirm: handlers.handleConfirmUpdateConfirm,
      onConfirmUpdateCancel: handlers.handleConfirmUpdateCancel,
      brandDisplayName: handlers.brandDisplayName,
    },
    childComps: {},
    t: t,
  };

  const stp_brands_viewAll_props = {
    states: {
      brands: states.brands,
      deleteModalOpen: states.deleteModalOpen,
      isSaving: states.isSaving,
    },
    handlers: {
      onView: handlers.handleViewBrand,
      onUpdate: handlers.handleUpdateBrandFromList,
      onDelete: handlers.handleDeleteBrandRequest,
      onDeleteConfirm: handlers.handleDeleteConfirm,
      onDeleteCancel: handlers.handleDeleteCancel,
      brandDisplayName: handlers.brandDisplayName,
    },
    childComps: {},
    t: t,
  };

  const stp_brands_addForm_props = {
    states: {
      isOpen: states.activeOperation === "adding",
      values: states.brandFormData,
      cuisineTags: cuisineTags,
    },
    handlers: {
      onChange: handlers.handleFormChange,
      onSubmit: handlers.handleCreateSubmit,
      onCancel: handlers.handleCancelAdd,
    },
    childComps: {},
    t: t,
  };

  const stp_brands_modals_props = {
    states: {
      unsavedModalOpen: states.unsavedModalOpen,
      isSaving: states.isSaving,
    },
    handlers: {
      onUnsavedConfirm: handlers.handleUnsavedConfirm,
      onUnsavedCancel: handlers.handleUnsavedCancel,
      brandDisplayName: handlers.brandDisplayName,
    },
    childComps: {},
    t: t,
  };

  return {
    stp_empty_brand_props,
    stp_brands_viewOne_props,
    stp_brands_viewAll_props,
    stp_brands_addForm_props,
    stp_brands_modals_props,
  };
};
