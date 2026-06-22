import { useState } from "react";
import {
  DFLT_F_D_SALES_PLATFORM,
  DFLT_F_D_SALES_PLATFORM_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

export const useCK_setup_salesPlatforms_states = () => {
  const [salesPlatforms, setSalesPlatforms] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("all");
  const [selectedSalesPlatform, setSelectedSalesPlatform] = useState(null);
  const [salesPlatformFormData, setSalesPlatformFormData] = useState(
    DFLT_F_D_SALES_PLATFORM,
  );
  const [salesPlatformDraft, setSalesPlatformDraft] = useState(
    DFLT_F_D_SALES_PLATFORM_FULL,
  );
  const [salesPlatformDraftBaseline, setSalesPlatformDraftBaseline] =
    useState(null);
  const [detailMode, setDetailMode] = useState("read");
  const [editingField, setEditingField] = useState(null);
  const [confirmUpdateModalOpen, setConfirmUpdateModalOpen] = useState(false);
  const [confirmUpdateMode, setConfirmUpdateMode] = useState("global");
  const [confirmUpdateFieldKeys, setConfirmUpdateFieldKeys] = useState([]);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [salesPlatformToDelete, setSalesPlatformToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  return {
    states: {
      activeOperation,
      activeViewingType,
      salesPlatforms,
      selectedSalesPlatform,
      salesPlatformFormData,
      salesPlatformDraft,
      salesPlatformDraftBaseline,
      detailMode,
      editingField,
      confirmUpdateModalOpen,
      confirmUpdateMode,
      confirmUpdateFieldKeys,
      unsavedModalOpen,
      pendingNavigation,
      deleteModalOpen,
      salesPlatformToDelete,
      isSaving,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setSalesPlatforms,
      setSelectedSalesPlatform,
      setSalesPlatformFormData,
      setSalesPlatformDraft,
      setSalesPlatformDraftBaseline,
      setDetailMode,
      setEditingField,
      setConfirmUpdateModalOpen,
      setConfirmUpdateMode,
      setConfirmUpdateFieldKeys,
      setUnsavedModalOpen,
      setPendingNavigation,
      setDeleteModalOpen,
      setSalesPlatformToDelete,
      setIsSaving,
    },
    refs: {},
  };
};
