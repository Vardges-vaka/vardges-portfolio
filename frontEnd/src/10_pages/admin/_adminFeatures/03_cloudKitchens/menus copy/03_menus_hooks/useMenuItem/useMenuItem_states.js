import { useState, useCallback } from "react";

/* ============================================================================
   useMenuItem_states — owns local state for a single Menu Item document plus
   its creation form, view-mode flags, and update-mode flags.

   Mirrors the convention in 03_menus_hooks/useMenus_states.js.
============================================================================ */

const useMenuItem_states = () => {
  // ---- The active document being viewed / updated.
  const [menuItem, setMenuItem] = useState(null);

  // ---- Multi-step creation form state.
  const [creating, setCreating] = useState(false);          // wizard open?
  const [creationStep, setCreationStep] = useState(0);      // 0=owner, 1=name, 2=confirm
  const [draftOwnerType, setDraftOwnerType] = useState("brand");
  const [draftLabel, setDraftLabel] = useState("");

  // ---- Per-field edit state (only one field at a time).
  const [editingField, setEditingField] = useState(null);   // path string e.g. "name.label"
  const [editingDraft, setEditingDraft] = useState(null);   // pending value

  // ---- Top-level "update all" mode (disables per-field btns when on).
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);

  // ---- Confirm modal payload (set by handlers; cleared on cancel/confirm).
  const [confirm, setConfirm] = useState(null);

  // ---- Loading + error envelopes used by api helpers.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---- Stable reset for a clean slate (used after a successful action).
  const resetEditState = useCallback(() => {
    setEditingField(null);
    setEditingDraft(null);
    setIsUpdatingAll(false);
    setConfirm(null);
  }, []);

  return {
    states: {
      menuItem,
      creating, creationStep, draftOwnerType, draftLabel,
      editingField, editingDraft, isUpdatingAll, confirm,
      isLoading, error,
    },
    setters: {
      setMenuItem,
      setCreating, setCreationStep, setDraftOwnerType, setDraftLabel,
      setEditingField, setEditingDraft, setIsUpdatingAll, setConfirm,
      setIsLoading, setError,
      resetEditState,
    },
  };
};

export default useMenuItem_states;
