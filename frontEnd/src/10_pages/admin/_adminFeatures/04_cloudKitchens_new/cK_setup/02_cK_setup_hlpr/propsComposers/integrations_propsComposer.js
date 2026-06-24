import { INTEGRATION_DETAIL_FIELD_LABELS } from "../integrationDetail_helpers.js";

export const integrations_propsComposer = (states, handlers, t) => {
  const stp_empty_integrations_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t,
  };

  const stp_integrations_addForm_props = {
    states: {
      isOpen: states.activeOperation === "adding",
      values: states.integrationFormData,
    },
    handlers: {
      onChange: handlers.handleFormChange,
      onSubmit: handlers.handleCreateSubmit,
      onCancel: handlers.handleCancelAdd,
    },
    childComps: {},
    t,
  };

  const stp_integrations_viewOne_props = {
    states: {
      integration: states.selectedIntegration,
      integrationDraft: states.integrationDraft,
      integrationFilesDraft: states.integrationFilesDraft,
      detailMode: states.detailMode,
      editingField: states.editingField,
      confirmUpdateModalOpen: states.confirmUpdateModalOpen,
      confirmUpdateLabels: states.confirmUpdateFieldKeys.map(
        (key) => INTEGRATION_DETAIL_FIELD_LABELS[key] || key,
      ),
      isSaving: states.isSaving,
      detailExpandedSections: states.detailExpandedSections,
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
      onLoginCredentialsPersist: handlers.handleLoginCredentialsPersist,
      onSupportContactsPersist: handlers.handleSupportContactsPersist,
      onLogoVariantChange: handlers.handleLogoVariantChange,
      onLogoVariantFieldChange: handlers.handleLogoVariantFieldChange,
      onLogoVariantDelete: handlers.handleLogoVariantDelete,
      onOtherFileChange: handlers.handleOtherFileChange,
      onOtherFileFieldChange: handlers.handleOtherFileFieldChange,
      onOtherFileDelete: handlers.handleOtherFileDelete,
      onAddOtherFiles: handlers.handleAddOtherFiles,
      onConfirmUpdateConfirm: handlers.handleConfirmUpdateConfirm,
      onConfirmUpdateCancel: handlers.handleConfirmUpdateCancel,
      itemDisplayName: handlers.itemDisplayName,
    },
    childComps: {},
    t,
  };

  const stp_integrations_viewAll_props = {
    states: {
      integrations: states.integrations,
      deleteModalOpen: states.deleteModalOpen,
      kamPopoverIntegration: states.kamPopoverIntegration,
      kamPopoverAnchorEl: states.kamPopoverAnchorEl,
      credentialsPopoverIntegration: states.credentialsPopoverIntegration,
      credentialsPopoverAnchorEl: states.credentialsPopoverAnchorEl,
      supportPopoverIntegration: states.supportPopoverIntegration,
      supportPopoverAnchorEl: states.supportPopoverAnchorEl,
      isSaving: states.isSaving,
    },
    handlers: {
      onView: handlers.handleViewItem,
      onUpdate: handlers.handleUpdateFromList,
      onDelete: handlers.handleDeleteRequest,
      onDeleteConfirm: handlers.handleDeleteConfirm,
      onDeleteCancel: handlers.handleDeleteCancel,
      onKamPopoverToggle: handlers.handleKamPopoverToggle,
      onKamPopoverClose: handlers.handleKamPopoverClose,
      onOpenKam: handlers.handleOpenKam,
      onCredentialsPopoverToggle: handlers.handleCredentialsPopoverToggle,
      onCredentialsPopoverClose: handlers.handleCredentialsPopoverClose,
      onCredentialsPopoverFetch: handlers.handleCredentialsPopoverFetch,
      onOpenLoginCredentials: handlers.handleOpenLoginCredentials,
      onSupportPopoverToggle: handlers.handleSupportPopoverToggle,
      onSupportPopoverClose: handlers.handleSupportPopoverClose,
      onOpenSupportContacts: handlers.handleOpenSupportContacts,
      itemDisplayName: handlers.itemDisplayName,
    },
    childComps: {},
    t,
  };

  const stp_integrations_modals_props = {
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
    stp_empty_integrations_props,
    stp_integrations_addForm_props,
    stp_integrations_viewOne_props,
    stp_integrations_viewAll_props,
    stp_integrations_modals_props,
  };
};
