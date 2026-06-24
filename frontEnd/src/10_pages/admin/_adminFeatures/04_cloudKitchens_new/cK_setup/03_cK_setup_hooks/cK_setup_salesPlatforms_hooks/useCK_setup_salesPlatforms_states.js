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
  const [logoUploadModalOpen, setLogoUploadModalOpen] = useState(false);
  const [logoUploadPlatform, setLogoUploadPlatform] = useState(null);
  const [logoUploadPendingFile, setLogoUploadPendingFile] = useState(null);
  const [logoUploadPreviewUrl, setLogoUploadPreviewUrl] = useState("");
  const [kamPopoverPlatform, setKamPopoverPlatform] = useState(null);
  const [kamPopoverAnchorEl, setKamPopoverAnchorEl] = useState(null);
  const [kamUpdateModalOpen, setKamUpdateModalOpen] = useState(false);
  const [kamUpdatePlatform, setKamUpdatePlatform] = useState(null);
  const [kamUpdateDraft, setKamUpdateDraft] = useState(null);
  const [linksPopoverPlatform, setLinksPopoverPlatform] = useState(null);
  const [linksPopoverAnchorEl, setLinksPopoverAnchorEl] = useState(null);
  const [linksUpdateModalOpen, setLinksUpdateModalOpen] = useState(false);
  const [linksUpdatePlatform, setLinksUpdatePlatform] = useState(null);
  const [linksUpdateDraft, setLinksUpdateDraft] = useState(null);
  const [credentialsPopoverPlatform, setCredentialsPopoverPlatform] = useState(null);
  const [credentialsPopoverAnchorEl, setCredentialsPopoverAnchorEl] = useState(null);
  const [supportPopoverPlatform, setSupportPopoverPlatform] = useState(null);
  const [supportPopoverAnchorEl, setSupportPopoverAnchorEl] = useState(null);
  const [detailExpandedSections, setDetailExpandedSections] = useState([]);
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
      logoUploadModalOpen,
      logoUploadPlatform,
      logoUploadPendingFile,
      logoUploadPreviewUrl,
      kamPopoverPlatform,
      kamPopoverAnchorEl,
      kamUpdateModalOpen,
      kamUpdatePlatform,
      kamUpdateDraft,
      linksPopoverPlatform,
      linksPopoverAnchorEl,
      linksUpdateModalOpen,
      linksUpdatePlatform,
      linksUpdateDraft,
      credentialsPopoverPlatform,
      credentialsPopoverAnchorEl,
      supportPopoverPlatform,
      supportPopoverAnchorEl,
      detailExpandedSections,
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
      setLogoUploadModalOpen,
      setLogoUploadPlatform,
      setLogoUploadPendingFile,
      setLogoUploadPreviewUrl,
      setKamPopoverPlatform,
      setKamPopoverAnchorEl,
      setKamUpdateModalOpen,
      setKamUpdatePlatform,
      setKamUpdateDraft,
      setLinksPopoverPlatform,
      setLinksPopoverAnchorEl,
      setLinksUpdateModalOpen,
      setLinksUpdatePlatform,
      setLinksUpdateDraft,
      setCredentialsPopoverPlatform,
      setCredentialsPopoverAnchorEl,
      setSupportPopoverPlatform,
      setSupportPopoverAnchorEl,
      setDetailExpandedSections,
      setIsSaving,
    },
    refs: {},
  };
};
