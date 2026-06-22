export const salesPlatforms_propsComposer = (states, handlers, t) => {
  const stp_empty_salesPlatforms_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t,
  };

  const stp_salesPlatforms_addForm_props = {
    states: {
      isOpen: states.activeOperation === "adding",
      values: states.salesPlatformFormData,
    },
    handlers: {
      onChange: handlers.handleFormChange,
      onSubmit: handlers.handleCreateSubmit,
      onCancel: handlers.handleCancelAdd,
    },
    childComps: {},
    t,
  };

  const stp_salesPlatforms_viewOne_props = {
    states: {
      salesPlatformDraft: states.salesPlatformDraft,
      detailMode: states.detailMode,
      editingField: states.editingField,
      confirmUpdateModalOpen: states.confirmUpdateModalOpen,
      confirmUpdateFieldKeys: states.confirmUpdateFieldKeys,
      isSaving: states.isSaving,
    },
    handlers: {
      onBackToList: handlers.handleBackToList,
      onGlobalUpdate: handlers.handleGlobalUpdateClick,
      onGlobalCancel: handlers.handleGlobalCancel,
      onGlobalConfirm: handlers.handleGlobalConfirmClick,
      onFieldUpdate: handlers.handleFieldUpdateClick,
      onFieldConfirm: handlers.handleFieldConfirmClick,
      onFieldCancel: handlers.handleFieldCancel,
      onDraftChange: handlers.handleDraftChange,
      onConfirmUpdateConfirm: handlers.handleConfirmUpdateConfirm,
      onConfirmUpdateCancel: handlers.handleConfirmUpdateCancel,
      itemDisplayName: handlers.itemDisplayName,
    },
    childComps: {},
    t,
  };

  const stp_salesPlatforms_viewAll_props = {
    states: {
      salesPlatforms: states.salesPlatforms,
      deleteModalOpen: states.deleteModalOpen,
      isSaving: states.isSaving,
    },
    handlers: {
      onView: handlers.handleViewItem,
      onUpdate: handlers.handleUpdateFromList,
      onDelete: handlers.handleDeleteRequest,
      onDeleteConfirm: handlers.handleDeleteConfirm,
      onDeleteCancel: handlers.handleDeleteCancel,
      itemDisplayName: handlers.itemDisplayName,
    },
    childComps: {},
    t,
  };

  const stp_salesPlatforms_modals_props = {
    states: {
      unsavedModalOpen: states.unsavedModalOpen,
      isSaving: states.isSaving,
    },
    handlers: {
      onUnsavedConfirm: handlers.handleUnsavedConfirm,
      onUnsavedCancel: handlers.handleUnsavedCancel,
    },
    childComps: {},
    t,
  };

  return {
    stp_empty_salesPlatforms_props,
    stp_salesPlatforms_addForm_props,
    stp_salesPlatforms_viewOne_props,
    stp_salesPlatforms_viewAll_props,
    stp_salesPlatforms_modals_props,
  };
};
