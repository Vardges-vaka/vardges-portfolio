export const getChildCompProps = (states, handlers, t) => {
  const Menus_option_view_one_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      option: states.selectedOption,
    },
    handlers: {},
    childProps: {},
    t: {},
  };
  const Menus_option_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      options: states.options,
    },
    handlers: {},
    childProps: {},
    t: {},
  };
  const Menus_modifier_view_one_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      modifier: states.selectedModifier,
    },
    handlers: {},
    childProps: {},
    t: {},
  };
  const Menus_modifier_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      modifiers: states.modifiers,
    },
    handlers: {},
    childProps: {},
    t: {},
  };
  const Menus_menuItem_view_one_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      menuItem: states.selectedMenuItem,
    },
    handlers: {
      handleUpdate_MenuItem: handlers.handleUpdate_MenuItem,
      handleView_MenuItem: handlers.handleView_MenuItem,
      handleDropdown_MenuItem: handlers.handleDropdown_MenuItem,
    },
    childProps: {},
    t: {},
  };
  const Menus_menuItem_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      menuItems: states.menuItems,
    },
    handlers: {
      handleUpdate_MenuItem: handlers.handleUpdate_MenuItem,
      handleView_MenuItem: handlers.handleView_MenuItem,
      handleDropdown_MenuItem: handlers.handleDropdown_MenuItem,
    },
    childProps: {},
    t: {},
  };
  const Menus_view_one_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
      menu: states.selectedMenu,
    },
    handlers: {
      handleUpdate_MenuItem: handlers.handleUpdate_MenuItem,
      handleView_MenuItem: handlers.handleView_MenuItem,
      handleDropdown_MenuItem: handlers.handleDropdown_MenuItem,
    },
    childProps: {},
    t: {},
  };
  const Menus_view_all_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingField: states.updatingField,
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

  return {
    Menus_option_view_one_props,
    Menus_option_view_all_props,
    Menus_modifier_view_one_props,
    Menus_modifier_view_all_props,
    Menus_menuItem_view_one_props,
    Menus_menuItem_view_all_props,
    Menus_view_one_props,
    Menus_view_all_props,
  };
};
