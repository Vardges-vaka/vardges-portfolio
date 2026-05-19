import { useCallback } from "react";
import {
  VALID_VIEWING_SESSIONS,
  MENUS,
  MOCK_MENU_ITEMS,
  MODIFIERS,
  OPTIONS,
} from "../05_menus_cnst/_menus_cnst.index.js";

/* ============================================================================
   useMenus_handlers — every handler the Menus feature needs.

   Sections:
   1. Initial fetches per session (mock for now; real API later)
   2. Navigation                — goto(session, viewingType, id)
   3. Per-entity view/update    — handleView_*, handleUpdate_*
   4. Top-level update lifecycle
   5. Per-field confirm modal   — requestConfirm + cancel/confirm
   6. Owner-type filter
   7. Create wizard             — openCreate / closeCreate / handleCreate
   8. Toast                     — dismissToast
============================================================================ */

export const useMenus_handlers = ({ states, setters /* , apiHelpers, isDebug */ }) => {
  /* ------------------------------------------------------------------ */
  /* 1. Initial fetches (mock data)                                      */
  /* ------------------------------------------------------------------ */
  const handleInitialFetch_menus = useCallback(() => {
    setters.setMenus(MENUS);
  }, [setters.setMenus]);

  const handleInitialFetch_items = useCallback(() => {
    setters.setMenuItems(MOCK_MENU_ITEMS);
  }, [setters.setMenuItems]);

  const handleInitialFetch_modifiers = useCallback(() => {
    setters.setModifiers(MODIFIERS);
  }, [setters.setModifiers]);

  const handleInitialFetch_options = useCallback(() => {
    setters.setOptions(OPTIONS);
  }, [setters.setOptions]);

  const handleInitialFetch = useCallback(() => {
    switch (states.session) {
      case "menus":
        handleInitialFetch_menus();
        break;
      case "items":
        handleInitialFetch_items();
        break;
      case "modifiers":
        handleInitialFetch_modifiers();
        break;
      case "options":
        handleInitialFetch_options();
        break;
      default:
        break;
    }
  }, [
    states.session,
    handleInitialFetch_menus,
    handleInitialFetch_items,
    handleInitialFetch_modifiers,
    handleInitialFetch_options,
  ]);

  /* ------------------------------------------------------------------ */
  /* 2. Navigation                                                       */
  /* ------------------------------------------------------------------ */
  // Shared "go to (session, viewingType, id)" — resets edit/update state
  // every time the user moves so stale edits never linger across screens.
  const goto = useCallback(
    (nextSession, nextViewingType = "all", id = null) => {
      setters.setEditingField(null);
      setters.setUpdatingField(null);
      setters.setUpdatingFieldModal(null);
      setters.setIsUpdating(false);
      setters.setConfirm(null);
      setters.setSession(nextSession);
      setters.setViewingType(nextViewingType);

      if (nextViewingType !== "single") {
        setters.setSelectedId(null);
        setters.setSelectedMenu(null);
        setters.setSelectedMenuItem(null);
        setters.setSelectedMenuItemId(null);
        setters.setSelectedModifier(null);
        setters.setSelectedModifierId(null);
        setters.setSelectedOption(null);
        setters.setSelectedOptionId(null);
        return;
      }
      // Resolve the selected entity for the new session.
      if (nextSession === "menus") {
        const menu = states.menus.find((m) => m._id === id) || null;
        setters.setSelectedId(id);
        setters.setSelectedMenu(menu);
      } else if (nextSession === "items") {
        const item =
          states.menuItems.find((mi) => mi._id === id) ||
          findMenuItemFromMenu(states.selectedMenu, id);
        setters.setSelectedMenuItemId(id);
        setters.setSelectedMenuItem(item || null);
      } else if (nextSession === "modifiers") {
        const m = states.modifiers.find((x) => x._id === id) || null;
        setters.setSelectedModifierId(id);
        setters.setSelectedModifier(m);
      } else if (nextSession === "options") {
        const o = states.options.find((x) => x._id === id) || null;
        setters.setSelectedOptionId(id);
        setters.setSelectedOption(o);
      }
    },
    [setters, states.menus, states.menuItems, states.modifiers, states.options, states.selectedMenu],
  );

  // Top bar "click a session button" — uses data-value on the button.
  const handleViewingSession = useCallback(
    (e) => {
      const next = e.currentTarget.dataset.value;
      if (!VALID_VIEWING_SESSIONS.includes(next)) return;
      goto(next, "all", null);
    },
    [goto],
  );

  // Breadcrumb "Menus" link.
  const handleBackToMenus = useCallback(() => {
    goto("menus", "all", null);
  }, [goto]);

  /* ------------------------------------------------------------------ */
  /* 3. Per-entity view/update                                           */
  /* ------------------------------------------------------------------ */
  // Menus table row -> view single menu.
  const handleViewAll = useCallback(
    (id) => goto("menus", "single", id),
    [goto],
  );

  // Menus table row -> view single + open the top-level update mode.
  const handleUpdateAll = useCallback(
    (id) => {
      goto("menus", "single", id);
      setters.setIsUpdating(true);
    },
    [goto, setters.setIsUpdating],
  );

  const handleDropdown = useCallback(() => {
    // Quick-view expansion is owned locally by the table; nothing to do.
  }, []);

  // MenuItem table row -> view single menuItem (or nested menuItem when
  // we're inside a menu's view_one and clicked a row from a category).
  const handleView_MenuItem = useCallback(
    (e) => {
      const id = e?.currentTarget?.dataset?.id || e;
      if (!id) return;
      goto("items", "single", id);
    },
    [goto],
  );

  const handleUpdate_MenuItem = useCallback(
    (e) => {
      const id = e?.currentTarget?.dataset?.id || e;
      if (!id) return;
      goto("items", "single", id);
      setters.setIsUpdating(true);
    },
    [goto, setters.setIsUpdating],
  );

  const handleDropdown_MenuItem = useCallback(() => {}, []);

  // Modifier table row -> view single modifier.
  const handleView_Modifier = useCallback(
    (e) => {
      const id = e?.currentTarget?.dataset?.id || e;
      if (!id) return;
      goto("modifiers", "single", id);
    },
    [goto],
  );

  const handleUpdate_Modifier = useCallback(
    (e) => {
      const id = e?.currentTarget?.dataset?.id || e;
      if (!id) return;
      goto("modifiers", "single", id);
      setters.setIsUpdating(true);
    },
    [goto, setters.setIsUpdating],
  );

  // Option table row -> view single option.
  const handleView_Option = useCallback(
    (e) => {
      const id = e?.currentTarget?.dataset?.id || e;
      if (!id) return;
      goto("options", "single", id);
    },
    [goto],
  );

  const handleUpdate_Option = useCallback(
    (e) => {
      const id = e?.currentTarget?.dataset?.id || e;
      if (!id) return;
      goto("options", "single", id);
      setters.setIsUpdating(true);
    },
    [goto, setters.setIsUpdating],
  );

  /* ------------------------------------------------------------------ */
  /* 4. Top-level update lifecycle                                       */
  /* ------------------------------------------------------------------ */
  const initiateFieldUpdate = useCallback(() => {
    setters.setIsUpdating(true);
    setters.setUpdatingField(states.session);
  }, [setters.setIsUpdating, setters.setUpdatingField, states.session]);

  /* ------------------------------------------------------------------ */
  /* 5. Per-field confirm modal                                          */
  /* ------------------------------------------------------------------ */
  // Anyone editing a single field calls this when they hit "Save".
  // payload: { fieldLabel, prev, next, onCommit, title?, subtitle?, danger? }
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
      setters.setUpdatingFieldModal(true);
    },
    [setters.setConfirm, setters.setUpdatingFieldModal],
  );

  const handleCancelFieldUpdate = useCallback(() => {
    // Two-step cancel: first click closes the modal, second click clears
    // the top-level "Update all" mode entirely.
    if (states.confirm || states.updatingFieldModal) {
      setters.setUpdatingFieldModal(false);
      setters.setConfirm(null);
      return;
    }
    setters.setIsUpdating(false);
    setters.setUpdatingField(null);
  }, [
    states.confirm,
    states.updatingFieldModal,
    setters.setUpdatingFieldModal,
    setters.setConfirm,
    setters.setIsUpdating,
    setters.setUpdatingField,
  ]);

  const handleConfirmFieldUpdate = useCallback(() => {
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
      setters.setUpdatingFieldModal(false);
      setters.setEditingField(null);
      if (payload.fieldLabel) {
        setters.setToast(`${payload.fieldLabel} updated`);
      }
    }
  }, [
    states.confirm,
    requestConfirm,
    setters.setConfirm,
    setters.setUpdatingFieldModal,
    setters.setEditingField,
    setters.setIsUpdating,
    setters.setToast,
  ]);

  /* ------------------------------------------------------------------ */
  /* 6. Owner-type filter (brand / competitor / both)                    */
  /* ------------------------------------------------------------------ */
  // Behaviour matches the preview: clicking an active filter toggles it to
  // "both"; clicking the other one isolates that owner; from "both" clicking
  // one isolates the OTHER one (so the click "turns off" the one you press).
  const handleOwnerType = useCallback(
    (e) => {
      const clicked = e?.currentTarget?.dataset?.value;
      if (clicked !== "brand" && clicked !== "competitor") return;
      const current = states.ownerType;
      if (current === "both") {
        setters.setOwnerType(clicked === "brand" ? "competitor" : "brand");
        return;
      }
      if (current === clicked) {
        setters.setOwnerType("both");
        return;
      }
      setters.setOwnerType("both");
    },
    [states.ownerType, setters.setOwnerType],
  );

  /* ------------------------------------------------------------------ */
  /* 7. Create wizard                                                    */
  /* ------------------------------------------------------------------ */
  // kindFromSession: the sessionToggle "+ New ___" button passes the active
  // session (menus | items | modifiers | options); we translate that to the
  // entity kind expected by the Menus_form_* wrappers.
  const sessionToKind = {
    menus: "menu",
    items: "menuItem",
    modifiers: "modifier",
    options: "option",
  };

  const openCreate = useCallback(
    (sessionOrKind) => {
      const kind = sessionToKind[sessionOrKind] || sessionOrKind;
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
      // payload: { ownerType, label } — `kind` comes from states.showForm.
      const kind = states.showForm;
      setters.setIsCreating(true);
      try {
        // TODO: replace with real API once useMenus_apiHelpers wires endpoints.
        await new Promise((r) => setTimeout(r, 250));
        setters.setShowForm(null);
        setters.setIsCreating(false);
        setters.setToast(`Created ${kind}: ${payload.label}`);
        return { ok: true };
      } catch (err) {
        setters.setIsCreating(false);
        setters.setToast("Could not create — try again");
        return { ok: false, err };
      }
    },
    [states.showForm, setters.setIsCreating, setters.setShowForm, setters.setToast],
  );

  /* ------------------------------------------------------------------ */
  /* 8. Toast                                                            */
  /* ------------------------------------------------------------------ */
  const dismissToast = useCallback(() => {
    setters.setToast(null);
  }, [setters.setToast]);

  return {
    handlers: {
      // Navigation
      handleViewingSession,
      handleBackToMenus,
      goto,

      // Per-entity view/update
      handleViewAll,
      handleUpdateAll,
      handleDropdown,

      handleView_MenuItem,
      handleUpdate_MenuItem,
      handleDropdown_MenuItem,

      handleView_Modifier,
      handleUpdate_Modifier,

      handleView_Option,
      handleUpdate_Option,

      // Top-level update + confirm modal
      initiateFieldUpdate,
      requestConfirm,
      handleCancelFieldUpdate,
      handleConfirmFieldUpdate,
      setEditingField: setters.setEditingField,

      // Owner filter
      handleOwnerType,

      // Create wizard
      openCreate,
      closeCreate,
      handleCreate,

      // Toast
      dismissToast,

      // Boot
      handleInitialFetch,
    },
  };
};

/* --------------------------------------------------------------------------
   Helper: find a menuItem by id inside a menu's nested categories.
   Used when the user is in menu single view and clicks a row in a category.
-------------------------------------------------------------------------- */
function findMenuItemFromMenu(menu, id) {
  if (!menu?.categories?.length) return null;
  for (const category of menu.categories) {
    if (!category?.menuItems?.length) continue;
    for (const entry of category.menuItems) {
      const item = entry?.item;
      if (item?._id === id) return item;
    }
  }
  return null;
}
