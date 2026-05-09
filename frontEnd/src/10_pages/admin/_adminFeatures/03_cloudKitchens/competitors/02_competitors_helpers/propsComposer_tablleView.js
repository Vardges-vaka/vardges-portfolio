export const propsComposer_tablleView = (states, handlers, t) => {
  const baseStates = {
    session: states.session,
    isEditing: states.isEditing,
    updatingFields: states.updatingFields,
    selectedCompetitor: states.selectedCompetitor,
    competitors: states.competitors,
  };
  const baseHandlers = {
    handleToggleEditingMode: handlers.handleToggleEditingMode,
    handleStartUpdateField: handlers.handleStartUpdateField,
    handleStopUpdateField: handlers.handleStopUpdateField,
    handleStopEditing: handlers.handleStopEditing,
  };

  const profile_props = {
    states: baseStates,
    handlers: {
      ...baseHandlers,
      handleCompetitorProfileTextSave: handlers.handleCompetitorProfileTextSave,
      handleCompetitorProfileLogoSave: handlers.handleCompetitorProfileLogoSave,
    },
    compProps: {},
    t,
  };
  const cuisineTypes_props = {
    states: baseStates,
    handlers: baseHandlers,
    compProps: {},
    t,
  };
  const priceRange_props = {
    states: baseStates,
    handlers: baseHandlers,
    compProps: {},
    t,
  };
  const menu_props = {
    states: baseStates,
    handlers: baseHandlers,
    compProps: {},
    t,
  };
  const competesWithBrands_props = {
    states: baseStates,
    handlers: baseHandlers,
    compProps: {},
    t,
  };
  const branches_props = {
    states: baseStates,
    handlers: baseHandlers,
    compProps: {},
    t,
  };
  const fullView_props = {
    states: baseStates,
    handlers: baseHandlers,
    compProps: {},
    t,
  };
  const propsMap = {
    view_profile: profile_props,
    // Backwards compatibility: old sessions now render the same combined UI.
    view_name: profile_props,
    view_logo: profile_props,
    view_cuisineTypes: cuisineTypes_props,
    view_priceRange: priceRange_props,
    view_menu: menu_props,
    view_competesWithBrands: competesWithBrands_props,
    view_branches: branches_props,
    view_competitor: fullView_props,
  };
  return {
    Competitors_tableView_profile_props: profile_props,
    Competitors_tableView_cuisineTypes_props: cuisineTypes_props,
    Competitors_tableView_priceRange_props: priceRange_props,
    Competitors_tableView_menu_props: menu_props,
    Competitors_tableView_competesWithBrands_props: competesWithBrands_props,
    Competitors_tableView_branches_props: branches_props,
    Competitors_tableView_fullView_props: fullView_props,
    propsMap: propsMap,
  };
};
