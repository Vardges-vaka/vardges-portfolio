import { useState } from "react";
import {
  DFLT_F_D_BRAND_INITIAL,
  DFLT_F_D_BRAND_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { normalizeBrandFiles } from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";

export const useCK_setup_brands_states = () => {
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("all");
  const [addingStep, setAddingStep] = useState("step1");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandFormData, setBrandFormData] = useState(DFLT_F_D_BRAND_INITIAL);
  const [brandDraft, setBrandDraft] = useState(DFLT_F_D_BRAND_FULL);
  const [brandDraftBaseline, setBrandDraftBaseline] = useState(null);
  const [brandFilesDraft, setBrandFilesDraft] = useState(normalizeBrandFiles());
  const [brandFilesBaseline, setBrandFilesBaseline] = useState(null);
  const [detailMode, setDetailMode] = useState("read");
  const [editingField, setEditingField] = useState(null);
  const [confirmUpdateModalOpen, setConfirmUpdateModalOpen] = useState(false);
  const [confirmUpdateMode, setConfirmUpdateMode] = useState("global");
  const [confirmUpdateFieldKeys, setConfirmUpdateFieldKeys] = useState([]);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  return {
    states: {
      activeOperation,
      activeViewingType,
      brands,
      selectedBrand,
      brandFormData,
      brandDraft,
      brandDraftBaseline,
      brandFilesDraft,
      brandFilesBaseline,
      detailMode,
      editingField,
      confirmUpdateModalOpen,
      confirmUpdateMode,
      confirmUpdateFieldKeys,
      unsavedModalOpen,
      pendingNavigation,
      deleteModalOpen,
      brandToDelete,
      isSaving,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setBrands,
      setSelectedBrand,
      setBrandFormData,
      setBrandDraft,
      setBrandDraftBaseline,
      setBrandFilesDraft,
      setBrandFilesBaseline,
      setDetailMode,
      setEditingField,
      setConfirmUpdateModalOpen,
      setConfirmUpdateMode,
      setConfirmUpdateFieldKeys,
      setUnsavedModalOpen,
      setPendingNavigation,
      setDeleteModalOpen,
      setBrandToDelete,
      setIsSaving,
    },
    refs: {},
  };
};
