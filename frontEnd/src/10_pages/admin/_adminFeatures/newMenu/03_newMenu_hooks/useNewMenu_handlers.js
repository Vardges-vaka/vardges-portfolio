import { useCallback } from "react";
import {
  SESSIONS,
  SESSION_FORM_KIND,
} from "../05_newMenu_cnst/_newMenu_cnst.index.js";
import { findItemInMenu, findModifierInItem, findOptionInModifier } from "../02_newMenu_helpers/_newMenu_helpers.index.js";

/* ============================================================================
   useNewMenu_handlers — every event handler the NewMenu feature needs.

   Sections:
     1. Bootstrap fetches
     2. Navigation
     3. Per-entity view/update
     4. Top-level update lifecycle (per-field confirm modal)
     5. Owner filter
     6. Create wizard
     7. Toast

   All handlers are memoised with precise deps so memo'd children don't
   re-render on unrelated state changes.
============================================================================ */
export const useNewMenu_handlers = ({ states, setters, apiHelpers }) => {
  /* ---------------------------------------------------------------- */
  /* 1 — Bootstrap fetches                                              */
  /* ---------------------------------------------------------------- */
  const fetchMenusIfNeeded = useCallback(async () => {
    if (states.menus.length) return;
    const r = await apiHelpers.fetchMenus();
    if (r.success) setters.setMenus(r.data);
  }, [states.menus.length, apiHelpers, setters.setMenus]);

  const fetchItemsIfNeeded = useCallback(async () => {
    if (states.items.length) return;
    const r = await apiHelpers.fetchItems();
    if (r.success) setters.setItems(r.data);
  }, [states.items.length, apiHelpers, setters.setItems]);

  const fetchModifiersIfNeeded = useCallback(async () => {
    if (states.modifiers.length) return;
    const r = await apiHelpers.fetchModifiers();
    if (r.success) setters.setModifiers(r.data);
  }, [states.modifiers.length, apiHelpers, setters.setModifiers]);

  const fetchOptionsIfNeeded = useCallback(async () => {
    if (states.options.length) return;
    const r = await apiHelpers.fetchOptions();
    if (r.success) setters.setOptions(r.data);
  }, [states.options.length, apiHelpers, setters.setOptions]);

  // Routed by the active session — the page only fetches what it needs.
  const fetchForSession = useCallback(() => {
    switch (states.session) {
      case "menus": return fetchMenusIfNeeded();
      case "items": return fetchItemsIfNeeded();
      case "modifiers": return fetchModifiersIfNeeded();
      case "options": return fetchOptionsIfNeeded();
      default: return undefined;
    }
  }, [
    states.session,
    fetchMenusIfNeeded,
    fetchItemsIfNeeded,
    fetchModifiersIfNeeded,
    fetchOptionsIfNeeded,
  ]);

  /* ---------------------------------------------------------------- */
  /* 2 — Navigation                                                     */
  /* ---------------------------------------------------------------- */
  // Canonical navigator. Resets every "transient" state (edits, confirms,
  // open quick rows) on every navigation so users never carry stale UI.
  const goto = useCallback(
    (nextSession, nextViewingType = "all", id = null) => {
      setters.setConfirm(null);
      setters.setEditingField(null);
      setters.setUpdatingField(null);
      setters.setIsUpdating(false);

      setters.setSession(nextSession);
      setters.setViewingType(nextViewingType);

      if (nextViewingType !== "single") {
        setters.setSelectedMenu(null); setters.setSelectedMenuId(null);
        setters.setSelectedItem(null); setters.setSelectedItemId(null);
        setters.setSelectedModifier(null); setters.setSelectedModifierId(null);
        setters.setSelectedOption(null); setters.setSelectedOptionId(null);
        return;
      }

      // Single-entity view — resolve the selection from caches.
      if (nextSession === "menus") {
        const menu = states.menus.find((m) => m._id === id) || null;
        setters.setSelectedMenuId(id);
        setters.setSelectedMenu(menu);
        return;
      }
      if (nextSession === "items") {
        const inCache = states.items.find((x) => x._id === id);
        const inMenu = inCache ? null : findItemInMenu(states.selectedMenu, id);
        setters.setSelectedItemId(id);
        setters.setSelectedItem(inCache || inMenu || null);
        return;
      }
      if (nextSession === "modifiers") {
        const inCache = states.modifiers.find((x) => x._id === id);
        const inItem = inCache ? null : findModifierInItem(states.selectedItem, id);
        setters.setSelectedModifierId(id);
        setters.setSelectedModifier(inCache || inItem || null);
        return;
      }
      if (nextSession === "options") {
        const inCache = states.options.find((x) => x._id === id);
        const inMod = inCache ? null : findOptionInModifier(states.selectedModifier, id);
        setters.setSelectedOptionId(id);
        setters.setSelectedOption(inCache || inMod || null);
      }
    },
    [
      setters,
      states.menus,
      states.items,
      states.modifiers,
      states.options,
      states.selectedMenu,
      states.selectedItem,
      states.selectedModifier,
    ],
  );

  // SessionToggle "click a tab" — driven by data-value on the button.
  const handleSessionClick = useCallback(
    (e) => {
      const next = e?.currentTarget?.dataset?.value;
      if (!SESSIONS.includes(next)) return;
      goto(next, "all", null);
    },
    [goto],
  );

  /* ---------------------------------------------------------------- */
  /* 3 — Per-entity view/update                                         */
  /* ---------------------------------------------------------------- */
  // The four entities each get a view / update pair. Buttons in tables
  // forward their data-id via the same shared shape so we can take an
  // event or a plain string id.
  const idFromArg = (arg) =>
    typeof arg === "string" ? arg : arg?.currentTarget?.dataset?.id || null;

  const handleViewMenu = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("menus", "single", id);
  }, [goto]);
  const handleUpdateMenu = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("menus", "single", id);
    setters.setIsUpdating(true);
  }, [goto, setters.setIsUpdating]);

  const handleViewItem = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("items", "single", id);
  }, [goto]);
  const handleUpdateItem = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("items", "single", id);
    setters.setIsUpdating(true);
  }, [goto, setters.setIsUpdating]);

  const handleViewModifier = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("modifiers", "single", id);
  }, [goto]);
  const handleUpdateModifier = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("modifiers", "single", id);
    setters.setIsUpdating(true);
  }, [goto, setters.setIsUpdating]);

  const handleViewOption = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("options", "single", id);
  }, [goto]);
  const handleUpdateOption = useCallback((arg) => {
    const id = idFromArg(arg); if (!id) return;
    goto("options", "single", id);
    setters.setIsUpdating(true);
  }, [goto, setters.setIsUpdating]);

  /* ---------------------------------------------------------------- */
  /* 4 — Top-level update lifecycle                                     */
  /* ---------------------------------------------------------------- */
  const initiateFieldUpdate = useCallback(() => {
    setters.setIsUpdating(true);
    setters.setUpdatingField(states.session);
  }, [setters.setIsUpdating, setters.setUpdatingField, states.session]);

  // A per-field control calls this to pop the confirm modal.
  // Payload: { fieldLabel, prev, next, onCommit, title?, subtitle?, danger? }
  const requestConfirm = useCallback(
    (payload) => {
      setters.setConfirm({
        title: payload?.title || "Save change?",
        subtitle: payload?.subtitle || "Field update",
        fieldLabel: payload?.fieldLabel || "",
        prev: payload?.prev,
        next: payload?.next,
        danger: !!payload?.danger,
        onCommit: payload?.onCommit,
      });
    },
    [setters.setConfirm],
  );

  const handleCancelFieldUpdate = useCallback(() => {
    if (states.confirm) {
      setters.setConfirm(null);
      return;
    }
    // No confirm modal open → cancel the whole "Update all" mode.
    setters.setIsUpdating(false);
    setters.setEditingField(null);
    setters.setUpdatingField(null);
  }, [
    states.confirm,
    setters.setConfirm,
    setters.setIsUpdating,
    setters.setEditingField,
    setters.setUpdatingField,
  ]);

  const handleConfirmFieldUpdate = useCallback(() => {
    // If there's no payload, the user hit "Confirm" on the top bar's
    // Update-all chip; build a synthetic payload that closes update mode.
    const payload = states.confirm;
    if (!payload) {
      requestConfirm({
        fieldLabel: "All fields",
        prev: "(current)",
        next: "(your edits)",
        onCommit: () => {
          setters.setIsUpdating(false);
          setters.setEditingField(null);
          setters.setToast("Changes saved");
        },
      });
      return;
    }
    try {
      payload.onCommit?.();
    } finally {
      setters.setConfirm(null);
      setters.setEditingField(null);
      if (payload.fieldLabel) {
        setters.setToast(`${payload.fieldLabel} updated`);
      }
    }
  }, [
    states.confirm,
    requestConfirm,
    setters.setConfirm,
    setters.setEditingField,
    setters.setIsUpdating,
    setters.setToast,
  ]);

  /* ---------------------------------------------------------------- */
  /* 5 — Owner filter                                                   */
  /* ---------------------------------------------------------------- */
  // Click logic matches the preview:
  //   - state "both" + click X → keeps X off (state becomes the OTHER one)
  //   - state X + click X     → state becomes "both"
  //   - state X + click Y     → state becomes "both"
  const handleOwnerToggle = useCallback(
    (e) => {
      const clicked = e?.currentTarget?.dataset?.value;
      if (clicked !== "brand" && clicked !== "competitor") return;
      const current = states.ownerType;
      if (current === "both") {
        setters.setOwnerType(clicked === "brand" ? "competitor" : "brand");
        return;
      }
      setters.setOwnerType("both");
    },
    [states.ownerType, setters.setOwnerType],
  );

  /* ---------------------------------------------------------------- */
  /* 6 — Create wizard                                                  */
  /* ---------------------------------------------------------------- */
  const openCreate = useCallback(
    (sessionOrKind) => {
      const kind = SESSION_FORM_KIND[sessionOrKind] || sessionOrKind;
      setters.setShowForm(kind);
    },
    [setters.setShowForm],
  );

  const closeCreate = useCallback(() => {
    setters.setShowForm(null);
    setters.setIsCreating(false);
  }, [setters.setShowForm, setters.setIsCreating]);

  const handleCreate = useCallback(
    async (payload) => {
      const kind = states.showForm;
      setters.setIsCreating(true);
      try {
        const res = await apiHelpers.createEntity({ kind, ...payload });
        if (res?.success !== false) {
          setters.setShowForm(null);
          setters.setIsCreating(false);
          setters.setToast(`Created ${kind}: ${payload.label}`);
          return { ok: true };
        }
        setters.setIsCreating(false);
        setters.setToast(res?.message || "Could not create — try again");
        return { ok: false };
      } catch (err) {
        setters.setIsCreating(false);
        setters.setToast("Could not create — try again");
        return { ok: false, err };
      }
    },
    [
      states.showForm,
      apiHelpers,
      setters.setIsCreating,
      setters.setShowForm,
      setters.setToast,
    ],
  );

  /* ---------------------------------------------------------------- */
  /* 7 — Toast                                                          */
  /* ---------------------------------------------------------------- */
  const dismissToast = useCallback(
    () => setters.setToast(null),
    [setters.setToast],
  );

  /* ---------------------------------------------------------------- */
  /* Returned bundle                                                    */
  /* ---------------------------------------------------------------- */
  return {
    handlers: {
      fetchForSession,

      // navigation
      goto,
      handleSessionClick,

      // per-entity view/update (mapped to data-id buttons in tables)
      handleViewMenu, handleUpdateMenu,
      handleViewItem, handleUpdateItem,
      handleViewModifier, handleUpdateModifier,
      handleViewOption, handleUpdateOption,

      // update lifecycle
      initiateFieldUpdate,
      requestConfirm,
      handleCancelFieldUpdate,
      handleConfirmFieldUpdate,
      setEditingField: setters.setEditingField,

      // owner filter
      handleOwnerToggle,

      // create wizard
      openCreate,
      closeCreate,
      handleCreate,

      // toast
      dismissToast,
    },
  };
};
