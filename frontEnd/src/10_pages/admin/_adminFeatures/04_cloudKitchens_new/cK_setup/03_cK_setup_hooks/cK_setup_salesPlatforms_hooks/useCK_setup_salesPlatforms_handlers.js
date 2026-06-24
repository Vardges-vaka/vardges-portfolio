import { useCallback, useRef } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import {
  seedFullFromSalesPlatform,
  isSalesPlatformDraftDirty,
  getSalesPlatformChangedFieldKeys,
  pickSalesPlatformFieldPayload,
  SALES_PLATFORM_FIELD_API_MAP,
  SALES_PLATFORM_DETAIL_FIELD_LABELS,
} from "../../02_cK_setup_hlpr/salesPlatformDetail_helpers.js";
import {
  seedLinksDraftFromPlatform,
  seedLinksUrlsDraftFromPlatform,
} from "../../02_cK_setup_hlpr/salesPlatformLinks_hlpr.js";
import { seedKamDraftFromPlatform } from "../../02_cK_setup_hlpr/salesPlatformKam_hlpr.js";
import {
  DFLT_F_D_SALES_PLATFORM,
  DFLT_F_D_SALES_PLATFORM_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const resetDetailState = (setters) => {
  setters.setDetailMode("read");
  setters.setEditingField(null);
  setters.setActiveOperation("viewing");
  setters.setActiveViewingType("all");
  setters.setSalesPlatformDraft(DFLT_F_D_SALES_PLATFORM_FULL);
  setters.setSalesPlatformDraftBaseline(null);
  setters.setSelectedSalesPlatform(null);
  setters.setConfirmUpdateModalOpen(false);
  setters.setConfirmUpdateMode("global");
  setters.setConfirmUpdateFieldKeys([]);
  setters.setUnsavedModalOpen(false);
  setters.setPendingNavigation(null);
  setters.setKamPopoverPlatform(null);
  setters.setKamPopoverAnchorEl(null);
  setters.setLinksPopoverPlatform(null);
  setters.setLinksPopoverAnchorEl(null);
  setters.setCredentialsPopoverPlatform(null);
  setters.setCredentialsPopoverAnchorEl(null);
  setters.setSupportPopoverPlatform(null);
  setters.setSupportPopoverAnchorEl(null);
  setters.setDetailExpandedSections([]);
};

export const useCK_setup_salesPlatforms_handlers = ({
  states,
  setters,
  apiHelpers,
  TOAST,
  onSessionChange,
}) => {
  const credentialsDetailCacheRef = useRef(new Map());

  const fetchAll = useCallback(async () => {
    const res = await apiHelpers.slsPlatform_getAll();
    if (res?.success) setters.setSalesPlatforms(res.data || []);
    return res;
  }, [apiHelpers.slsPlatform_getAll, setters.setSalesPlatforms]);

  const handleinitialfetch = useCallback(async () => {
    const res = await fetchAll();
    if (res?.success) {
      TOAST.success({
        title: "Sales platforms loaded",
        message: res.message || "Sales platforms fetched successfully",
      });
    } else {
      TOAST.error({
        title: "Failed to load sales platforms",
        message: res?.message || "Could not fetch sales platforms",
      });
    }
  }, [fetchAll, TOAST]);

  const hasUnsavedDetailChanges = useCallback(
    () => isSalesPlatformDraftDirty(states),
    [states],
  );

  const seedDetail = useCallback(
    (item, mode = "read", expandSections = []) => {
      const draft = seedFullFromSalesPlatform(item);
      setters.setSelectedSalesPlatform(item);
      setters.setSalesPlatformDraft(draft);
      setters.setSalesPlatformDraftBaseline(draft);
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
          title: "Could not open platform",
          message: "Missing sales platform id",
        });
        return;
      }

      setters.setIsSaving(true);
      try {
        const res = await apiHelpers.slsPlatform_getOne({ id });
        if (!res?.success || !res.data) {
          TOAST.error({
            title: "Could not load platform",
            message: res?.message || "Failed to fetch sales platform details",
          });
          return;
        }

        seedDetail(res.data, mode, expandSections);
      } finally {
        setters.setIsSaving(false);
      }
    },
    [TOAST, apiHelpers.slsPlatform_getOne, seedDetail, setters],
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
      setters.setSalesPlatformToDelete(item);
      setters.setDeleteModalOpen(true);
    },
    [setters],
  );

  const handleDeleteCancel = useCallback(() => {
    setters.setDeleteModalOpen(false);
    setters.setSalesPlatformToDelete(null);
  }, [setters]);

  const closeLogoUploadModal = useCallback(
    (previewUrl = states.logoUploadPreviewUrl) => {
      if (typeof previewUrl === "string" && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setters.setLogoUploadModalOpen(false);
      setters.setLogoUploadPlatform(null);
      setters.setLogoUploadPendingFile(null);
      setters.setLogoUploadPreviewUrl("");
    },
    [setters, states.logoUploadPreviewUrl],
  );

  const handleLogoUploadOpen = useCallback(
    (platform) => {
      setters.setLogoUploadPlatform(platform);
      setters.setLogoUploadPendingFile(null);
      setters.setLogoUploadPreviewUrl("");
      setters.setLogoUploadModalOpen(true);
    },
    [setters],
  );

  const handleLogoUploadCancel = useCallback(() => {
    closeLogoUploadModal();
  }, [closeLogoUploadModal]);

  const handleLogoUploadFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0] ?? null;

      if (states.logoUploadPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(states.logoUploadPreviewUrl);
      }

      if (!file) {
        setters.setLogoUploadPendingFile(null);
        setters.setLogoUploadPreviewUrl("");
        return;
      }

      setters.setLogoUploadPendingFile(file);
      setters.setLogoUploadPreviewUrl(URL.createObjectURL(file));
    },
    [setters, states.logoUploadPreviewUrl],
  );

  const handleLogoUploadConfirm = useCallback(async () => {
    const platform = states.logoUploadPlatform;
    const id = platform?._id;
    const pendingFile = states.logoUploadPendingFile;

    if (!id) {
      TOAST.error({ title: "Upload failed", message: "No platform selected" });
      return;
    }

    if (!(pendingFile instanceof File)) {
      TOAST.info({
        title: "No logo selected",
        message: "Choose an image before uploading.",
      });
      return;
    }

    setters.setIsSaving(true);
    try {
      const links = {
        ...seedLinksDraftFromPlatform(platform.links),
        _pendingLogoFile: pendingFile,
        logoUrl: states.logoUploadPreviewUrl || "",
      };

      const res = await apiHelpers.slsPlatform_update_links({ id, links });
      if (!res?.success) {
        TOAST.error({
          title: "Logo upload failed",
          message: res?.message || "Could not upload platform logo",
        });
        return;
      }

      TOAST.success({
        title: "Logo uploaded",
        message: res.message || "Platform logo saved successfully",
      });

      closeLogoUploadModal(states.logoUploadPreviewUrl);

      if (states.selectedSalesPlatform?._id === id) {
        const nextDraft = seedFullFromSalesPlatform(res.data || platform);
        setters.setSelectedSalesPlatform(res.data || platform);
        setters.setSalesPlatformDraft(nextDraft);
        setters.setSalesPlatformDraftBaseline(nextDraft);
      }

      await fetchAll();
    } finally {
      setters.setIsSaving(false);
    }
  }, [
    TOAST,
    apiHelpers.slsPlatform_update_links,
    closeLogoUploadModal,
    fetchAll,
    setters,
    states,
  ]);

  const closeKamPopover = useCallback(() => {
    setters.setKamPopoverPlatform(null);
    setters.setKamPopoverAnchorEl(null);
  }, [setters]);

  const closeLinksPopover = useCallback(() => {
    setters.setLinksPopoverPlatform(null);
    setters.setLinksPopoverAnchorEl(null);
  }, [setters]);

  const closeCredentialsPopover = useCallback(() => {
    setters.setCredentialsPopoverPlatform(null);
    setters.setCredentialsPopoverAnchorEl(null);
  }, [setters]);

  const closeSupportPopover = useCallback(() => {
    setters.setSupportPopoverPlatform(null);
    setters.setSupportPopoverAnchorEl(null);
  }, [setters]);

  const closeAllListPopovers = useCallback(() => {
    closeKamPopover();
    closeLinksPopover();
    closeCredentialsPopover();
    closeSupportPopover();
  }, [
    closeCredentialsPopover,
    closeKamPopover,
    closeLinksPopover,
    closeSupportPopover,
  ]);

  const handleKamPopoverToggle = useCallback(
    (platform, event) => {
      const isSamePlatform =
        states.kamPopoverPlatform?._id === platform?._id && states.kamPopoverAnchorEl;

      if (isSamePlatform) {
        closeKamPopover();
        return;
      }

      closeLinksPopover();
      closeCredentialsPopover();
      closeSupportPopover();
      setters.setKamPopoverPlatform(platform);
      setters.setKamPopoverAnchorEl(event.currentTarget);
    },
    [
      closeKamPopover,
      closeLinksPopover,
      setters,
      states.kamPopoverAnchorEl,
      states.kamPopoverPlatform?._id,
    ],
  );

  const handleKamPopoverClose = useCallback(() => {
    closeKamPopover();
  }, [closeKamPopover]);

  const closeKamUpdateModal = useCallback(() => {
    setters.setKamUpdateModalOpen(false);
    setters.setKamUpdatePlatform(null);
    setters.setKamUpdateDraft(null);
  }, [setters]);

  const handleKamUpdateOpen = useCallback(() => {
    const platform = states.kamPopoverPlatform;
    if (!platform?._id) return;

    setters.setKamUpdatePlatform(platform);
    setters.setKamUpdateDraft({ kam: seedKamDraftFromPlatform(platform.kam) });
    setters.setKamUpdateModalOpen(true);
    closeKamPopover();
  }, [closeKamPopover, setters, states.kamPopoverPlatform]);

  const handleKamUpdateCancel = useCallback(() => {
    closeKamUpdateModal();
  }, [closeKamUpdateModal]);

  const handleKamUpdateChange = useCallback(
    (name, value) => {
      setters.setKamUpdateDraft((prev) => setByPath(prev, name, value));
    },
    [setters],
  );

  const handleKamUpdateConfirm = useCallback(async () => {
    const platform = states.kamUpdatePlatform;
    const id = platform?._id;
    const kam = states.kamUpdateDraft?.kam;

    if (!id || !kam) {
      TOAST.error({ title: "Update failed", message: "No platform selected" });
      return;
    }

    setters.setIsSaving(true);
    try {
      const res = await apiHelpers.slsPlatform_update_kam({ id, kam });
      if (!res?.success) {
        TOAST.error({
          title: "KAM update failed",
          message: res?.message || "Could not update key account manager",
        });
        return;
      }

      TOAST.success({
        title: "KAM updated",
        message: res.message || "Key account manager saved successfully",
      });

      closeKamUpdateModal();

      if (states.selectedSalesPlatform?._id === id) {
        const refreshed = res.data || { ...platform, kam };
        const nextDraft = seedFullFromSalesPlatform(refreshed);
        setters.setSelectedSalesPlatform(refreshed);
        setters.setSalesPlatformDraft(nextDraft);
        setters.setSalesPlatformDraftBaseline(nextDraft);
      }

      await fetchAll();
    } finally {
      setters.setIsSaving(false);
    }
  }, [
    TOAST,
    apiHelpers.slsPlatform_update_kam,
    closeKamUpdateModal,
    fetchAll,
    setters,
    states,
  ]);

  const handleLinksPopoverToggle = useCallback(
    (platform, event) => {
      const isSamePlatform =
        states.linksPopoverPlatform?._id === platform?._id &&
        states.linksPopoverAnchorEl;

      if (isSamePlatform) {
        closeLinksPopover();
        return;
      }

      closeKamPopover();
      closeCredentialsPopover();
      closeSupportPopover();
      setters.setLinksPopoverPlatform(platform);
      setters.setLinksPopoverAnchorEl(event.currentTarget);
    },
    [
      closeKamPopover,
      closeLinksPopover,
      setters,
      states.linksPopoverAnchorEl,
      states.linksPopoverPlatform?._id,
    ],
  );

  const handleLinksPopoverClose = useCallback(() => {
    closeLinksPopover();
  }, [closeLinksPopover]);

  const closeLinksUpdateModal = useCallback(() => {
    setters.setLinksUpdateModalOpen(false);
    setters.setLinksUpdatePlatform(null);
    setters.setLinksUpdateDraft(null);
  }, [setters]);

  const handleLinksUpdateOpen = useCallback(() => {
    const platform = states.linksPopoverPlatform;
    if (!platform?._id) return;

    setters.setLinksUpdatePlatform(platform);
    setters.setLinksUpdateDraft({
      links: seedLinksUrlsDraftFromPlatform(platform.links),
    });
    setters.setLinksUpdateModalOpen(true);
    closeLinksPopover();
  }, [closeLinksPopover, setters, states.linksPopoverPlatform]);

  const handleLinksUpdateCancel = useCallback(() => {
    closeLinksUpdateModal();
  }, [closeLinksUpdateModal]);

  const handleLinksUpdateChange = useCallback(
    (name, value) => {
      setters.setLinksUpdateDraft((prev) => setByPath(prev, name, value));
    },
    [setters],
  );

  const handleLinksUpdateConfirm = useCallback(async () => {
    const platform = states.linksUpdatePlatform;
    const id = platform?._id;
    const draftLinks = states.linksUpdateDraft?.links;

    if (!id || !draftLinks) {
      TOAST.error({ title: "Update failed", message: "No platform selected" });
      return;
    }

    setters.setIsSaving(true);
    try {
      const links = {
        ...seedLinksDraftFromPlatform(platform.links),
        websiteUrl: draftLinks.websiteUrl ?? "",
        partnerPortalUrl: draftLinks.partnerPortalUrl ?? "",
      };

      const res = await apiHelpers.slsPlatform_update_links({ id, links });
      if (!res?.success) {
        TOAST.error({
          title: "Links update failed",
          message: res?.message || "Could not update platform links",
        });
        return;
      }

      TOAST.success({
        title: "Links updated",
        message: res.message || "Platform links saved successfully",
      });

      closeLinksUpdateModal();

      if (states.selectedSalesPlatform?._id === id) {
        const refreshed = res.data || { ...platform, links };
        const nextDraft = seedFullFromSalesPlatform(refreshed);
        setters.setSelectedSalesPlatform(refreshed);
        setters.setSalesPlatformDraft(nextDraft);
        setters.setSalesPlatformDraftBaseline(nextDraft);
      }

      await fetchAll();
    } finally {
      setters.setIsSaving(false);
    }
  }, [
    TOAST,
    apiHelpers.slsPlatform_update_links,
    closeLinksUpdateModal,
    fetchAll,
    setters,
    states,
  ]);

  const handleCredentialsPopoverToggle = useCallback(
    (platform, event) => {
      const isSamePlatform =
        states.credentialsPopoverPlatform?._id === platform?._id &&
        states.credentialsPopoverAnchorEl;

      if (isSamePlatform) {
        closeCredentialsPopover();
        return;
      }

      closeKamPopover();
      closeLinksPopover();
      closeSupportPopover();
      setters.setCredentialsPopoverPlatform(platform);
      setters.setCredentialsPopoverAnchorEl(event.currentTarget);
    },
    [
      closeCredentialsPopover,
      closeKamPopover,
      closeLinksPopover,
      closeSupportPopover,
      setters,
      states.credentialsPopoverAnchorEl,
      states.credentialsPopoverPlatform?._id,
    ],
  );

  const handleCredentialsPopoverClose = useCallback(() => {
    closeCredentialsPopover();
  }, [closeCredentialsPopover]);

  const handleCredentialsPopoverFetch = useCallback(
    async (platformId) => {
      if (!platformId) return null;

      if (credentialsDetailCacheRef.current.has(platformId)) {
        return credentialsDetailCacheRef.current.get(platformId);
      }

      const res = await apiHelpers.slsPlatform_getOne({ id: platformId });
      if (!res?.success || !res.data) return null;

      credentialsDetailCacheRef.current.set(platformId, res.data);
      return res.data;
    },
    [apiHelpers.slsPlatform_getOne],
  );

  const handleOpenLoginCredentials = useCallback(
    (platform) => {
      closeAllListPopovers();
      handleRequestNavigation({
        type: "viewItem",
        item: platform,
        mode: "read",
        expandSections: ["loginCredentials"],
      });
    },
    [closeAllListPopovers, handleRequestNavigation],
  );

  const handleSupportPopoverToggle = useCallback(
    (platform, event) => {
      const isSamePlatform =
        states.supportPopoverPlatform?._id === platform?._id &&
        states.supportPopoverAnchorEl;

      if (isSamePlatform) {
        closeSupportPopover();
        return;
      }

      closeKamPopover();
      closeLinksPopover();
      closeCredentialsPopover();
      setters.setSupportPopoverPlatform(platform);
      setters.setSupportPopoverAnchorEl(event.currentTarget);
    },
    [
      closeCredentialsPopover,
      closeKamPopover,
      closeLinksPopover,
      closeSupportPopover,
      setters,
      states.supportPopoverAnchorEl,
      states.supportPopoverPlatform?._id,
    ],
  );

  const handleSupportPopoverClose = useCallback(() => {
    closeSupportPopover();
  }, [closeSupportPopover]);

  const handleOpenSupportContacts = useCallback(
    (platform) => {
      closeAllListPopovers();
      handleRequestNavigation({
        type: "viewItem",
        item: platform,
        mode: "read",
        expandSections: ["support"],
      });
    },
    [closeAllListPopovers, handleRequestNavigation],
  );

  const handleDeleteConfirm = useCallback(async () => {
    const item = states.salesPlatformToDelete;
    const id = item?._id;
    if (!id) {
      TOAST.error({ title: "Delete failed", message: "No item selected" });
      return;
    }
    const res = await apiHelpers.slsPlatform_delete({ id });
    setters.setDeleteModalOpen(false);
    setters.setSalesPlatformToDelete(null);
    if (res?.success) {
      TOAST.success({
        title: "Sales platform deleted",
        message: res.message || "Deleted successfully",
      });
      if (states.selectedSalesPlatform?._id === id) {
        resetDetailState(setters);
        setters.setActiveViewingType("all");
      }
      await fetchAll();
    } else {
      TOAST.error({
        title: "Delete failed",
        message: res?.message || "Could not delete sales platform",
      });
    }
  }, [apiHelpers.slsPlatform_delete, fetchAll, setters, states, TOAST]);

  const handleLoginCredentialsPersist = useCallback(
    async (loginCredentials) => {
      const id = states.selectedSalesPlatform?._id;
      if (!id) {
        TOAST.error({ title: "Save failed", message: "No platform selected" });
        return { success: false };
      }

      setters.setIsSaving(true);
      try {
        const res = await apiHelpers.slsPlatform_update_loginCredentials({
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

        credentialsDetailCacheRef.current.delete(id);

        await fetchAll();
        const getOneRes = await apiHelpers.slsPlatform_getOne({ id });
        const refreshed = getOneRes?.success
          ? getOneRes.data
          : { ...states.selectedSalesPlatform, loginCredentials };
        const nextDraft = seedFullFromSalesPlatform(refreshed);
        setters.setSelectedSalesPlatform(refreshed);
        setters.setSalesPlatformDraft(nextDraft);
        setters.setSalesPlatformDraftBaseline(nextDraft);

        return { success: true, data: refreshed };
      } finally {
        setters.setIsSaving(false);
      }
    },
    [TOAST, apiHelpers, fetchAll, setters, states.selectedSalesPlatform],
  );

  const handleSupportContactsPersist = useCallback(
    async (support) => {
      const id = states.selectedSalesPlatform?._id;
      if (!id) {
        TOAST.error({ title: "Save failed", message: "No platform selected" });
        return { success: false };
      }

      setters.setIsSaving(true);
      try {
        const res = await apiHelpers.slsPlatform_update_support({
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
        const getOneRes = await apiHelpers.slsPlatform_getOne({ id });
        const refreshed = getOneRes?.success
          ? getOneRes.data
          : { ...states.selectedSalesPlatform, support };
        const nextDraft = seedFullFromSalesPlatform(refreshed);
        setters.setSelectedSalesPlatform(refreshed);
        setters.setSalesPlatformDraft(nextDraft);
        setters.setSalesPlatformDraftBaseline(nextDraft);

        return { success: true, data: refreshed };
      } finally {
        setters.setIsSaving(false);
      }
    },
    [TOAST, apiHelpers, fetchAll, setters, states.selectedSalesPlatform],
  );

  const handleGlobalUpdateClick = useCallback(() => {
    setters.setDetailMode("editAll");
    setters.setEditingField(null);
  }, [setters]);

  const handleGlobalCancel = useCallback(() => {
    if (states.salesPlatformDraftBaseline) {
      setters.setSalesPlatformDraft(states.salesPlatformDraftBaseline);
    }
    setters.setDetailMode("read");
    setters.setEditingField(null);
  }, [setters, states.salesPlatformDraftBaseline]);

  const handleFieldUpdateClick = useCallback(
    (fieldKey) => {
      setters.setEditingField(fieldKey);
      setters.setDetailMode("read");
    },
    [setters],
  );

  const handleFieldCancel = useCallback(() => {
    if (states.salesPlatformDraftBaseline) {
      setters.setSalesPlatformDraft(states.salesPlatformDraftBaseline);
    }
    setters.setEditingField(null);
  }, [setters, states.salesPlatformDraftBaseline]);

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
    const changed = getSalesPlatformChangedFieldKeys(
      states.salesPlatformDraftBaseline,
      states.salesPlatformDraft,
    );
    openConfirmUpdateModal("global", changed);
  }, [openConfirmUpdateModal, states]);

  const handleFieldConfirmClick = useCallback(() => {
    const fieldKey = states.editingField;
    if (!fieldKey) return;
    const changed = getSalesPlatformChangedFieldKeys(
      states.salesPlatformDraftBaseline,
      states.salesPlatformDraft,
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
      const apiKey = SALES_PLATFORM_FIELD_API_MAP[fieldKey];
      const body = pickSalesPlatformFieldPayload(fieldKey, draft);
      const fn = apiHelpers[apiKey];
      if (!fn) {
        return { success: false, message: `No API for field: ${fieldKey}` };
      }
      return fn({ id, ...body });
    },
    [apiHelpers],
  );

  const handleConfirmUpdateConfirm = useCallback(async () => {
    const id = states.selectedSalesPlatform?._id;
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
        const res = await apiHelpers.slsPlatform_updateAll({
          id,
          ...states.salesPlatformDraft,
        });
        if (!res?.success) {
          TOAST.error({
            title: "Update failed",
            message: res?.message || "Could not update sales platform",
          });
          return;
        }
      } else {
        for (const fieldKey of fieldKeys) {
          const res = await applyFieldUpdate(
            fieldKey,
            id,
            states.salesPlatformDraft,
          );
          if (!res?.success) {
            TOAST.error({
              title: "Update failed",
              message:
                res?.message ||
                `Could not update ${SALES_PLATFORM_DETAIL_FIELD_LABELS[fieldKey]}`,
            });
            return;
          }
        }
      }
      TOAST.success({
        title: "Sales platform updated",
        message: "Changes saved successfully",
      });
      await fetchAll();
      const getOneRes = await apiHelpers.slsPlatform_getOne({ id });
      const refreshed = getOneRes?.success
        ? getOneRes.data
        : states.selectedSalesPlatform;
      const nextDraft = seedFullFromSalesPlatform(refreshed);
      setters.setSelectedSalesPlatform(refreshed);
      setters.setSalesPlatformDraft(nextDraft);
      setters.setSalesPlatformDraftBaseline(nextDraft);
      setters.setDetailMode("read");
      setters.setEditingField(null);
      setters.setConfirmUpdateModalOpen(false);
      setters.setConfirmUpdateFieldKeys([]);
    } finally {
      setters.setIsSaving(false);
    }
  }, [
    TOAST,
    apiHelpers.slsPlatform_getOne,
    apiHelpers.slsPlatform_updateAll,
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
      setters.setSalesPlatformFormData((prev) => setByPath(prev, name, value));
    },
    [setters],
  );

  const handleDraftChange = useCallback(
    (name, value) => {
      setters.setSalesPlatformDraft((prev) => setByPath(prev, name, value));
    },
    [setters],
  );

  const handleCreateSubmit = useCallback(async () => {
    const res = await apiHelpers.slsPlatform_create(states.salesPlatformFormData);
    if (res?.success) {
      TOAST.success({
        title: "Sales platform created",
        message: res.message || "Created successfully",
      });
      setters.setSalesPlatformFormData(DFLT_F_D_SALES_PLATFORM);
      setters.setActiveOperation("viewing");
      await fetchAll();
    } else {
      TOAST.error({
        title: "Create failed",
        message: res?.message || "Could not create sales platform",
      });
    }
  }, [apiHelpers.slsPlatform_create, fetchAll, setters, states, TOAST]);

  const handleCancelAdd = useCallback(() => {
    setters.setSalesPlatformFormData(DFLT_F_D_SALES_PLATFORM);
    setters.setActiveOperation("viewing");
  }, [setters]);

  const itemDisplayName = useCallback(() => {
    const fromDelete = states.salesPlatformToDelete?.name;
    if (fromDelete) return fromDelete;
    const fromLogoUpload = states.logoUploadPlatform?.name;
    if (fromLogoUpload) return fromLogoUpload;
    const fromKamUpdate = states.kamUpdatePlatform?.name;
    if (fromKamUpdate) return fromKamUpdate;
    const fromLinksUpdate = states.linksUpdatePlatform?.name;
    if (fromLinksUpdate) return fromLinksUpdate;
    const fromKamPopover = states.kamPopoverPlatform?.name;
    if (fromKamPopover) return fromKamPopover;
    const fromLinksPopover = states.linksPopoverPlatform?.name;
    if (fromLinksPopover) return fromLinksPopover;
    const fromCredentialsPopover = states.credentialsPopoverPlatform?.name;
    if (fromCredentialsPopover) return fromCredentialsPopover;
    const fromSupportPopover = states.supportPopoverPlatform?.name;
    if (fromSupportPopover) return fromSupportPopover;
    if (states.salesPlatformDraft?.name) return states.salesPlatformDraft.name;
    return states.selectedSalesPlatform?.name || "Sales platform";
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
      handleLogoUploadOpen,
      handleLogoUploadCancel,
      handleLogoUploadFileChange,
      handleLogoUploadConfirm,
      handleKamPopoverToggle,
      handleKamPopoverClose,
      handleKamUpdateOpen,
      handleKamUpdateCancel,
      handleKamUpdateChange,
      handleKamUpdateConfirm,
      handleLinksPopoverToggle,
      handleLinksPopoverClose,
      handleLinksUpdateOpen,
      handleLinksUpdateCancel,
      handleLinksUpdateChange,
      handleLinksUpdateConfirm,
      handleCredentialsPopoverToggle,
      handleCredentialsPopoverClose,
      handleCredentialsPopoverFetch,
      handleOpenLoginCredentials,
      handleSupportPopoverToggle,
      handleSupportPopoverClose,
      handleOpenSupportContacts,
      handleBackToList,
      handleGlobalUpdateClick,
      handleGlobalCancel,
      handleGlobalConfirmClick,
      handleFieldUpdateClick,
      handleFieldCancel,
      handleFieldConfirmClick,
      handleDraftChange,
      handleLoginCredentialsPersist,
      handleSupportContactsPersist,
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
