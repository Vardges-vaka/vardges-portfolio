import { useCallback, useMemo } from "react";

/* ============================================================================
   useMenu_handlers — encapsulates the per-action callbacks for a single
   Menu. Reads from states/setters from useMenu_states and dispatches
   to useMenu_apiHelpers, popping the confirm modal where required.

   Mirrors useMenus_handlers.js conventions.
============================================================================ */

const useMenu_handlers = ({ states, setters, apiHelpers, isDebug }) => {
  const log = (...a) => isDebug && console.log("[useMenu_handlers]", ...a);

  // -------- Creation wizard --------
  const openCreate = useCallback(() => {
    setters.setCreating(true);
    setters.setCreationStep(0);
    setters.setDraftOwnerType("brand");
    setters.setDraftLabel("");
  }, [setters]);

  const closeCreate = useCallback(() => {
    setters.setCreating(false);
  }, [setters]);

  const nextCreateStep = useCallback(() => {
    setters.setCreationStep((s) => Math.min(s + 1, 2));
  }, [setters]);

  const prevCreateStep = useCallback(() => {
    setters.setCreationStep((s) => Math.max(s - 1, 0));
  }, [setters]);

  const submitCreate = useCallback(async () => {
    const { draftOwnerType, draftLabel } = states;
    log("submitCreate", { draftOwnerType, draftLabel });
    setters.setIsLoading(true);
    setters.setError(null);
    const res = await apiHelpers.createDoc({
      ownerType: draftOwnerType,
      label: draftLabel.trim(),
    });
    setters.setIsLoading(false);
    if (!res.ok) {
      setters.setError(res.error);
      return res;
    }
    setters.setCreating(false);
    return res;
  }, [states, setters, apiHelpers, log]);

  // -------- Field update (per-field) --------
  const startFieldUpdate = useCallback((fieldPath, currentValue) => {
    if (states.isUpdatingAll) return;
    setters.setEditingField(fieldPath);
    setters.setEditingDraft(currentValue);
  }, [states.isUpdatingAll, setters]);

  const cancelFieldUpdate = useCallback(() => {
    setters.setEditingField(null);
    setters.setEditingDraft(null);
  }, [setters]);

  const draftFieldValue = useCallback((nextValue) => {
    setters.setEditingDraft(nextValue);
  }, [setters]);

  // Always pops the modal first; only commit after onConfirm.
  const requestConfirmFieldUpdate = useCallback(({ fieldLabel, prev, next, onCommit }) => {
    setters.setConfirm({
      subtitle: "Field update",
      title: `Save change to ${fieldLabel}?`,
      fieldLabel, prev, next,
      onConfirm: async () => {
        const res = await apiHelpers.updateField({
          id: states.menu?._id,
          fieldPath: states.editingField,
          value: next,
        });
        if (res.ok) {
          setters.setConfirm(null);
          setters.setEditingField(null);
          setters.setEditingDraft(null);
          onCommit?.(res.data);
        } else {
          setters.setError(res.error);
        }
      },
      onCancel: () => setters.setConfirm(null),
    });
  }, [states.menu, states.editingField, setters, apiHelpers]);

  // -------- Update all (top-level) --------
  const startUpdateAll = useCallback(() => {
    setters.setEditingField(null);
    setters.setIsUpdatingAll(true);
  }, [setters]);

  const cancelUpdateAll = useCallback(() => {
    setters.setIsUpdatingAll(false);
  }, [setters]);

  const requestConfirmUpdateAll = useCallback((patch) => {
    setters.setConfirm({
      subtitle: "Save all changes",
      title: `Apply all changes to menu?`,
      onConfirm: async () => {
        const res = await apiHelpers.updateDoc({
          id: states.menu?._id,
          patch,
        });
        if (res.ok) {
          setters.setConfirm(null);
          setters.setIsUpdatingAll(false);
        } else {
          setters.setError(res.error);
        }
      },
      onCancel: () => setters.setConfirm(null),
    });
  }, [states.menu, setters, apiHelpers]);

  // -------- Delete --------
  const requestConfirmDelete = useCallback(() => {
    setters.setConfirm({
      subtitle: "Delete menu",
      title: `Permanently delete this menu?`,
      danger: true,
      onConfirm: async () => {
        const res = await apiHelpers.deleteDoc(states.menu?._id);
        if (res.ok) {
          setters.setConfirm(null);
          setters.setMenu(null);
        } else {
          setters.setError(res.error);
        }
      },
      onCancel: () => setters.setConfirm(null),
    });
  }, [states.menu, setters, apiHelpers]);

  const handlers = useMemo(() => ({
    openCreate, closeCreate, nextCreateStep, prevCreateStep, submitCreate,
    startFieldUpdate, cancelFieldUpdate, draftFieldValue, requestConfirmFieldUpdate,
    startUpdateAll, cancelUpdateAll, requestConfirmUpdateAll,
    requestConfirmDelete,
  }), [
    openCreate, closeCreate, nextCreateStep, prevCreateStep, submitCreate,
    startFieldUpdate, cancelFieldUpdate, draftFieldValue, requestConfirmFieldUpdate,
    startUpdateAll, cancelUpdateAll, requestConfirmUpdateAll,
    requestConfirmDelete,
  ]);

  return { handlers };
};

export default useMenu_handlers;
