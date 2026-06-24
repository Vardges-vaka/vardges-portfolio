import { SALES_PLATFORM_DETAIL_FIELD_LABELS } from "../salesPlatformDetail_helpers.js";

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
      selectedSalesPlatform: states.selectedSalesPlatform,
      detailMode: states.detailMode,
      editingField: states.editingField,
      detailExpandedSections: states.detailExpandedSections,
      confirmUpdateModalOpen: states.confirmUpdateModalOpen,
      confirmUpdateLabels: states.confirmUpdateFieldKeys.map(
        (key) => SALES_PLATFORM_DETAIL_FIELD_LABELS[key] || key,
      ),
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
      onLoginCredentialsPersist: handlers.handleLoginCredentialsPersist,
      onSupportContactsPersist: handlers.handleSupportContactsPersist,
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
      logoUploadModalOpen: states.logoUploadModalOpen,
      logoUploadPreviewUrl: states.logoUploadPreviewUrl,
      kamPopoverPlatform: states.kamPopoverPlatform,
      kamPopoverAnchorEl: states.kamPopoverAnchorEl,
      kamUpdateModalOpen: states.kamUpdateModalOpen,
      kamUpdatePlatform: states.kamUpdatePlatform,
      kamUpdateDraft: states.kamUpdateDraft,
      linksPopoverPlatform: states.linksPopoverPlatform,
      linksPopoverAnchorEl: states.linksPopoverAnchorEl,
      linksUpdateModalOpen: states.linksUpdateModalOpen,
      linksUpdatePlatform: states.linksUpdatePlatform,
      linksUpdateDraft: states.linksUpdateDraft,
      credentialsPopoverPlatform: states.credentialsPopoverPlatform,
      credentialsPopoverAnchorEl: states.credentialsPopoverAnchorEl,
      supportPopoverPlatform: states.supportPopoverPlatform,
      supportPopoverAnchorEl: states.supportPopoverAnchorEl,
      isSaving: states.isSaving,
    },
    handlers: {
      onView: handlers.handleViewItem,
      onUpdate: handlers.handleUpdateFromList,
      onDelete: handlers.handleDeleteRequest,
      onDeleteConfirm: handlers.handleDeleteConfirm,
      onDeleteCancel: handlers.handleDeleteCancel,
      onLogoUploadOpen: handlers.handleLogoUploadOpen,
      onLogoUploadCancel: handlers.handleLogoUploadCancel,
      onLogoUploadFileChange: handlers.handleLogoUploadFileChange,
      onLogoUploadConfirm: handlers.handleLogoUploadConfirm,
      onKamPopoverToggle: handlers.handleKamPopoverToggle,
      onKamPopoverClose: handlers.handleKamPopoverClose,
      onKamUpdateOpen: handlers.handleKamUpdateOpen,
      onKamUpdateCancel: handlers.handleKamUpdateCancel,
      onKamUpdateChange: handlers.handleKamUpdateChange,
      onKamUpdateConfirm: handlers.handleKamUpdateConfirm,
      onLinksPopoverToggle: handlers.handleLinksPopoverToggle,
      onLinksPopoverClose: handlers.handleLinksPopoverClose,
      onLinksUpdateOpen: handlers.handleLinksUpdateOpen,
      onLinksUpdateCancel: handlers.handleLinksUpdateCancel,
      onLinksUpdateChange: handlers.handleLinksUpdateChange,
      onLinksUpdateConfirm: handlers.handleLinksUpdateConfirm,
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
