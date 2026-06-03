export const salesPlatforms_propsComposer = (states, handlers, t) => {
  const stp_empty_salesPlatforms_props = {
    states: {},
    handlers: { handleAddnew: handlers.handleAddnew },
    childComps: {},
    t: t,
  };
  const stp_salesPlatforms_addForm_props = {
    states: {
      salesPlatformFormData: states.salesPlatformFormData,
      salesPlatformFormData_full: states.salesPlatformFormData_full,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_salesPlatforms_viewOne_props = {
    states: {
      salesPlatform: states.selectedSalesPlatform,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  const stp_salesPlatforms_viewAll_props = {
    states: {
      salesPlatforms: states.salesPlatforms,
    },
    handlers: {},
    childComps: {},
    t: t,
  };
  return {
    stp_empty_salesPlatforms_props,
    stp_salesPlatforms_addForm_props,
    stp_salesPlatforms_viewOne_props,
    stp_salesPlatforms_viewAll_props,
  };
};
