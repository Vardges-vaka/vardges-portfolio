import { useState } from "react";

const EMPTY_CONFIRM_MODAL = { isOpen: false, sectionKey: null, changes: [], payload: null };
const EMPTY_DISCARD_MODAL = { isOpen: false, onConfirm: null };
const EMPTY_DELETE_MODAL = { isOpen: false, employeeId: null, employeeName: "" };

export const useEmployees_states = () => {
  const [employees, setEmployees] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [detailMode, setDetailMode] = useState("read");
  const [detailSelectedId, setDetailSelectedId] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [editingSection, setEditingSection] = useState(null);
  const [sectionDraft, setSectionDraft] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [bulkDrafts, setBulkDrafts] = useState({});
  const [bulkFieldErrors, setBulkFieldErrors] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormFirstName, setAddFormFirstName] = useState("");
  const [addFormLastName, setAddFormLastName] = useState("");
  const [confirmModal, setConfirmModal] = useState(EMPTY_CONFIRM_MODAL);
  const [discardModal, setDiscardModal] = useState(EMPTY_DISCARD_MODAL);
  const [deleteModal, setDeleteModal] = useState(EMPTY_DELETE_MODAL);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  return {
    states: {
      employees, branchesList, brandsList, viewMode, detailMode, detailSelectedId,
      collapsedSections, editingSection, sectionDraft, fieldErrors, bulkDrafts,
      bulkFieldErrors, showAddForm, addFormFirstName, addFormLastName,
      confirmModal, discardModal, deleteModal, isLoading, isSaving, error,
    },
    setters: {
      setEmployees, setBranchesList, setBrandsList, setViewMode, setDetailMode,
      setDetailSelectedId, setCollapsedSections, setEditingSection, setSectionDraft,
      setFieldErrors, setBulkDrafts, setBulkFieldErrors, setShowAddForm,
      setAddFormFirstName, setAddFormLastName, setConfirmModal, setDiscardModal,
      setDeleteModal, setIsLoading, setIsSaving, setError,
    },
    constants: { EMPTY_CONFIRM_MODAL, EMPTY_DISCARD_MODAL, EMPTY_DELETE_MODAL },
  };
};
