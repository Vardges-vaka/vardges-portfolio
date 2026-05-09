import { useState } from "react";
import { EMPTY_BRAND_ADD_FORM } from "../02_brands_helpers/_brands_helpers.index.js";

const EMPTY_CONFIRM_MODAL = {
  isOpen: false,
  sectionKey: null,
  changes: [],
  payload: null,
};

const EMPTY_DISCARD_MODAL = {
  isOpen: false,
  onConfirm: null,
};

const EMPTY_DELETE_MODAL = {
  isOpen: false,
  brandId: null,
  brandName: "",
};

// Shared by logo_view and logo_edit sessions. brandId comes from detailSelectedId.
const EMPTY_LOGO_EDIT = {
  uploads: {},          // { [logoType]: { file, previewUrl, warning } }
  activeTypes: ["png"],
  provider: null,
  providers: [],
  currentUrls: {},      // { [logoType]: signedUrl }
  uploadProgress: {},   // { [logoType]: 0-100 }
  isLoadingProviders: false,
  isLoadingCurrentUrls: false,
  isSaving: false,
  error: null,
  confirmOpen: false,
};

export const useBrands_states = () => {
  const [brands, setBrands] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [menusList, setMenusList] = useState([]);
  // viewMode: 'table' | 'logo_view' | 'logo_edit' | 'detail'
  const [viewMode, setViewMode] = useState("table");
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [detailMode, setDetailMode] = useState("read");
  const [detailSelectedId, setDetailSelectedId] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [editingSection, setEditingSection] = useState(null);
  const [sectionDraft, setSectionDraft] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [bulkDrafts, setBulkDrafts] = useState({});
  const [bulkFieldErrors, setBulkFieldErrors] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormName, setAddFormName] = useState("");
  const [addFormDraft, setAddFormDraft] = useState(EMPTY_BRAND_ADD_FORM);
  const [confirmModal, setConfirmModal] = useState(EMPTY_CONFIRM_MODAL);
  const [discardModal, setDiscardModal] = useState(EMPTY_DISCARD_MODAL);
  const [deleteModal, setDeleteModal] = useState(EMPTY_DELETE_MODAL);
  const [logoEdit, setLogoEdit] = useState(EMPTY_LOGO_EDIT);
  const [logoUrls, setLogoUrls] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  return {
    states: {
      brands,
      branchesList,
      employeesList,
      menusList,
      viewMode,
      activeTooltip,
      detailMode,
      detailSelectedId,
      collapsedSections,
      editingSection,
      sectionDraft,
      fieldErrors,
      bulkDrafts,
      bulkFieldErrors,
      showAddForm,
      addFormName,
      addFormDraft,
      confirmModal,
      discardModal,
      deleteModal,
      logoEdit,
      logoUrls,
      isLoading,
      isSaving,
      error,
    },
    setters: {
      setBrands,
      setBranchesList,
      setEmployeesList,
      setMenusList,
      setViewMode,
      setActiveTooltip,
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
      setLogoEdit,
      setLogoUrls,
      setIsLoading,
      setIsSaving,
      setError,
    },
    constants: {
      EMPTY_CONFIRM_MODAL,
      EMPTY_DISCARD_MODAL,
      EMPTY_DELETE_MODAL,
      EMPTY_LOGO_EDIT,
    },
  };
};
