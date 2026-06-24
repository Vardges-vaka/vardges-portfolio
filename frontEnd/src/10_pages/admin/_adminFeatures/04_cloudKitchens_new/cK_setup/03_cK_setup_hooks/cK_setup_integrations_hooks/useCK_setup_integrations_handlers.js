import { useCallback, useRef } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import {
  seedFullFromIntegration,
  cloneIntegrationDraft,
  isIntegrationDraftDirty,
  getIntegrationChangedFieldKeys,
  isIntegrationIdentitySectionChanged,
  pickIntegrationFieldPayload,
  pickIntegrationIdentityBatchPayload,
  INTEGRATION_FIELD_API_MAP,
  INTEGRATION_DETAIL_FIELD_LABELS,
  INTEGRATION_IDENTITY_FIELD_KEYS,
} from "../../02_cK_setup_hlpr/integrationDetail_helpers.js";
import {
  buildEmptyFileItem,
  buildLogoVariantTitle,
  findLogoVariantIndex,
  getOtherFileIndices,
  isIntegrationFilesChanged,
  normalizeIntegrationFiles,
  prepareIntegrationFilesForSubmit,
  removeLogoVariantFromItems,
  removeOtherFileFromItems,
  revokeFilePreviewUrl,
  seedFilesFromIntegration,
  upsertLogoVariantInItems,
} from "../../02_cK_setup_hlpr/integrationFiles_hlpr.js";
import {
  DFLT_F_D_INTEGRATION,
  DFLT_F_D_INTEGRATION_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const fileItemFromPicker = (file, title = "", slotKey = "") => {
  if (!file) return buildEmptyFileItem(title);

  return {
    ...buildEmptyFileItem(title),
    title: title || file.name,
    format: slotKey || file.type || "",
    sizeIn_KB: file.size ? Math.round(file.size / 1024) : "",
    url: URL.createObjectURL(file),
    _pendingFile: file,
  };
};

const resetDetailState = (setters) => {
  setters.setDetailMode("read");
  setters.setEditingField(null);
  setters.setActiveOperation("viewing");
  setters.setActiveViewingType("all");
  setters.setIntegrationDraft(DFLT_F_D_INTEGRATION_FULL);
  setters.setIntegrationDraftBaseline(null);
  setters.setIntegrationFilesDraft(normalizeIntegrationFiles());
  setters.setIntegrationFilesBaseline(null);
  setters.setSelectedIntegration(null);
  setters.setConfirmUpdateModalOpen(false);
  setters.setConfirmUpdateMode("global");
  setters.setConfirmUpdateFieldKeys([]);
  setters.setUnsavedModalOpen(false);
  setters.setPendingNavigation(null);
  setters.setKamPopoverIntegration(null);
  setters.setKamPopoverAnchorEl(null);
  setters.setCredentialsPopoverIntegration(null);
  setters.setCredentialsPopoverAnchorEl(null);
  setters.setSupportPopoverIntegration(null);
  setters.setSupportPopoverAnchorEl(null);
  setters.setDetailExpandedSections([]);
};

export const useCK_setup_integrations_handlers = ({
  states,
  setters,
  apiHelpers,
  TOAST,
  onSessionChange,
}) => {
  const credentialsDetailCacheRef = useRef(new Map());

  const fetchAll = useCallback(async () => {
    const res = await apiHelpers.integration_getAll();
    if (res?.success) setters.setIntegrations(res.data || []);
    return res;
  }, [apiHelpers.integration_getAll, setters.setIntegrations]);

  const handleinitialfetch = useCallback(async () => {
    const res = await fetchAll();
    if (res?.success) {
      TOAST.success({
        title: "Integrations loaded",
        message: res.message || "Integrations fetched successfully",
      });
    } else {
      TOAST.error({
        title: "Failed to load integrations",
        message: res?.message || "Could not fetch integrations",
      });
    }
  }, [fetchAll, TOAST]);

  const hasUnsavedDetailChanges = useCallback(
    () => isIntegrationDraftDirty(states),
    [states],
  );

  const seedDetail = useCallback(
    (item, mode = "read", expandSections = []) => {
      const draft = seedFullFromIntegration(item);
      const files = seedFilesFromIntegration(item);
      setters.setSelectedIntegration(item);
      setters.setIntegrationDraft(draft);
      setters.setIntegrationDraftBaseline(cloneIntegrationDraft(draft));
      setters.setIntegrationFilesDraft(files);
      setters.setIntegrationFilesBaseline(files);
      setters.setDetailMode(mode);
      setters.setEditingField(null);
      setters.setDetailExpandedSections(expandSections);
      setters.setActiveViewingType("one");
      setters.setActiveOperation("viewing");
    },
    [setters],
  );

  const loadAndSeedDetail = useCallback(
    async (item, mode = "read", expandSections = []) => {
      const id = item?._id;
      if (!id) {
        TOAST.error({
          title: "Could not open integration",
          message: "Missing integration id",
        });
        return;
      }

      setters.setIsSaving(true);
      try {
        const res = await apiHelpers.integration_getOne({ id });
        if (!res?.success || !res.data) {
          TOAST.error({
            title: "Could not load integration",
            message: res?.message || "Failed to fetch integration details",
          });
          return;
        }

        seedDetail(res.data, mode, expandSections);
      } finally {
        setters.setIsSaving(false);
      }
    },
    [TOAST, apiHelpers.integration_getOne, seedDetail, setters],
  );

  const executePendingNavigation = useCallback(
    (action) => {
      if (!action) return;
      resetDetailState(setters);
      setters.setActiveViewingType("all");
      if (action.type === "session") {
        onSessionChange?.(action.session);
        return;
      }
      if (action.type === "viewAll") return;
      if (action.type === "viewItem") {
        void loadAndSeedDetail(
          action.item,
          action.mode || "read",
          action.expandSections || [],
        );
        return;
      }
      if (action.type === "addNew") {
        setters.setActiveOperation("adding");
      }
    },
    [onSessionChange, loadAndSeedDetail, setters],
  );

  const handleRequestNavigation = useCallback(
    (action) => {
      if (hasUnsavedDetailChanges()) {
        setters.setPendingNavigation(action);
        setters.setUnsavedModalOpen(true);
        return;
      }
      executePendingNavigation(action);
    },
    [executePendingNavigation, hasUnsavedDetailChanges, setters],
  );

  const handleUnsavedConfirm = useCallback(() => {
    const action = states.pendingNavigation;
    setters.setUnsavedModalOpen(false);
    setters.setPendingNavigation(null);
    resetDetailState(setters);
    executePendingNavigation(action);
  }, [executePendingNavigation, setters, states.pendingNavigation]);

  const handleUnsavedCancel = useCallback(() => {
    setters.setUnsavedModalOpen(false);
    setters.setPendingNavigation(null);
  }, [setters]);

  const handleBackToList = useCallback(() => {
    handleRequestNavigation({ type: "viewAll" });
  }, [handleRequestNavigation]);

  const handleViewItem = useCallback(
    (item) => handleRequestNavigation({ type: "viewItem", item, mode: "read" }),
    [handleRequestNavigation],
  );

  const handleUpdateFromList = useCallback(
    (item) =>
      handleRequestNavigation({ type: "viewItem", item, mode: "editAll" }),
    [handleRequestNavigation],
  );

  const handleDeleteRequest = useCallback(
    (item) => {
      setters.setIntegrationToDelete(item);
      setters.setDeleteModalOpen(true);
    },
    [setters],
  );

  const handleDeleteCancel = useCallback(() => {
    setters.setDeleteModalOpen(false);
    setters.setIntegrationToDelete(null);
  }, [setters]);

  const handleDeleteConfirm = useCallback(async () => {
    const item = states.integrationToDelete;
    const id = item?._id;
    if (!id) {
      TOAST.error({ title: "Delete failed", message: "No item selected" });
      return;
    }
    const res = await apiHelpers.integration_delete({ id });
    setters.setDeleteModalOpen(false);
    setters.setIntegrationToDelete(null);
    if (res?.success) {
      TOAST.success({
        title: "Integration deleted",
        message: res.message || "Deleted successfully",
      });
      if (states.selectedIntegration?._id === id) {
        resetDetailState(setters);
        setters.setActiveViewingType("all");
      }
      await fetchAll();
    } else {
      TOAST.error({
        title: "Delete failed",
        message: res?.message || "Could not delete integration",
      });
    }
  }, [apiHelpers.integration_delete, fetchAll, setters, states, TOAST]);

  const handleGlobalUpdateClick = useCallback(() => {
    setters.setDetailMode("editAll");
    setters.setEditingField(null);
  }, [setters]);

  const handleGlobalCancel = useCallback(() => {
    if (states.integrationDraftBaseline) {
      setters.setIntegrationDraft(states.integrationDraftBaseline);
    }
    setters.setDetailMode("read");
    setters.setEditingField(null);
  }, [setters, states.integrationDraftBaseline]);

  const handleFieldUpdateClick = useCallback(
    (fieldKey) => {
      if (fieldKey !== "files" && states.integrationDraft) {
        setters.setIntegrationDraftBaseline(
          cloneIntegrationDraft(states.integrationDraft),
        );
      }
      setters.setEditingField(fieldKey);
      setters.setDetailMode("read");
    },
    [setters, states.integrationDraft],
  );

  const handleFieldCancel = useCallback(() => {
    if (states.editingField === "files" && states.integrationFilesBaseline) {
      setters.setIntegrationFilesDraft(states.integrationFilesBaseline);
    } else if (states.integrationDraftBaseline) {
      setters.setIntegrationDraft(states.integrationDraftBaseline);
    }
    setters.setEditingField(null);
  }, [
    setters,
    states.editingField,
    states.integrationDraftBaseline,
    states.integrationFilesBaseline,
  ]);

  const openConfirmUpdateModal = useCallback(
    (mode, fieldKeys) => {
      if (!fieldKeys.length) {
        TOAST.info({
          title: "No changes",
          message: "Update one or more fields before confirming.",
        });
        return;
      }
      setters.setConfirmUpdateMode(mode);
      setters.setConfirmUpdateFieldKeys(fieldKeys);
      setters.setConfirmUpdateModalOpen(true);
    },
    [TOAST, setters],
  );

  const handleGlobalConfirmClick = useCallback(() => {
    const changed = getIntegrationChangedFieldKeys(
      states.integrationDraftBaseline,
      states.integrationDraft,
    );
    openConfirmUpdateModal("global", changed);
  }, [openConfirmUpdateModal, states]);

  const handleFieldConfirmClick = useCallback(() => {
    const fieldKey = states.editingField;
    if (!fieldKey) return;

    if (fieldKey === "files") {
      if (
        !isIntegrationFilesChanged(
          states.integrationFilesBaseline,
          states.integrationFilesDraft,
        )
      ) {
        TOAST.info({
          title: "No changes",
          message: "Update one or more files before confirming.",
        });
        return;
      }
      openConfirmUpdateModal("field", ["files"]);
      return;
    }

    if (fieldKey === "identity") {
      const { integrationDraftBaseline, integrationDraft } = states;

      if (
        !isIntegrationIdentitySectionChanged(
          integrationDraftBaseline,
          integrationDraft,
        )
      ) {
        TOAST.info({
          title: "No changes",
          message: "Update one or more identity fields before confirming.",
        });
        return;
      }

      const changed = getIntegrationChangedFieldKeys(
        integrationDraftBaseline,
        integrationDraft,
        INTEGRATION_IDENTITY_FIELD_KEYS,
      );

      openConfirmUpdateModal(
        "identity",
        changed.length ? changed : INTEGRATION_IDENTITY_FIELD_KEYS,
      );
      return;
    }

    const changed = getIntegrationChangedFieldKeys(
      states.integrationDraftBaseline,
      states.integrationDraft,
      [fieldKey],
    );
    openConfirmUpdateModal("field", changed);
  }, [
    openConfirmUpdateModal,
    states.integrationDraft,
    states.integrationDraftBaseline,
    states.editingField,
    TOAST,
  ]);

  const handleConfirmUpdateCancel = useCallback(() => {
    setters.setConfirmUpdateModalOpen(false);
    setters.setConfirmUpdateFieldKeys([]);
  }, [setters]);

  const applyFieldUpdate = useCallback(
    async (fieldKey, id, draft) => {
      const apiKey = INTEGRATION_FIELD_API_MAP[fieldKey];
      const fn = apiHelpers[apiKey];
      if (!fn) {
        return { success: false, message: `No API for field: ${fieldKey}` };
      }

      if (fieldKey === "files") {
        return fn({
          id,
          files: prepareIntegrationFilesForSubmit(states.integrationFilesDraft),
        });
      }

      const body = pickIntegrationFieldPayload(fieldKey, draft);
      return fn({ id, ...body });
    },
    [apiHelpers, states.integrationFilesDraft],
  );

  const handleConfirmUpdateConfirm = useCallback(async () => {
    const id = states.selectedIntegration?._id;
    if (!id) {
      TOAST.error({ title: "Update failed", message: "No item selected" });
      return;
    }
    const fieldKeys = states.confirmUpdateFieldKeys;
    if (!fieldKeys.length) {
      handleConfirmUpdateCancel();
      return;
    }
    setters.setIsSaving(true);
    try {
      if (states.confirmUpdateMode === "global") {
        const res = await apiHelpers.integration_updateAll({
          id,
          ...states.integrationDraft,
        });
        if (!res?.success) {
          TOAST.error({
            title: "Update failed",
            message: res?.message || "Could not update integration",
          });
          return;
        }
      } else if (states.confirmUpdateMode === "identity") {
        const res = await apiHelpers.integration_updateAll({
          id,
          ...pickIntegrationIdentityBatchPayload(states.integrationDraft),
        });
        if (!res?.success) {
          TOAST.error({
            title: "Update failed",
            message: res?.message || "Could not update identity section",
          });
          return;
        }
      } else {
        for (const fieldKey of fieldKeys) {
          const res = await applyFieldUpdate(
            fieldKey,
            id,
            states.integrationDraft,
          );
          if (!res?.success) {
            TOAST.error({
              title: "Update failed",
              message:
                res?.message ||
                `Could not update ${INTEGRATION_DETAIL_FIELD_LABELS[fieldKey]}`,
            });
            return;
          }
        }
      }
      TOAST.success({
        title: "Integration updated",
        message: "Changes saved successfully",
      });
      const listRes = await fetchAll();
      const refreshed =
        listRes?.data?.find?.((x) => x._id === id) ||
        states.selectedIntegration;
      const nextDraft = seedFullFromIntegration(refreshed);
      const nextFiles = seedFilesFromIntegration(refreshed);
      setters.setSelectedIntegration(refreshed);
      setters.setIntegrationDraft(nextDraft);
      setters.setIntegrationDraftBaseline(cloneIntegrationDraft(nextDraft));
      setters.setIntegrationFilesDraft(nextFiles);
      setters.setIntegrationFilesBaseline(nextFiles);
      setters.setDetailMode("read");
      setters.setEditingField(null);
      setters.setConfirmUpdateModalOpen(false);
      setters.setConfirmUpdateFieldKeys([]);
    } finally {
      setters.setIsSaving(false);
    }
  }, [
    TOAST,
    apiHelpers.integration_updateAll,
    applyFieldUpdate,
    fetchAll,
    handleConfirmUpdateCancel,
    setters,
    states,
  ]);

  const handleAddnew = useCallback(() => {
    handleRequestNavigation({ type: "addNew" });
  }, [handleRequestNavigation]);

  const handleFormChange = useCallback(
    (name, value) => {
      setters.setIntegrationFormData((prev) => setByPath(prev, name, value));
    },
    [setters],
  );

  const handleDraftChange = useCallback(
    (name, value) => {
      setters.setIntegrationDraft((prev) => setByPath(prev, name, value));
    },
    [setters],
  );

  const handleCreateSubmit = useCallback(async () => {
    const res = await apiHelpers.integration_create(states.integrationFormData);
    if (res?.success) {
      TOAST.success({
        title: "Integration created",
        message: res.message || "Created successfully",
      });
      setters.setIntegrationFormData(DFLT_F_D_INTEGRATION);
      setters.setActiveOperation("viewing");
      await fetchAll();
    } else {
      TOAST.error({
        title: "Create failed",
        message: res?.message || "Could not create integration",
      });
    }
  }, [apiHelpers.integration_create, fetchAll, setters, states, TOAST]);

  const handleCancelAdd = useCallback(() => {
    setters.setIntegrationFormData(DFLT_F_D_INTEGRATION);
    setters.setActiveOperation("viewing");
  }, [setters]);

  const itemDisplayName = useCallback(() => {
    const fromDelete = states.integrationToDelete?.provider;
    if (fromDelete) return fromDelete;
    const fromCredentialsPopover =
      states.credentialsPopoverIntegration?.provider;
    if (fromCredentialsPopover) return fromCredentialsPopover;
    const fromSupportPopover = states.supportPopoverIntegration?.provider;
    if (fromSupportPopover) return fromSupportPopover;
    if (states.integrationDraft?.provider)
      return states.integrationDraft.provider;
    return states.selectedIntegration?.provider || "Integration";
  }, [states]);

  const handleLogoVariantChange = useCallback(
    (slotKey, file) => {
      if (!file || !slotKey) return;

      setters.setIntegrationFilesDraft((prev) => {
        const variantTitle = buildLogoVariantTitle(slotKey);
        const nextItem = fileItemFromPicker(file, variantTitle, slotKey);

        return {
          ...prev,
          items: upsertLogoVariantInItems(prev.items || [], slotKey, nextItem),
        };
      });
    },
    [setters],
  );

  const handleLogoVariantFieldChange = useCallback(
    (slotKey, path, value) => {
      if (!slotKey || !path) return;

      setters.setIntegrationFilesDraft((prev) => {
        const items = upsertLogoVariantInItems(prev.items || [], slotKey, {});
        const variantIndex = findLogoVariantIndex(items, slotKey);
        if (variantIndex < 0) return prev;

        items[variantIndex] = setByPath(items[variantIndex], path, value);
        return { ...prev, items };
      });
    },
    [setters],
  );

  const handleLogoVariantDelete = useCallback(
    (slotKey) => {
      if (!slotKey) return;

      setters.setIntegrationFilesDraft((prev) => {
        const items = prev.items || [];
        const variantIndex = findLogoVariantIndex(items, slotKey);
        if (variantIndex >= 0) {
          revokeFilePreviewUrl(items[variantIndex]);
        }

        return {
          ...prev,
          items: removeLogoVariantFromItems(items, slotKey),
        };
      });
    },
    [setters],
  );

  const handleOtherFileChange = useCallback(
    (otherIndex, file) => {
      if (!file) return;
      setters.setIntegrationFilesDraft((prev) => {
        const items = [...(prev.items || [])];
        const otherIndices = getOtherFileIndices(items);
        const targetIndex = otherIndices[otherIndex];

        if (targetIndex == null) return prev;

        items[targetIndex] = fileItemFromPicker(
          file,
          items[targetIndex]?.title || file.name,
        );
        return { ...prev, items };
      });
    },
    [setters],
  );

  const handleOtherFileFieldChange = useCallback(
    (otherIndex, path, value) => {
      if (otherIndex == null || !path) return;

      setters.setIntegrationFilesDraft((prev) => {
        const items = [...(prev.items || [])];
        const otherIndices = getOtherFileIndices(items);
        const targetIndex = otherIndices[otherIndex];

        if (targetIndex == null) return prev;

        items[targetIndex] = setByPath(items[targetIndex], path, value);
        return { ...prev, items };
      });
    },
    [setters],
  );

  const handleOtherFileDelete = useCallback(
    (otherIndex) => {
      if (otherIndex == null) return;

      setters.setIntegrationFilesDraft((prev) => {
        const items = prev.items || [];
        const otherIndices = getOtherFileIndices(items);
        const targetIndex = otherIndices[otherIndex];

        if (targetIndex != null) {
          revokeFilePreviewUrl(items[targetIndex]);
        }

        return {
          ...prev,
          items: removeOtherFileFromItems(items, otherIndex),
        };
      });
    },
    [setters],
  );

  const handleLoginCredentialsPersist = useCallback(
    async (loginCredentials) => {
      const id = states.selectedIntegration?._id;
      if (!id) {
        TOAST.error({
          title: "Save failed",
          message: "No integration selected",
        });
        return { success: false };
      }

      setters.setIsSaving(true);
      try {
        const res = await apiHelpers.integration_update_loginCredentials({
          id,
          loginCredentials,
        });

        if (!res?.success) {
          TOAST.error({
            title: "Credentials save failed",
            message: res?.message || "Could not save login credentials",
          });
          return res;
        }

        TOAST.success({
          title: "Credentials saved",
          message: res.message || "Login credentials updated successfully",
        });

        await fetchAll();
        const getOneRes = await apiHelpers.integration_getOne({ id });
        const refreshed = getOneRes?.success
          ? getOneRes.data
          : { ...states.selectedIntegration, loginCredentials };
        const nextDraft = seedFullFromIntegration(refreshed);

        setters.setSelectedIntegration(refreshed);
        setters.setIntegrationDraft(nextDraft);
        setters.setIntegrationDraftBaseline(cloneIntegrationDraft(nextDraft));

        return { success: true, data: refreshed };
      } finally {
        setters.setIsSaving(false);
      }
    },
    [
      TOAST,
      apiHelpers.integration_getOne,
      apiHelpers.integration_update_loginCredentials,
      fetchAll,
      setters,
      states.selectedIntegration,
    ],
  );

  const handleSupportContactsPersist = useCallback(
    async (support) => {
      const id = states.selectedIntegration?._id;
      if (!id) {
        TOAST.error({
          title: "Save failed",
          message: "No integration selected",
        });
        return { success: false };
      }

      setters.setIsSaving(true);
      try {
        const res = await apiHelpers.integration_update_support({
          id,
          support,
        });

        if (!res?.success) {
          TOAST.error({
            title: "Support save failed",
            message: res?.message || "Could not save support contacts",
          });
          return res;
        }

        TOAST.success({
          title: "Support saved",
          message: res.message || "Support contacts updated successfully",
        });

        await fetchAll();
        const getOneRes = await apiHelpers.integration_getOne({ id });
        const refreshed = getOneRes?.success
          ? getOneRes.data
          : { ...states.selectedIntegration, support };
        const nextDraft = seedFullFromIntegration(refreshed);

        setters.setSelectedIntegration(refreshed);
        setters.setIntegrationDraft(nextDraft);
        setters.setIntegrationDraftBaseline(cloneIntegrationDraft(nextDraft));

        return { success: true, data: refreshed };
      } finally {
        setters.setIsSaving(false);
      }
    },
    [
      TOAST,
      apiHelpers.integration_getOne,
      apiHelpers.integration_update_support,
      fetchAll,
      setters,
      states.selectedIntegration,
    ],
  );

  const closeKamPopover = useCallback(() => {
    setters.setKamPopoverIntegration(null);
    setters.setKamPopoverAnchorEl(null);
  }, [setters]);

  const closeCredentialsPopover = useCallback(() => {
    setters.setCredentialsPopoverIntegration(null);
    setters.setCredentialsPopoverAnchorEl(null);
  }, [setters]);

  const closeSupportPopover = useCallback(() => {
    setters.setSupportPopoverIntegration(null);
    setters.setSupportPopoverAnchorEl(null);
  }, [setters]);

  const closeAllListPopovers = useCallback(() => {
    closeKamPopover();
    closeCredentialsPopover();
    closeSupportPopover();
  }, [closeKamPopover, closeCredentialsPopover, closeSupportPopover]);

  const handleKamPopoverToggle = useCallback(
    (integration, event) => {
      const isSame =
        states.kamPopoverIntegration?._id === integration?._id &&
        states.kamPopoverAnchorEl;

      if (isSame) {
        closeKamPopover();
        return;
      }

      closeCredentialsPopover();
      closeSupportPopover();
      setters.setKamPopoverIntegration(integration);
      setters.setKamPopoverAnchorEl(event.currentTarget);
    },
    [
      closeKamPopover,
      closeCredentialsPopover,
      closeSupportPopover,
      setters,
      states.kamPopoverAnchorEl,
      states.kamPopoverIntegration?._id,
    ],
  );

  const handleKamPopoverClose = useCallback(() => {
    closeKamPopover();
  }, [closeKamPopover]);

  const handleOpenKam = useCallback(
    (integration) => {
      closeAllListPopovers();
      handleRequestNavigation({
        type: "viewItem",
        item: integration,
        mode: "read",
        expandSections: ["kam"],
      });
    },
    [closeAllListPopovers, handleRequestNavigation],
  );

  const handleCredentialsPopoverToggle = useCallback(
    (integration, event) => {
      const isSameIntegration =
        states.credentialsPopoverIntegration?._id === integration?._id &&
        states.credentialsPopoverAnchorEl;

      if (isSameIntegration) {
        closeCredentialsPopover();
        return;
      }

      closeSupportPopover();
      setters.setCredentialsPopoverIntegration(integration);
      setters.setCredentialsPopoverAnchorEl(event.currentTarget);
    },
    [
      closeCredentialsPopover,
      closeSupportPopover,
      setters,
      states.credentialsPopoverAnchorEl,
      states.credentialsPopoverIntegration?._id,
    ],
  );

  const handleCredentialsPopoverClose = useCallback(() => {
    closeCredentialsPopover();
  }, [closeCredentialsPopover]);

  const handleCredentialsPopoverFetch = useCallback(
    async (integrationId) => {
      if (!integrationId) return null;

      if (credentialsDetailCacheRef.current.has(integrationId)) {
        return credentialsDetailCacheRef.current.get(integrationId);
      }

      const res = await apiHelpers.integration_getOne({ id: integrationId });
      if (!res?.success || !res.data) return null;

      credentialsDetailCacheRef.current.set(integrationId, res.data);
      return res.data;
    },
    [apiHelpers.integration_getOne],
  );

  const handleOpenLoginCredentials = useCallback(
    (integration) => {
      closeAllListPopovers();
      handleRequestNavigation({
        type: "viewItem",
        item: integration,
        mode: "read",
        expandSections: ["loginCredentials"],
      });
    },
    [closeAllListPopovers, handleRequestNavigation],
  );

  const handleSupportPopoverToggle = useCallback(
    (integration, event) => {
      const isSameIntegration =
        states.supportPopoverIntegration?._id === integration?._id &&
        states.supportPopoverAnchorEl;

      if (isSameIntegration) {
        closeSupportPopover();
        return;
      }

      closeCredentialsPopover();
      setters.setSupportPopoverIntegration(integration);
      setters.setSupportPopoverAnchorEl(event.currentTarget);
    },
    [
      closeCredentialsPopover,
      closeSupportPopover,
      setters,
      states.supportPopoverAnchorEl,
      states.supportPopoverIntegration?._id,
    ],
  );

  const handleSupportPopoverClose = useCallback(() => {
    closeSupportPopover();
  }, [closeSupportPopover]);

  const handleOpenSupportContacts = useCallback(
    (integration) => {
      closeAllListPopovers();
      handleRequestNavigation({
        type: "viewItem",
        item: integration,
        mode: "read",
        expandSections: ["support"],
      });
    },
    [closeAllListPopovers, handleRequestNavigation],
  );

  const handleAddOtherFiles = useCallback(
    (fileList) => {
      if (!fileList?.length) return;
      setters.setIntegrationFilesDraft((prev) => ({
        ...prev,
        items: [
          ...(prev.items || []),
          ...fileList.map((file) => fileItemFromPicker(file, file.name)),
        ],
      }));
    },
    [setters],
  );

  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
      handleFormChange,
      handleCreateSubmit,
      handleCancelAdd,
      handleViewItem,
      handleUpdateFromList,
      handleDeleteRequest,
      handleDeleteConfirm,
      handleDeleteCancel,
      handleBackToList,
      handleGlobalUpdateClick,
      handleGlobalCancel,
      handleGlobalConfirmClick,
      handleFieldUpdateClick,
      handleFieldCancel,
      handleFieldConfirmClick,
      handleDraftChange,
      handleLogoVariantChange,
      handleLogoVariantFieldChange,
      handleLogoVariantDelete,
      handleOtherFileChange,
      handleOtherFileFieldChange,
      handleOtherFileDelete,
      handleAddOtherFiles,
      handleLoginCredentialsPersist,
      handleSupportContactsPersist,
      handleKamPopoverToggle,
      handleKamPopoverClose,
      handleOpenKam,
      handleCredentialsPopoverToggle,
      handleCredentialsPopoverClose,
      handleCredentialsPopoverFetch,
      handleOpenLoginCredentials,
      handleSupportPopoverToggle,
      handleSupportPopoverClose,
      handleOpenSupportContacts,
      handleConfirmUpdateConfirm,
      handleConfirmUpdateCancel,
      handleRequestNavigation,
      handleUnsavedConfirm,
      handleUnsavedCancel,
      hasUnsavedDetailChanges,
      resetDetailState: () => resetDetailState(setters),
      itemDisplayName,
    },
  };
};
