/* ============================================================================
   getChildCompProps — builds the per-(viewType × entity) prop bundles.

   Each bundle has the same { states, handlers, childProps, t } envelope so
   the corresponding Menus_*_view_one / Menus_*_view_all component can pass
   it down unchanged.

   Update lifecycle is threaded through every view_one bundle:
     states.editingField, states.confirm, states.isUpdating
     handlers.setEditingField(fieldKey | null)
     handlers.requestConfirm({ fieldLabel, prev, next, onCommit })
============================================================================ */
export const getChildCompProps = (states, handlers, t) => {
  /* ---- Shared lifecycle props that every view_one needs ---- */
  const sharedViewOneStates = {
    session: states.session,
    ownerType: states.ownerType,
    viewingType: states.viewingType,
    isUpdating: states.isUpdating,
    updatingField: states.updatingField,
    editingField: states.editingField,
    confirm: states.confirm,
  };
  const sharedViewOneHandlers = {
    setEditingField: handlers.setEditingField,
    requestConfirm: handlers.requestConfirm,
    goto: handlers.goto,
  };

  /* ---------------------------------------------------------- */
  /* Menu (top-level)                                            */
  /* ---------------------------------------------------------- */
  const Menus_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      menus: states.menus,
    },
    handlers: {
      handleUpdateAll: handlers.handleUpdateAll,
      handleViewAll: handlers.handleViewAll,
      handleDropdown: handlers.handleDropdown,
    },
    childProps: {},
    t: {},
  };

  const Menus_view_one_props = {
    states: {
      ...sharedViewOneStates,
      menu: states.selectedMenu,
    },
    handlers: {
      ...sharedViewOneHandlers,
      handleView_MenuItem: handlers.handleView_MenuItem,
      handleUpdate_MenuItem: handlers.handleUpdate_MenuItem,
      handleDropdown_MenuItem: handlers.handleDropdown_MenuItem,
    },
    childProps: {},
    t: {},
  };

  /* ---------------------------------------------------------- */
  /* MenuItem                                                    */
  /* ---------------------------------------------------------- */
  const Menus_menuItem_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      menuItems: states.menuItems,
    },
    handlers: {
      handleView_MenuItem: handlers.handleView_MenuItem,
      handleUpdate_MenuItem: handlers.handleUpdate_MenuItem,
      handleDropdown_MenuItem: handlers.handleDropdown_MenuItem,
    },
    childProps: {},
    t: {},
  };

  const Menus_menuItem_view_one_props = {
    states: {
      ...sharedViewOneStates,
      menuItem: states.selectedMenuItem,
    },
    handlers: {
      ...sharedViewOneHandlers,
      handleView_Modifier: handlers.handleView_Modifier,
      handleUpdate_Modifier: handlers.handleUpdate_Modifier,
    },
    childProps: {},
    t: {},
  };

  /* ---------------------------------------------------------- */
  /* Modifier                                                    */
  /* ---------------------------------------------------------- */
  const Menus_modifier_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      modifiers: states.modifiers,
    },
    handlers: {
      handleView_Modifier: handlers.handleView_Modifier,
      handleUpdate_Modifier: handlers.handleUpdate_Modifier,
    },
    childProps: {},
    t: {},
  };

  const Menus_modifier_view_one_props = {
    states: {
      ...sharedViewOneStates,
      modifier: states.selectedModifier,
    },
    handlers: {
      ...sharedViewOneHandlers,
      handleView_Option: handlers.handleView_Option,
      handleUpdate_Option: handlers.handleUpdate_Option,
    },
    childProps: {},
    t: {},
  };

  /* ---------------------------------------------------------- */
  /* Option                                                      */
  /* ---------------------------------------------------------- */
  const Menus_option_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      options: states.options,
    },
    handlers: {
      handleView_Option: handlers.handleView_Option,
      handleUpdate_Option: handlers.handleUpdate_Option,
    },
    childProps: {},
    t: {},
  };

  const Menus_option_view_one_props = {
    states: {
      ...sharedViewOneStates,
      option: states.selectedOption,
    },
    handlers: {
      ...sharedViewOneHandlers,
    },
    childProps: {},
    t: {},
  };

  return {
    Menus_view_one_props,
    Menus_view_all_props,
    Menus_menuItem_view_one_props,
    Menus_menuItem_view_all_props,
    Menus_modifier_view_one_props,
    Menus_modifier_view_all_props,
    Menus_option_view_one_props,
    Menus_option_view_all_props,
  };
};
