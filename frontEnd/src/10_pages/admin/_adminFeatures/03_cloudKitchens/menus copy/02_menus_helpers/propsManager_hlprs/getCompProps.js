import { getChildCompProps } from "./getChildCompProps.js";

/* ============================================================================
   getCompProps — top-level prop builders for everything Menus.jsx renders.

   Outputs (consumed by Menus.jsx via useMenus().childProps):
     - Menus_sessionToggle_props         (top bar + breadcrumb)
     - Menus_session_menu_props          (Menus session: view_all + view_one)
     - Menus_session_menuItem_props      (Items session)
     - Menus_session_modifier_props      (Modifiers session)
     - Menus_session_option_props        (Options session)
     - Menus_confirmModal_fieldUpdate_props
============================================================================ */

const SESSION_LABELS = {
  menus: "Menus",
  items: "Items",
  modifiers: "Modifiers",
  options: "Options",
};

const getSelectedEntityLabel = (states) => {
  if (states.viewingType !== "single") return null;
  if (states.session === "menus") {
    return states.selectedMenu?.label || states.selectedId || null;
  }
  if (states.session === "items") {
    return (
      states.selectedMenuItem?.name?.label || states.selectedMenuItemId || null
    );
  }
  if (states.session === "modifiers") {
    return (
      states.selectedModifier?.title?.label || states.selectedModifierId || null
    );
  }
  if (states.session === "options") {
    return states.selectedOption?.name?.label || states.selectedOptionId || null;
  }
  return null;
};

const buildBreadcrumbTrail = (states, handlers) => {
  const trail = [
    {
      key: "menus",
      label: "Menus",
      onClick: () => handlers.goto("menus", "all", null),
    },
  ];
  if (states.session !== "menus") {
    trail.push({
      key: states.session,
      label: SESSION_LABELS[states.session] || states.session,
      onClick: () => handlers.goto(states.session, "all", null),
    });
  }
  if (states.viewingType === "single") {
    const label = getSelectedEntityLabel(states);
    trail.push({
      key: "selected",
      label: label || "Detail",
    });
  }
  return trail;
};

export const getCompProps = (states, handlers, t) => {
  const {
    Menus_view_one_props,
    Menus_view_all_props,
    Menus_menuItem_view_one_props,
    Menus_menuItem_view_all_props,
    Menus_modifier_view_one_props,
    Menus_modifier_view_all_props,
    Menus_option_view_one_props,
    Menus_option_view_all_props,
  } = getChildCompProps(states, handlers, t);

  /* ---------------------------------------------------------- */
  /* Top bar                                                     */
  /* ---------------------------------------------------------- */
  const Menus_sessionToggle_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      isUpdating: states.isUpdating,
      viewingType: states.viewingType,
      selectedLabel: getSelectedEntityLabel(states),
    },
    handlers: {
      handleViewingSession: handlers.handleViewingSession,
      handleOwnerType: handlers.handleOwnerType,
      handleBack: handlers.handleBackToMenus,
      initiateFieldUpdate: handlers.initiateFieldUpdate,
      handleCancelFieldUpdate: handlers.handleCancelFieldUpdate,
      handleConfirmFieldUpdate: handlers.handleConfirmFieldUpdate,
      openCreate: handlers.openCreate,
    },
    childProps: {
      breadcrumb_trail: buildBreadcrumbTrail(states, handlers),
    },
    t: {},
  };

  /* ---------------------------------------------------------- */
  /* Confirm modal (double-confirm for any field save)           */
  /* ---------------------------------------------------------- */
  const Menus_confirmModal_fieldUpdate_props = {
    states: {
      isOpen: !!(states.confirm && states.updatingFieldModal),
      title: states.confirm?.title || "Save change?",
      subtitle: states.confirm?.subtitle || "Field update",
      updatingField: states.confirm?.fieldLabel || states.updatingField,
      prev: states.confirm?.prev,
      next: states.confirm?.next,
      danger: !!states.confirm?.danger,
    },
    handlers: {
      handleCancelUpdate: handlers.handleCancelFieldUpdate,
      handleConfirmUpdate: handlers.handleConfirmFieldUpdate,
    },
    t: {},
  };

  /* ---------------------------------------------------------- */
  /* Per-session bundles                                         */
  /* ---------------------------------------------------------- */
  const Menus_session_menu_props = {
    states: {
      menus: states.menus,
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      editingField: states.editingField,
      selectedMenu: states.selectedMenu,
    },
    handlers: {},
    childProps: {
      mn_view_one_props: Menus_view_one_props,
      mn_view_all_props: Menus_view_all_props,
    },
    t: {},
  };

  const Menus_session_menuItem_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      editingField: states.editingField,
    },
    handlers: {},
    childProps: {
      mnItem_view_one_props: Menus_menuItem_view_one_props,
      mnItem_view_all_props: Menus_menuItem_view_all_props,
    },
    t: {},
  };

  const Menus_session_modifier_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      editingField: states.editingField,
    },
    handlers: {},
    childProps: {
      mod_view_one_props: Menus_modifier_view_one_props,
      mod_view_all_props: Menus_modifier_view_all_props,
    },
    t: {},
  };

  const Menus_session_option_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      editingField: states.editingField,
    },
    handlers: {},
    childProps: {
      opt_view_one_props: Menus_option_view_one_props,
      opt_view_all_props: Menus_option_view_all_props,
    },
    t: {},
  };

  return {
    Menus_session_menu_props,
    Menus_session_menuItem_props,
    Menus_session_modifier_props,
    Menus_session_option_props,
    Menus_sessionToggle_props,
    Menus_confirmModal_fieldUpdate_props,
  };
};
