import { useState } from "react";

// Reset shapes kept here so every handler that clears state references a
// single source of truth.
const EMPTY_CONFIRM_MODAL = {
  isOpen: false,
  sectionKey: null, // "bulk" for multi-section saves
  changes: [],
  payload: null,
};

const EMPTY_DISCARD_MODAL = {
  isOpen: false,
  onConfirm: null, // action to run once the user confirms discard
};

const EMPTY_DELETE_MODAL = {
  isOpen: false,
  branchId: null,
  branchName: "",
};

export const useBranches_states = () => {
  // Data
  const [branches, setBranches] = useState([]);

  // View orchestration: "list" | "table" | "map" | "detail"
  const [viewMode, setViewMode] = useState("list");

  // Detail view sub-mode: "read" | "bulkEdit"
  const [detailMode, setDetailMode] = useState("read");
  const [detailSelectedId, setDetailSelectedId] = useState(null);

  // Location section: "list" | "map"
  const [locationViewMode, setLocationViewMode] = useState("list");

  // Right-column collapsibles. { [sectionKey]: boolean } — true means COLLAPSED.
  // Default to fully expanded; bulk-edit mode forces expanded regardless.
  const [collapsedSections, setCollapsedSections] = useState({});

  // Read-mode per-section edit
  const [editingSection, setEditingSection] = useState(null);
  const [sectionDraft, setSectionDraft] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  // Bulk edit (list-item Edit) — multiple drafts at once.
  const [bulkDrafts, setBulkDrafts] = useState({});
  const [bulkFieldErrors, setBulkFieldErrors] = useState({});

  // Add-form (minimal, name-only)
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormName, setAddFormName] = useState("");

  // Modals
  const [confirmModal, setConfirmModal] = useState(EMPTY_CONFIRM_MODAL);
  const [discardModal, setDiscardModal] = useState(EMPTY_DISCARD_MODAL);
  const [deleteModal, setDeleteModal] = useState(EMPTY_DELETE_MODAL);

  // Infra
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  return {
    states: {
      branches,
      viewMode,
      detailMode,
      detailSelectedId,
      locationViewMode,
      collapsedSections,
      editingSection,
      sectionDraft,
      fieldErrors,
      bulkDrafts,
      bulkFieldErrors,
      showAddForm,
      addFormName,
      confirmModal,
      discardModal,
      deleteModal,
      isLoading,
      isSaving,
      error,
    },
    setters: {
      setBranches,
      setViewMode,
      setDetailMode,
      setDetailSelectedId,
      setLocationViewMode,
      setCollapsedSections,
      setEditingSection,
      setSectionDraft,
      setFieldErrors,
      setBulkDrafts,
      setBulkFieldErrors,
      setShowAddForm,
      setAddFormName,
      setConfirmModal,
      setDiscardModal,
      setDeleteModal,
      setIsLoading,
      setIsSaving,
      setError,
    },
    constants: {
      EMPTY_CONFIRM_MODAL,
      EMPTY_DISCARD_MODAL,
      EMPTY_DELETE_MODAL,
    },
  };
};
