import {
  setByPath,
  hydrateBrandForm,
  pickSectionDraft,
  pickAllSectionsDraft,
  computeSectionDiff,
  EMPTY_BRAND_ADD_FORM,
  getBrandDisplayName,
} from "../02_brands_helpers/_brands_helpers.index.js";
import {
  SECTION_KEYS,
  EDITABLE_SECTIONS,
} from "../05_brands_cnst/_brands_cnst.index.js";
import {
  validateSection,
  validateBulk,
} from "../04_brands_vld/_brands_vld.index.js";

const SECTION_ROUTE_KEYS = new Set([
  SECTION_KEYS.files,
  SECTION_KEYS.website,
  SECTION_KEYS.otherSocials,
  SECTION_KEYS.inventoryIntegrations,
  SECTION_KEYS.salesIntegration,
  SECTION_KEYS.legal,
]);

const clone = (value) => JSON.parse(JSON.stringify(value));

const sectionPayload = (sectionKey, draft) => {
  if (sectionKey === SECTION_KEYS.basic) {
    return {
      name: draft?.name,
      tagline: draft?.tagline,
      isActive: draft?.isActive ?? true,
    };
  }

  return { [sectionKey]: draft };
};

const apiPayloadFromSection = (sectionKey, draft) => {
  if (sectionKey === SECTION_KEYS.basic) {
    return {
      name: draft?.name,
      tagline: draft?.tagline,
      isActive: draft?.isActive ?? true,
    };
  }

  if (sectionKey === SECTION_KEYS.website) {
    return { socials: { website: draft } };
  }

  if (sectionKey === SECTION_KEYS.otherSocials) {
    return { socials: { others: Array.isArray(draft) ? draft : [] } };
  }

  if (sectionKey === SECTION_KEYS.relations) {
    return {
      branches: Array.isArray(draft?.branches) ? draft.branches : [],
      employees: Array.isArray(draft?.employees) ? draft.employees : [],
      equipments: Array.isArray(draft?.equipments) ? draft.equipments : [],
      menu: draft?.menu || null,
      competitors: Array.isArray(draft?.competitors) ? draft.competitors : [],
    };
  }

  return { [sectionKey]: draft };
};

const mergePayload = (target, next) => {
  for (const [key, value] of Object.entries(next ?? {})) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      target[key] = mergePayload({ ...target[key] }, value);
    } else {
      target[key] = value;
    }
  }
  return target;
};

const sectionIsDirty = (original, draft, sectionKey) => {
  if (!draft) return false;
  return computeSectionDiff(original, sectionPayload(sectionKey, draft), sectionKey).length > 0;
};

const bulkIsDirty = (original, bulkDrafts) => {
  for (const sectionKey of Object.keys(bulkDrafts ?? {})) {
    if (sectionIsDirty(original, bulkDrafts[sectionKey], sectionKey)) return true;
  }
  return false;
};

const buildAddPayload = (draft) => {
  const payload = {
    name: {
      value: (draft?.name?.value ?? "").trim(),
      translations: draft?.name?.translations ?? {},
    },
    socials: draft?.socials ?? {},
  };

  if (Array.isArray(draft?.branches) && draft.branches.length > 0) {
    payload.branches = draft.branches;
  }

  return payload;
};

export const useBrands_handlers = ({
  states,
  setters,
  constants,
  apiHelpers,
}) => {
  const {
    brands,
    detailSelectedId,
    detailMode,
    editingSection,
    sectionDraft,
    bulkDrafts,
    addFormDraft,
  } = states;

  const {
    setBrands,
    setBranchesList,
    setEmployeesList,
    setMenusList,
    setViewMode,
    setActiveTooltip,
    setLogoEdit,
    setLogoUrls,
    setDetailMode,
    setDetailSelectedId,
    setCollapsedSections,
    setEditingSection,
    setSectionDraft,
    setFieldErrors,
    setBulkDrafts,
    setBulkFieldErrors,
    setShowAddForm,
    setAddFormName,
    setAddFormDraft,
    setConfirmModal,
    setDiscardModal,
    setDeleteModal,
    setIsLoading,
    setIsSaving,
    setError,
  } = setters;

  const { EMPTY_CONFIRM_MODAL, EMPTY_DISCARD_MODAL, EMPTY_DELETE_MODAL, EMPTY_LOGO_EDIT } =
    constants;
  const {
    Brand_add,
    Brand_getAll,
    Brand_update,
    Brand_delete,
    Brand_putSection,
    Brand_uploadLogo,
    Brand_getLogo,
    Branch_getAll,
    Employee_getAll,
    Menu_getAll,
    Settings_get,
  } = apiHelpers;

  const selectedBrand = () => brands.find((brand) => brand._id === detailSelectedId);

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);

    const [brandsRes, branchesRes, employeesRes, menusRes] = await Promise.all([
      Brand_getAll(),
      Branch_getAll(),
      Employee_getAll(),
      Menu_getAll(),
    ]);

    setIsLoading(false);

    if (brandsRes.success) {
      const loadedBrands = Array.isArray(brandsRes.data) ? brandsRes.data : [];
      setBrands(loadedBrands);
      handleFetchPrimaryLogoUrls(loadedBrands);
    } else {
      setError(brandsRes.message);
    }

    if (branchesRes.success) {
      setBranchesList(Array.isArray(branchesRes.data) ? branchesRes.data : []);
    }
    if (employeesRes.success) {
      setEmployeesList(Array.isArray(employeesRes.data) ? employeesRes.data : []);
    }
    if (menusRes.success) setMenusList(Array.isArray(menusRes.data) ? menusRes.data : []);
  };

  const LOGO_PRIORITY = ["png", "jpg", "svg", "highRes", "ico"];

  const getPrimaryLogoType = (brand) => {
    const logos = brand?.files?.logos;
    if (!logos || Array.isArray(logos)) return null;
    return LOGO_PRIORITY.find((t) => logos[t]) || null;
  };

  const handleFetchPrimaryLogoUrls = async (brandList) => {
    const toFetch = (brandList || []).filter((b) => getPrimaryLogoType(b));
    if (toFetch.length === 0) return;

    const results = await Promise.allSettled(
      toFetch.map((b) => Brand_getLogo(b._id, getPrimaryLogoType(b))),
    );

    const newUrls = {};
    results.forEach((result, i) => {
      const brand = toFetch[i];
      if (result.status === "fulfilled" && result.value?.success && result.value?.data?.readUrl) {
        newUrls[brand._id] = result.value.data.readUrl;
      }
    });
    setLogoUrls((prev) => ({ ...prev, ...newUrls }));
  };

  const guardedNavigate = (doIt) => {
    const original = selectedBrand();
    const readDirty =
      detailMode === "read" &&
      editingSection &&
      sectionIsDirty(original, sectionDraft, editingSection);
    const bulkDirty = detailMode === "bulkEdit" && bulkIsDirty(original, bulkDrafts);

    if (readDirty || bulkDirty) {
      setDiscardModal({ isOpen: true, onConfirm: doIt });
      return;
    }

    doIt();
  };

  const resetDetailDrafts = () => {
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkDrafts({});
    setBulkFieldErrors({});
    setDetailMode("read");
  };

  const openSectionEdit = (id, sectionKey) => {
    const brand = brands.find((item) => item._id === id);
    if (!brand) return;

    setDetailSelectedId(id);
    setEditingSection(sectionKey);
    setSectionDraft(pickSectionDraft(hydrateBrandForm(brand), sectionKey));
    setFieldErrors({});
    setBulkDrafts({});
    setBulkFieldErrors({});
    setDetailMode("read");
    setCollapsedSections((prev) => ({ ...prev, [sectionKey]: false }));
    setViewMode("detail");
  };

  const handleSetViewMode = (mode) => {
    if (mode === "detail") return;
    guardedNavigate(() => {
      resetDetailDrafts();
      setViewMode(mode);
    });
  };

  const handleViewBrand = (id) => {
    setDetailSelectedId(id);
    resetDetailDrafts();
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleEditBrand = (id) => {
    const brand = brands.find((item) => item._id === id);
    if (!brand) return;

    setDetailSelectedId(id);
    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
    setBulkFieldErrors({});
    setBulkDrafts(pickAllSectionsDraft(hydrateBrandForm(brand)));
    setDetailMode("bulkEdit");
    setCollapsedSections({});
    setViewMode("detail");
  };

  const handleBackToList = () => {
    guardedNavigate(() => {
      setViewMode("table");
      setDetailSelectedId(null);
      resetDetailDrafts();
      setError(null);
    });
  };

  const handleAddLogo = (id) => openSectionEdit(id, SECTION_KEYS.files);
  const handleAddFiles = (id) => openSectionEdit(id, SECTION_KEYS.files);

  const handleShowAddForm = () => {
    setAddFormName("");
    setAddFormDraft(clone(EMPTY_BRAND_ADD_FORM));
    setError(null);
    setShowAddForm(true);
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);
    setAddFormName("");
    setAddFormDraft(clone(EMPTY_BRAND_ADD_FORM));
    setError(null);
  };

  const handleAddFormNameChange = (value) => {
    setAddFormName(value);
    setAddFormDraft((prev) => setByPath(prev, "name.value", value));
  };

  const handleAddFormDraftChange = (path, value) => {
    setAddFormDraft((prev) => setByPath(prev, path, value));
  };

  const handleAddFormBranchToggle = (branchId) => {
    setAddFormDraft((prev) => {
      const current = Array.isArray(prev?.branches) ? prev.branches : [];
      return {
        ...prev,
        branches: current.includes(branchId)
          ? current.filter((id) => id !== branchId)
          : [...current, branchId],
      };
    });
  };

  const handleAddFormSubmit = async () => {
    const trimmed = (addFormDraft?.name?.value ?? "").trim();
    if (trimmed.length < 2) {
      setError("Brand name must be at least 2 characters");
      return;
    }

    setIsSaving(true);
    setError(null);
    const { success, message, data } = await Brand_add(buildAddPayload(addFormDraft));
    setIsSaving(false);

    if (success && data) {
      setBrands((prev) => [data, ...prev]);
      setShowAddForm(false);
      setAddFormName("");
      setAddFormDraft(clone(EMPTY_BRAND_ADD_FORM));
      return;
    }

    setError(message);
  };

  const handleSectionEditStart = (sectionKey) => {
    const brand = selectedBrand();
    if (!brand) return;

    setSectionDraft(pickSectionDraft(hydrateBrandForm(brand), sectionKey));
    setEditingSection(sectionKey);
    setFieldErrors({});
    setError(null);
  };

  const handleSectionEditCancel = () => {
    const dirty = sectionIsDirty(selectedBrand(), sectionDraft, editingSection);
    const clear = () => {
      setEditingSection(null);
      setSectionDraft({});
      setFieldErrors({});
      setError(null);
    };

    if (dirty) {
      setDiscardModal({ isOpen: true, onConfirm: clear });
      return;
    }

    clear();
  };

  const handleSectionDraftChange = (path, value) => {
    setSectionDraft((prev) => setByPath(prev, path, value));
  };

  const handleSectionDraftReplace = (value) => setSectionDraft(value);

  const handleBulkDraftChange = (sectionKey, path, value) => {
    setBulkDrafts((prev) => ({
      ...prev,
      [sectionKey]: setByPath(prev?.[sectionKey] ?? {}, path, value),
    }));
  };

  const handleBulkDraftReplace = (sectionKey, value) => {
    setBulkDrafts((prev) => ({ ...prev, [sectionKey]: value }));
  };

  const handleSectionEditSubmit = () => {
    const sectionKey = editingSection;
    const original = selectedBrand();
    if (!sectionKey || !original) return;

    const validation = validateSection(sectionKey, sectionDraft);
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setError("Please fix the highlighted fields");
      return;
    }

    setFieldErrors({});
    const payload = sectionPayload(sectionKey, sectionDraft);
    const changes = computeSectionDiff(original, payload, sectionKey);

    if (changes.length === 0) {
      setEditingSection(null);
      setSectionDraft({});
      return;
    }

    setConfirmModal({ isOpen: true, sectionKey, changes, payload });
  };

  const handleBulkCancel = () => {
    const dirty = bulkIsDirty(selectedBrand(), bulkDrafts);
    const clear = () => {
      setBulkDrafts({});
      setBulkFieldErrors({});
      setDetailMode("read");
      setError(null);
    };

    if (dirty) {
      setDiscardModal({ isOpen: true, onConfirm: clear });
      return;
    }

    clear();
  };

  const handleBulkSubmit = () => {
    const original = selectedBrand();
    if (!original) return;

    const validation = validateBulk(bulkDrafts);
    if (!validation.ok) {
      setBulkFieldErrors(validation.errors);
      setError("Please fix the highlighted fields");
      return;
    }

    setBulkFieldErrors({});
    const payload = {};
    const changes = [];

    for (const sectionKey of EDITABLE_SECTIONS) {
      const draft = bulkDrafts?.[sectionKey];
      if (!draft || !sectionIsDirty(original, draft, sectionKey)) continue;

      mergePayload(payload, apiPayloadFromSection(sectionKey, draft));
      changes.push(
        ...computeSectionDiff(original, sectionPayload(sectionKey, draft), sectionKey),
      );
    }

    if (changes.length === 0) {
      setBulkDrafts({});
      setDetailMode("read");
      return;
    }

    setConfirmModal({ isOpen: true, sectionKey: "bulk", changes, payload });
  };

  const handleConfirmModalCancel = () => setConfirmModal(EMPTY_CONFIRM_MODAL);

  const handleConfirmModalConfirm = async () => {
    const { payload, sectionKey } = states.confirmModal;
    if (!payload || !detailSelectedId) return;

    setIsSaving(true);
    setError(null);

    let result;
    if (sectionKey === "bulk") {
      result = await Brand_update(detailSelectedId, payload);
    } else if (SECTION_ROUTE_KEYS.has(sectionKey)) {
      result = await Brand_putSection(detailSelectedId, sectionKey, payload?.[sectionKey]);
    } else if (sectionKey === SECTION_KEYS.basic) {
      result = await Brand_update(detailSelectedId, payload);
    } else {
      result = await Brand_update(
        detailSelectedId,
        apiPayloadFromSection(sectionKey, payload?.[sectionKey]),
      );
    }

    setIsSaving(false);

    if (!result.success || !result.data) {
      setError(result.message || "Update failed");
      return;
    }

    setBrands((prev) =>
      prev.map((brand) => (brand._id === detailSelectedId ? result.data : brand)),
    );
    setConfirmModal(EMPTY_CONFIRM_MODAL);

    if (sectionKey === "bulk") {
      setBulkDrafts({});
      setBulkFieldErrors({});
      setDetailMode("read");
      return;
    }

    setEditingSection(null);
    setSectionDraft({});
    setFieldErrors({});
  };

  const handleDeleteRequest = (id) => {
    const brand = brands.find((item) => item._id === id);
    setDeleteModal({
      isOpen: true,
      brandId: id,
      brandName: getBrandDisplayName(brand),
    });
  };

  const handleDeleteConfirm = async () => {
    const id = states.deleteModal.brandId;
    if (!id) return;

    setIsSaving(true);
    setError(null);
    const { success, message } = await Brand_delete(id);
    setIsSaving(false);

    if (success) {
      setBrands((prev) => prev.filter((brand) => brand._id !== id));
      setDeleteModal(EMPTY_DELETE_MODAL);
      setViewMode("table");
      setDetailSelectedId(null);
      resetDetailDrafts();
      return;
    }

    setError(message);
  };

  const handleDeleteCancel = () => setDeleteModal(EMPTY_DELETE_MODAL);

  const handleDiscardConfirm = () => {
    const fn = states.discardModal.onConfirm;
    setDiscardModal(EMPTY_DISCARD_MODAL);
    if (typeof fn === "function") fn();
  };

  const handleDiscardCancel = () => setDiscardModal(EMPTY_DISCARD_MODAL);

  const handleToggleSectionCollapse = (sectionKey) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey],
    }));
  };

  const EXPECTED_MIME = {
    highRes: ["image/jpeg", "image/png", "image/webp"],
    svg: ["image/svg+xml"],
    png: ["image/png"],
    jpg: ["image/jpeg"],
    pdf: ["application/pdf"],
    ico: ["image/x-icon", "image/vnd.microsoft.icon", "image/ico"],
  };

  const checkLogoMimeWarning = (logoType, file) => {
    if (!file) return null;
    const allowed = EXPECTED_MIME[logoType] || [];
    if (!allowed.includes(file.type)) {
      return `Expected ${logoType.toUpperCase()} but got "${file.type}"`;
    }
    return null;
  };

  // ─── Shared logo-session initialiser ──────────────────────────────────────
  const initLogoSession = async (brandId, view) => {
    setDetailSelectedId(brandId);
    setViewMode(view);
    setLogoEdit({ ...EMPTY_LOGO_EDIT, isLoadingProviders: true, isLoadingCurrentUrls: true });

    const brand = brands.find((b) => b._id === brandId);
    const logoTypes =
      brand?.files?.logos && !Array.isArray(brand.files.logos)
        ? Object.entries(brand.files.logos)
            .filter(([, v]) => !!v)
            .map(([k]) => k)
        : [];

    const [settingsRes, ...logoResults] = await Promise.all([
      Settings_get(),
      ...logoTypes.map((lt) => Brand_getLogo(brandId, lt)),
    ]);

    const currentUrls = {};
    logoTypes.forEach((lt, i) => {
      const r = logoResults[i];
      if (r?.success && r?.data?.readUrl) currentUrls[lt] = r.data.readUrl;
    });

    const storage = settingsRes.success ? settingsRes.data?.storage || {} : {};
    const providers = ["gcs", "s3", "r2", "blob"].map((id) => ({
      id,
      isEnabled: storage[id]?.isEnabled ?? false,
      isDefault: storage[id]?.isDefault ?? false,
    }));
    const defaultProvider = providers.find((p) => p.isDefault && p.isEnabled);
    const firstEnabled = providers.find((p) => p.isEnabled);

    setLogoEdit((prev) => ({
      ...prev,
      isLoadingProviders: false,
      isLoadingCurrentUrls: false,
      providers,
      provider: (defaultProvider || firstEnabled)?.id || null,
      currentUrls,
    }));
  };

  // ─── Logo session navigation ───────────────────────────────────────────────
  const handleGoToLogoView = (brandId) => initLogoSession(brandId, "logo_view");
  const handleGoToLogoEdit = (brandId) => initLogoSession(brandId, "logo_edit");

  const handleSwitchToLogoEdit = () => setViewMode("logo_edit");
  const handleSwitchToLogoView = () => setViewMode("logo_view");

  const handleGoToTable = () => {
    setViewMode("table");
    setDetailSelectedId(null);
    setLogoEdit(EMPTY_LOGO_EDIT);
    resetDetailDrafts();
    setError(null);
  };

  // ─── Logo edit actions ─────────────────────────────────────────────────────
  const handleLogoAddType = (logoType) => {
    setLogoEdit((prev) => ({
      ...prev,
      activeTypes: prev.activeTypes.includes(logoType)
        ? prev.activeTypes
        : [...prev.activeTypes, logoType],
    }));
  };

  const handleLogoRemoveType = (logoType) => {
    setLogoEdit((prev) => {
      const uploads = { ...prev.uploads };
      if (uploads[logoType]?.previewUrl) URL.revokeObjectURL(uploads[logoType].previewUrl);
      delete uploads[logoType];
      return { ...prev, activeTypes: prev.activeTypes.filter((t) => t !== logoType), uploads };
    });
  };

  const handleLogoFileSelect = (logoType, file) => {
    setLogoEdit((prev) => {
      const old = prev.uploads[logoType];
      if (old?.previewUrl) URL.revokeObjectURL(old.previewUrl);
      const previewUrl = file ? URL.createObjectURL(file) : null;
      const warning = checkLogoMimeWarning(logoType, file);
      return {
        ...prev,
        uploads: { ...prev.uploads, [logoType]: { file, previewUrl, warning } },
        error: null,
      };
    });
  };

  const handleLogoClearFile = (logoType) => {
    setLogoEdit((prev) => {
      const old = prev.uploads[logoType];
      if (old?.previewUrl) URL.revokeObjectURL(old.previewUrl);
      const uploads = { ...prev.uploads };
      delete uploads[logoType];
      return { ...prev, uploads };
    });
  };

  const handleLogoProviderSelect = (providerId) => {
    setLogoEdit((prev) => ({ ...prev, provider: providerId }));
  };

  const handleLogoConfirmOpen = () => {
    setLogoEdit((prev) => ({ ...prev, confirmOpen: true, error: null }));
  };

  const handleLogoConfirmClose = () => {
    setLogoEdit((prev) => ({ ...prev, confirmOpen: false }));
  };

  const uploadOneLogoXHR = (brandId, logoType, provider, file, onProgress) =>
    new Promise((resolve) => {
      const formData = new FormData();
      formData.append("file", file);
      const url = `/api/brands/${brandId}/files/logos/${logoType}?provider=${provider}`;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.withCredentials = true;

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      };

      xhr.onload = () => {
        onProgress(100);
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve({ success: resp.success || false, message: resp.message || "", data: resp.payload || null });
        } catch {
          resolve({ success: false, message: "Failed to parse response", data: null });
        }
      };
      xhr.onerror = () => resolve({ success: false, message: "Network error", data: null });
      xhr.send(formData);
    });

  const handleLogoUploadSubmit = async () => {
    const { uploads, provider, activeTypes } = states.logoEdit;
    const brandId = detailSelectedId;

    if (!provider) {
      setLogoEdit((prev) => ({ ...prev, error: "Please select a storage provider", confirmOpen: false }));
      return;
    }
    const typesToUpload = activeTypes.filter((t) => uploads[t]?.file);
    if (typesToUpload.length === 0) {
      setLogoEdit((prev) => ({ ...prev, error: "Please select at least one file", confirmOpen: false }));
      return;
    }

    const initProgress = {};
    typesToUpload.forEach((t) => { initProgress[t] = 0; });
    setLogoEdit((prev) => ({ ...prev, isSaving: true, error: null, confirmOpen: false, uploadProgress: initProgress }));

    let lastUpdatedBrand = null;
    const errors = [];

    for (const logoType of typesToUpload) {
      const file = uploads[logoType].file;
      const res = await uploadOneLogoXHR(brandId, logoType, provider, file, (pct) => {
        setLogoEdit((prev) => ({
          ...prev,
          uploadProgress: { ...prev.uploadProgress, [logoType]: pct },
        }));
      });

      if (res.success && res.data) {
        lastUpdatedBrand = res.data;
      } else {
        errors.push(`${logoType}: ${res.message}`);
      }
    }

    if (lastUpdatedBrand) {
      setBrands((prev) => prev.map((b) => (b._id === brandId ? lastUpdatedBrand : b)));
      handleFetchPrimaryLogoUrls([lastUpdatedBrand]);
    }

    if (errors.length > 0) {
      setLogoEdit((prev) => ({ ...prev, isSaving: false, error: errors.join(" | "), uploadProgress: {} }));
      return;
    }

    await initLogoSession(brandId, "logo_view");
  };

  const handleTooltipToggle = (brandId, type) => {
    setActiveTooltip((prev) =>
      prev?.brandId === brandId && prev?.type === type ? null : { brandId, type },
    );
  };

  const handleTooltipClose = () => setActiveTooltip(null);

  const handleUpdateAll = (id) => {
    setActiveTooltip(null);
    handleEditBrand(id);
  };

  const handleUpdateSection = (id, sectionKey) => {
    setActiveTooltip(null);
    openSectionEdit(id, sectionKey);
  };

  const handleViewAll = (id) => {
    setActiveTooltip(null);
    handleViewBrand(id);
  };

  return {
    handlers: {
      handleFetchAll,
      handleSetViewMode,
      handleViewBrand,
      handleEditBrand,
      handleBackToList,
      handleAddLogo,
      handleAddFiles,
      handleShowAddForm,
      handleCancelAddForm,
      handleAddFormNameChange,
      handleAddFormDraftChange,
      handleAddFormBranchToggle,
      handleAddFormSubmit,
      handleSectionEditStart,
      handleSectionEditCancel,
      handleSectionDraftChange,
      handleSectionDraftReplace,
      handleSectionEditSubmit,
      handleBulkDraftChange,
      handleBulkDraftReplace,
      handleBulkCancel,
      handleBulkSubmit,
      handleConfirmModalCancel,
      handleConfirmModalConfirm,
      handleDeleteRequest,
      handleDeleteConfirm,
      handleDeleteCancel,
      handleDiscardConfirm,
      handleDiscardCancel,
      handleToggleSectionCollapse,
      handleTooltipToggle,
      handleTooltipClose,
      handleUpdateAll,
      handleUpdateSection,
      handleViewAll,
      handleGoToLogoView,
      handleGoToLogoEdit,
      handleSwitchToLogoEdit,
      handleSwitchToLogoView,
      handleGoToTable,
      handleLogoAddType,
      handleLogoRemoveType,
      handleLogoFileSelect,
      handleLogoClearFile,
      handleLogoProviderSelect,
      handleLogoConfirmOpen,
      handleLogoConfirmClose,
      handleLogoUploadSubmit,
    },
  };
};
