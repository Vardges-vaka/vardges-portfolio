import { getChildCompProps } from "./getChildCompProps.js";
export const getCompProps = (states, handlers, t) => {
  const {
    Menus_option_view_one_props,
    Menus_option_view_all_props,
    Menus_modifier_view_one_props,
    Menus_modifier_view_all_props,
    Menus_menuItem_view_one_props,
    Menus_menuItem_view_all_props,
    Menus_view_one_props,
    Menus_view_all_props,
  } = getChildCompProps(states, handlers, t);

  const Menus_sessionToggle_props = {
    states: {
      session: states.session,
      ownerType: states.ownerType,
      isUpdating: states.isUpdating,
      viewingType: states.viewingType,
    },
    handlers: {
      handleViewingSession: handlers.handleViewingSession,
      handleOwnerType: handlers.handleOwnerType,
      handleBack: handlers.handleBackToMenus,
      initiateFieldUpdate: handlers.initiateFieldUpdate,
      handleCancelFieldUpdate: handlers.handleCancelFieldUpdate,
      handleConfirmFieldUpdate: handlers.handleConfirmFieldUpdate,
    },
    childProps: {},
    t: {},
  };
  const Menus_confirmModal_fieldUpdate_props = {
    states: {
      isOpen: states.updatingFieldModal,
      updatingField: states.updatingField,
    },
    handlers: {
      handleCancelUpdate: handlers.handleCancelFieldUpdate,
      handleConfirmUpdate: handlers.handleConfirmFieldUpdate,
    },
    t: {},
  };
  const Menus_session_menu_props = {
    states: {
      menus: states.menus,
      session: states.session,
      ownerType: states.ownerType,
      viewingType: states.viewingType,
      isUpdating: states.isUpdating,
      updatingFields: states.updatingFields,
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
      updatingFields: states.updatingFields,
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
      updatingFields: states.updatingFields,
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
      updatingFields: states.updatingFields,
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
