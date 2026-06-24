import { useState } from "react";
import {
  DFLT_F_D_INTEGRATION,
  DFLT_F_D_INTEGRATION_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { normalizeIntegrationFiles } from "../../02_cK_setup_hlpr/integrationFiles_hlpr.js";

export const useCK_setup_integrations_states = () => {
  const [integrations, setIntegrations] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("all");
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [integrationFormData, setIntegrationFormData] =
    useState(DFLT_F_D_INTEGRATION);
  const [integrationDraft, setIntegrationDraft] = useState(
    DFLT_F_D_INTEGRATION_FULL,
  );
  const [integrationDraftBaseline, setIntegrationDraftBaseline] =
    useState(null);
  const [integrationFilesDraft, setIntegrationFilesDraft] = useState(
    normalizeIntegrationFiles(),
  );
  const [integrationFilesBaseline, setIntegrationFilesBaseline] =
    useState(null);
  const [detailMode, setDetailMode] = useState("read");
  const [editingField, setEditingField] = useState(null);
  const [confirmUpdateModalOpen, setConfirmUpdateModalOpen] = useState(false);
  const [confirmUpdateMode, setConfirmUpdateMode] = useState("global");
  const [confirmUpdateFieldKeys, setConfirmUpdateFieldKeys] = useState([]);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [integrationToDelete, setIntegrationToDelete] = useState(null);
  const [kamPopoverIntegration, setKamPopoverIntegration] = useState(null);
  const [kamPopoverAnchorEl, setKamPopoverAnchorEl] = useState(null);
  const [credentialsPopoverIntegration, setCredentialsPopoverIntegration] =
    useState(null);
  const [credentialsPopoverAnchorEl, setCredentialsPopoverAnchorEl] =
    useState(null);
  const [supportPopoverIntegration, setSupportPopoverIntegration] =
    useState(null);
  const [supportPopoverAnchorEl, setSupportPopoverAnchorEl] = useState(null);
  const [detailExpandedSections, setDetailExpandedSections] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  return {
    states: {
      activeOperation,
      activeViewingType,
      integrations,
      selectedIntegration,
      integrationFormData,
      integrationDraft,
      integrationDraftBaseline,
      integrationFilesDraft,
      integrationFilesBaseline,
      detailMode,
      editingField,
      confirmUpdateModalOpen,
      confirmUpdateMode,
      confirmUpdateFieldKeys,
      unsavedModalOpen,
      pendingNavigation,
      deleteModalOpen,
      integrationToDelete,
      kamPopoverIntegration,
      kamPopoverAnchorEl,
      credentialsPopoverIntegration,
      credentialsPopoverAnchorEl,
      supportPopoverIntegration,
      supportPopoverAnchorEl,
      detailExpandedSections,
      isSaving,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setIntegrations,
      setSelectedIntegration,
      setIntegrationFormData,
      setIntegrationDraft,
      setIntegrationDraftBaseline,
      setIntegrationFilesDraft,
      setIntegrationFilesBaseline,
      setDetailMode,
      setEditingField,
      setConfirmUpdateModalOpen,
      setConfirmUpdateMode,
      setConfirmUpdateFieldKeys,
      setUnsavedModalOpen,
      setPendingNavigation,
      setDeleteModalOpen,
      setIntegrationToDelete,
      setKamPopoverIntegration,
      setKamPopoverAnchorEl,
      setCredentialsPopoverIntegration,
      setCredentialsPopoverAnchorEl,
      setSupportPopoverIntegration,
      setSupportPopoverAnchorEl,
      setDetailExpandedSections,
      setIsSaving,
    },
    refs: {},
  };
};
