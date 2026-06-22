import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import {
  seedFullFromIntegration,
  isIntegrationDraftDirty,
  getIntegrationChangedFieldKeys,
  pickIntegrationFieldPayload,
  INTEGRATION_FIELD_API_MAP,
  INTEGRATION_DETAIL_FIELD_LABELS,
} from "../../02_cK_setup_hlpr/integrationDetail_helpers.js";
import {
  DFLT_F_D_INTEGRATION,
  DFLT_F_D_INTEGRATION_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const resetDetailState = (setters) => {
  setters.setDetailMode("read");
  setters.setEditingField(null);
  setters.setActiveOperation("viewing");
  setters.setActiveViewingType("all");
  setters.setIntegrationDraft(DFLT_F_D_INTEGRATION_FULL);
  setters.setIntegrationDraftBaseline(null);
  setters.setSelectedIntegration(null);
  setters.setConfirmUpdateModalOpen(false);
  setters.setConfirmUpdateMode("global");
  setters.setConfirmUpdateFieldKeys([]);
  setters.setUnsavedModalOpen(false);
  setters.setPendingNavigation(null);
};

export const useCK_setup_integrations_handlers = ({
  states,
  setters,
  apiHelpers,
  TOAST,
  onSessionChange,
}) => {
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
    (item, mode = "read") => {
      const draft = seedFullFromIntegration(item);
      setters.setSelectedIntegration(item);
      setters.setIntegrationDraft(draft);
      setters.setIntegrationDraftBaseline(draft);
      setters.setDetailMode(mode);
      setters.setEditingField(null);
      setters.setActiveViewingType("one");
      setters.setActiveOperation("viewing");
    },
    [setters],
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
        seedDetail(action.item, action.mode || "read");
        return;
      }
      if (action.type === "addNew") {
        setters.setActiveOperation("adding");
      }
    },
    [onSessionChange, seedDetail, setters],
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
    (item) =>
      handleRequestNavigation({ type: "viewItem", item, mode: "read" }),
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
      setters.setEditingField(fieldKey);
      setters.setDetailMode("read");
    },
    [setters],
  );

  const handleFieldCancel = useCallback(() => {
    if (states.integrationDraftBaseline) {
      setters.setIntegrationDraft(states.integrationDraftBaseline);
    }
    setters.setEditingField(null);
  }, [setters, states.integrationDraftBaseline]);

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
    const changed = getIntegrationChangedFieldKeys(
      states.integrationDraftBaseline,
      states.integrationDraft,
      [fieldKey],
    );
    openConfirmUpdateModal("field", changed);
  }, [openConfirmUpdateModal, states]);

  const handleConfirmUpdateCancel = useCallback(() => {
    setters.setConfirmUpdateModalOpen(false);
    setters.setConfirmUpdateFieldKeys([]);
  }, [setters]);

  const applyFieldUpdate = useCallback(
    async (fieldKey, id, draft) => {
      const apiKey = INTEGRATION_FIELD_API_MAP[fieldKey];
      const body = pickIntegrationFieldPayload(fieldKey, draft);
      const fn = apiHelpers[apiKey];
      if (!fn) {
        return { success: false, message: `No API for field: ${fieldKey}` };
      }
      return fn({ id, ...body });
    },
    [apiHelpers],
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
      setters.setSelectedIntegration(refreshed);
      setters.setIntegrationDraft(nextDraft);
      setters.setIntegrationDraftBaseline(nextDraft);
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
    if (states.integrationDraft?.provider) return states.integrationDraft.provider;
    return states.selectedIntegration?.provider || "Integration";
  }, [states]);

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
